import { Alert, Image, ToastAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import React, { useState } from 'react';

import BookAPIHelper from './BookAPIHelper';
import { styles } from './BookRegister';
import BookScreenEnum from './BookScreenEnum';

const BookLogin = (props) => {
  const { navigation } = props
  const [email, setEmail] = useState("ngocdai99@gmail.com");
  const [password, setPassword] = useState("1234");
 
  const onLogin = () => {
    if (email.length > 0 && password.length > 0) {

      const loginRequest = { email, password }
      BookAPIHelper.login(loginRequest)
        .then((response) => {
          ToastAndroid.show(response.message, ToastAndroid.SHORT)
          navigation.navigate(BookScreenEnum.BookHome)
        })
        .catch((error) => {
          console.log(error)
          ToastAndroid.show("Login failed", ToastAndroid.SHORT)
        })

    } else {
      ToastAndroid.show("These fields should not be empty", ToastAndroid.SHORT)
    }
  }
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('./asset/logo.png')} />
      </View>
      <View style={styles.all}>
        <Text style={styles.text}>Login Screen</Text>
        <View style={styles.shadown}>

          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            style={styles.textInput} />
        </View>

        <View style={styles.shadown}>
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            style={styles.textInput} />
        </View>

       

        <View>
          <Text style={styles.textNotify}>
            By signing up, you agree to our
            <Text style={styles.textNotifyLink}> Terms, </Text>
            <Text style={styles.textNotifyLink}>Data Policy</Text>
            <Text> and </Text>
            <Text style={styles.textNotifyLink}>Cookies Policy</Text>.
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onLogin()
          }}
          style={styles.bottomRegister}>
          <Text style={styles.textBottom}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomCancel}>
          <Text style={styles.textCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookLogin;


