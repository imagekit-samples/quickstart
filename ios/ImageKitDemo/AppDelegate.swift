//
//  AppDelegate.swift
//  ImageKitDemo
//
//  Created by Abhinav Dhiman on 19/10/20.
//  Copyright © 2020 ImageKit. All rights reserved.
//

import UIKit
import ImageKitIO

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        _ = ImageKit.init(clientPublicKey: "public_K0hLzl8KvshMKkSvKsEGxMSf5SI=", imageKitEndpoint: "https://ik.imagekit.io/demo", transformationPosition: TransformationPosition.PATH, authenticationEndpoint: "http://localhost:8080/auth")

        return true
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }


}

extension UIViewController{

    func showToast(title: String, message : String){
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alert.view.backgroundColor = .black
        alert.view.alpha = 0.5
        alert.view.layer.cornerRadius = 15
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        self.present(alert, animated: true)
    }
    
    func showProgressToast(title: String, message: String) -> UIAlertController {
        let alertView = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alertView.view.backgroundColor = .black
        alertView.view.alpha = 0.5
        alertView.view.layer.cornerRadius = 15
        self.present(alertView, animated: true, completion: {
            let margin:CGFloat = 8
            let rect = CGRect(x: margin, y: 72.0, width: alertView.view.frame.width - margin * 2.0 , height: 2.0)
            let progressToastView = UIProgressView(frame: rect)
            progressToastView.tintColor = self.view.tintColor
            alertView.view.addSubview(progressToastView)
        })
        return alertView
    }
}
