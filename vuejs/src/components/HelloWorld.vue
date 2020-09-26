<template>
  <div>
    <h1>ImageKit Vuejs quick start</h1>
    <ik-image width="400" path="/default-image.jpg"></ik-image>

    <h2>Loading image from an absolute path using src prop</h2>
    <ik-image 
      width="400" 
      src="https://ik.imagekit.io/demo/default-image.jpg" />

    <h2>Resizing image to 300x300</h2>
    <ik-image 
      path="/default-image.jpg" 
      :transformation="[{width: 300, height: 300}]" />

    <h2>Loading image a quality 40</h2>
    <ik-image 
      path="/default-image.jpg" 
      :transformation="[{quality: 40}]" />

    <h2>Chained transformation</h2>
    <ik-image 
      path="/default-image.jpg" 
      :transformation="[{width: 300, height: 300}, {rotation: 90}]" />

    <h2>Adding image overlay</h2>
    <ik-image 
      path="/default-image.jpg" 
      :transformation="[{
        width: 300, 
        height: 300, 
        overlayImage: 'default-image.jpg', 
        overlayWidth: 100,
        overlayX: 0,
        overlayImageBorder: '10_CDDC39'
      }]" />

    <h2>Lazy loading images</h2>
    <ik-image
      path="/default-image.jpg"
      :transformation="[{height:300,width:400}]"
      loading="lazy"
      height="300"
      width="400"
    />

    <h2>Loading a blurred low quality image placeholder and lazy-loading original when user scrolls near them</h2> 
    <ik-image
      path="/default-image.jpg"
      :transformation="[{height:300,width:400}]"
      :lqip="{active:true}"
      loading="lazy"
      height="300"
      width="400"
    />

    <h2>File upload</h2>
    <ik-upload
      :onError="onError"
      :onSuccess="onSuccess" />


  </div>
</template>
<script>
/* 
    This is our frontend code
    Replace your_url_endpoint, your_public_key with actual values
*/
import Vue from "vue";
import ImageKit from "imagekitio-vue";
Vue.use(ImageKit, {
  urlEndpoint: process.env.VUE_APP_IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.VUE_APP_IMAGEKIT_PUBLIC_KEY,
  authenticationEndpoint: process.env.VUE_APP_YOUR_AUTH_ENDPOINT || "http://localhost:3001/auth"
});

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    onError(err) {
      console.log("Error");
      console.log(err);
    },
    onSuccess(res) {
      console.log("Success");
      console.log(res);
    }
  }
};
</script>