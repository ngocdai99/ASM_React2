import React, { useState } from 'react'
import { Button, View, StyleSheet, Alert } from 'react-native'
import RNFilePicker from 'react-native-file-picker' // Thay đổi ở đây


import axios from 'axios'

const SpeechToText = () => {

  const pickAudioFile = async () => {
    RNFilePicker.showFilePicker({ fileType: ['audio/*'] }, (response) => { // Thay đổi ở đây
      if (response.didCancel) {
        Alert.alert('Đã hủy chọn tệp');
      } else if (response.error) {
        Alert.alert('Lỗi', 'Không thể chọn tệp âm thanh');
      } else {
        sendToFPTAI(response); // Thay đổi ở đây
      }
    });
  };

  const sendToFPTAI = async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName, // Thay đổi ở đây
    });

    try {
      const response = await axios.post(
        `https://api.fpt.ai/hmi/asr/general`,
        formData,
        {
          headers: {
            'api-key': 'S78jF6MPgfks12cbDT5VLA96UyLsi5kw',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn Tệp Âm Thanh" onPress={pickAudioFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SpeechToText;
