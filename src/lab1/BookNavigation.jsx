
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookScreenEnum from './BookScreenEnum';
import BookRegister from './BookRegister';
import BookLogin from './BookLogin';
import BookHome from './BookHome';
import BookProductDetail from './BookProductDetail';

const Stack = createNativeStackNavigator()
const BookNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name={BookScreenEnum.BookLogin} component={BookLogin} />
                <Stack.Screen name={BookScreenEnum.BookHome} component={BookHome} />
    
                <Stack.Screen name={BookScreenEnum.BookRegister} component={BookRegister} />
                <Stack.Screen name={BookScreenEnum.BookProductDetail} component={BookProductDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default BookNavigation

