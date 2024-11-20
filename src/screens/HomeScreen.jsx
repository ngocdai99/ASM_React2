import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, StatusBar, Pressable, SafeAreaView, Dimensions, TextInput, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../utils/color'
import ScreenEnum from '../utils/ScreenEnum'
import APIHelper from '../helpers/APIHelper'
import ProductItem from '../models/Product'

const HomeScreen = (props) => {
  const { navigation } = props

  const [loading, setLoading] = useState(false)




  return (
    <ScrollView>
      <View style={styles.container}>


        <StatusBar
          animated={true}
          backgroundColor={colors.primary}
        />

        {loading && ( // Hiển thị spinner khi loading
          <ActivityIndicator style={styles.loading} size="large" color={colors.green} />
        )}

        <View style={[styles.row, { alignItems: 'center', zIndex: 1, width: '100%', justifyContent: 'space-between', marginTop: 40 }]}>
          <Text style={styles.title}>
            Planta - tỏa sáng{'\n'}
            không gian nhà bạn
          </Text>

          <Image style={styles.ic_cart} source={require('../images/ic_cart.png')} />
        </View>

        <View style={[styles.row, { marginTop: 10, zIndex: 1 }]}>
          <Pressable onPress={() => { navigation.navigate(ScreenEnum.PlantScreen) }}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
              Xem hàng mới về
            </Text>
          </Pressable>

          <Image style={styles.ic_cart} source={require('../images/ic_arrow_right.png')} />
        </View>


        <Image style={[styles.logo, { position: 'absolute', top: 90, left: 0 }]} source={require("../images/product1.png")} />



        <Text style={[styles.title, { marginTop: 170, marginBottom: 10 }]} >Cây trồng</Text>



        <FlatList
          data={plants}
          renderItem={({ item }) =>
            <ProductItem
              item={item}
              onPress={() => navigation.navigate(ScreenEnum.ProductDetailScreen, { product: item })} />
          }
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          nestedScrollEnabled={true}
        />
        <Text style={[styles.title, { marginVertical: 10 }]} >Chậu cây trồng</Text>
        <FlatList
          data={plantPots}
          renderItem={({ item }) =>
            <ProductItem
              item={item}
              onPress={() => navigation.navigate(ScreenEnum.ProductDetailScreen, { product: item })} />
          }
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          nestedScrollEnabled={true}
        />


        <Text style={{ textDecorationLine: 'underline', fontSize: 16, color: colors.black, fontWeight: 'bold', textAlign: 'right' }} >Xem thêm phụ kiện</Text>
        <Text style={[styles.title, { marginVertical: 10 }]} >Combo chăm sóc (mới)</Text>

        <View style={styles.comboContainer}>
          <View style={{ flexDirection: 'column', flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 16, color: colors.black, fontWeight: 'bold' }} >Lemon Balm Grow Kit</Text>
            <Text style={{ fontSize: 14, color: colors.gray }} >Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker đánh dấu...</Text>
          </View>
          <Image style={{ width: 108, height: 134 }} source={require('../images/lemon_balm.png')} />
        </View>
      
      </View>


    </ScrollView>



  )
}

export default HomeScreen
export { plants }

const plantPots = [
  {
    id: 1,
    name: 'Planta Trắng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 2,
    name: 'Planta Lemon Balm',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 3,
    name: 'Planta Rosewood',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 4,
    name: 'Planta Dove Grey',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
];

const plants = [
  {
    id: 1,
    name: 'Spider Plant',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 2,
    name: 'Song of India',
    categoryName: 'Ưa bóng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 3,
    name: 'Spider Plant',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 4,
    name: 'Song of India',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 5,
    name: 'Spider Plant',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 6,
    name: 'Song of India',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 7,
    name: 'Spider Plant',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 8,
    name: 'Song of India',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
  {
    id: 9,
    name: 'Spider Plant',
    categoryName: 'Ưa sáng',
    origin: 'Africa',
    price: 250000,
    size: ['Nhỏ', 'Trung Bình', 'Lớn'],
    inStock: 150,
    image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780062464347.jpg",
    desciption:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate amet, vitae provident rem odio ullam, nulla alias vel necessitatibus perspiciatis fugit, quasi deserunt dolore. Soluta minima perspiciatis quibusdam nisi?',
  },
];

const styles = StyleSheet.create({
  comboContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.light_gray,
    borderRadius: 8
  },
  logo: {
    width: Dimensions.get('window').width,
    height: 205
  },
  row: {
    flexDirection: 'row'
  },
  ic_cart: {
    width: 24,
    height: 24
  },
  title: {
    color: colors.black,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 0.7
  },
  scrollView: {
    // flexGrow: 1,
    zIndex: 1,
    backgroundColor: colors.primary,

  },
  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    zIndex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colors.backgroundOverlay
  },

  container: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 16
  },



  slogan: {
    color: colors.white,
    fontSize: 28,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginVertical: 8

  },



})









