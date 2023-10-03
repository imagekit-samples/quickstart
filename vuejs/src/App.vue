<template>
  <div class="sample-app">
    <p>IK Image component</p>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }, { rotation: 360 }]"
      :lqip="{ active: true, threshold: 20, quality: 20, blur: 30 }" loading="lazy" />

    <h2>Loading image from an absolute path using src prop</h2>
    <IKImage
      width="400" 
      src="https://ik.imagekit.io/demo/default-image.jpg" />

    <h2>Resizing image to 300x300</h2>
    <IKImage
      path="/default-image.jpg"           
      :transformation="[{width: 300, height: 300}]" />

    <h2>Loading image a quality 40</h2>
    <IKImage
      path="/default-image.jpg" 
      :transformation="[{quality: 40}]" />

    <h2>Chained transformation</h2>
    <IKImage
      path="/default-image.jpg" 
      :transformation="[{width: 300, height: 300}, {rotation: 90}]" />

    <h2>Adding image overlay</h2>
    <IKImage
      path="/default-image.jpg" 
      :transformation="[{
        width: 300, 
        height: 300, 
        overlayImage: 'default-image.jpg', 
        overlayWidth: 100,
        overlayX: 0,
        overlayImageBorder: '10_CDDC39'
      }]" />

    <h2>Lazy loading</h2>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }]" loading="lazy"
      class="lazyload" />

    <h2>Lazyload with LQIP</h2>
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }]"
      :lqip="{ active: true, threshold: 20, quality: 20, blur: 30 }" loading="lazy" class="lazyload-lqip" />

    <h2>With LQIP</h2>
    <!-- tr:h-200,w-200:q-20,bl-30/default-image.jpg -->
    <IKImage :urlEndpoint="urlEndpoint" :path="path" :transformation="[{ height: 200, width: 200 }]"
      :lqip="{ active: true, threshold: 20, quality: 20, blur: 30 }" class="lqip" />


    <h2>IK Image with context</h2>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint">
      <template v-slot:default>
        <IKImage :path="path" :transformation='[{ height: 300, width: 400 }]' />
      </template>
    </IKContext>

    <h2>Using exported component</h2>
    <IKVideo class="ikvideo-default" :urlEndpoint="urlEndpoint" :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
      :transformation="[{ height: 200, width: 200 }]" />

    <h2>Video with some advance transformation</h2>
    <IKVideo class="ikvideo-with-tr" :urlEndpoint="urlEndpoint" :src="'https://ik.imagekit.io/demo/sample-video.mp4'"
      :transformation="[{ height: 200, width: 600, b: '5_red', q: 95 }]" />

    <h2>File upload</h2>
    <IKContext :publicKey="publicKey" :urlEndpoint="urlEndpoint" :authenticator="authenticator">
      <IKUpload ref="childComponentRef" :tags="['tag1', 'tag2']"
        :responseFields="['tags']" :onError="onError" :onSuccess="onSuccess" :onUploadStart="onUploadStart" :onUploadProgress="onUploadProgress"
        :validateFile="validateFile" customCoordinates="10,10,100,100" />
    </IKContext>
    <button @click="abortChildUpload">Abort Child Upload</button>
  </div>
</template>

<script>

import ImageKit, { IKImage, IKUpload, IKContext, IKVideo, } from './ImagekitComponents'
import { createApp } from 'vue';

const app = createApp({});

app.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
  publicKey: process.env.VUE_APP_PUBLIC_KEY,
})

let path = "/default-image.jpg";

export default {
  name: 'App',
  components: {
    IKImage,
    IKContext,
    IKVideo,
    IKUpload,
  },
  data() {
    return {
      urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
      publicKey: process.env.VUE_APP_PUBLIC_KEY,
      path: path,
      src: `${process.env.VUE_APP_URL_ENDPOINT}/${path}`
    };
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
      console.log(`Upload inprogress ... (${(event.loaded*100/event.total).toFixed(2)}% Done)`)
      console.log(event)
    },
    abortChildUpload() {
      this.$refs.childComponentRef.triggerAbortUpload();
      console.log("Upload aborted")
    },
    authenticator(){
      return new Promise((resolve, reject) => {
        var url = process.env.VUE_APP_AUTHENTICATION_ENDPOINT;

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
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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
