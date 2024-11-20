
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenEnum from '../utils/ScreenEnum';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MyBottomTab from './MyBottomTab';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import PlantScreen from '../screens/PlantScreen';



const Stack = createNativeStackNavigator()
const AppNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>

                <Stack.Screen name={ScreenEnum.LoginScreen} component={LoginScreen} />
                <Stack.Screen name={ScreenEnum.MainScreen} component={MyBottomTab} />
                <Stack.Screen name={ScreenEnum.RegisterScreen} component={RegisterScreen} />
                <Stack.Screen name={ScreenEnum.PlantScreen} component={PlantScreen} />
                <Stack.Screen name={ScreenEnum.ProductDetailScreen} component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation

