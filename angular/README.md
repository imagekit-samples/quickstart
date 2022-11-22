# Introduction 

# How to run locally

## Install dependencies

```
npm install
```

This will download the Angular SDK package from the npm registry, and add it to the dependencies list of your Angular app (unless you're using npm <5.0.0)

## Setup authentication

You will need to import the imagekitio-angular module in your application. 
Go to the src/app/app.module.ts and configure it like this:

```ts
@NgModule({
    ...
    imports: [
        ...
        ImagekitioAngularModule.forRoot({
            publicKey: '<YOUR_IMAGEKIT_PUBLIC_KEY>',
            urlEndpoint: '<YOUR_IMAGEKIT_URL_ENDPOINT>',
            authenticationEndpoint: 'http://localhost:3000/auth'
        })
    ]
    ...
```

Required parameters are `urlEndpoint` and `publicKey`. The `authenticationEndpoint` parameter is optional and only needed if you want to use the SDK for client-side file upload. 

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

## Run the Angular app

```
npm start
```

Open the page at `http://localhost:4200`.

## Run the sample server

Sample server for upload implementation is available at `sample-server`. To run the server, follow these steps

1. Create a `.env` file based on `sample.env` and enter your private key.
2. Use `npm install` to install dependencies. 
3. Use `npm run server` to start the server. It will expose the [authentication endpoint](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint) on `http://localhost:3000/auth`

## Note - inject error
If following error shows up on browser's console:
Error: inject() must be called from an injection context
    at injectInjectorOnly (core.js:934:1)
    at ɵɵinject (core.js:950:1)
    at Module.ɵɵdirectiveInject (core.js:21154:1)
    at NodeInjectorFactory.IkVideoComponent_Factory [as factory] (imagekitio-angular.js:414:123)
    at getNodeInjectable (core.js:5993:1)
    at instantiateAllDirectives (core.js:13038:1)
    at createDirectivesInstances (core.js:12250:1)
    at ɵɵelementStart (core.js:21343:1)
    at Module.ɵɵelement (core.js:21399:1)
    at AppComponent_Template (app.component.html:322:5)

Add the following to “tsconfig.app.json”
```js
"paths": { "@angular/*": [ "node_modules/@angular/*" ] }
```

# Useful links
* React SDK and documentation - https://github.com/imagekit-developer/imagekit-angular
* Documentation - https://docs.imagekit.io

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.


