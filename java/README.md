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

# How to run locally

You will find `App.java` in `src/main/java/io/imagekit/sampleapp/` directory. Edit program as you need, then run `App.java`. If you are using CLI Tool (Terminal/Command Prompt) Then Open Project in CLI and execute using gradle**
```shell
cd project-name
./gradlew run
```
- You will find jar in "imagekit-sdk/build/libs/" directory.

## Install dependencies

- Java 1.8 or later
### Gradle users
Step 1. Add the JitPack repository to your build file
```
allprojects {
	repositories {
		...
		maven { url 'https://jitpack.io' }
	}
}
```
Step 2. Add the dependency on project's `build.gradle`:
```
dependencies {
        implementation 'com.github.imagekit-developer:imagekit-java:2.0.0'
}
```
### Maven users
Step 1. Add the JitPack repository to your build file
```
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```
Step 2. Add the dependency in POM file:
```
<dependency>
    <groupId>com.github.imagekit-developer</groupId>
    <artifactId>imagekit-java</artifactId>
    <version>2.0.0</version>
</dependency>
```

## Setup authentication

In `src/main/resources/config.properties`, set the following parameters for authentication, no need to use quote(' or ") in values.:

```editorconfig
# Put essential values of keys [UrlEndpoint, PrivateKey, PublicKey]
UrlEndpoint=your_url_endpoint
PrivateKey=your_private_key
PublicKey=your_public_key
```

You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard.
API public key can be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

## Setup dummy backend for upload

Set the following keys in `src/main/java/io/imagekit/sampleapp/App.java`

 ```java
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.config.Configuration;
import io.imagekit.sdk.utils.Utils;
class App {
    public static void main(String[] args){
        ImageKit imageKit=ImageKit.getInstance();
        Configuration config=Utils.getSystemConfig(App.class);
        imageKit.setConfig(config);
    }
}
```

All these parameters are required. API private key can also be obtained from the [developer](https://imagekit.io/dashboard#developers) section in your ImageKit dashboard.

Please note that file upload will only work if, along with the above, you have also defined `YOUR_IMAGEKIT_PUBLIC_KEY`, `YOUR_IMAGEKIT_URL_ENDPOINT`, and `YOUR_IMAGEKIT_PRIVATE_KEY` variables in `config.properties`.

# Useful links
* React quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/java
* React SDK and documentation - https://github.com/imagekit-developer/imagekit-java/

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
