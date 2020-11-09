const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
var cors = require('cors');
const app = express();
app.use(cors());

dotenv.config();

const ImageKit = require('imagekit');
const imagekit = new ImageKit({ privateKey: process.env.PRIVATE_KEY, publicKey: "NOTUSED", urlEndpoint: "https://ik.imagekit.io/demo" })

router.get("/auth", function(req, res) {
    var token = req.query.token || "";
    var expire = req.query.expire || parseInt(Date.now()/1000)+2400;
    var signature = imagekit.getAuthenticationParameters(token, expire);
    res.status(200);
    res.send(signature);
});

app.use("/",router);

app.listen(8080,function(){
  console.log("Live at Port 8080");
});