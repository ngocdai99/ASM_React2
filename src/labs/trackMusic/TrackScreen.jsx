import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React from 'react'
// import TrackPlayer from 'react-native-track-player';
import { playbackService } from '../trackService';
import usePlayTrack from '../trackService';

const {
  onTogglePlayTrack,
  onSkipToNext,
  onSkipToPrevious,
  trackArtist,
  trackTitle,
} = usePlayTrack(songs);





const TrackScreen = () => {

  const SongItem = ({ item }) => (
    <TouchableOpacity style={styles.trackItem} onPress={() => TrackPlayer.add(item)}>
      <Text style={styles.trackTitle}>{item.title}</Text>
      <Text style={styles.trackArtist}>{item.artist}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={SongItem}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={onTogglePlayTrack}>
          <Text style={styles.controlText}> Play</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkipToNext}>
          <Text style={styles.controlText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkipToPrevious}>
          <Text style={styles.controlText}>Previous</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.currentTrack}>
        Now Playing:
      </Text>
    </View>
  );
};


const songs = [
  {
    id: 1,
    title: '19th Floor',
    artist: 'Bobby Richards',
    artwork:
      'https://bigwalldecor.com/wp-content/uploads/2019/11/Large-Wall-Art-With-Floral-Head.jpg',
    url: require('./mymp3.mp3'),
  },
  {
    id: 2,
    title: 'Awful',
    artist: 'josh pan',
    artwork:
      'https://m.media-amazon.com/images/I/61aRJmGLnyL._AC_UF350,350_QL80_.jpg',
    url: require('./mymp3.mp3'),
  },
  {
    id: 3,
    title: 'Something is Going On',
    artist: 'Godmode',
    artwork: 'https://m.media-amazon.com/images/I/71e5XKCIO6L.jpg',
    url: require('./mymp3.mp3'),
  },
  {
    id: 4,
    title: 'Book The Rental Wit It',
    artist: 'RAGE',
    artwork: 'https://m.media-amazon.com/images/I/71e5XKCIO6L.jpg',
    url: require('./mymp3.mp3'),
  },
  {
    id: 5,
    title: 'Crimson Fly',
    artist: 'Huma-Huma',
    artwork:
      'https://onarbermano.com/wp-content/uploads/2021/07/D838C62F-B9BA-4DAD-A227-1F491AB5EEFB.jpeg',
    url: require('./mymp3.mp3'),
  },
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  trackItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  trackTitle: {
    fontSize: 18,
  },
  trackArtist: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  controlText: {
    fontSize: 18,
    color: '#007BFF',
  },
  currentTrack: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrackScreen;
