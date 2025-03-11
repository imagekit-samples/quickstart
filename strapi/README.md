
# How to run locally

This project is developed using node version 18.

## Setup environment variables

Create a `.env`, file and add below parameters:

```js
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified

# Database
DATABASE_CLIENT=sqlite
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_SSL=false
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=tobemodified

PUBLIC_KEY = <YOUR_IMAGEKIT_PUBLIC_KEY>
URL_ENDPOINT = <YOUR_IMAGEKIT_URL_ENDPOINT>
PRIVATE_KEY = <YOUR_IMAGEKIT_PRIVATE_KEY>
```

You can get the value of [URL_ENDPOINT](https://imagekit.io/dashboard/url-endpoints) from your ImageKit dashboard.
`PUBLIC_KEY` and `PRIVATE_KEY` can be obtained from the [developer](https://imagekit.io/dashboard/developer/api-keys) section in your ImageKit dashboard.


### Install packages:

```bash
npm install
```

### Run the app

```
npm run develop
```

The app will run at `http://localhost:1337/admin`, and it will ask you to register as the first local administrator. Once done, You now have access to the admin panel.

## Configuration

To make our provider work, we need to add a configuration in the `./config/plugins.js` file. The configuration should include the following parameters, as described below.

- `provider`: Specifies the name of the provider.
- `providerOptions`: Contains the options required to configure the provider.
    * `urlEndpoint`: A required parameter that can be obtained from the [URL-endpoint section](https://imagekit.io/dashboard/url-endpoints) or the [developer section](https://imagekit.io/dashboard/developer/api-keys) on your ImageKit dashboard.
    * `publicKey` and `privateKey`: Required parameters that can be retrieved from the [developer section](https://imagekit.io/dashboard/developer/api-keys) on your ImageKit dashboard.
    * `uploadOptions` is an optional parameter that accepts upload parameters supported by the [ImageKit Upload API](https://docs.imagekit.io/api-reference/upload-file-api/server-side-file-upload). The following parameters are supported by the provider: `folder`, `useUniqueFileName`, `tags`, `checks`, `isPrivateFile`, `customCoordinates`, `webhookUrl`, `extensions`, `transformation`, and `customMetadata`.

For more information about using a provider, refer to the [documentation about using a provider](https://docs.strapi.io/dev-docs/providers). To understand how environment variables are used in Strapi, please refer to the [documentation about environment variables](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment).

### Provider Configuration

Below is an example of how to configure the provider in `./config/plugins.js`.

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "strapi-provider-upload-imagekitio",
      providerOptions: {
        publicKey: env("PUBLIC_KEY"),
        privateKey: env("PRIVATE_KEY"),
        urlEndpoint: env("URL_ENDPOINT"),

        // Optional
        uploadOptions: {
          folder: "/path",
          useUniqueFileName: true,
          tags: ["tag1", "tag2"],
          checks: `"file.size" < "1mb"`,
          isPrivateFile: false,
          customCoordinates: "1,2,3,4",
          webhookUrl: "https://testwebook.com",
          extensions: [
          {
              name: "google-auto-tagging",
              maxTags: 5,
              minConfidence: 95,
          },
          ],
          transformation: {
          pre: "l-text,i-Imagekit,fs-50,l-end",
          post: [
              {
              type: "transformation",
              value: "l-text,i-Imagekit,fs-50,l-end",
              },
          ],
          },
          customMetadata: { test: "value" },
        },
      },
    },
  },
  // ...
});
```

**Note**: Ensure that the custom metadata `test` is already created in the [Media Library Settings](https://imagekit.io/dashboard/settings/media-library).

### Security Middleware Configuration

The default settings in Strapi's Security Middleware require modifications to the `contentSecurityPolicy` settings to ensure thumbnail previews are visible in the Media Library. Replace the `strapi::security` string with the object provided below, as detailed in the [middleware configuration documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/middlewares.html#loading-order).

`./config/middlewares.js`

```js
module.exports = [
  // ...
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'ik.imagekit.io'],
          'media-src': ["'self'", 'data:', 'blob:', 'ik.imagekit.io'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
```

# Useful links
* ImageKit Strapi provider quickstart guide - https://imagekit.io/docs/integration/strapi
* ImageKit Strapi provider and documentation - https://github.com/imagekit-developer/strapi-provider-upload-imagekitio

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.