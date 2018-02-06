/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  //ListView,
  FlatList, 
} from 'react-native';
import ArtistBox from './ArtistBox';

export default class ArtistList extends Component {
  /*constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(props.artists),
    };
    
  }*/
  renderItem({ item, index }) {
    return <ArtistBox artist={item} />;
  }

  render() {   
    return (
      /*<ListView style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(artist) => <ArtistBox artist={artist} />}
      />*/
      <FlatList
        data={this.props.artists}
        renderItem={this.renderItem}
      />
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
