# Introduction 

This sample project covers:

1. Setting up ImageKit React SDK
2. Rendering images
3. Setting authentication context for the SDK
4. Applying common image manipulations
5. Adding overlays to images
6. Lazy loading images
7. Blurred image placeholder
8. Client-side file uploading
9. Rendering videos

# How to run locally

## Install dependencies

```
yarn install
OR
npm install
```
## Setup authentication

In `src/App.js`, set the following parameters for authentication:

```js
const publicKey = '<YOUR_IMAGEKIT_PUBLIC_KEY>';
const urlEndpoint = '<YOUR_IMAGEKIT_URL_ENDPOINT>';
const authenticationEndpoint = 'http://localhost:3001/auth';
```

Required parameters are `urlEndpoint` and `publicKey`. The `authenticationEndpoint` parameter is optional and only needed if you want to use the SDK for client-side file upload. 

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

## Run the React app

```
yarn start
OR
npm start
```

Open the page at `http://localhost:3000`.

## Setup dummy backend for upload

Set the following keys in `server/index.js`

```js
const imagekit = new ImageKit({
  urlEndpoint: '<YOUR_IMAGEKIT_URL_ENDPOINT>',
  publicKey: '<YOUR_IMAGEKIT_PUBLIC_KEY>',
  privateKey: '<YOUR_IMAGEKIT_PRIVATE_KEY>',
});
```

All these parameters are required. API private key can also be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

Please note that file upload will only work if, along with the above, you have also defined `YOUR_IMAGEKIT_PUBLIC_KEY`, `YOUR_IMAGEKIT_URL_ENDPOINT`, and `YOUR_AUTHENTICATION_ENDPOINT` variables in `src/App.js`.

## Run the Node.js server

```
cd server
node index.js
```

Node server will run at `http://localhost:3001`.

# Useful links
* React quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/react
* React SDK and documentation - https://github.com/imagekit-developer/imagekit-react

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.

### Credit: 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
