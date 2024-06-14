//
//  Upload.swift
//  ImageKitDemo
//
//  Created by Abhinav Dhiman on 19/10/20.
//  Copyright © 2020 ImageKit. All rights reserved.
//

import UIKit
import ImageKitIO

class UploadFileViewController: UIViewController {
    
    
    var fileUrlToBeUploaded: URL? = nil;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    @IBOutlet weak var filePreview: UIImageView!
    @IBOutlet weak var uploadFile: UIButton!
    
    @IBAction func OnClickSelect(_ sender: UIButton) {
        let document = UIDocumentPickerViewController(documentTypes: ["public.item"], in: .open)
        document.delegate = self
        document.modalPresentationStyle = .formSheet
        self.present(document, animated: true, completion: nil)
    }
    
    @IBAction func OnClickUpload(_ sender: Any) {
        let filename = self.fileUrlToBeUploaded!.lastPathComponent
        guard let file = try? NSData(contentsOf: self.fileUrlToBeUploaded!) as Data else {
            self.showToast(title: "Upload Failed", message: "Error: " + "File not found")
            return
        }
        let progressAlert = showProgressToast(title: "Uploading", message: "Please Wait")
        
        let payload: [String: String] = [
            "fileName": filename,
            "folder": "/",
            "tags": ["demo", "file"].joined(separator: ","),
            "responseFields": "tags,isPrivateFile",
            "useUniqueFileName": "true",
            "isPrivateFile": "false",
            "overwriteFile": "true",
            "overwriteTags": "true",
            "overwriteCustomMetadata": "true",
            // Custom metadata must be defined in the Media Library before using it in the upload API
            // "customMetadata": String(data: try! JSONSerialization.data(withJSONObject: ["device_name": "Emulator", "uid": 167434], options: .sortedKeys), encoding: .utf8)!,
        ]
        
        let tokenResponse = UploadAuthService.getUploadtoken(payload: payload)
        
        if let token = tokenResponse?["token"] {
            ImageKit.shared.uploader().upload(
                file: file,
                token: token,
                fileName: payload["fileName"]!,
                useUniqueFilename: payload["useUniqueFileName"] == "true" ? true : false,
                tags: payload["tags"]!.components(separatedBy: ","),
                folder: payload["folder"]!,
                isPrivateFile: payload["isPrivatefile"] == "true" ? true : false,
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
                completion: { result in
                    DispatchQueue.main.async {
                        self.dismiss(animated: true, completion: {
                            switch result{
                            case .success(( _, let uploadAPIResponse)):
                                self.showToast(title: "Upload Complete", message: "The uploaded file can be accessed using url: " + (uploadAPIResponse?.url)!)
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

extension UploadFileViewController: UINavigationControllerDelegate, UIDocumentPickerDelegate{
    public func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
    }
    public func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        if let file = urls.first {
            self.filePreview.image = UIImage.icon(forFileURL: file)
            self.uploadFile.isHidden = false
            self.fileUrlToBeUploaded = file
        }
    }
}


extension UIImage {
    public class func icon(forFileURL fileURL: URL) -> UIImage {
        return UIDocumentInteractionController(url: fileURL).icons.last!
    }
}
