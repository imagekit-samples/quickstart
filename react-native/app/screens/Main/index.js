import React from 'react';
import {View, Text} from 'react-native';
import Button from '../../components/Button/';
import getStyleSheet from './styles';

function Main({navigation}) {
  let styleSheet = getStyleSheet({});

  return (
    <>
      <View style={styleSheet.headContainer}>
        <Text style={styleSheet.text}>Imagekit Demo</Text>
      </View>
      <View style={styleSheet.btnContainer}>
        <View style={styleSheet.btnView}>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => navigation.navigate('Upload File')}>
            Upload File
          </Button>
        </View>
        <View style={styleSheet.btnView}>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => navigation.navigate('Fetch Images')}>
            Fetch Images
          </Button>
        </View>
        <View style={styleSheet.btnView}>
          <Button
            cssProps={styleSheet.buttonCssProps}
            onPress={() => navigation.navigate('Fetch Videos')}>
            Fetch Videos
          </Button>
        </View>
      </View>
    </>
  );
}

export default Main;
