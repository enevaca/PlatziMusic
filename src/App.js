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
import { getArtists } from './api-client'

type Props = {};
export default class App extends Component<Props> {

  state = {
    artists: []
  }

  componentDidMount() {
    getArtists().then(data => this.setState({ artists: data }))
  }

  render() {    
    const artists = this.state.artists

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
