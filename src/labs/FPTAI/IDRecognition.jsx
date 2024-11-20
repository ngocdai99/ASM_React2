import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const IDRecognition = () => {
    const [images, setImages] = useState();

    const onOpenCamera = async () => {
        const response = await launchCamera();
        if (response?.assets) {
          setImages(response.assets);
        } else {
          Alert.alert('Có lỗi xảy ra', response.errorMessage);
        }
      };
    
 
    // Hàm mở thư viện ảnh
    const onOpenLibrary = async () => {
        const response = await launchImageLibrary();
        if (response?.assets) {
            setImages(response.assets);
            goiAPI(response.assets);
        } else {
            Alert.alert(
                'Có lỗi xảy ra',
                response.errorMessage || 'Không thể mở thư viện ảnh',
            );
        }
    };

    const goiAPI = (assets) => {
        var form = new FormData();
        form.append('image', {
            uri: assets[0].uri,
            type: assets[0].type,
            name: assets[0].fileName
        });
        axios.post('https://api.fpt.ai/vision/idr/vnm', form, {
            headers: {
                'api-key' : 'S78jF6MPgfks12cbDT5VLA96UyLsi5kw',
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then(function (res){
            console.log(res.data);
        }).catch(function(error){
            console.log("Loi" + error)
        })
    }
    return (

        <View>
            <Text>Hello</Text>
            <Button title="Open camera" onPress={onOpenCamera} />
            <Button title="Chọn Từ Thư Viện" onPress={onOpenLibrary} />

            <Image
                source={{
                    uri:
                        images?.[0]?.uri ||
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
                }}
                style={styles.avatar}
            />
        </View>
    )
}

export default IDRecognition

const styles = StyleSheet.create({

    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 20,
    },
})