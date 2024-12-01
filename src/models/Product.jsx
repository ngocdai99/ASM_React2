import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import colors from '../utils/color'


const ProductItem = (props) => {
    const { item, onPress } = props;
    return (
        <Pressable
            onPress={onPress} style={styles.container}>

            <Image style={styles.image} source={{ uri: item?.image[0] }} /> :
       
            <Text numberOfLines={1} style={styles.name}>{item?.name}</Text>

            <Text style={styles.price}>${item?.price}</Text>

        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '45%',
        flexDirection: 'column',
        margin: 10,
        borderRadius: 8,
        backgroundColor: colors.light_gray,
        padding: 16
    },
    image: {
        width: '100%',
        height: 134,
        resizeMode: 'contain'
    },
    name: {
        fontSize: 16,
        marginTop: 10,
        color: colors.black,
        letterSpacing: 0.5,
        fontFamily: 'Poppins',
        fontWeight: '600'
    },
    categoryName: {
        fontSize: 14,
        color: colors.gray,
        letterSpacing: 0.5,
        fontFamily: 'Poppins',

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dollar: {
        fontSize: 15,
        color: colors.yellow_orange,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginRight: 4
    },
    price: {
        fontSize: 16,
        color: colors.primary,
        fontFamily: 'Poppins',
        fontWeight: '600',
        letterSpacing: 0.5
    },
    btnAdd: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: colors.yellow_orange,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ic_plus: {
        width: 10,
        height: 10,
        tintColor: colors.white
    },
    ratingsContainer: {
        backgroundColor: colors.yellow_orange,
        padding: 4,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        width: 53,
        height: 22,
        justifyContent: 'center',
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 26,
    },
    ic_star: {
        width: 10,
        height: 10,
        tintColor: colors.yellow_orange,
        marginRight: 4
    },
    ratings: {
        fontSize: 12,
        color: colors.white,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    }
})


export default ProductItem 