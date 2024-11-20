import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import React from 'react';



const BookProductDetail = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const { product } = params;

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {navigation.goBack()}}>
          <Image
            style={{ height: 24, width: 24, marginTop: 10, marginLeft: 20 }}
            source={require('./asset/icons/goback.png')}
          />
        </Pressable>

        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            fontWeight: '500',
            color: '#9292a2',
          }}
        >
          {product?.nameProduct || 'Product Name Unavailable'}
        </Text>
        <Image
          style={{ height: 24, width: 24, marginTop: 10, marginRight: 20 }}
          source={require('./asset/icons/more.png')}
        />
      </View>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{uri: product?.image}}
        />
      </View>
      {/* content */}
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {product?.nameProduct || 'Product Name Unavailable'}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#9292a2',
            marginVertical: 12,
          }}
        >
          J.K. Rowling
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Image style={{ width: 30, height: 30 }} source={require('./asset/icons/ic_star_filled.png')} />
          <Image style={{ width: 30, height: 30 }} source={require('./asset/icons/ic_star_filled.png')} />
          <Image style={{ width: 30, height: 30 }} source={require('./asset/icons/ic_star_filled.png')} />
          <Image style={{ width: 30, height: 30 }} source={require('./asset/icons/ic_star_filled.png')} />
          <Image style={{ width: 30, height: 30 }} source={require('./asset/icons/ic_star_outline.png')} />

        
        </View>

        <View style={styles.row}>
          {product?.type?.map((item, index) => (
            <ProductType item={item} key={index} />
          ))}
        </View>

        <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#4838D1', borderWidth: 2, width: 148, height: 53, borderColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20 }} source={require('./asset/icons/ic_play.png')} />

            <Text style={{ fontSize: 14, color: 'white', marginLeft: 10 }}>Play Audio</Text>
          </View>
          <View style={{ flexDirection: 'row', borderColor: '#4838D1', borderWidth: 2, width: 148, height: 53, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ width: 23, height: 23 }} source={require('./asset/icons/ic_book.png')} />
            <Text style={{ fontSize: 14, color: '#4838D1', marginLeft: 10 }}>Read Book</Text>
          </View>
        </View>

        <Text style={{ fontSize: 16, color: 'black', marginLeft: 10, fontWeight: 'bold', marginTop: 20 }}>Summary</Text>
        <Text style={styles.descriptionText}>
         {product.description}
        </Text>





      </View>
    </ScrollView>
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

export default BookProductDetail;


const styles = StyleSheet.create({
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
  title: {
    width: 350,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#010104',
    marginTop: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
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
    width: '100%',
    height: 260,
    marginTop: 24,
  },
});
