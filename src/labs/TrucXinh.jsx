import { StyleSheet, Text, View, Pressable, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../utils/color'

const TrucXinh = () => {
    const [hiddenItems, setHiddenItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)

    const pikachu = (item) => {

        if (selectedItem &&
            selectedItem.id !== item.id &&
            selectedItem.pairId === item.pairId
        ) {
            if(!(hiddenItems.includes(selectedItem) || hiddenItems.includes(item))){
                setHiddenItems([...hiddenItems, selectedItem, item])
            }
           
            setSelectedItem(null)


        } else if (selectedItem &&
            selectedItem.pairId !== item.pairId) {
            setSelectedItem(null)


        } else {
            setSelectedItem(item)
        }

    }

    console.log('selectedItem = ', selectedItem)
    console.log('hiddenItems = ', hiddenItems)
    console.log('------------------------')

    const replay = () => {
        setHiddenItems([])
        setSelectedItem(null)
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={array}
                renderItem={({ item }) =>
                    <Item
                        isVisible={!hiddenItems.includes(item)}
                        item={item}
                        onPress={() => { pikachu(item) }} />
                }
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                columnWrapperStyle={styles.row}
             
            />
            {
                hiddenItems.length === array.length ? (
                    <ButtonReplay onPress={replay} />
                ) : null
            }

        </View>
    )
}

const array = [
    {
        id: 1,
        pairId: 1,
        image: require('../images/avatar.png')

    },
    {
        id: 2,
        pairId: 1,
        image: require('../images/avatar.png')
    },
    {
        id: 3,
        pairId: 2,
        image: require('../images/lemon_balm.png')
    },

    {
        id: 6,
        pairId: 3,
        image: require('../images/product2.png')
    },

    {
        id: 7,
        pairId: 4,
        image: require('../images/background.png')

    },

    {
        id: 8,
        pairId: 4,
        image: require('../images/background.png')
    },

    {
        id: 4,
        pairId: 2,
        image: require('../images/lemon_balm.png')

    },
    {
        id: 5,
        pairId: 3,
        image: require('../images/product2.png')
    }

]

const ButtonReplay = (props) => {
    const { onPress } = props
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonReplay}>
            <Text style={{ color: colors.white }}>Replay</Text>

        </TouchableOpacity>
    )
}

const Item = (props) => {
    const { item, onPress, isVisible } = props
    return (
        <TouchableOpacity onPress={onPress} style={{ margin: 10 }}>
            {
                isVisible ?

                    <Image source={item.image} style={styles.image} /> :

                    <View style={{ width: 100, height: 100, backgroundColor: 'green' }}></View>
            }

        </TouchableOpacity>
    )
}



export default TrucXinh

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between'
    },
    image: {
        width: 100,
        height: 100
    },
    container: {
        backgroundColor: colors.white,

        padding: 16,
        flexDirection: 'column'
    },
    buttonReplay: {
        margin: 10,
        backgroundColor: 'green',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,

    },

})