import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenEnum from '../../enums/ScreenEnum';

const array = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqK7awHfreuNem8DGGseQd0eQ25VMbu96LqQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SqCfVLKEyD1hZ6XZwxAnFtCHMH9CQ2DatQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkQoLOhGJZLvlLb2M_-2Np1Cny4mFUIHLFxPfhMmvwWSlTD--eDhJMdvFd7bz5MGS5KKE&usqp=CAU'
]
const CartScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Áo Thun Nam',
      price: 250000,
      quantity: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqK7awHfreuNem8DGGseQd0eQ25VMbu96LqQ&s'
      ,
    },
    {
      id: 2,
      name: 'Quần Jeans',
      price: 400000,
      quantity: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SqCfVLKEyD1hZ6XZwxAnFtCHMH9CQ2DatQ&s',

    },
    {
      id: 3,
      name: 'Giày Thể Thao',
      price: 1200000,
      quantity: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkQoLOhGJZLvlLb2M_-2Np1Cny4mFUIHLFxPfhMmvwWSlTD--eDhJMdvFd7bz5MGS5KKE&usqp=CAU'

    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = id => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const increaseQuantity = id => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = id => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const deleteItem = id => {
    setProducts(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(item => item !== id));
  };

  const deleteSelectedItems = () => {
    setProducts(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const calculateTotal = () => {
    return products
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => toggleSelectItem(item.id)}>
        <View
          style={[
            styles.checkBoxInner,
            selectedItems.includes(item.id) && styles.checkedBox,
          ]}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {item.price.toLocaleString('vi-VN')}đ
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Image
              source={require('../../images//ic_minus.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={item.quantity.toString()}
            editable={false}
          />
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Image
              source={require('../../images//ic_plus.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteText}>Xoá</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../../images//ic_back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
        <TouchableOpacity onPress={deleteSelectedItems}>
          <Image
            style={styles.icon}
            source={require('../../images//ic_bin.png')}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.subTotal}>
            Tạm tính:
          </Text>
          <Text style={styles.subTotal1}>
            {calculateTotal().toLocaleString('vi-VN')}đ
          </Text>
        </View>


        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate(ScreenEnum.PaymentScreen)}>
          <Text style={styles.checkoutText}>Tiến hành thanh toán</Text>
          <Icon name="keyboard-arrow-right" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxInner: {
    width: 12,
    height: 12,
    backgroundColor: 'transparent',
  },
  checkedBox: {
    backgroundColor: 'green',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  productInfo: {
    flex: 1,
    marginLeft: 8,
  },
  productName: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  productPrice: {
    color: 'green',
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    textAlign: 'center',
    marginHorizontal: 10,
    color: '#000',
  },
  deleteText: {
    color: 'red',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
  },
  subTotal: {
    fontSize: 14,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  subTotal1: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007537',
    padding: 12,
    borderRadius: 4,
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
    flex: 1, // Đảm bảo chữ nằm giữa
  },
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
  },
});

export default CartScreen;
