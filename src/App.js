/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import ArtistList from './ArtistList';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {    
    const artist = {
      image: 'https://lastfm-img2.akamaized.net/i/u/300x300/31a51f6e3ec647c8997150ec837891c7.png',
      name: 'David Brownie',
      likes: 2000,
      comments: 140,
    }
    const artists = Array(500).fill(artist)

    return (
      <View style={styles.container}>
        <ArtistList artists={artists} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50,
  },
  image: {
    width: 150,
    height: 150,
  },
});
