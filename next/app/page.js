"use client";
import React, { useRef } from "react";
import { IKImage, IKContext, IKUpload, IKVideo } from "imagekit-next";

const publicKey = "<YOUR_IMAGEKIT_PUBLIC_KEY>";
const urlEndpoint = "<YOUR_IMAGEKIT_URL_ENDPOINT>";
const videoUrlEndpoint = "https://ik.imagekit.io/demo/";
const videoPath = "sample-video.mp4";

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3001/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err) => {
  console.log("Error", err);
};

const onSuccess = (res) => {
  console.log("Success", res);
};

const onUploadProgress = (progress) => {
  console.log("Progress", progress);
};

const onUploadStart = (evt) => {
  console.log("Start", evt);
};

export default function Home() {
  const ikUploadRefTest = useRef(null);

  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>
      <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
        <div>
          <h2>File upload</h2>
          <IKUpload fileName="test-upload.png" onError={onError} onSuccess={onSuccess} />
          <p>Upload an image with advanced options</p>
          <IKUpload
            fileName="test-upload.jpg"
            tags={["sample-tag1", "sample-tag2"]}
            customCoordinates={"10,10,10,10"}
            isPrivateFile={false}
            useUniqueFileName={true}
            responseFields={["tags"]}
            validateFile={(file) => file.size < 2000000}
            folder={"/sample-folder"}
            extensions={[
              {
                name: "remove-bg",
                options: {
                  add_shadow: true,
                },
              },
            ]}
            webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
            overwriteFile={true}
            overwriteAITags={true}
            overwriteTags={true}
            overwriteCustomMetadata={true}
            customMetadata={{
              brand: "Nike",
              color: "red",
            }}
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
            onUploadStart={onUploadStart}
            transformation={{
              pre: "l-text,i-Imagekit,fs-50,l-end",
              post: [
                {
                  type: "transformation",
                  value: "w-100",
                },
              ],
            }}
            style={{ display: "none" }} // hide the default input and use the custom upload button
            ref={ikUploadRefTest}
          />
          <p>Custom Upload Button</p>
          {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
          <p>Abort upload request</p>
          {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>}
        </div>
      </IKContext>
      <IKContext urlEndpoint={urlEndpoint}>
        <IKImage path="default-image.jpg" width={400} height={400} alt="Alt text" />
        <h2>Loading image from an absolute path</h2>
        <IKImage src="https://ik.imagekit.io/demo/default-image.jpg" width="400" height="400" alt="Alt text" />
        <h2>Height and width manipulation</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[
            {
              height: 200,
              width: 200,
            },
          ]}
          width="200"
          height="200"
          alt="Alt text"
        />
        <h2>Quality manipulation</h2>
        <IKImage path="default-image.jpg" transformation={[{ quality: 10 }]} width="400" height="400" alt="Alt text" />
        <h2>Crop mode</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[
            {
              height: 300,
              width: 200,
              cropMode: "extract",
            },
          ]}
          width="200"
          height="300"
          alt="Alt text"
        />
        <h2>Chained transformation</h2>
        <h3>Step 1: Resized and cropped</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[
            {
              height: 300,
              width: 200,
            },
          ]}
          width="200"
          height="300"
          alt="Alt text"
        />

        <h3>Step 2: Resized and cropped, then rotated</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[
            {
              height: 300,
              width: 200,
            },
            {
              rt: 90,
            },
          ]}
          width="200"
          height="300"
          alt="Alt text"
        />

        <h3>Step 3: Rotated, then resized and cropped</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[
            {
              rt: 90,
            },
            {
              height: 300,
              width: 200,
            },
          ]}
          width="200"
          height="300"
          alt="Alt text"
        />

        <h2>Adding text overlay to image</h2>
        <IKImage
          path="default-image.jpg"
          transformation={[
            {
              height: 300,
              width: 300,
              raw: "l-text,i-Imagekit,rt-90,co-0651D5,fs-50,l-end",
            },
          ]}
          width="300"
          height="300"
          alt="Alt text"
        />

        <h2>Lazy loading images</h2>
        <IKImage path="default-image.jpg" transformation={[{ height: 300, width: 400 }]} loading="lazy" height="300" width="400" alt="Alt text" />

        <h2>Blurred image placeholder</h2>
        <IKImage path="default-image.jpg" lqip={{ active: true, quality: 20 }} width="400" height="400" alt="Alt text" />

        <h3>Combining lazy loading with low-quality placeholders</h3>
        <IKImage
          path="default-image.jpg"
          transformation={[{ height: 300, width: 400 }]}
          lqip={{ active: true }}
          loading="lazy"
          height="300"
          width="400"
          alt="Alt text"
        />
      </IKContext>
      <IKContext publicKey={publicKey} authenticator={authenticator} urlEndpoint={videoUrlEndpoint}>
        <h2>Video Element</h2>
        <IKVideo className="ikvideo-default" path={videoPath} transformation={[{ height: 200, width: 200 }]} controls={true} />

        <br />
        <h2>Video with some advance transformation</h2>
        <IKVideo className="ikvideo-with-tr" path={videoPath} transformation={[{ height: 200, width: 600, b: "5_red", q: 95 }]} controls={true} />
      </IKContext>
    </div>
  );
}
