import { StyleSheet, Text, View, Image, ActivityIndicator, Dimensions, Pressable, StatusBar, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../../utils/color'
import MyInputText, { MyInputPassword } from '../../components/MyInputText'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenEnum from '../../enums/ScreenEnum'
import MyToast from '../../utils/MyToast'
import { styles } from './LoginScreen'
import { useDispatch, useSelector } from 'react-redux'
import { registerThunk } from '../../redux/slices/user/RegisterSlice'




const RegisterScreen = (props) => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { navigation } = props
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = React.useState({
    name: 'Ngọc Đại',
    nameMessage: '',
    email: 'ngocdai99@gmail.com',
    emailMessage: '',
    password: '1234',
    passwordMessage: '',
  })
  // redux
  const dispatch = useDispatch()

  const { registerResponse, registerStatus } = useSelector((state) => { return state.registerReducer })

  const registerFunction = () => {
    const registerRequest = {
      email: formData.email,
      password: formData.password,
      name: formData.name
    }

    console.log('registerRequest: ', registerRequest)
    dispatch(registerThunk(registerRequest))
  }

  useEffect(() => {
    if (registerStatus === 'succeeded') {
      setLoading(false);
      MyToast.show(registerResponse.message);
    } else if (registerStatus === 'failed') {
      setLoading(false);
      MyToast.show(registerResponse.message);
    }
  }, [registerStatus]);



  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
      [`${fieldName}Message`]: ''
    }
    )
  }

  const validate = () => {
    let isValid = true
    const messages = {
      name: '',
      email: '',
      password: '',
    }
    for (const key in messages) {
      if (formData[key].length == 0) {
        messages[key] = 'This field should not be empty';
        isValid = false
      }
    }

    setFormData({
      ...formData,
      nameMessage: messages.name,
      emailMessage: messages.email,
      passwordMessage: messages.password
    })

    if (isValid) {
      setLoading(true)

      registerFunction()

    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colors.primary}
      />

      {loading && ( // Hiển thị spinner khi loading
        <ActivityIndicator style={styles.loading} size="large" color={colors.green} />
      )}

      <Image style={[styles.logo, { height: 250 }]} source={require("../../images/background2.png")} />
      <Text style={[styles.textWelcome]}>Đăng ký</Text>
      <Text style={{ color: colors.black, fontSize: 18, marginVertical: 6 }}>Tạo tài khoản</Text>


      <MyInputText
        placeholder='Họ tên'
        placeholderTextColor={colors.gray}
        keyboardType="email-address"
        value={formData.name}
        setValue={(value) => handleInputChange('name', value)}
        message={formData.emailMessage}
      />

      <MyInputText
        placeholder='Email'
        placeholderTextColor={colors.gray}
        keyboardType="email-address"
        value={formData.email}
        setValue={(value) => handleInputChange('email', value)}
        message={formData.emailMessage}
      />





      <MyInputPassword
        placeholder='Password'
        value={formData.password}
        setValue={(value) => handleInputChange('password', value)}
        visiblePassword={visiblePassword}
        setVisiblePassword={setVisiblePassword}
        message={formData.passwordMessage}
      />



      <Text style={{ color: colors.black }}>
        Để đăng ký tài khoản, bạn đồng ý
      </Text>
      <Text style={{ color: colors.primary }}>Terms & Conditions and Privacy Policy</Text>








      <Pressable
        onPress={validate}
        style={[styles.button]}>
        <Text style={styles.textButton}>Đăng ký</Text>
      </Pressable>

      <View style={[styles.row, { width: '100%', alignItems: 'center', justifyContent: 'center' }]}>

        <Image style={styles.line} source={require("../../images/line.png")} />
        <Text style={[styles.normalText, { marginTop: 16 }]}>Hoặc</Text>
        <Image style={styles.line} source={require("../../images/line.png")} />
      </View>



      <View style={styles.row}>
        <Pressable style={{ marginEnd: 16 }} >
          <Image style={styles.ic_google} source={require("../../images/ic_google.png")} />
        </Pressable>

        <Pressable >
          <Image style={styles.ic_google} source={require("../../images/ic_facebook.png")} />
        </Pressable>
      </View>





      <View style={[styles.row, { marginTop: 20 }]}>
        <Text style={styles.normalText}>Tôi đã có tài khoản </Text>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenEnum.LoginScreen)
          }}
        >
          <Text style={[styles.normalText, { color: colors.primary }]}>Đăng nhập</Text>
        </Pressable>

      </View>

    </SafeAreaView>
  )
}

export default RegisterScreen

