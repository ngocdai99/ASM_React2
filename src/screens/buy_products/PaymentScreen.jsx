import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const PaymentScreen = (props) => {

    const {navigation,route} = props

    // const { price } = route.params || {}; 

    const shippingFee = 15000;
    // const total = price + shippingFee; 
    const total = 100
    const price = 200
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-between', padding: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../images/ic_back.png')} style={styles.back} />
                </TouchableOpacity>
                <View style={{ width: "60%" }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', top: 10 }}>Thanh Toán</Text>

                </View>

            </View>

            <View style={{ padding: 16 }}>

                <Text style={styles.textchude}>
                    Thông tin khách hàng
                </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />

                <Text style={styles.textchitiet}>
                    Trần Minh Trí                </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />
                <Text style={styles.textchitiet}>
                    tranminhtri@gmail.com               </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />
                <Text style={styles.textchitiet}>
                    Địa Chỉ         </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />
                <Text style={styles.textchitiet}>
                    Số Điện Thoai             </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />
                <Text style={styles.textchitiet}>
                    tranminhtri@gmail.com               </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />

                <Text style={styles.textchude}>
                    Phương thức vận chuyển
                </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />

                <Text style={styles.textgiaohang}>
                    Giao hàng Nhanh - 15.000đ             </Text>
                <Text style={styles.textchitietphuongthuc}>
                    Dự kiến giao hàng 5-7/9              </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />

                <Text style={styles.textgiaohang}>
                    Giao hàng COD - 20.000đ           </Text>
                <Text style={styles.textchitietphuongthuc}>
                    Dự kiến giao hàng 4-8/9              </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />


                <Text style={styles.textchude}>
                    Hình thức thanh toán
                </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />
                <Text style={styles.textgiaohang}>
                    Thẻ VISA/MASTERCARD          </Text>
                <Image source={require('../../images/linethanhtoan.png')} style={styles.line} />

                <Text style={styles.textchitietphuongthuc}>
                    Thẻ ATM           </Text>




            </View>

            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
                <Text>
                    Tạm Tính:
                </Text>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    {price}đ
                </Text>
            </View>

            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
                <Text>
                    Phí Vận Chuyển
                </Text>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                    {shippingFee}đ
                </Text>
            </View>
            <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
                <Text>
                    Tổng Cộng
                </Text>
                <Text style={{ fontWeight: 'bold', color: '#007537', fontSize: 16 }}>
                    {total}đ
                </Text>
            </View>

            <TouchableOpacity style={styles.thanhtoan} >
                <Text style={{ color: 'white', fontSize: 18, marginLeft: 15 }}>Tiếp Tục</Text>
            </TouchableOpacity>



        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    thanhtoan: {
        height: 50,
        backgroundColor: "#007537",
        borderRadius: 8,
        padding: 10,
        alignItems: 'center'


    },
    textgiaohang: {
        fontSize: 16,
        marginTop: 20,
        color: "#007537"
    },
    textchitietphuongthuc: {
        fontSize: 16,
    },
    textchitiet: {
        fontSize: 16,

        marginTop: 20
    },

    line: {
        width: 320
    },
    textchude: {
        fontSize: 16,
        fontWeight: "500",
        color: 'black',
        marginTop: 20
    },
    back: {
        width: 24,
        height: 24,
        top: 10
    },


    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 15


    }

})