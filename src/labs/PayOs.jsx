import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import colors from '../utils/color'
import MyInputText from '../components/MyInputText'
import { WebView } from 'react-native-webview';
import { Alert } from 'react-native';
import { hmacSHA256 } from 'react-native-hmac'

const PayOS = () => {
    const [paymentLink, setPaymentLink] = useState("")


    const clientID = '05ec19ea-086f-4fdf-bde4-f2323ee9ed9c';
    const apiKey = '2963ae88-5c05-45e0-8d90-034c817f6fd1';
    const checkSum = '4d546cf7d98f8448211827a83944b2b315b0203302e59a68cc42b80e719da2c0';

    const Payment = async () => {
        var amount = 5000;
        var cancelUrl = 'https://dinhnt.com/cancel';
        var description = 'Đơn hàng của Ngoc Dai nè';
        var orderCode = Date.now();
        var returnUrl = 'https://dinhnt.com/success';
        var signature = await hmacSHA256("amount=" + amount + "&cancelUrl=" + cancelUrl + "&description=" + description + "&orderCode=" + orderCode + "&returnUrl=" + returnUrl, checkSum);

        var body = {
            orderCode: orderCode,
            amount: amount,
            description: description,
            cancelUrl: cancelUrl,
            returnUrl: returnUrl,
            signature: signature,
        };
        axios
            .post('https://api-merchant.payos.vn/v2/payment-requests', body, {
                headers: {
                    'x-client-id': clientID,
                    'x-api-key': apiKey,
                },
            })
            .then(function (response) {
                console.log(response.data);
                if (response.data.code == 0) {
                    setPaymentLink(response.data.data.checkoutUrl);
                } else {
                    console.log("Lỗi rùi!! :(")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };




    const handleNavigationChange = (navState) => {
        const { url } = navState;
        console.log('Current URL:', url);
        if (url.includes('/success')) {
            Alert.alert('Thành công', 'Bạn đã thanh toán thành công');
        } else if (url.includes('/cancel')) {
            Alert.alert('Thất bại', 'Đã hủy thanh toán.');
        }
    };

    return (
        <View>
            <Text>TextToSpeech</Text>


            <MyInputText
                placeholder='Enter Payment Link'
                placeholderTextColor={colors.gray}
                keyboardType="email-address"
                value={paymentLink}
                setValue={(value) => setPaymentLink(value)}

            />
            <Button title="Thanh toan" onPress={() => { Payment() }} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <WebView
                    source={{ uri: paymentLink }}
                    style={{ width: '100%', height: 600 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onNavigationStateChange={handleNavigationChange}
                />



            </ScrollView>


        </View>
    )
}

export default PayOS

const styles = StyleSheet.create({})