import { View, Text, StyleSheet, Pressable } from 'react-native'
import colors from '../utils/color'

class Category {
    constructor({ _id, name, }) {
        this._id = _id;
        this.name = name;
    }
    static getSampleCategories() {
        return [
            new Category({ _id: 1, name: 'All' }),
            new Category({ _id: 2, name: 'Espresso' }),
            new Category({ _id: 3, name: 'Cappuccino' }),
            new Category({ _id: 4, name: 'Latte' }),
            new Category({ _id: 5, name: 'Americano' }),
            new Category({ _id: 6, name: 'Mocha' }),
            new Category({ _id: 7, name: 'Caramel Macchiato' }),
        ]
    }
}

const RenderCategoryItem = (props) => {
    const { item, isSelected, onPress } = props
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}>
            <Text style={isSelected ? styles.textAll : styles.text}>{item.name}</Text>
            <View style={[styles.indicator, { backgroundColor: isSelected ? colors.yellow_orange : 'transparent' }]}></View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 10,
        paddingEnd: 16,
    },
    textAll: {
        color: colors.yellow_orange,
        fontSize: 14,
        fontWeight: 'bold',
    },
    text: {
        color: colors.gray,
        fontSize: 14,
        fontWeight: 'bold',
    },
    indicator: {
        width: 8,
        height: 8,
        backgroundColor: colors.yellow_orange,
        borderRadius: 5,
        marginTop: 4
    }
})
export { RenderCategoryItem }
export default Category;