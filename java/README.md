# Introduction 

This sample project shows an implementation of all methods exposed by Java SDK. You can copy-paste code snippet from here in your application and edit the values as per your requirement.

# How to run locally

You will find `App.java` in `src/main/java/io/imagekit/sampleapp/` directory. 

Open this file and replace placeholder credentials with actual values. You can get the value of [URL-endpoint](https://imagekit.io/dashboard#url-endpoints) from your ImageKit dashboard. API keys can be obtained from the [developer](https://imagekit.io/dashboard/developer/api-keys) section in your ImageKit dashboard.

```java
Configuration config = new Configuration("your_public_key", "your_private_key", "your_url_endpoint");
```

Now run `App.java`. If you are using CLI Tool (Terminal/Command prompt), open the project in CLI and execute it using Gradle.

```shell
cd project-name
./gradlew run
```

- You will find the jar in "imagekit-sdk/build/libs/" directory.

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
Step 2. Add the dependency on the project's `build.gradle`:
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
Step 2. Add the dependency in the POM file:
```
<dependency>
    <groupId>com.github.imagekit-developer</groupId>
    <artifactId>imagekit-java</artifactId>
    <version>2.0.0</version>
</dependency>
```

# Useful links
* Java quickstart guide - https://docs.imagekit.io/getting-started/quickstart-guides/java
* Java SDK and documentation - https://github.com/imagekit-developer/imagekit-java/

# Report a bug
If something doesn't work as expected, report a bug at support@imagekit.io.
