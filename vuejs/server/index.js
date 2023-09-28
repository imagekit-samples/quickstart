// This is our backend server
const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const ImageKit = require("imagekit");
require('dotenv').config()

const imagekit = new ImageKit({
    urlEndpoint: process.env.VUE_APP_URL_ENDPOINT,
    publicKey: process.env.VUE_APP_PUBLIC_KEY,
    privateKey: process.env.VUE_APP_PRIVATE_KEY
})

app.get("/auth", function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.listen(3001, function () {
    console.log("Live at Port 3001");
});