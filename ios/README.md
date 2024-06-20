# Introduction 

This sample project covers:

1. Setting up ImageKit iOS SDK
2. Rendering images
3. Setting authentication context for the SDK
4. Applying common image manipulations
5. Adding overlays to images
6. Client-side file uploading

# How to run locally

This project was bootstrapped with [CocoaPods](https://guides.cocoapods.org/using/getting-started.html). Head over to the link for installation if not already done.

## Install dependencies

```bash
pod install
```

## Setup authentication

In `ImageKitDemo/Constants.swift`, set the following parameters for authentication:

```swift
let IK_PUBLIC_KEY = "your_public_key"

let IK_URL_ENDPOINT = "https://ik.imagekit.io/your_imagekit_id"

let AUTH_SERVER_API_ENDPOINT = "http://localhost:8080/auth"
```

`IK_URL_ENDPOINT` is a required parameter. `IK_PUBLIC_KEY` and `AUTH_SERVER_API_ENDPOINT` parameters are optional and only needed if you want to use the SDK for client-side file upload. 

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.

API public key can be obtained from the [developers](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.


### Run the app in ios simulator:

Run in terminal:
```bash
open ImageKitDemo.xcworkspace
```

## Setup dummy backend for upload

Move to the server directory
```shell
cd Server
```

Create `.env` file by copying `sample.env`

```shell
cp sample.env .env
```

Set the following keys in `.env`

```shell
PUBLIC_KEY=public_XXXXXXXXXXXX
PRIVATE_KEY=private_XXXXXXXXXXXX
```

API private key can be obtained from the [developers](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

Please note that file upload will only work if, along with the above, `IK_PUBLIC_KEY` and `AUTH_SERVER_API_ENDPOINT` are set in `Constants.swift` file.

Install packages:

```bash
npm install
```

## Run the Node.js server

```
npm start
```

Node server will run at `http://localhost:8080`.


### Important Note
Since iOS enforces `App Transport Security`, for the demo, the project has `http://localhost:8080` as an exception.

If the following error is encountered `Transport security has blocked a cleartext HTTP (http://) resource load since it is insecure. Temporary exceptions can be configured via your app's Info.plist file.`, the following code should be added to `Info.plist` file
```xml
  <key>NSAppTransportSecurity</key>
	<dict>
		<key>NSExceptionDomains</key>
		<dict>
			<key>localhost:8000</key>
			<dict>
				<key>NSIncludesSubdomains</key>
				<true/>
				<key>NSExceptionAllowsInsecureHTTPLoads</key>
				<true/>
			</dict>
		</dict>
		<key>NSAllowsArbitraryLoads</key>
		<true/>
	</dict>
```

# Useful links
* Offical iOS quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/ios
* iOS SDK and documentation - https://github.com/imagekit-developer/imagekit-ios

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
