# vuejs

# Introduction 

This sample project covers:

1. Setting up ImageKit Vue.js SDK
2. Rendering images
3. Applying common image manipulations
4. Adding overlays to images
5. Lazy loading images
6. Blurred image placeholder
7. Client-side file uploading

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

`publicKey` and `authenticationEndpoint` parameters are optional and only needed if you want to use the SDK for client-side file upload. You can get these parameters from the developer section in your ImageKit dashboard - https://imagekit.io/dashboard#developers.

```shell
# Required variables. If your are running this in Codesandbox, please add secrets in your fork.
VUE_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_endpoint

# Optional - Only reqruied if you want to upload files
VUE_APP_IMAGEKIT_PUBLIC_KEY=public_XXXXXXXXXXXX
VUE_APP_IMAGEKIT_PRIVATE_KEY=private_XXXXXXXXXXXX
VUE_APP_YOUR_AUTH_ENDPOINT=http://localhost:3001/auth
```

Run the server

```
yarn serve
```

Open the page at http://localhost:8080

Please note that file upload will only work if you have defined `VUE_APP_IMAGEKIT_PUBLIC_KEY`, `VUE_APP_IMAGEKIT_PRIVATE_KEY`, and `VUE_APP_YOUR_AUTH_ENDPOINT` enviroment variables by setting values in `.env` file.

# Useful links
* Vue.js quickstart guide - https://docs.imagekit.io/getting-started/vuejs-quickstart
* Vue.js SDK and documentation - https://github.com/imagekit-developer/imagekit-vuejs

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.