const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const publicKey = "your_public_key";
const privateKey = "your_private_key";

app.post("/auth", function (req, res) {
  const token = jwt.sign(
    req.body.uploadPayload,
    privateKey,
    {
      expiresIn: req.body.expire,
      header: {
        alg: "HS256",
        typ: "JWT",
        kid: publicKey,
      },
    })
  res.status(200);
  res.send({ token });
});

app.listen(8080, function () {
  console.log("Live at Port 8080");
});