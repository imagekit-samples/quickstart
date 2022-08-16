import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { IKContext, IKImage, IKUpload, IKCore, IKVideo } from 'imagekitio-react';

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
const authenticationEndpoint = 'http://localhost:3001/auth';

const App = () => {
  let reftest = useRef(null)
  const [imgIkcore, setImgIkCore] = useState('');
  const [videoThumbSrc, setVideoThumbSrc] = useState('');
  const [imgTr, setImgTr] = useState([{ height: 300, width: 300 }])
  const [uploadedImageSource, setUploadedImageSource] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    createCustomeImg()
  }, [])

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
      <h1>Low-quality placeholders without lazy-loading</h1>
      <IKContext publicKey={publicKey} authenticationEndpoint={authenticationEndpoint} urlEndpoint={urlEndpoint}>
        <IKImage
          path="default-image.jpg"
        className={"lqip"}
          transformation={[{
            height: 200,
            width: 200,
        }]} />

      <h1>Combining lazy loading with low-quality placeholders</h1>
        <IKImage
          path="default-image.jpg"
        transformation={[{ height: 200, width: 200 }, { q: 20, bl: 10 }]}
        className={"lazyload-lqip"}
        lqip={{ active: true }}
        loading="lazy"
        />

      <h1>Change Transformation by clicking on below button</h1>
        <IKImage
          path="default-image.jpg"
        transformation={imgTr}
        className={"img-transformation-direct"}
        />

        <h3>Click to transform above image</h3>
      <button className='btn-to-change-tr-direct' onClick={(e) => {
        e.preventDefault()
        setImgTr([{ height: 200, width: 600, rt: 180 }, { ot: 'TEST', oy: 50, ox: 100, otc: '10C0F0' }])
        }}>Transform</button>

      <br />
      <br />

      <h1>File Upload Demo</h1>
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
        onError={onError}
        onSuccess={onSuccess}
        />

      <br />
      <br />

      {error?.uploadFileErr && <p style={{ color: 'red' }} className='upload-error-ik'>{error.uploadFileErr}</p>}

        <IKImage
        src={uploadedImageSource}
        transformation={[{ height: 200, width: 200 }]}
        className={"uploaded-img-ik"}
        />

        <h3>Video Thumbnail</h3>
        {videoThumbSrc && <img src={videoThumbSrc} className="video-thumbnail-img" />}

        {/* { l:['image', 'i-default-image.jpg', 'l-text', 'i-helloworld', 'l-end', 'l-end'] } */}
        <h1>Video Element</h1>
        <IKVideo
          className='ikvideo-with-thumbnail'
          path={'test/test111.mp4'}
          transformation={[{ height: 200, width: 200, q: 50 }]}
          controls={true}
          thumbnailTransformation={[{ height: 200, width: 200 }]}
          onThumbnailLoad={(url) => setVideoThumbSrc(url)}
        />

        <h1>GIF To MP4 Demo</h1>
        <IKVideo
          className='ikvideo-gif-to-mp4'
          path={'test/sample.gif'}
          controls={true}
          enabledGif={true}
        />
      </IKContext>

      <h1>Custom Upload Button</h1>
      {reftest && <button onClick={() => reftest.current.click()}>Upload</button>}

      <h1>Render Image Using IKCore Sdk</h1>
      {imgIkcore && <img src={imgIkcore} className="image-ikcore" />}
    </div>
  );
}

export default App;
