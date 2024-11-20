import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import colors from '../../utils/color'
import MyInputText from '../../components/MyInputText'

const TextToSpeech = () => {
    const [message, setMessage] = useState("Hom nay toi buon")




    const callApi = () => {
        axios.post('https://api.fpt.ai/hmi/tts/v5', message, {
            headers: {
                'api-key': 'S78jF6MPgfks12cbDT5VLA96UyLsi5kw',
                'voice': 'banmai',
                'speed': 1
            }
        })
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <View>
            <Text>TextToSpeech</Text>


            <MyInputText
                placeholder='Enter message'
                placeholderTextColor={colors.gray}
                keyboardType="email-address"
                value={message}
                setValue={(value) => setMessage(value)}

            />
            <Button title="goi api" onPress={() => { callApi() }} />

        </View>
    )
}

export default TextToSpeech

const styles = StyleSheet.create({})