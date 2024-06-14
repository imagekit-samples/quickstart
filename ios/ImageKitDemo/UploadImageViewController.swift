//
//  UploadImageViewController.swift
//  ImageKitDemo
//
//  Created by Abhinav Dhiman on 19/10/20.
//  Copyright © 2020 ImageKit. All rights reserved.
//

import UIKit
import ImageKitIO
import Photos

class UploadImageViewController: UIViewController{
    
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var selectImage: UIButton!
    @IBOutlet weak var uploadImage: UIButton!
    
    var progressToastView: UIProgressView!
    var alertView: UIAlertController!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func OnClickSelect(_ sender: UIButton) {
        if UIImagePickerController.isSourceTypeAvailable(UIImagePickerController.SourceType.photoLibrary){
            let image = UIImagePickerController()
            image.delegate = self
            image.sourceType = .photoLibrary
            image.mediaTypes = ["public.image"]
            image.allowsEditing = false
            self.present(image, animated: true, completion: nil)
        }
    }
    
    @IBAction func OnClickUpload(_ sender: UIButton) {
        let image: UIImage = self.imageView.image!
        let imageName = image.accessibilityIdentifier!
        let progressAlert = showProgressToast(title: "Uploading", message: "Please Wait")
        
        let payload: [String: String] = [
            "fileName": imageName,
            "folder": "/",
            "tags": ["demo", "image"].joined(separator: ","),
            "responseFields": "tags,customCoordinates,isPrivateFile",
            "useUniqueFileName": "true",
            "isPrivateFile": "false",
            "customCoordinates": "10,10,100,100",
            "overwriteFile": "true",
            "overwriteAITags": "false",
            "overwriteTags": "true",
            "overwriteCustomMetadata": "true",
            // Custom metadata must be defined in the Media Library before using it in the upload API
            // "customMetadata": String(data: try! JSONSerialization.data(withJSONObject: ["device_name": "Emulator", "uid": 167434], options: .sortedKeys), encoding: .utf8)!,
        ]
        
        let tokenResponse = UploadAuthService.getUploadtoken(payload: payload)
        if let token = tokenResponse?["token"] {
            ImageKit.shared.uploader().upload(
                file: image,
                token: token,
                fileName: payload["fileName"]!,
                useUniqueFilename: payload["useUniqueFileName"] == "true" ? true : false,
                tags: payload["tags"]!.components(separatedBy: ","),
                folder: payload["folder"]!,
                isPrivateFile: payload["isPrivatefile"] == "true" ? true : false,
                customCoordinates: payload["customCoordinates"]!,
                responseFields: payload["responseFields"]!,
                overwriteFile: payload["overwriteFile"] == "true" ? true : false,
                overwriteAITags: payload["overwriteAITags"] == "true" ? true : false,
                overwriteTags: payload["overwriteTags"] == "true" ? true : false,
                overwriteCustomMetadata: payload["overwriteCustomMetadata"] == "true" ? true : false,
                // Custom metadata must be defined in the Media Library before using it in the upload API
                // customMetadata: payload["customMetadata"]!,
                progress: { progress in
                    let progressBar: UIProgressView? = progressAlert.view.subviews.filter{$0 is UIProgressView}.first as? UIProgressView
                    if (progressBar != nil){
                        progressBar!.setProgress(Float(progress.fractionCompleted), animated: true)
                    }
                },
                policy: UploadPolicy.Builder()
                    .requireNetworkType(.UNMETERED)
                    .requiresBatteryCharging(false)
                    .maxRetries(4)
                    .backoffCriteria(backoffMillis: 500, backoffPolicy: .EXPONENTIAL)
                    .build(),
                preprocessor: ImageUploadPreprocessor<UIImage>.Builder()
                    .limit(width: 960, height: 720)
                    .rotate(degrees: 90)
                    .format(format: .JPEG)
                    .build(),
                completion: { result in
                    DispatchQueue.main.async {
                        self.dismiss(animated: true, completion: {
                            switch result{
                            case .success(let _, let uploadAPIResponse):
                                self.showToast(title: "Upload Complete", message: "The uploaded image can be accessed using url: " + (uploadAPIResponse?.url!)!)
                            case .failure(let error as UploadAPIError):
                                self.showToast(title: "Upload Failed", message: "Error: " + error.message)
                            case .failure(let error):
                                self.showToast(title: "Upload Failed", message: "Error: " + error.localizedDescription)
                            }
                            
                        })
                    }
                })
        } else {
            self.showToast(title: "Upload Failed", message: "Error: " + "Token not found")
        }
    }
}

extension UploadImageViewController: UINavigationControllerDelegate, UIImagePickerControllerDelegate{
    
    internal func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        if let image = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
            let imageUrl = info[UIImagePickerController.InfoKey.imageURL] as! URL
            let imageName = String(imageUrl.absoluteString.split(separator: "/").last!)
            image.accessibilityIdentifier = imageName
            self.imageView.image = image
            self.uploadImage.isHidden = false
        }
        dismiss(animated: true)
    }
    
    public func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
}
