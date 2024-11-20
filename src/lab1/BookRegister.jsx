import { Alert, Image, ToastAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import React, { useState } from 'react';
import BookScreenEnum from './BookScreenEnum';
import BookAPIHelper from './BookAPIHelper';

const BookRegister = (props) => {
  const { navigation } = props
  const [email, setEmail] = useState("ngocdai99@gmail.com");
  const [password, setPassword] = useState("1234");
  const [name, setName] = useState("Dai Ngoc");

  const onRegister = () => {
    if (email.length > 0 && password.length > 0 && name.length > 0) {
     
      const registerRequest = { email, name, password }
      BookAPIHelper.register(registerRequest)
        .then((response) => {
          ToastAndroid.show(response.message, ToastAndroid.SHORT)
          navigation.navigate(BookScreenEnum.BookLogin)
        })
        .catch((error) => {
          console.log(error)
          ToastAndroid.show("Register failed", ToastAndroid.SHORT)
        })

    } else {
      ToastAndroid.show("These fields should not be empty", ToastAndroid.SHORT)
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('./asset/logo.png')} />
      </View>
      <View style={styles.all}>
        <Text style={styles.text}>Register</Text>
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

        <View style={styles.shadown}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
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
            onRegister()
          }}
          style={styles.bottomRegister}>
          <Text style={styles.textBottom}>Register</Text>
        </TouchableOpacity>


        <TouchableOpacity

          onPress={() => {
            navigation.navigate(BookScreenEnum.BookLogin)
          }}
          
          style={styles.bottomCancel}>
          <Text style={styles.textCancel}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookRegister;
export {styles}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 50,
  },
  all: {
    flexDirection: 'column',
    gap: 16,
    marginHorizontal: 20,
  },
  imageLogo: {
    width: 120,
    height: 120,
  },
  textInput: {
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    flexDirection: 'column',
    fontSize: 14,
    color: '#B8B8C8',
    fontWeight: '500',
  },
  shadown: {
    borderRadius: 8,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9292A2',
  },
  textBottom: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  textCancel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4838D1',
  },
  bottomRegister: {
    backgroundColor: '#4838D1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomCancel: {
    borderWidth: 1,
    color: '#4838D1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textNotify: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9292A2',
  },
  textNotifyLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F77A55',
  },
});
