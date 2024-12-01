import { Image, StyleSheet, FlatList, Text, Touchable, StatusBar, TouchableOpacity, ActivityIndicator, Dimensions, View, ScrollView, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../utils/color';
import ProductItem from '../../models/Product';
import ScreenEnum from '../../enums/ScreenEnum';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesThunk } from '../../redux/slices/category/GetCategoriesSlice';
import MyToast from '../../utils/MyToast';
import { getProductsByCategoryIdThunk } from '../../redux/slices/product/GetProductsByCategoryIdSlice';



const PlantScreen = (props) => {
  const { navigation, route } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([])
  const [productsByCategory, setProductsByCategory] = useState([])
  const [loading, setLoading] = useState(false)


  //redux
  const dispatch = useDispatch()
  const { getCategoriesStatus, getCategoriesResponse } = useSelector((state) => {
    return state.getCategoriesReducer
  })


  const { getProductsByCategoryIdStatus, getProductsByCategoryIdResponse } = useSelector((state) => {
    return state.getProductsByCategoryIdReducer
  })



  useEffect(() => {
    if (getCategoriesStatus === 'idle') {
      getCategoriesFunction()
    }
    else if (getCategoriesStatus === 'succeeded') {
      setLoading(false);
      setCategories(getCategoriesResponse.categories)

      if (getCategoriesResponse.categories.length > 0) {
        const firstCategoryId = getCategoriesResponse.categories[0]._id;

        setSelectedCategoryId(firstCategoryId);
        getProductsByCategoryIdFunction(firstCategoryId);

      }
    } else if (getCategoriesStatus === 'failed') {
      setLoading(false);
      MyToast.show('Không thể tải danh mục, vui lòng thử lại!');
    }
  }, [getCategoriesStatus])


  useEffect(() => {

    if (getProductsByCategoryIdStatus === 'succeeded') {
      setLoading(false);
      setProductsByCategory(getProductsByCategoryIdResponse.products)

    } else if (getProductsByCategoryIdStatus === 'failed') {
      setLoading(false);
      MyToast.show('Không thể tải products, vui lòng thử lại!');
    }
  }, [getProductsByCategoryIdStatus])


  const getCategoriesFunction = () => {
    setLoading(true)
    dispatch(getCategoriesThunk())
  }

  const getProductsByCategoryIdFunction = (categoryId) => {
    setLoading(true)
    dispatch(getProductsByCategoryIdThunk(categoryId))
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


      <View style={styles.header}>
        <Pressable
          onPress={() => { navigation.goBack() }}
        >
          <Image style={{ height: 24, width: 24, marginTop: 10 }} source={require('../../images/ic_back.png')} />
        </Pressable>
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold', color: colors.black }}>
          CÂY TRỒNG
        </Text>
        <Image style={{ height: 24, width: 24, marginTop: 10 }} source={require('../../images/ic_cart.png')} />
      </View>


      <FlatList


        data={categories}
        renderItem={({ item }) =>
          <CategoryItem
            item={item}
            onPress={() => {
              setSelectedCategoryId(item._id);

              getProductsByCategoryIdFunction(item._id)
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
            onPress={() => navigation.navigate(ScreenEnum.ProductDetailScreen, { productId: item._id })} />
        }
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        nestedScrollEnabled={true}


      />


    </View>
  );
};



const CategoryItem = (props) => {
  const { item, onPress, isSelected } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.category, isSelected && { backgroundColor: colors.primary }]}
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

    flexDirection: 'column',
    padding: 16,
    justifyContent: 'flex-start',
    gap: 20
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
