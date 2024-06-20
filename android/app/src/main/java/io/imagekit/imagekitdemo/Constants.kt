package io.imagekit.imagekitdemo

// Required parameters for ImageKit Upload

// Replace with ImageKit public key from ImageKit Dashboard (https://imagekit.io/dashboard/url-endpoints)
const val IK_PUBLIC_KEY = "IK_PUBLIC_KEY"

// Replace with your server URL
const val AUTH_SERVER_BASE_URL = "AUTH_SERVER_URL" 

// Replace with your server endpoint
const val AUTH_API_ENDPOINT = "/auth"


// Required parameters for ImageKit URL generation
// Default Values for demo account have been used here. You can replace them with your own values.

// Replace with ImageKit URL endpoint (or CNAME) from ImageKit Dashboard (https://imagekit.io/dashboard/url-endpoints)
const val IK_URL_ENDPOINT = "https://ik.imagekit.io/demo" 

// Replace with any image available in your ImageKit media library
const val SAMPLE_IMAGE = "default-image.jpg"

// Replace with any video available in your ImageKit media library
const val SAMPLE_VIDEO = "sample-video.mp4"
