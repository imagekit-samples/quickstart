# Introduction 

This sample project covers:

1. Setting up ImageKit Vue.js SDK
2. Rendering images
3. Setting authentication context for the SDK
4. Applying common image manipulations
5. Adding overlays to images
6. Lazy loading images
7. Blurred image placeholder
8. Client-side file uploading
9. Rendering videos

# How to run locally
Install dependencies

```
yarn install
```

Create `.env` file by copying `.env.example`

```shell
cp .env.example .env
```

Set `VUE_APP_IMAGEKIT_URL_ENDPOINT` because `urlEndpoint` is the required parameter. You can get the value of URL-endpoint from your ImageKit dashboard - https://imagekit.io/dashboard#url-endpoints.

`publicKey` and `authenticator` parameters are optional and only needed if you want to use the SDK for client-side file upload. You can get these parameters from the developer section in your ImageKit dashboard - https://imagekit.io/dashboard#developers.

`authenticator` expects an asynchronous function that resolves with an object containing the necessary security parameters i.e `signature`, `token`, and `expire`.

```shell
# Required variables
VUE_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_endpoint

# Optional - Only required if you want to upload files
VUE_APP_IMAGEKIT_PUBLIC_KEY=public_XXXXXXXXXXXX
VUE_APP_IMAGEKIT_PRIVATE_KEY=private_XXXXXXXXXXXX
VUE_APP_YOUR_AUTH_ENDPOINT=http://localhost:3001/auth
```

Run the server

```
yarn serve
```

Open the page at http://localhost:8080

Please note that file upload will only work if you have defined `VUE_APP_IMAGEKIT_PUBLIC_KEY`, `VUE_APP_IMAGEKIT_PRIVATE_KEY`, and `VUE_APP_YOUR_AUTH_ENDPOINT` environment variables by setting values in `.env` file.

# Useful links
* Offical Vue.js quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/vuejs
* Vue.js SDK and documentation - https://github.com/imagekit-developer/imagekit-vuejs

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
