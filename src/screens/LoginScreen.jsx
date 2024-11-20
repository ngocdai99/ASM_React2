import { StyleSheet, Text, View, Image, ActivityIndicator, Dimensions, Pressable, StatusBar, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import colors from '../utils/color'
import MyInputText, { MyInputPassword } from '../components/MyInputText'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenEnum from '../utils/ScreenEnum'
import MyAsyncStorage from '../utils/MyAsyncStorage'
import APIHelper from '../helpers/APIHelper'
import MyToast from '../utils/MyToast'
import KEY_NAMES from '../utils/keyname'






const LoginScreen = (props) => {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const { navigation } = props
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = React.useState({
    email: 'ngocdai99@gmail.com',
    emailMessage: '',
    password: '1234',
    passwordMessage: ''
  })

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
      [`${field}Message`]: ''
    })
  }

  const validate = () => {
    let isValid = true
    if (formData.email.length == 0) {
      setFormData(formData => ({
        ...formData,
        emailMessage: 'This field should not be empty'
      }
      ));
      isValid = false
    }
    if (formData.password.length == 0) {
      setFormData((formData) => ({
        ...formData,
        passwordMessage: 'This field should not be empty'
      }))
      isValid = false
    }

    if (isValid) {
      onLogin()
      MyToast.show("Login success")

      navigation.navigate(ScreenEnum.MainScreen)
   
    }
  }
  const onLogin = async () => {

    try {
      setLoading(true)
      const loginRequest = {
        email: formData.email,
        password: formData.password
      }

      const response = await APIHelper.login(loginRequest)

      await MyAsyncStorage.storeData(KEY_NAMES.USER, response)
      MyToast.show("Login success")
      navigation.navigate(ScreenEnum.MainScreen)


    } catch (error) {
      console.log(error)
      MyToast.show("Login failed")

    } finally {
      setLoading(false)
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

      <Image style={[styles.logo, { position: 'absolute', top: 0, left: 0 }]} source={require("../images/background.png")} />
      <Text style={[styles.textWelcome, {marginTop: 370}]}>Chào mừng bạn</Text>
      <Text style={{ color: colors.black, fontSize: 18, marginVertical: 6 }}>Đăng nhập tài khoản</Text>


      <MyInputText
        placeholder='Email Address'
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

      <View style={[styles.row, { justifyContent: 'space-between', width: '100%' }]}>
        <View style={styles.row}>
          <Image style={styles.checkbox} source={require("../images/checkbox_checked.png")} />
          <Text style={styles.normalText}>Nhớ tài khoản</Text>
        </View>

        <Text style={[styles.normalText, { color: colors.primary }]}>Quên mật khẩu?</Text>
      </View>




      <Pressable
        onPress={validate}
        style={[styles.button]}>
        <Text style={styles.textButton}>Đăng nhập</Text>
      </Pressable>

      <View style={[styles.row, { width: '100%', alignItems: 'center', justifyContent: 'center' }]}>

        <Image style={styles.line} source={require("../images/line.png")} />
        <Text style={[styles.normalText, { marginTop: 16 }]}>Hoặc</Text>
        <Image style={styles.line} source={require("../images/line.png")} />
      </View>



      <View style={styles.row}>
        <Pressable style={{ marginEnd: 16 }} >
          <Image style={styles.ic_google} source={require("../images/ic_google.png")} />
        </Pressable>

        <Pressable >
          <Image style={styles.ic_google} source={require("../images/ic_facebook.png")} />
        </Pressable>
      </View>





      <View style={[styles.row, { marginTop: 20 }]}>
        <Text style={styles.normalText}>Bạn không có tài khoản? </Text>
        <Pressable
          onPress={() => {
            navigation.navigate(ScreenEnum.RegisterScreen)
          }}
        >
          <Text style={[styles.normalText, { color: colors.primary }]}>Đăng ký</Text>
        </Pressable>

      </View>

    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14
  },

  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    zIndex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colors.backgroundOverlay
  },
  line: {
    height: 1,
    width: 120,
    marginHorizontal: 4
  },
  logo: {
    width: Dimensions.get('window').width,
    height: 370
  },
  checkbox: {
    width: 22,
    height: 22
  },
  textWelcome: {
    color: colors.black,
    fontWeight: '900',
    fontFamily: 'Poppins',
    fontSize: 30,
    letterSpacing: 2

  },
  grayText: {
    color: colors.gray,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 16
  },

  normalText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 16,
    marginHorizontal: 2
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: 'Poppins',
    borderColor: colors.gray,
    width: '100%',
    color: colors.black,
    fontSize: 14,
    paddingHorizontal: 16,
    fontWeight: '300',
  },
  button: {
    borderRadius: 20,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    width: '100%',
    height: 57,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 8,
    flexDirection: 'row',


  },
  textButton: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  ic_google: {
    width: 24,
    height: 24,
  },
  row: {
    flexDirection: 'row'
  },

  containerPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  inputPassword: {
    fontWeight: '300',
    borderRadius: 8,
    fontFamily: 'Poppins',
    borderWidth: 1,
    borderColor: '#b5b1b1',
    paddingHorizontal: 16,
    paddingRight: 40,
    width: '100%',
    color: colors.gray
  },
  btnTogglePassword: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -8 }],
    width: 24,
    tintColor: colors.gray,
    height: 24,
  },
  visible: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    width: 24,
    tintColor: colors.gray,
    height: 24,
  },

  invalidText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'left',
    width: '100%',
    marginTop: 2,
    paddingHorizontal: 8
  },
})

export { styles }