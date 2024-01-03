import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

import Button from '../../components/Button/';
import getStyleSheet from './styles';

import {
  getImagekitUrlFromSrc,
  getImagekitUrlFromPath,
} from '../../lib/imagekit';
import {urlEndpoint} from '../../config/imagekit';

function Fetch() {
  let styleSheet = getStyleSheet({});

  const imagePath = '/default.jpg';
  let imageSrc = urlEndpoint + imagePath;

  const [imageUrl, setImageUrl] = useState();
  const [currentTr, setCurrentTr] = useState();
  const [imageDimesions, setImageDimensions] = useState();

  useEffect(() => {
    currentTr == 'Transformation 1'
      ? setImageDimensions({height: 150, width: 150})
      : setImageDimensions({height: 300, width: 300});
    showTransformedImage(currentTr);
  }, [currentTr]);

  function showTransformedImage(transformationType) {
    let transformationArray = [];
    let transformedImageUrl;

    switch (transformationType) {
      case 'Transformation 1': //basic image resizing
        transformationArray = [
          {
            height: 150,
            width: 150,
          },
        ];
        transformedImageUrl = getImagekitUrlFromSrc(
          imageSrc,
          transformationArray,
        );
        break;

      case 'Transformation 2': //crop mode and url from source
        imageSrc = 'https://ik.imagekit.io/demo/img/plant.jpeg';
        transformationArray = [
          {
            height: 300,
            width: 300,
            cropMode: 'pad_resize',
            background: '435EDA',
          },
        ];
        transformedImageUrl = getImagekitUrlFromSrc(
          imageSrc,
          transformationArray,
        );
        break;

      case 'Transformation 3': //aspect ration and url from path and transformations as query param
        transformationArray = [
          {
            height: 400,
            aspectRatio: '3-2',
          },
        ];
        transformedImageUrl = getImagekitUrlFromPath(
          imagePath,
          transformationArray,
          'query',
        );
        break;

      case 'Transformation 4': //overlay image with x,y and its height
        transformationArray = [
          {
            raw: 'l-image,i-plant.jpeg,h-100,b-10_CDDC39,l-end',
          },
        ];
        transformedImageUrl = getImagekitUrlFromPath(
          imagePath,
          transformationArray,
        );
        break;

      case 'Transformation 5': //overlay text example
        transformationArray = [
          {
            raw: 'l-text,i-Imagekit,co-0651D5,fs-50,l-end',
          },
        ];
        transformedImageUrl = getImagekitUrlFromSrc(
          imageSrc,
          transformationArray,
        );
        break;

      case 'Transformation 6': //chained transformation
        transformationArray = [
          {
            height: 300,
            width: 300,
          },
          {
            rotation: '90',
          },
        ];
        transformedImageUrl = getImagekitUrlFromSrc(
          imageSrc,
          transformationArray,
        );
        break;

      default:
        transformedImageUrl = getImagekitUrlFromSrc(imageSrc, []);
        break;
    }

    setImageUrl(transformedImageUrl);
  }

  return (
    <>
      <View style={styleSheet.btnContainer}>
        <View style={styleSheet.btnView}>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => setCurrentTr('Transformation 1')}>
            Transformation 1
          </Button>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => setCurrentTr('Transformation 2')}>
            Transformation 2
          </Button>
        </View>
        <View style={styleSheet.btnView}>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => setCurrentTr('Transformation 3')}>
            Transformation 3
          </Button>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => setCurrentTr('Transformation 4')}>
            Transformation 4
          </Button>
        </View>
        <View style={styleSheet.btnView}>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => setCurrentTr('Transformation 5')}>
            Transformation 5
          </Button>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => setCurrentTr('Transformation 6')}>
            Transformation 6
          </Button>
        </View>
      </View>

      <View style={styleSheet.imgContainer}>
        {imageUrl && (
          <>
            <Image
              source={{uri: imageUrl}}
              style={{
                width: imageDimesions.width,
                height: imageDimesions.height,
              }}
            />
            <View style={styleSheet.captionView}>
              {currentTr ? (
                <Text style={styleSheet.text}>{currentTr}</Text>
              ) : (
                <Text style={styleSheet.text}>
                  Image with no Transformation
                </Text>
              )}
            </View>
            <View style={styleSheet.captionView}>
              <Text style={styleSheet.text}>Rendered URL - {imageUrl}</Text>
            </View>
          </>
        )}
      </View>
    </>
  );
}

export default Fetch;
