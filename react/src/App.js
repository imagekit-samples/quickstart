import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { IKContext, IKImage, IKUpload, IKCore, IKVideo } from 'imagekitio-react';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const authenticationEndpoint = 'http://localhost:3001/auth';

const App = () => {
  let reftest = useRef(null)
  const [imgIkcore, setImgIkCore] = useState('');
  const [imgContextIkcore, setImgContextIkCore] = useState('');
  const [imgTr, setImgTr] = useState([{ height: 300, width: 300 }])
  const [uploadedImageSource, setUploadedImageSource] = useState();
  const [error, setError] = useState();
  const path = "default-image.jpg";
  const customXHR = new XMLHttpRequest();
  customXHR.upload.addEventListener('progress', function (e) {
      console.log("File uploading in progress")
  });

  useEffect(() => {
    createCustomeImg()
  }, [])

  const onStart = (file, xhr) => {
    console.log("file", file)
    console.log("xhr", xhr)
  }

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

  const createCustomeImg = () => {
    const imagekit = new IKCore({
      urlEndpoint: urlEndpoint
    });
    if (imagekit) {
      let imageURL = imagekit.url({
        path: "/default-image.jpg",
        urlEndpoint: urlEndpoint,
        transformation: [{
          "height": "300",
          "width": "400"
        }]
      });
      setImgIkCore(imageURL)
    }
  }

  return (
    <div className="App">
      <IKContext publicKey={publicKey} authenticationEndpoint={authenticationEndpoint} urlEndpoint={urlEndpoint}>

        <p>Chained transformation</p>
        <IKImage path={path} transformation={[{
          "height": "200",
          "width": "200",
        },
        {
          "rotation": "90"
        }]} />

        <h1>ImageKit React quick start</h1>
        <h3>File upload</h3>
      <IKUpload
        className={"file-upload-ik"}
          fileName="test.mp4"
        tags={["sample-tag1", "sample-tag2"]}
        customCoordinates={"10,10,10,10"}
        isPrivateFile={false}
        useUniqueFileName={true}
        responseFields={["tags"]}
        folder={"/test"}
          inputRef={reftest}
          xhr={customXHR}
          onStart={onStart}
        onError={onError}
        onSuccess={onSuccess}
        />

      <br />
      <br />

        <h3>Upload invalid file</h3>
        <IKUpload
          className={"file-upload-error"}
          folder={"/test"}
          onError={onError}
          onSuccess={onSuccess}
        />

        {error?.uploadFileErr && <p style={{ color: 'red' }} className='upload-error-ik'>{'Your request contains invalid file type.'}</p>}

        <IKImage
        src={uploadedImageSource}
        transformation={[{ height: 200, width: 200 }]}
        className={"uploaded-img-ik"}
        />

        <h1>Video Element</h1>
        <IKVideo
          className='ikvideo-default'
          path={'test/default-video.mp4'}
          transformation={[{ height: 200, width: 200 }]}
          controls={true}
        />

        <h1>Change Video Transformation by clicking on below button</h1>
        <IKVideo
          className='ikvideo-chng-tr'
          path={'test/default-video.mp4'}
          transformation={[{ height: 200, width: 600, b: '5_red', q: 95 }]}
          controls={true}
        />
      </IKContext>

      <h1>Custom Upload Button</h1>
      {reftest && <button onClick={() => reftest.current.click()}>Upload</button>}

      <h1>Render Image Using IKCore Sdk</h1>
      {imgIkcore && <img src={imgIkcore} className="image-ikcore" />}

      <h1>Change Transformation by clicking on below button, Outside Context</h1>
        <IKImage
          urlEndpoint={urlEndpoint}
          path="default-image.jpg"
          transformation={imgTr}
          className={"img-transformation-direct"}
        />

        <h3>Click to transform above image</h3>
        <button className='btn-to-change-tr-direct' onClick={(e) => {
          e.preventDefault()
          setImgTr([{ height: 200, width: 600, r: 'max' }, { height: 200, width: 200, rt: 180 }, { ot: 'TEST', oy: 50, ox: 100, otc: '10C0F0' }])
        }}>Transform</button>

        <br />
        <br />

      <IKContext publicKey={publicKey} authenticationEndpoint={authenticationEndpoint} urlEndpoint={urlEndpoint}>
        <h1>Change Transformation by clicking on below button, Inside Context</h1>
        <IKImage
          path="default-image.jpg"
          transformation={imgContextIkcore ? imgContextIkcore : [{ height: 200, width: 200 }]}
          className={"img-transformation"}
        />

        <h3>Click to transform above image</h3>
        <button className='btn-to-change-tr' onClick={(e) => {
          e.preventDefault()
          setImgContextIkCore([{ height: 200, width: 200, r: 'max' }])
        }}>Transform</button>

        <br />
        <br />

        <p>Lazy loading image</p>
          <IKImage
            className={'lazyload'}
            path={path}
            transformation={[{
              "height": "200",
              "width": "200"
            }]}
            loading="lazy"
          />

        <p>Progressive image loading wihtout lazy loading</p>
        <IKImage
          className={'lqip'}
          path={path}
          transformation={[{
            "height": "200",
            "width": "200"
          }]}
          onError={(e) => {
          }}
          lqip={{ active: true, quality: 20, blur: 10 }}
        />

        <p>Progressive image loading with lazy loading</p>
        <IKImage
          className={'lazyload-lqip'}
          path={path}
          transformation={[{
            "height": "200",
            "width": "200"
          }]}
          loading="lazy"
          lqip={{ active: true, quality: 20, blur: 30 }}
        />
      </IKContext>
    </div>
  );
}

export default App;
