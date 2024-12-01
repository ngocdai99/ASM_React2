const screens = {
    // auth
    LoginScreen: 'LoginScreen',
    RegisterScreen: 'RegisterScreen',
    MainScreen: 'MainScreen',
    SplashScreen: 'SplashScreen',


    
    // bottom_navs
    HomeScreen: 'HomeScreen',
    NotificationScreen: 'NotificationScreen',
    SearchScreen: 'SearchScreen',
    ProfileScreen: 'ProfileScreen',



    // buy_products
    CartScreen: 'CartScreen',
    PaymentScreen: 'PaymentScreen',
    PlantScreen: 'PlantScreen',
    ProductDetailScreen: 'ProductDetailScreen',



    // supports
    EditProfileScreen: 'EditProfileScreen',
    OrderHistoryScreen: 'OrderHistoryScreen',
    QAndAScreen: 'QAndAScreen',

}

const ScreenEnum = Object.freeze({
    ...screens
});

export default ScreenEnum;