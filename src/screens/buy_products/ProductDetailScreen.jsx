import { Image, StyleSheet, Text, Touchable, TouchableOpacity, Dimensions, View, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import colors from '../../utils/color';
import { getProductDetailThunk } from '../../redux/slices/product/GetProductDetailSlice';
import { useSelector, useDispatch } from 'react-redux';
import PagerView from 'react-native-pager-view';
import { ScreenContext } from 'react-native-screens';
import ScreenEnum from '../../enums/ScreenEnum';

const ProductDetailScreen = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { productId } = params;

  console.log('productId = ', productId)

  const pagerRef = useRef(0)
  const [currentPage, setCurrentPage] = useState(0)


  // Thêm state để quản lý số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);


  //redux
  const dispatch = useDispatch()
  const { getProductDetailStatus, productDetail } = useSelector((state) => { return state.getProductDetailReducer })

  const getProductDetailFunction = () => {
    if (productId) {

      const getProductDetailRequest = { productId: productId, userId: "671cb2de0b352e4659628322" }
      dispatch(getProductDetailThunk(getProductDetailRequest))
    }

  }

  useEffect(() => {
    if (productId) {
      getProductDetailFunction();
    }
  }, [productId]);

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

      {
        getProductDetailStatus === 'loading' && (
          <ActivityIndicator style={styles.loading} size="large" color={colors.green} />
        )
      }



      {
        getProductDetailStatus === 'succeeded' &&
        <SuccessScreen
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          productDetail={productDetail}
          totalPrice={totalPrice}
          quantity={quantity}
          onbackPress={() => navigation.goBack()}
          navigateToCart={() => navigation.navigate(ScreenEnum.CartScreen)}
          pagerRef={pagerRef}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }

      {
        getProductDetailStatus === 'failed' &&
        <Text style={{ color: 'red' }}>Lỗi tải dữ liệu!</Text>
      }


    </View>
  );
};


const SuccessScreen = (props) => {
  const { productDetail, totalPrice, decreaseQuantity, increaseQuantity, quantity, onbackPress, pagerRef, currentPage, setCurrentPage, navigateToCart } = props
  console.log('pagerRef: ', pagerRef)
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>

      <View style={{ flex: 1, flexDirection: 'column' }}>

        <View style={styles.header}>
          <Pressable
            onPress={() => { onbackPress() }}>
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
            {productDetail.name || 'Product Name Unavailable'}

          </Text>
          <Pressable onPress={navigateToCart}>
            <Image
              style={{ height: 24, width: 24, marginTop: 10, marginRight: 20 }}
              source={require('../../images/ic_cart.png')}
            />
          </Pressable>

        </View>

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

          <PagerView
            initialPage={0}
            style={styles.pagerView}
            onPageSelected={event => { setCurrentPage(event.nativeEvent.position) }}
            ref={pagerRef}
          >
            {
              productDetail.image.map((item, index) => {
                return (
                  <View key={index} style={styles.page}>
                    <Image
                      source={{ uri: item }}
                      style={styles.sliderItem}
                      resizeMode="contain"
                    />

                  </View>
                )
              })
            }
          </PagerView>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            {
              productDetail.image.map((item, index) => {
                return (
                  <View key={index + 1} style={currentPage === (index) ? styles.selectedCircle : styles.unSelectedCircle} ></View>
                )
              })
            }
          </View>


        </View>


        {/* content */}
        <View style={{ marginTop: 10, marginHorizontal: 16 }}>

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
              <Text style={{ color: colors.primary }}>Còn {productDetail.quantity} sp</Text>
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
  )
}


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
  pagerView: {
    height: 300,
    marginTop: 10
  },

  page: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 290,
    flexDirection: 'column',
    // backgroundColor: 'violet',
    justifyContent: 'center'
  },

  selectedCircle: {
    backgroundColor: 'green',
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 6
  },

  unSelectedCircle: {
    backgroundColor: 'gray',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6
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

  sliderItem: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10
  },
  image: {
    width: 260,
    height: 260,
    marginTop: 24,
  },
});
