import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import Button from '../../components/Button/';
import getStyleSheet from './styles';

import {uploadFile} from '../../lib/imagekit';

function Upload() {
  let styleSheet = getStyleSheet({});

  const [uploadFileUrl, setUploadFileUrl] = useState();

  async function openFileSelector() {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      uploadFileToImagekit(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  async function uploadFileToImagekit(fileData) {
    try {
      const uploadedFile = await uploadFile(fileData);
      setUploadFileUrl(uploadedFile.url);
    } catch (err) {
      //handle error in uploading file
    }
  }

  return (
    <>
      <View style={styleSheet.container}>
        <Button
          cssProps={styleSheet.buttonCssProps}
          onPress={() => openFileSelector()}>
          Upload File
        </Button>
        <View style={styleSheet.captionView}>
          {uploadFileUrl && (
            <Text style={styleSheet.text}>Uploaded File - {uploadFileUrl}</Text>
          )}
        </View>
      </View>
    </>
  );
}

export default Upload;
