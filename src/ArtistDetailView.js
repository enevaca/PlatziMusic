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
  Text,
} from 'react-native';

import { Icon } from 'react-native-elements';
import { firebaseDatabase, firebaseAuth } from './firebase';
import ArtistBox from './ArtistBox';
import CommentList from './CommentList';

export default class ArtistDetailView extends Component {
  state = {
    text: '',
    comments: [],
  }

  constructor(props) {
    super(props)
    console.ignoredYellowBox = [ 'Setting a timer' ]
  }

  handleSend = () => {
    const id = this.generateQuickGuid()
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser
    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push();
    newCommentRef.set({ 
      text, 
      userPhoto: 'https://lastfm-img2.akamaized.net/i/u/174s/9e26b6e7282d4c52cca398b28c7e57b5.png',
      uid
    });
    this.setState({ text: '' })
  }

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment);
  }

  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment); 
  }

  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: this.state.comments.concat(comment)
    });
  }

  generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15)
  }

  getArtistCommentsRef() {
    const { key } = this.props.artist
    return firebaseDatabase.ref(`comments/${key}`)
  }

  handleChangeText = (text) => this.setState({ text })

  render() {    
    const artist = this.props.artist
    const { comments } = this.state

    return (
      <View style={styles.container}>
        <ArtistBox artist={artist} />
        <Text style={styles.header}>Comentarios</Text>
        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
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
  header: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    flex: 1,
  },
});