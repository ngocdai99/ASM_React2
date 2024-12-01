import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderHistoryScreen = props => {
  const {navigation} = props;
  const [searchText, setSearchText] = useState('');
  const products = [
    {
      id: '1',
      name: 'Panse White',
      type: 'Ưa sáng',
      price: '250.000đ',
      stock: 156,
      image: 'https://bizweb.dktcdn.net/100/405/119/products/ban-cay-hoa-panse.jpg?v=1610968803367',
    },

    {
      id: '2',
      name: 'Panse Đen',
      type: 'Ưa sáng',
      price: '250.000đ',
      stock: 156,
      image: 'https://hoadepdetrong.com/asset/editor/ResponsiveFilemanager-master/source/phuong-%20hinh/S%E1%BA%A2N%20PH%E1%BA%A8M/HOA%20PANSE/3.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../../images/ic_back.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>LỊCH SỬ GIAO DỊCH</Text>
      </View>
      <View>
        <Text style={styles.date}>Thứ hai, 11/25/2024</Text>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.productItem}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName1}>Đặt hàng thành công</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.productName}>{item.name} |</Text>
                  <Text style={styles.productType}> {item.type}</Text>
                </View>

                <Text style={styles.productStock}>{item.stock} sản phẩm</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productType: {
    fontSize: 14,
    fontWeight: '400',
  },
  date: {
    color: '#221F1F',
    fontSize: 16,
    fontWeight: '500',
    borderBottomWidth: 1,
    marginBottom: 16,
    borderColor: '#ddd',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  productInfo: {
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  productName1: {
    fontSize: 16,
    color: '#007537',
    fontWeight: '500',
  },
  productPrice: {
    color: 'green',
    fontSize: 14,
  },
  productStock: {
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#221F1F',
    textAlign: 'center',
    flex: 1,
  },
  noResultText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
    fontSize: 16,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 16,
    fontSize: 16,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default OrderHistoryScreen;
