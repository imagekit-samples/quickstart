import React from 'react';
import './App.css';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const publicKey = '<YOUR_IMAGEKIT_PUBLIC_KEY>';
const urlEndpoint = '<YOUR_IMAGEKIT_URL_ENDPOINT>';
const authenticationEndpoint = 'http://localhost:3001/auth';

const onError = err => {
  console.log("Error", err);
};

const onSuccess = res => {
  console.log("Success", res);
};

function App() {
  return (
    <div className="App">
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={authenticationEndpoint}
      >
        <h1>ImageKit React quick start</h1>
        <h2>File upload</h2>
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
        />

        <h2>Rendering image</h2>
        <IKImage path="default-image.jpg" width="400" />

        <h2>Loading image from an absolute path</h2>
        <IKImage
          src="https://ik.imagekit.io/demo/default-image.jpg"
          width="400"
        />

        <h2>Height and width manipulation</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 200,
            width: 200
          }]}
        />

        <h2>Crop mode</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 200,
            cropMode: 'extract',
          }]}
        />

        <h2>Quality manipulation</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{ quality: 10 }]}
          width="400"
        />

        <h2>Chained transformation</h2>
        <h3>Step 1: Resized and cropped</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 200
          }]}
        />

        <h3>Step 2: Resized and cropped, then rotated</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 200,
          }, {
            rt: 90,
          }]}
        />

        <h3>Step 3: Rotated, then resized and cropped</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            rt: 90,
          }, {
            height: 300,
            width: 200,
          }]}
        />

        <h2>Adding text overlay to image</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{
            height: 300,
            width: 300,
            overlayText: 'ImageKit',
            overlayTextFontSize: 50,
            overlayTextColor: '0651D5',
          }]}
        />

        <h2>Lazy loading images</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[{ height: 300, width: 400 }]}
          loading="lazy"
          height="300"
          width="400"
        />

        <h2>Blurred image placeholder</h2>
        <IKImage
          path="default-image.jpg"
          lqip={{ active: true, quality: 20 }}
          width="400"
        />

        <h3>Combining lazy loading with low-quality placeholders</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{ height: 300, width: 400 }]}
          lqip={{ active: true }}
          loading="lazy"
          height="300"
          width="400"
        />
      </IKContext>
    </div>
  );
}

export default App;
