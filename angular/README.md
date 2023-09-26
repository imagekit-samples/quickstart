# Introduction 

This sample project covers:

1. Setting up ImageKit Angular SDK
2. Rendering images
3. Applying common image manipulations
4. Lazy loading images
5. Blurred image placeholder
6. Client-side file uploading
7. Advanced file uploading
8. Rendering videos
9. Progressive image loading

# How to run locally

## Install dependencies

```
npm install
```
## Setup authentication

In `src/app/app.module.ts`, set the following parameters for authentication:

```js
publicKey = '<YOUR_IMAGEKIT_PUBLIC_KEY>';
urlEndpoint = '<YOUR_IMAGEKIT_URL_ENDPOINT>';
```

Required parameters are `urlEndpoint` and `publicKey`. The `authenticator` parameter is optional and only needed if you want to use the SDK for client-side file upload. 

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

## Run the Angular app

```
npm start
```

Open the page at `http://localhost:4200`.

## Run the sample backend server

Create .env file with PRIVATE_KEY attribute.

```
PRIVATE_KEY=<your_private_key>
```

Then run the following commands.

```
cd sample-server
npm install
npm run server
```

Node server will run at `http://localhost:3000`.

# Useful links
* Angular quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/angular
* Angular SDK and documentation - https://github.com/imagekit-developer/imagekit-angular

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
