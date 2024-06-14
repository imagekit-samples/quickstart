//
//  UploadAuthFile.swift
//  ImageKitDemo
//
//  Created by Abhinav Dhiman on 14/06/24.
//  Copyright © 2024 ImageKit. All rights reserved.
//

import Foundation

class UploadAuthService {
    static let dispatchGroup = DispatchGroup()
    
    static func getUploadtoken(payload: [String: String]) -> [String : String]? {
        let urlSession = URLSession(configuration: URLSessionConfiguration.default, delegate: URLSession.shared.delegate, delegateQueue: URLSession.shared.delegateQueue)
        var request = URLRequest(url: URL(string: AUTH_SERVER_API_ENDPOINT)!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        var tokenResponse: [String: String]? = nil
        
        guard let body = try? JSONSerialization.data(withJSONObject: ["uploadPayload": payload, "expire": 60, "publicKey": IK_PUBLIC_KEY], options: []) else {
            return nil
        }
        
        request.httpBody = body
        dispatchGroup.enter()
        DispatchQueue.global().async {
            let task = urlSession.dataTask(with: request) { data, response, error in
                guard error == nil else {
                    dispatchGroup.leave()
                    print(error)
                    return
                }
                
                let response = response as! HTTPURLResponse
                let status = response.statusCode
                guard (200...299).contains(status) else {
                    dispatchGroup.leave()
                    print("Error: \(status)")
                    return
                }
                
                if let data = data {
                    tokenResponse = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: String]
                }
                dispatchGroup.leave()
            }
            
            task.resume()
        }
        
        dispatchGroup.wait()
        return tokenResponse
        
    }
}
