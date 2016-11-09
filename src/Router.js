import React, { Component } from 'react';
import { Scene, Router, Reducer } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import NavDrawer from './NavDrawer.js';
import Dashboard from './components/Dashboard.js';
import Accounts from './components/accounts/Accounts.js';
import Balances from './components/balances/Balances.js';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

export default class RouterComponent extends Component {
  
  render() {
    return (
      <Router createReducer={reducerCreate}>
          <Scene key='drawer' component={NavDrawer} open={false}>
            <Scene key='main' tabs>
              <Scene 
                key='dashboard'
                component={Dashboard}
                navigationBarStyle={styles.navBar}
                style={styles.general} 
                titleStyle={styles.title}
                title='Dashboard'
                drawerImage={require('../assets/img/menu_icon.png')}
                //initial
              />
              <Scene 
                key='accounts'
                component={Accounts}
                navigationBarStyle={styles.navBar}
                style={styles.general} 
                titleStyle={styles.title}
                title='Accounts'
                drawerImage={require('../assets/img/menu_icon.png')}
                initial
              />
              <Scene 
                key='balances'
                component={Balances}
                navigationBarStyle={styles.navBar}
                style={styles.general} 
                titleStyle={styles.title}
                title='Balances'
                drawerImage={require('../assets/img/menu_icon.png')}
              />
            </Scene>
          </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  general: {
    backgroundColor: '#00a5c0',
    paddingTop: 60
  },
  navBar: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 20
  }
});
