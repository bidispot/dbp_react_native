import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import BackgroundImage from './components/custom/BackgroundImage';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const SideMenu = (props, context) => {
  const drawer = context.drawer;
  return (
    <View style={[styles.container, props.sceneStyle]}>
      <BackgroundImage source={require('../assets/img/dbglogo.png')}>
        <Text style={styles.titleText}>DBP Demo</Text>
        <Text style={styles.titleSubText}>Powered by React Native</Text>
      </BackgroundImage>
      <View style={styles.menu}>
        <Button style={styles.button} onPress={() => { drawer.close(); Actions.dashboard(); }}>
          Dashboard
        </Button>
        <Button style={styles.button} onPress={() => { drawer.close(); Actions.accounts(); }}>
          Accounts
        </Button>
        <Button style={styles.button} onPress={() => { drawer.close(); Actions.balances(); }}>
          Balances
        </Button>
      </View>
    </View>
  );
};

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: '#00a5c0',
  },
  menu: {
  },
  button: {
    color: '#fff',
    fontSize: 16,
    margin: 8,
    paddingTop: 16,
    textAlign: 'left'
  },
  titleText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'left'
  },
  titleSubText: {
    color: '#333',
    fontSize: 12
  }
});

export default SideMenu;
