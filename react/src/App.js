import React, { useState } from 'react';
import './App.css';
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const authenticationEndpoint = 'http://localhost:3001/auth';

const App = () => {
  const [imgTr, setImgTr] = useState([{ height: 300, width: 300 }])
  const [uploadedImageSource, setUploadedImageSource] = useState();
  const [error, setError] = useState();

  const onError = err => {
    console.log("Error", err);
    setError({ uploadFileErr: err.message })
  };

  const onSuccess = res => {
    console.log("Success", res);
    console.log(res.$ResponseMetadata.statusCode); // 200
    console.log(res.$ResponseMetadata.headers);
    setUploadedImageSource(res.url);
  };

  return (
    <div className="App">
      <h1>Low-quality placeholders without lazy-loading</h1>
        <IKImage
        urlEndpoint={urlEndpoint}
          path="default-image.jpg"
        className={"lqip"}
          transformation={[{
            height: 200,
            width: 200,
        }]} />

      <h1>Combining lazy loading with low-quality placeholders</h1>
        <IKImage
        urlEndpoint={urlEndpoint}
          path="default-image.jpg"
        transformation={[{ height: 200, width: 200 }, { q: 20, bl: 10 }]}
        className={"lazyload-lqip"}
        lqip={{ active: true }}
        loading="lazy"
        />

      <h1>Change Transformation by clicking on below button</h1>
        <IKImage
        urlEndpoint={urlEndpoint}
          path="default-image.jpg"
        transformation={imgTr}
        className={"img-transformation-direct"}
        />

      <button className='btn-to-change-tr-direct' onClick={(e) => {
        e.preventDefault()
        setImgTr([{ height: 200, width: 600, rt: 180 }, { ot: 'TEST', oy: 50, ox: 100, otc: '10C0F0' }])
      }}>Click To Transform IMG</button>

      <br />
      <br />

      <h1>File Upload Demo</h1>
      <IKUpload
        publicKey={publicKey}
        authenticationEndpoint={authenticationEndpoint}
        urlEndpoint={urlEndpoint}
        className={"file-upload-ik"}
        fileName="test.jpg"
        tags={["sample-tag1", "sample-tag2"]}
        customCoordinates={"10,10,10,10"}
        isPrivateFile={false}
        useUniqueFileName={true}
        responseFields={["tags"]}
        folder={"/test"}
        onError={onError}
        onSuccess={onSuccess}
        />

      <br />
      <br />

      {error?.uploadFileErr && <p style={{ color: 'red' }} className='upload-error-ik'>{error.uploadFileErr}</p>}

        <IKImage
          urlEndpoint={urlEndpoint}
        src={uploadedImageSource}
        transformation={[{ height: 200, width: 200 }]}
        className={"uploaded-img-ik"}
        />
    </div>
  );
}

export default App;
