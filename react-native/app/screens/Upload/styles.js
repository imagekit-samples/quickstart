import {StyleSheet} from 'react-native';

function getStyleSheet(cssProps) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonCssProps: {
      width: 150,
    },
    captionView: {
      marginTop: 10,
    },
    text: {
      color: 'black',
      fontSize: 15,
      marginLeft: 10,
      marginRight: 10,
    },
  });
}

export default getStyleSheet;
