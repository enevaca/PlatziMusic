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
  Text,
  Button,
  TextInput,
} from 'react-native';
/*import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';*/

import { Actions } from 'react-native-router-flux'
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBfWE55uYREZNxbJdhhe5jo_rOeuli_-AU",
  authDomain: "platzimusic-7921b.firebaseapp.com",
  databaseURL: "https://platzimusic-7921b.firebaseio.com",
  projectId: "platzimusic-7921b",
  storageBucket: "platzimusic-7921b.appspot.com",
  messagingSenderId: "582736492494"
};

firebase.initializeApp(config);
const firebaseAuth = firebase.auth();

export default class LoginView extends Component {

  state = {
    email: '', 
    password: '',
    isLoggedIn: false,
  }

  createUser(email, password) {
    firebaseAuth.createUserWithEmailAndPassword(email, password).then(() => {
        // Sign-out successful.
        this.setState({ email, password, isLoggedIn: true })
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  handleLoginClick = () => {
    const email = this.state.email
    const password = this.state.password
    firebaseAuth.signInWithEmailAndPassword(email, password).then(() => {
        // Sign-out successful.
        this.setState({ email, password, isLoggedIn: true })
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.warn(errorMessage)
    });
  }

  handleLogoutClick = () => {
    firebaseAuth.signOut().then(() => {
      // Sign-out successful.
      this.setState({ email: '', password: '', isLoggedIn: false })
    }).catch(function(error) {
      // An error happened.
    });
  }

  componentWillMount() {
    this.handleLoginClick()
  }

  /*handelLoginFinished = (error, result) => {
    if (error) {
      console.eror("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          //alert(data.accessToken.toString())
          Actions.home()
        }
      )
    }
  }*/

  handleEmail = (text) => {
    this.setState({ email: text })
  }

  handlePassword = (text) => {
    this.setState({ password: text })
  }

  render() {    
    let isLoggedIn = this.state.isLoggedIn;
    let button = null;
    
    if (!isLoggedIn) {
      button = 
        <View style={{ padding: 10 }}>
          <TextInput style={styles.input}
             underlineColorAndroid = "transparent"
             placeholder = "Email"
             placeholderTextColor = "#9a73ef"
             autoCapitalize = "none"
             onChangeText = {this.handleEmail}
            />
          <TextInput style={styles.input}
             underlineColorAndroid = "transparent"
             placeholder = "Password"
             placeholderTextColor = "#9a73ef"
             autoCapitalize = "none"
             secureTextEntry={true}
             onChangeText = {this.handlePassword}
            />
          <View style={{ alignItems: 'center', }}>
            <Button style={{ alignItems: 'center', }} onPress={this.handleLoginClick} title='Login' color='#841584' />
          </View>
        </View>
    } else {
      button = 
        <View style={{ padding: 10, alignItems: 'center' }} >
          <Text style={styles.welcome}>{this.state.email}</Text>
          <Button onPress={this.handleLogoutClick} title='Logout' color='#841584' />
          <Text> {"\n"} </Text>
          <Button onPress={this.handleNext} title='Seguir' />
        </View>
    }

    return (
      <View style={{flex: 1, backgroundColor: 'lightgray', justifyContent: 'center',}}>
        <View style={styles.container}>
          <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
            {/*<LoginButton
            readPermissions={['publish_profile', 'email']}
            onLoginFinished={this.handelLoginFinished}
            onLogoutFinished={() => alert("logout.")}/>*/}
          
        </View>
        { button }
      </View>
    );
  }

  handleNext = () => {
    Actions.home()
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: 'black',
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
});
