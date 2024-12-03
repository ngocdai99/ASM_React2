/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { store } from './src/redux/ReduxStore';

import { Provider } from 'react-redux';
import AppNavigation from './src/navigations/AppNavigation';
import HorizontalPagerWithImages from './src/components/MyHorizontalPager';


function App() {
  return (

    <Provider store={store}>

      <SafeAreaView style={styles.container}>

        <AppNavigation />
        
      </SafeAreaView>

    </Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;