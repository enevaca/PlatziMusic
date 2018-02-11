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

import { Router, Stack, Scene } from 'react-native-router-flux';

import LoginView from './LoginView';
import HomeView from './HomeView';
import ArtistDetailView from './ArtistDetailView';

console.ignoreYellowBox = [
  'Setting a timer'
]

export default class App extends Component {
  render() {    
    const isAndroid = Platform.OS === 'android'

    return (
      <Router>
        <Stack key="root">
          {<Scene key="login" component={LoginView} hideNavBar/>}
          <Scene key="home" component={HomeView} hideNavBar/>
          <Scene key="artistDetail" component={ArtistDetailView} hideNavBar={isAndroid} />
        </Stack>
      </Router>
    );
  }
}