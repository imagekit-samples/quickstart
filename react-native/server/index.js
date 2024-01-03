const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
app.use(cors());

dotenv.config();

const uuid = require('uuid');
const crypto = require("crypto");

const privateKey = process.env.PRIVATE_KEY;
router.get("/auth", function(req, res) {
    const token = req.query.token || uuid.v4();
    const expire = req.query.expire || parseInt(Date.now()/1000)+2400;
    const privateAPIKey = `${privateKey}`;
    const signature = crypto.createHmac('sha1', privateAPIKey).update(token+expire).digest('hex');
    res.status(200);
    res.send({
        token,
        expire,
        signature
    });
});

app.use("/",router);

app.listen(8080,function(){
  console.log("Live at Port 8080");
});