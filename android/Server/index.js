const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

const ImageKit = require('imagekit');
const imagekit = new ImageKit({ 
  privateKey: "your_private_key", 
  publicKey: "your_public_key", 
  urlEndpoint: "your_url_endpoint"
})

app.get("/auth", function (req, res) {
  var signature = imagekit.getAuthenticationParameters();
  res.status(200);
  res.send(signature);
});

app.listen(8080, function () {
  console.log("Live at Port 8080");
});