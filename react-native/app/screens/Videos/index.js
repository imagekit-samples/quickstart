import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import getStyleSheet from './styles';
import {getImagekitUrlFromSrc} from '../../lib/imagekit';
import {urlEndpoint} from '../../config/imagekit';
import Video from 'react-native-video';

function Videos() {
  let styleSheet = getStyleSheet({});

  const videoPath = '/sample-video.mp4';
  let videoSrc = urlEndpoint + videoPath;

  function showTransformedVideo(transformationType) {
    let transformationArray = [];
    let transformedVideoUrl;

    switch (transformationType) {
      case 'Transformation 1': //basic video resizing
        transformationArray = [
          {
            height: 200,
            width: 200,
          },
        ];
        transformedVideoUrl = getImagekitUrlFromSrc(
          videoSrc,
          transformationArray,
        );
        break;

      case 'Transformation 2': //crop mode and url from source
        videoSrc = 'https://ik.imagekit.io/demo/img/sample-video.mp4';
        transformationArray = [
          {
            b: '5_red',
            q: 95,
          },
        ];
        transformedVideoUrl = getImagekitUrlFromSrc(
          videoSrc,
          transformationArray,
        );
        break;

      default:
        transformedVideoUrl = getImagekitUrlFromSrc(videoSrc, []);
        break;
    }

    return transformedVideoUrl;
  }

  return (
    <ScrollView>
      <View style={styleSheet.imgContainer}>
        <>
          <View style={styleSheet.captionView}>
            <Text style={styleSheet.text}>{'Transformation 1'}</Text>
          </View>
          <View style={styleSheet.captionView}>
            <Text style={styleSheet.text}>
              Rendered URL - {showTransformedVideo('Transformation 1')}
            </Text>
          </View>
          <Video
            source={{uri: showTransformedVideo('Transformation 1')}}
            style={{
              width: 200,
              height: 200,
            }}
            controls={true}
          />
        </>
      </View>
      <View style={styleSheet.imgContainer}>
        <>
          <View style={styleSheet.captionView}>
            <Text style={styleSheet.text}>{'Transformation 2'}</Text>
          </View>
          <View style={styleSheet.captionView}>
            <Text style={styleSheet.text}>
              Rendered URL - {showTransformedVideo('Transformation 2')}
            </Text>
          </View>
          <Video
            source={{uri: showTransformedVideo('Transformation 2')}}
            style={{
              width: 300,
              height: 300,
            }}
            controls={true}
          />
        </>
      </View>
    </ScrollView>
  );
}

export default Videos;
