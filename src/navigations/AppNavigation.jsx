
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenEnum from '../enums/ScreenEnum';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import MyBottomTab from './MyBottomTab';
import ProductDetailScreen from '../screens/buy_products/ProductDetailScreen';
import PlantScreen from '../screens/buy_products/PlantScreen';
import CartScreen from '../screens/buy_products/CartScreen';
import PaymentScreen from '../screens/buy_products/PaymentScreen';
import EditProfileScreen from '../screens/supports/EditProfileScreen';
import OrderHistoryScreen from '../screens/supports/OrderHistoryScreen';
import QAndAScreen from '../screens/supports/QAndAScreen';



const Stack = createNativeStackNavigator()
const AppNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>

                 {/* auth */}
                <Stack.Screen name={ScreenEnum.LoginScreen} component={LoginScreen} />
                <Stack.Screen name={ScreenEnum.RegisterScreen} component={RegisterScreen} />

             

                {/* bottom navigation */}
                <Stack.Screen name={ScreenEnum.MainScreen} component={MyBottomTab} />



                {/* buy products */}
                <Stack.Screen name={ScreenEnum.CartScreen} component={CartScreen} />
                <Stack.Screen name={ScreenEnum.PaymentScreen} component={PaymentScreen} />
                <Stack.Screen name={ScreenEnum.PlantScreen} component={PlantScreen} />
                <Stack.Screen name={ScreenEnum.ProductDetailScreen} component={ProductDetailScreen} />



                {/* supports */}
                <Stack.Screen name={ScreenEnum.EditProfileScreen} component={EditProfileScreen} />
                <Stack.Screen name={ScreenEnum.OrderHistoryScreen} component={OrderHistoryScreen} />
                <Stack.Screen name={ScreenEnum.QAndAScreen} component={QAndAScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation

