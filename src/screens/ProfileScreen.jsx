// src/screens/Profile.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/color';

const Profile = () => {
  return (
    <View style={styles.container}>
      {/* Header */}

      <Text style={styles.headerText}>PROFILE</Text>


      {/* Avatar and User Info */}
      <View style={styles.userInfo}>
        <Image
          style={styles.avatar}
          source={require('../images/avatar.png')}
        />
        <View style={styles.column}>
          <Text style={styles.fullName}>Ngọc Đại</Text>
          <Text style={styles.email}>ngocdai99@gmail.com</Text>
        </View>

      </View>

      <View style={styles.menuItem}>
        <Text style={styles.title}>Chung</Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={{marginVertical: 12}} >
        <Text style={styles.menuText}>Chỉnh sửa thông tin</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginVertical: 12}} >
        <Text style={styles.menuText}>Cẩm nang trồng cây</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginVertical: 12}} >
        <Text style={styles.menuText}>Lịch sử giao dịch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginVertical: 12}} >
        <Text style={styles.menuText}>Q&A</Text>
      </TouchableOpacity>



      <View style={styles.menuItem}>
        <Text style={styles.title}>Điều khoản và Bảo mật</Text>
      </View>
     
      <TouchableOpacity style={{marginVertical: 12}} >
        <Text style={styles.menuText}>Điều khoản và điều kiện</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginVertical: 12}} >
        <Text style={styles.menuText}>Chính sách quyền riêng tư</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 16
  },
  column: {
    flexDirection: 'column'
  },
  userInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    marginEnd: 20,
    borderRadius: 20,

  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray
  },
  email: {
    fontSize: 14,
    color: colors.gray,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingVertical: 10,
  },
  menuText: {
    color: colors.gray,
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;