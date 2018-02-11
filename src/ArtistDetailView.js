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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ArtistBox from './ArtistBox';
import { getArtists } from './api-client';
import { Icon } from 'react-native-elements';
import { firebaseDatabase, firebaseAuth } from './firebase';

export default class ArtistDetailView extends Component {
  state = {
    text: '',
  }

  constructor() {
    super()
    console.ignoreYellowBox = [ 'Setting a timer' ]
  }

  handleSend = () => {
    const { text } = this.state
    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push();
    newCommentRef.set({ text });
  }

  getArtistCommentsRef() {
    const { key } = this.props.artist
    return firebaseDatabase.ref(`comments/${key}`)
  }

  handleChangeText = (text) => this.setState({ text })

  render() {    
    const artist = this.props.artist

    return (
      <View style={styles.container}>
        <ArtistBox artist={artist} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <Icon name='ios-send-outline' type='ionicon' size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 70,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    flex: 1,
  }
});