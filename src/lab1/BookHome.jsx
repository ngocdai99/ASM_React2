import { FlatList, Image, ScrollView, StyleSheet, ActivityIndicator, Dimensions, Text, TouchableOpacity, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import BookScreenEnum from './BookScreenEnum';
import BookAPIHelper from './BookAPIHelper';
import colors from '../utils/color';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookHome = (props) => {

  const { navigation } = props
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const [productsByCategory, setProductsByCategory] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    BookAPIHelper.getCategories()
      .then((response) => {
        setCategories(response)
        setSelectedCategoryId(response[0].idCate)
        getProductByCategory(response[0].idCate)
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
    if (selectedCategoryId) {
      getProductByCategory(selectedCategoryId);
    }
    return () => { } // cleanup
  }, [selectedCategoryId])


  const getProductByCategory = async (categoryId) => {
    setLoading(true)
    return BookAPIHelper.getProductByCategory(categoryId)
      .then((response) => {
        console.log(response)
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
    <SafeAreaView style={styles.container}>
      {/* header */}

      <Header />

      {loading && ( // Hiển thị spinner khi loading
        <ActivityIndicator style={styles.loading} size="large" color={colors.green} />
      )}
      <View style={styles.categories}>
        <Text style={styles.textcategories}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          horizontal={true}
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <CateItem
              isSelected={item.idCate === selectedCategoryId}
              item={item}
              onPress={() => { setSelectedCategoryId(item.idCate) }} />
          }
          keyExtractor={item => item.idCate}
        />
      </View>




      <View style={styles.recommended}>
        <Text style={styles.textcategories}>Recommended For You</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.recommended}>

        <Text style={styles.textcategories}>Best Seller</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>

      <FlatList
       
        data={productsByCategory}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          <BookItem
            item={item}
            onPress={() => navigation.navigate(BookScreenEnum.BookProductDetail, { product: item })} />

        }
        keyExtractor={item => item.idProduct}
      />
      
    </SafeAreaView>
  );
};



const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.groupLogo}>
        <View>
          <Image
            style={styles.imageLogo}
            source={require('./asset/logo.png')}
          />
        </View>
        <View>
          <Text style={styles.audibooks}>
            <Text style={styles.audibooks1}>
              <Text style={styles.audi}>Audi</Text>
              <Text style={styles.books}>Books</Text>
            </Text>
            <Text style={styles.text}>.</Text>
          </Text>
        </View>
      </View>

      <View>
        <Image
          style={{ marginTop: 5, marginRight: 28 }}
          source={require('./asset/setting.png')}
        />
      </View>
    </View>
  )
}

const CateItem = (props) => {
  const { item, isSelected, onPress } = props
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.textcate}>{item.nameCate}</Text>
    </TouchableOpacity>
  );
};



const BookItem = (props) => {
  const { item, onPress } = props
  return (
    <TouchableOpacity onPress={onPress} style={styles.bookBest}>

      <Image source={{ uri: item.image }} style={styles.bookImagebest} />
      <View style={{ justifyContent: 'center' }}>
        <Text
          style={{ fontSize: 16, fontWeight: '500', color: '#010104', width: 200 }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {item.nameProduct}
        </Text>
        <Text style={{ fontSize: 16, color: '#f77a55' }}>
          đ{item.price}
        </Text>
        <Text style={{ fontSize: 12, color: '#6a6a8b' }}>
          1,000+ Listeners
        </Text>
      </View>

    </TouchableOpacity>
  );
};

export default BookHome;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    zIndex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: colors.backgroundOverlay
  },

  bookBest: {
    backgroundColor: '#f5f2f2',
    flexDirection: 'row',
    borderRadius: 12,
    marginVertical: 12,
    marginRight: 28,
  },
  container: {
    paddingStart: 28,
  },
  header: {
    marginTop: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupLogo: {
    flexDirection: 'row',
  },
  imageLogo: {
    height: 40,
    width: 40,
  },
  audibooks: {
    fontSize: 24,
    textAlign: 'left',
  },
  audibooks1: {
    color: '#4838d1',
  },
  audi: {
    fontWeight: '700',
    fontFamily: 'SF Pro Display',
  },
  books: {
    fontWeight: '300',
    fontFamily: 'SF Pro Display',
  },
  text: {
    fontWeight: '600',
    color: '#f77a55',
    fontFamily: 'SF Pro Display',
  },
  categories: {
    marginTop: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommended: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textcategories: {
    fontSize: 16,
    fontWeight: '500',
    color: '#010104',
  },
  seeMore: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4838d1',
    marginRight: 28,
  },
  textcate: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#9292a2',
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#f5f5fa',
    padding: 14,
    borderRadius: 12,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginRight: 16,
    marginTop: 16,
  },
  bookImagebest: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    margin: 16,
    borderRadius: 4,
  },
});
