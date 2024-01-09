import {StyleSheet} from 'react-native';

function getStyleSheet() {
  return StyleSheet.create({
    btnContainer: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    imgContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 10,
    },
    btnView: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    buttonCssProps: {
      width: 150,
    },
    captionView: {
      margin: 5,
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
