import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfileScreen = props => {
  const {navigation} = props;
  const [name, setName] = useState('Trần Minh Trí');
  const [email, setEmail] = useState('tranminhtri@gmail.com');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/463412865_2318800171817580_8914214586160531776_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEPkAyx1GBAASlwB2FaQ-eMdKkPeKfUA4d0qQ94p9QDh8uTiEYjLrEH52lzpsMDtYZ6u7bvvq1id9Kc0GUrI1yO&_nc_ohc=dqSH7RDlT_cQ7kNvgGVoR--&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=AXVEoIewbKzpa21SPAyx5Ry&oh=00_AYA2Ou-NJexoWBwFLNcxTG_Q0hVyi-LO3GisH31XcLku2A&oe=674D7AB7');

  const handleSave = () => {
    console.log({
      name,
      email,
      address,
      phone,
    });
    Alert.alert('Thông tin đã được lưu thành công!');
  };

  const handleImagePicker = () => {
    Alert.alert('Chọn hình ảnh', 'Bạn muốn chọn hình ảnh từ đâu?', [
      {
        text: 'Chụp ảnh',
        onPress: () => openCamera(),
      },
      {
        text: 'Chọn từ thư viện',
        onPress: () => openGallery(),
      },
      {
        text: 'Hủy',
        style: 'cancel',
      },
    ]);
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          const source = {uri: response.assets[0].uri};
          setAvatar(source.uri);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else {
          const source = {uri: response.assets[0].uri};
          setAvatar(source.uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../../images/ic_back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CHỈNH SỬA THÔNG TIN</Text>
      </View>

      {/* Ảnh ở giữa */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={{uri: avatar}} style={styles.avatar} />
        </TouchableOpacity>
        <View>
          <Text style={styles.username}>
            Thông tin sẽ được lưu cho lần mua kế tiếp.
          </Text>
          <Text style={styles.username}>
            Bấm vào hình để chọn hoặc chụp ảnh mới.
          </Text>
        </View>
      </View>

      {/* Form chỉnh sửa thông tin */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Nút Lưu */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>LƯU THÔNG TIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  icon: {
    height: 24,
    width: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#221F1F',
    flex: 1,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#7D7B7B',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
