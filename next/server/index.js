/* 
  This is our backend server.
  Replace YOUR_IMAGEKIT_URL_ENDPOINT, YOUR_IMAGEKIT_PUBLIC_KEY, 
  and YOUR_IMAGEKIT_PRIVATE_KEY with actual values
*/
const express = require('express');
const app = express();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
//   urlEndpoint: '<YOUR_IMAGEKIT_URL_ENDPOINT>',
//   publicKey: '<YOUR_IMAGEKIT_PUBLIC_KEY>',
//   privateKey: '<YOUR_IMAGEKIT_PRIVATE_KEY>'
  urlEndpoint: 'https://ik.imagekit.io/igi7ywjzdi/',
  publicKey: 'public_X140up/8w//8965Hp/pI8VCM6QY=',
  privateKey: 'private_GM/Fl34w5BcLia8cneT9hT+ylus=',
});

// allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.listen(3001, function () {
  console.log('Live at Port 3001');
});