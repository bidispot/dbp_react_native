import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

class Dashboard extends Component {

  componentWillMount() {
    
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.title}>My indicators</Text>
        <Text style={styles.title}>My monitor</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 8
  }
});

const mapStateToProps = state => {
  // from selectors
  return {
    
  };
};


export default connect(mapStateToProps, {})(Dashboard);
