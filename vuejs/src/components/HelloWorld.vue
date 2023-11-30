<template>
  abc
  <div>
    <h1>ImageKit Vuejs quick start</h1>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" width="400" />

    <h2>Loading image from an absolute path using src prop</h2>
    <IKImage :urlEndpoint="urlEndpoint" width="400" src="https://ik.imagekit.io/demo/default-image.jpg" />

    <h2>Resizing image to 300x300</h2>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ width: 300, height: 300 }]" />

    <h2>Loading image a quality 40</h2>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ quality: 40 }]" />

    <h2>Chained transformation</h2>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ width: 300, height: 300 }, { rotation: 90 }]" />

    <h2>Adding image overlay</h2>
    <IKImage
      :urlEndpoint="urlEndpoint"
      :path="path"
      :transformation="[
        {
          width: 300,
          height: 300,
          overlayImage: 'default-image.jpg',
          overlayWidth: 100,
          overlayX: 0,
          overlayImageBorder: '10_CDDC39',
        },
      ]"
    />

    <h2>Lazy loading images</h2>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 300, width: 400 }]" loading="lazy" height="300" width="400" />

    <h2>Loading a blurred low quality image placeholder and lazy-loading original when user scrolls near them</h2>
    <IKImage
      :urlEndpoint="urlEndpoint"
      :path="path"
      :transformation="[{ height: 300, width: 400 }]"
      :lqip="{ active: true }"
      loading="lazy"
      height="300"
      width="400"
    />

    <IKContext :urlEndpoint="urlEndpoint">
      <h2>Video Element</h2>
      <IKVideo path="sample-video.mp4" :transformation="[{ height: 200, width: 200 }]" :controls=true />

      <br />
      <h2>Video with some advance transformation</h2>
      <IKVideo path="sample-video.mp4" :transformation="[{ height: 200, width: 600, b: '5_red', q: 95 }]" :controls=true />
    </IKContext>

    <h2>File upload</h2>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint" :authenticator="authenticator">
      <IKUpload
        ref="childComponentRef"
        :tags="['tag1', 'tag2']"
        class="file-upload-ik"
        :responseFields="['tags']"
        :onError="onError"
        :onSuccess="onSuccess"
        :onUploadStart="onUploadStart"
        :onUploadProgress="onUploadProgress"
        :validateFile="validateFile"
        customCoordinates="10,10,100,100"
      />
      <h2>Advanced file upload</h2>
        <IKUpload
          ref="advanceUploadComponentRef"
          fileName="test-upload.jpg"
          :tags="['sample-tag1', 'sample-tag2']"
          customCoordinates="10,10,10,10"
          :isPrivateFile=false
          :useUniqueFileName=true
          :responseFields="['tags']"
          folder="/sample-folder"
          :validateFile="file => file.size < 2000000"
          :extensions="[{
            'name': 'remove-bg',
            'options': {
              'add_shadow': true,
            },
          }]"
          webhookUrl="https://www.example.com/imagekit-webhook"
          :overwriteFile=true
          :overwriteAITags=true
          :overwriteTags=true
          :overwriteCustomMetadata=true
          :onError="onError"
          :onSuccess="onSuccess"
          :onUploadProgress="onUploadProgress"
          :onUploadStart="onUploadStart"
        />
        <p>Abort upload request</p>
        <button @click="abortChildUpload">Abort request</button>
    </IKContext>
  </div>
</template>
<script>

import { IKImage, IKContext, IKVideo, IKUpload } from "imagekitio-vue";

let path = "/default-image.jpg";

export default {
  name: "HelloWorld",
  components: {
    IKImage,
    IKContext,
    IKVideo,
    IKUpload,
  },
  data() {
    return {
      urlEndpoint: process.env.VUE_APP_IMAGEKIT_URL_ENDPOINT,
      publicKey: process.env.VUE_APP_IMAGEKIT_PUBLIC_KEY,
      path,
      src: `${process.env.VUE_APP_IMAGEKIT_URL_ENDPOINT}/${path}`,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    onError(err) {
      try {
        console.log("Error");
        console.log(err);
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess(res) {
      try {
        console.log("Success");
        console.log(res);
      } catch (e) {
        console.error(e);
      }
    },
    validateFile(res) {
      if (res.size > 0) {
        return true;
      }
      return false;
    },
    onUploadStart(event) {
      console.log("Upload started");
      console.log(event);
    },
    onUploadProgress(event) {
      console.log(`Upload inprogress ... (${((event.loaded * 100) / event.total).toFixed(2)}% Done)`);
      console.log(event);
    },
    abortChildUpload() {
      this.$refs.childComponentRef.triggerAbortUpload();
      this.$refs.advanceUploadComponentRef.triggerAbortUpload();
      console.log("Upload aborted");
    },
    authenticator() {
      return new Promise((resolve, reject) => {
        var url = process.env.VUE_APP_YOUR_AUTH_ENDPOINT;

        // Make the Fetch API request
        fetch(url, { method: "GET", mode: "cors" }) // Enable CORS mode
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((body) => {
            var obj = {
              signature: body.signature,
              expire: body.expire,
              token: body.token,
            };
            resolve(obj);
          })
          .catch((error) => {
            reject([error]);
          });
      });
    },
  },
};
</script>
<style>
.sample-app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

img {
  min-height: 400px;
}
</style>
