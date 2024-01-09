# Introduction 

This sample project covers:

1. Configuring a React Native application with the ImageKit JavaScript SDK
2. Rendering images
3. Setting authentication context for the SDK
4. Applying common image manipulations
5. Adding overlays to images
6. Client-side file uploading
7. Rendering videos

# How to run locally

This project was bootstrapped with [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup). Head over to the link, choose your development OS and target OS and install its dependencies if not already done.

## Install dependencies

```bash
npm install
```

## Setup authentication

In `app/config/Imagekit.js`, set the following parameters for authentication:

```js
const urlEndpoint = "<YOUR_IMAGEKIT_URL_ENDPOINT>";
const publicKey = "<YOUR_IMAGEKIT_PUBLIC_KEY>";
const authenticationEndpoint = "http://localhost:8080/auth";
```

Required parameters are `urlEndpoint` and `publicKey`. The `authenticationEndpoint` parameter is optional and only needed if you want to use the SDK for client-side file upload. 

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

### Start Metro Server:

```bash
npx react-native start
```

### Run the app in ios simulator (You need to have Xcode installed):

```bash
npx react-native run-ios
```

### Run the app in android simulator (You need to have Android Studio installed):

```bash
npx react-native run-android
```

## Setup dummy backend for upload

Move to the server directory
```shell
cd server
```

Insert your private key in `server/index.js`

```shell
const privateKey = `private_XXXXXXXXXXXX`
```

API private key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

Please note that file upload will only work if, along with the above, you have also defined `publicKey`, `urlEndpoint`, and `authenticationEndpoint` variables in `app/config/Imagekit.js`.

Install packages:

```bash
npm install
```

## Run the Node.js server

```
npm start
```

Node server will run at `http://localhost:8080`.

# Useful links
* React Native quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/react-native
* Javascript SDK and documentation - https://github.com/imagekit-developer/imagekit-javascript

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
