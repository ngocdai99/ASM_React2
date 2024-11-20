/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet} from 'react-native';
import BookNavigation from './src/lab1/BookNavigation';
import AppNavigation from './src/navigations/AppNavigation';
import SMS from './src/labs/SMS';





function App() {
  return (
    <SafeAreaView style={styles.container}>

      <SMS/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;