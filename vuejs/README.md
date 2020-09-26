# vuejs

# How to run locally
```
yarn install
```

Create `.env` file by coping `.env.example`

```shell
cp .env.example .env
```

Set `VUE_APP_IMAGEKIT_URL_ENDPOINT` because `urlEndpoint` is the required parameter. You can get the value of URL-endpoint from your ImageKit dashboard - https://imagekit.io/dashboard#url-endpoints.

`publicKey` and `authenticationEndpoint` parameters are optional and only needed if you want to use the SDK for client-side file upload. You can get these parameters from the developer section in your ImageKit dashboard - https://imagekit.io/dashboard#developers.

Compiles and hot-reloads for development

```
yarn serve
```

Open the page at http://localhost:8080

# Useful links
* Vue.js quickstart guide - https://docs.imagekit.io/getting-started/vuejs-quickstart
* Vue.js SDK and documentation - https://github.com/imagekit-developer/imagekit-vuejs

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.