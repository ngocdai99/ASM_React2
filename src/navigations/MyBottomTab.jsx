
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../utils/color'
import ScreenEnum from '../enums/ScreenEnum';
import HomeScreen from '../screens/bottom_navs/HomeScreen';
import SearchScreen from '../screens/bottom_navs/SearchScreen';
import NotificationScreen from '../screens/bottom_navs/NotificationScreen';
import ProfileScreen from '../screens/bottom_navs/ProfileScreen';


const Tab = createBottomTabNavigator()

const MyBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenEnum.HomeScreen}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === ScreenEnum.HomeScreen) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ScreenEnum.SearchScreen) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === ScreenEnum.NotificationScreen) {
            iconName = focused ? 'notifications-sharp' : 'notifications-outline';
          } else if (route.name === ScreenEnum.ProfileScreen) {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={ScreenEnum.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ScreenEnum.SearchScreen} component={SearchScreen} />
      <Tab.Screen name={ScreenEnum.NotificationScreen} component={NotificationScreen} />
      <Tab.Screen name={ScreenEnum.ProfileScreen} component={ProfileScreen} />


    </Tab.Navigator>
  )
}

export default MyBottomTab