import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class BackgroundImage extends Component {
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.banner} source={this.props.source} />
        <View style={styles.content}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 160,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#00a5c0'
  },
  banner: {
    height: 120,
    width: 280,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 300,
    paddingLeft: 8,
    paddingBottom: 20
  }
});

