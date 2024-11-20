import { Image, StyleSheet, FlatList, Text, Touchable, StatusBar, TouchableOpacity, ActivityIndicator, Dimensions, View, ScrollView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../utils/color';
import { plants } from './HomeScreen';
import ProductItem from '../models/Product';
import ScreenEnum from '../utils/ScreenEnum';
import APIHelper from '../helpers/APIHelper';



const PlantScreen = (props) => {
  const { navigation, route } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([])
  const [productsByCategory, setProductsByCategory] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    APIHelper.getCategories()
      .then((response) => {
        response.unshift({
          "_id": "All",
          "name": "All",
          "image": "https://static.vecteezy.com/system/resources/thumbnails/007/534/130/small/chair-isolated-icon-design-template-free-vector.jpg",
          "__v": 0
        },)
        setCategories(response)
        setSelectedCategoryId(response[1]._id)
        getProductByCategory(response[1]._id)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
    return () => { }
  }, [])

  useEffect(() => {
    if (selectedCategoryId && selectedCategoryId != "All") {
      setLoading(true)
      getProductByCategory(selectedCategoryId);
    }
    return () => {
      setLoading(false)
    } // cleanup
  }, [selectedCategoryId])


  const getProductByCategory = async (categoryId) => {
    setLoading(true)
    return APIHelper.getProductByCategory(categoryId)
      .then((response) => {
        setProductsByCategory(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <View style={styles.container}>

      <StatusBar
        animated={true}
        backgroundColor={colors.primary}
      />

      {loading && ( // Hiển thị spinner khi loading
        <ActivityIndicator style={styles.loading} size="large" color={colors.green} />
      )}
      {/* header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => { navigation.goBack() }}
        >
          <Image style={{ height: 24, width: 24, marginTop: 10 }} source={require('../images/ic_back.png')} />
        </Pressable>
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold', color: colors.black }}>
          CÂY TRỒNG
        </Text>
        <Image style={{ height: 24, width: 24, marginTop: 10 }} source={require('../images/ic_cart.png')} />
      </View>


      <FlatList
        style={{ marginVertical: 16 }}
        data={categories}
        renderItem={({ item }) =>
          <CategoryItem
            item={item}
            onPress={() => {
             
                setSelectedCategoryId(item._id);
              
             // Cập nhật chỉ số khi nhấn
            }}

            isSelected={selectedCategoryId === item._id}
          />
        }
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        horizontal={true}


      />
      <FlatList
        data={productsByCategory}
        renderItem={({ item }) =>
          <ProductItem
            item={item}
            onPress={() => navigation.navigate(ScreenEnum.ProductDetailScreen, { product: item })} />
        }
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        nestedScrollEnabled = {true}


      />


    </View>
  );
};


// const categories = [
//   "Tất cả", "Hàng mới về", "Ưa sáng", "Ưa bóng"
// ]

const CategoryItem = (props) => {
  const { item, onPress, isSelected } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.category, isSelected && { backgroundColor: colors.primary }]} // Giữ nguyên màu nền
    >
      <Text style={{ color: isSelected ? 'white' : colors.black, textSize: 14, lineHeight: 20 }}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default PlantScreen;


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    zIndex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colors.backgroundOverlay
  },

  category: {
    backgroundColor: colors.white,
    paddingVertical: 2, // Thay đổi padding để tăng chiều cao
    paddingHorizontal: 12, // Thay đổi padding để tăng chiều rộng
    borderRadius: 6,
    marginHorizontal: 4,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center', // Đảm bảo căn giữa nội dung
  },

  descriptionText: {
    fontSize: 14,
    color: 'blue-violet',
    lineHeight: 25,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 20
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start'
  },
  textButton: {},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  containerImage: {
    alignItems: 'center',
  },

});
