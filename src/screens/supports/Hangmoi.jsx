import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList, ActivityIndicator,TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'



import { useDispatch, useSelector } from 'react-redux';
import { LoaiSanPham } from '../redux/LoaisanphamSlice';
import { SanPham } from '../redux/SanPhamSlice';
import { getProductsByCategory } from '../redux/SanPhamTheoLoaiSlice';

const Hangmoi = (props) => {
    const { navigation } = props;

    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [numColumns, setNumColumns] = useState(2);
    const dispatch = useDispatch();
    const { LoaiSanPhamData, LoaiSanPhamStatus } = useSelector((state) => state.loaisanpham);
    const { SanPhamData, SanPhamStatus } = useSelector((state) => state.sanpham);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(SanPhamData);

    const handleSearch = (text) => {
        setSearchQuery(text);
    
        if (text === '') {
            setFilteredProducts(SanPhamData); // Hiển thị toàn bộ khi không nhập
        } else {
            const filtered = SanPhamData.filter((item) =>
                item.tensp.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };
    useEffect(() => {
        setFilteredProducts(SanPhamData); // Đồng bộ khi SanPhamData thay đổi
    }, [SanPhamData]);
  
   

    useEffect(() => {
        if (selectedCategoryId) {
            dispatch(getProductsByCategory(selectedCategoryId));  // Gọi API khi category thay đổi
        }
    }, [selectedCategoryId, dispatch]);

    const handleSelect = (id) => {
        setSelectedCategoryId(id);
    };

    



    useEffect(() => {
        dispatch(SanPham());
    }, [dispatch]);
    // Xử lý khi không thể fetch dữ liệu
    useEffect(() => {
        if (SanPhamStatus === 'failed') {
            ToastAndroid.show('Không thể tải sản phẩm!', ToastAndroid.SHORT);
        }
    }, [SanPhamStatus]);
    useEffect(() => {
        if (SanPhamStatus === 'succeeded') {
            console.log('Dữ liệu sản phẩm:', SanPhamData);
        }
    }, [SanPhamStatus, SanPhamData]);


    // Render một item trong danh sách
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { productId: item._id })}>
                <View style={{ padding: 10 }}>
                    <View style={styles.containeritem}>
                        <Image source={{ uri: item.img }} style={styles.tinyLogoitem} />
                        <Text style={styles.text} numberOfLines={1}>{item.tensp}</Text>
                        <Text style={styles.text} numberOfLines={1}>{item.mota}</Text>

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'yellow', fontSize: 20, marginRight: 5 }}>$</Text>
                                <Text style={{ color: 'black', fontSize: 20 }}>{item.price}</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        // Gọi API khi component mount
        dispatch(LoaiSanPham());
    }, [dispatch]);

    useEffect(() => {
        if (LoaiSanPhamStatus === 'succeeded') {
            console.log('Dữ liệu sản phẩm:', LoaiSanPhamData);
        }
    }, [LoaiSanPhamStatus, LoaiSanPhamData]);
    const renderProductItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleSelect(item._id)}>
            <View style={[styles.productItem, selectedCategoryId === item._id && styles.selectedCategory]}>
                <Text style={[styles.productName, selectedCategoryId === item._id && styles.selectedCategoryText]}>{item.tenloai}</Text>
            </View>
        </TouchableOpacity>
    );

    // Kiểm tra trạng thái
    if (LoaiSanPhamStatus === 'loading') {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (LoaiSanPhamStatus === 'failed') {
        return <Text>Không thể tải dữ liệu loại sản phẩm!</Text>;
    }

  




    // const getCategories = async () => {
    //     try {
    //         const response = await getAllCategoris();
    //         setCategories(response);
    //         setSelectedCategoryId(response[0]._id);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const getProducts = async (categoryId) => {
    //     try {
    //         const response = await getOneCategoris(categoryId);
    //         setProducts(response);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     if (selectedCategoryId) {
    //         getProducts(selectedCategoryId);
    //     }
    //     return () => { } // cleanup
    // }, [selectedCategoryId])





    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-between', padding: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../media/back.png')} style={styles.back} />

                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', top: 10 }}>Cây Trồng</Text>
                <Image source={require('../media/cart.png')} style={styles.cart} />
            </View>





            <View style={{ marginStart: 10 }}>
                
                {LoaiSanPhamStatus === 'succeeded' && (
                    <FlatList
                        horizontal={true}
                        data={LoaiSanPhamData}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item._id.toString()}
                    />
                )}
            </View>

             {/* Input tìm kiếm */}
      <TextInput
        style={styles.input}
        placeholder="Tìm sản phẩm..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

            <View style={{ width: '100%', alignItems: 'center' }}>
                <View >

                    {SanPhamStatus === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
                    {SanPhamStatus === 'succeeded' && filteredProducts.length > 0 && (
                        <FlatList
                            numColumns={2}
                            data={filteredProducts}
                            renderItem={renderItem}
                            keyExtractor={(item) => item._id.toString()}
                        />
                    )}
                    {SanPhamStatus === 'failed' && <Text>Không thể tải dữ liệu!</Text>}



                </View>


            </View>

        </View>
    )
}
export default Hangmoi


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
    tiny: {
        marginTop: 7,
        width: 15,
        height: 15

    },
    button: {
        backgroundColor: '#D17842',
        width: 30,
        height: 30,
        borderRadius: 7,
        alignItems: 'center',

    },
    text: {
        color: 'black'
    },
    tinyLogoitem: {
        width: 150,
        height: 126,
        marginTop: 15
    },
    containeritem: {
        width: 149,
        height: 245,
        backgroundColor: '#FFFFFF',

    },
    selectedCategory: {
        backgroundColor: '#008000', // Màu nền xanh khi được chọn
        borderRadius: 5,
        height: 40,
        alignContent: 'center',
        padding: 10
    },
    categoryName: {
        color: 'black',
        fontWeight: 'bold',
    },
    selectedCategoryText: {
        color: '#FFFFFF',// Màu chữ khi được chọn

    },
    productName: {
        color: 'black'
    },
    productItem: {
        height: 40,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center', // Thêm căn giữa
        paddingHorizontal: 10, // Cân chỉnh padding
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },

    back: {
        width: 24,
        height: 24,
        top: 10
    },
    cart: {
        width: 48,
        height: 46,

    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',


    }
})