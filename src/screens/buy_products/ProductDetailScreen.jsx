import { Image, StyleSheet, Text, Touchable, TouchableOpacity, Dimensions, View, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../utils/color';
import { getProductDetailThunk } from '../../redux/slices/product/GetProductDetailSlice';
import { useSelector, useDispatch } from 'react-redux';

import MyToast from '../../utils/MyToast';




const ProductDetailScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { productId } = params;

  const [loading, setLoading] = useState(false)

  // Thêm state để quản lý số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);


  //redux
  const dispatch = useDispatch()
  const { getProductDetailStatus, productDetail } = useSelector((state) => { return state.getProductDetailReducer })

  const getProductDetailFunction = () => {
    if (productId) {
      setLoading(true)
      const getProductDetailRequest = { productId: productId, userId: "671cb2de0b352e4659628322" }
      dispatch(getProductDetailThunk(getProductDetailRequest))
    }

  }

  useEffect(() => {
    if (getProductDetailStatus === 'idle') {
      getProductDetailFunction()
    } else if (getProductDetailStatus === 'succeeded') {
      setLoading(false)

      console.log('productDetail = ', productDetail)
    } else if (getProductDetailStatus === 'failed') {
      setLoading(false)
      MyToast.show("Khong the lay detail")
    }
  }, [getProductDetailStatus])

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity(it => it + 1);
  };

  // Hàm giảm số lượng
  const decreaseQuantity = () => {
    setQuantity(it => (it > 1 ? it - 1 : 1));
  };

  const totalPrice = quantity * productDetail?.price;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column' }}>

       
        {loading && ( // Hiển thị spinner khi loading
          <ActivityIndicator style={styles.loading} size="large" color={colors.green} />
        )}


        {/* header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => { navigation.goBack() }}>
            <Image
              style={{ height: 24, width: 24, marginTop: 10, marginLeft: 20 }}
              source={require('../../images/ic_back.png')}
            />
          </Pressable>

          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              fontWeight: '500',
              color: colors.black,
            }}
          >
            {productDetail?.name || 'Product Name Unavailable'}
          
          </Text>
          <Image
            style={{ height: 24, width: 24, marginTop: 10, marginRight: 20 }}
            source={require('../../images/ic_cart.png')}
          />
        </View>

        <Image style={[styles.logo, { position: 'absolute', top: 80, left: 0 }]} source={{ uri: productDetail?.image[0] }} />


        {/* content */}
        <View style={{ marginTop: 270, marginHorizontal: 16 }}>

          <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">
            ${productDetail?.price}
          
          </Text>

          <View style={styles.row}>
            <Text style={styles.category}>Cây trồng</Text>
            <Text style={styles.category}>Ưa bóng</Text>
          </View>

         

          <View style={styles.descriptionContainer}>
            <Text>Chi tiết sản phẩm</Text>
          </View>
          <View style={styles.descriptionContainer}>

            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text>Kích cỡ</Text>
              <Text>Nhỏ</Text>
            </View>
          </View>
          <View style={styles.descriptionContainer}>

            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text>Xuất xứ</Text>
              <Text>Châu Phi</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              <Text>Tình trạng</Text>
              <Text style={{ color: colors.primary }}>Còn {productDetail?.quantity} sp</Text>
            </View>

          </View>

          <View style={styles.row}>
            <View style={[styles.column, { flex: 1 }]}>
              <Text>Đã chọn 0 sản phẩm</Text>
              <View style={styles.row}>
                <Pressable onPress={decreaseQuantity}>
                  <Image
                    style={{ height: 24, width: 24, marginRight: 8 }}
                    source={require('../../images/ic_minus.png')}
                  />
                </Pressable>
                <Text>{quantity}</Text>
                <Pressable onPress={increaseQuantity}>
                  <Image
                    style={{ height: 24, width: 24, marginLeft: 8 }}
                    source={require('../../images/ic_plus.png')}
                  />
                </Pressable>
              </View>
            </View>

            <View style={[styles.column, { flex: 1 }]}>
              <Text style={{ textAlign: 'right' }}>Tạm tính</Text>
              <Text style={[styles.price, { textAlign: 'right', marginTop: 0 }]}> {totalPrice}$</Text>
            </View>
          </View>



        </View>

      </View>
      <Pressable style={styles.customPressable}>
        <Text style={styles.customPressableText}>CHỌN MUA</Text>
      </Pressable>

    </View>
  );
};

const ProductType = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity style={styles.type}>
      <Text style={styles.textButton}>{item}</Text>
    </TouchableOpacity>
  );
};

export default ProductDetailScreen;


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    zIndex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colors.backgroundOverlay
  },
  customPressable: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 16,
    height: 50,
    justifyContent: 'center'
  },
  customPressableText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingTop: 12,
    paddingBottom: 5,
    marginBottom: 8,
    width: '100%'
  },
  category: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: 4,
    borderRadius: 8, marginHorizontal: 4
  },
  logo: {
    width: Dimensions.get('window').width,
    height: 270,
    resizeMode: 'contain'
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
    flex: 1
  },
  type: {
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#6a6a8b',
    textAlign: 'center',
    marginEnd: 4
  },
  textButton: {},
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  containerImage: {
    alignItems: 'center',
  },
  jusC: {
    justifyContent: 'center',
  },
  image: {
    width: 260,
    height: 260,
    marginTop: 24,
  },
});
