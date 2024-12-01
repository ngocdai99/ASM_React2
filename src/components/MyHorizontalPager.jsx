import React, { useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PagerView from 'react-native-pager-view';

const HorizontalPager = () => {
  const pagerRef = useRef(null);

  const goToPage = (pageIndex) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(pageIndex); // Di chuyển đến trang chỉ định (có animation)
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <PagerView style={styles.pagerView} initialPage={0} ref={pagerRef}>
        <View key="1" style={[styles.page, { backgroundColor: 'red' }]}>
          <Text>Page 1</Text>
        </View>
        <View key="2" style={[styles.page, { backgroundColor: 'blue' }]}>
          <Text>Page 2</Text>
        </View>
        <View key="3" style={[styles.page, { backgroundColor: 'green' }]}>
          <Text>Page 3</Text>
        </View>
      </PagerView>
      <View style={styles.buttonContainer}>
        <Button title="Go to Page 1" onPress={() => goToPage(0)} />
        <Button title="Go to Page 2" onPress={() => goToPage(1)} />
        <Button title="Go to Page 3" onPress={() => goToPage(2)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default HorizontalPager;
