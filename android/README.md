# Introduction 

This sample project covers:

1. Setting up ImageKit Android SDK
2. Rendering images
3. Setting authentication context for the SDK
4. Applying common image manipulations
5. Adding overlays to images
6. Client-side file uploading
7. Adaptive video streaming
8. Extensions for third party image loading libraries

# How to run locally

This project was bootstrapped with [Android Studio](https://developer.android.com/studio/install) using [Kotlin](https://kotlinlang.org/). Head over to the link for installation if not already done.

## Setup authentication

In `app/src/main/java/io/imagekit/imagekitdemo/MainActivity.kt`, set the following parameters for authentication:

```kotlin
ImageKit.init(
   context = applicationContext,
   publicKey = "YOUR_IMAGEKIT_PUBLIC_KEY",
   urlEndpoint = "https://ik.imagekit.io/YOUR_IMAGEKIT_ID",
   transformationPosition = TransformationPosition.PATH,
)
```

Required parameters are `urlEndpoint`. The `publicKey` parameter is optional and only needed if you want to use the SDK for client-side file upload. 

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.


### Run the app in android simulator:

Build and Run in Android Studio

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
PRIVATE_KEY=private_XXXXXXXXXXXX
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


### Important Note
For ease for loading file, `app/src/main/java/io/imagekit/imagekitdemo/FileUtils.kt` can be imported into your project and used like it is demonstrated in `app/src/main/java/io/imagekit/imagekitdemo/UploadFileActivity.kt`.

# Demo Features Code Samples

## Setting up ImageKit Android SDK
#### **`MainActivity.kt`**
```kotlin
import com.imagekit.android.ImageKit
import com.imagekit.android.entity.TransformationPosition

class MainActivity : AppCompatActivity() {
  ...
  override fun onCreate(savedInstanceState: Bundle?) {
        ...
        // Initialize the ImageKit SDK with your credentials and configurations.
        ImageKit.init(
            context = applicationContext,
            publicKey = "IK_PUBLIC_KEY",
            urlEndpoint = "https://ik.imagekit.io/YOUR_IMAGEKIT_ID",
            transformationPosition = TransformationPosition.PATH,
        )
        ...
  }
  ...
}
```

## Rendering images

```kotlin
var url = ImageKit.getInstance().url("plant.jpeg", "https://ik.imagekit.io/demo/img").create()

```

## Setting authentication context for the SDK
#### **`MainActivity.kt`**
``` kotlin
import com.imagekit.android.ImageKit
import com.imagekit.android.entity.TransformationPosition

class MainActivity : AppCompatActivity() {
  ...
  override fun onCreate(savedInstanceState: Bundle?) {
        ...

        ImageKit.init(
            context = applicationContext,
            publicKey = "IK_PUBLIC_KEY",
            urlEndpoint = "https://ik.imagekit.io/YOUR_IMAGEKIT_ID",
            transformationPosition = TransformationPosition.PATH,
        )
        ...
  }
  ...
}
```


## Applying common image manipulations
```kotlin 
val url = ImageKit.getInstance().url("plant.jpeg", "https://ik.imagekit.io/demo/img")
            .width(300)
            .height(200)
            .cropMode(CropMode.PAD_RESIZE)
            .background("F3F3F3")
            .create()
```

## Adding overlays to images
```kotlin 
val url = ImageKit.getInstance()
            .url(
                src = "https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg",
                transformationPosition = TransformationPosition.PATH
            )
            .raw("l-image,i-logo-white_SJwqB4Nfe.png,lx-10,ly-20")
            .create()
```

## Client-side file uploading
```kotlin
ImageKit.getInstance().uploader().upload(
    file = file!!
    , fileName = file!!.name
    , useUniqueFilename = true
    , tags = arrayOf("nice", "copy", "books")
    , folder = "/dummy/folder/"
    , imageKitCallback = this
)
```

## Adaptive video streaming
```kotlin
val url = ImageKit.getInstance()
    .url(path = "default-image.jpg",
        transformationPosition = TransformationPosition.PATH
    )

//For Glide
url.createWithGlide(
    placeholderImage = getDrawable(R.drawable.ic_launcher_background)
)
    .into(imageView)
//For Picasso
url.createWithPicasso(
    placeholderImage = getDrawable(R.drawable.ic_launcher_background)
)
    .into(imageView)
//For Coil
Coil.imageLoader(this@ImageExtensionsActivity)
    .enqueue(
        url.createWithCoil(
            placeholderImage = getDrawable(R.drawable.ic_launcher_background)
        )
            .target(imageView)
            .build()
    )
//For Fresco (works with Fresco's DraweeView only)
url.createWithFresco()
    .buildWithTarget(simpleDraweeView)
```

## AExtensions for third party image loading libraries
```kotlin
val url = ImageKit.getInstance()
    .url(path = "video.mp4",
        transformationPosition = TransformationPosition.PATH
    )
    .setAdaptiveStreaming(
        format = StreamingFormat.DASH,
        resolutions = listOf(360, 480, 720, 1080)
    )
    .create()
```

# Useful links
* Android quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/android
* Android SDK and documentation - https://github.com/imagekit-developer/imagekit-android

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
