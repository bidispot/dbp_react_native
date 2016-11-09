import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Query from './AccountsQuery';
import List from './AccountsList';

const Accounts = () => {
  return (
    <View style={styles.main}>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text style={styles.title} numberOfLines={1}>Query</Text>
        </View>
        <View style={styles.cardContent}>
          <Query />
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTitle}>
          <Text style={styles.title} numberOfLines={1}>List</Text>
        </View>
        <View style={styles.cardContent}>
          <List />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column'
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    margin: 8,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 4,
  },
  cardTitle: {
    height: 40,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#333'
  },
  cardContent: {
    padding: 8,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#eee'
  }
});

export default Accounts;
