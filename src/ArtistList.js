/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  //FlatList, 
} from 'react-native';
import ArtistBox from './ArtistBox';

export default class ArtistList extends Component {
  //Para ListView
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      dataSource: ds
    }
  }

  //Para ListView
  componentDidMount() {
    this.updateDataSource(this.props.artists)    
  }

  /*state = {
    dataSource: this.props.artists
  }*/

  componentWillReceiveProps(newProps) {
    if (newProps.artists !== this.props.artists) {
      this.updateDataSource(newProps.artists)
    }
  }

  updateDataSource = data => {
    this.setState({
        //dataSource: data
        dataSource: this.state.dataSource.cloneWithRows(data) //Para ListView
      })
  }

  renderItem({ item, index }) {
    return <ArtistBox artist={item} />;
  }

  render() {   
    return (
      //Para ListView
      <ListView style={styles.container}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(artist) => <ArtistBox artist={artist} />}
      />
      /*<FlatList
        data={this.state.dataSource}
        renderItem={this.renderItem}
      />*/
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
