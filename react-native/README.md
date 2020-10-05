# ImageKit React Native Tutorial

This project was bootstrapped with [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup). Head over to the link, choose your development OS and target OS and install its dependencies.

## Installation

### Setup the frontend app

Install packages:

```bash
npm install
```

Start Metro:

```bash
npx react-native start
```

Run the app in ios simulator (You need to have Xcode installed):

```bash
npx react-native run-ios
```

Run the app in android simulator (You need to have Android Studio installed):

```bash
npx react-native run-android
```

To run the upload component you will have to
1 - Replace your Imagekit endpoint, public key in app/config/imagekit.js (these creds can be found in your Imagekit dashboard
2 - set up a backend server as shown below.

## Setting up the sample backend server

There is a sample server present in the `/server` directory.

It takes the `private key` from .env file, so create a .env file by renaming the sample.env in `/server` and paste your authentication credentials into it.

Install packages:

```bash
cd server
npm install
```
To run this server:

```
npm start
```