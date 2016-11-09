import React, { Component } from 'react';
import { StyleSheet, ListView, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import { getFavoriteAccount, getCashBalancesQueryResults } from '../../selectors';
import { selectFavoriteAccount } from '../../actions';

class BalancesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: null
    };
  }

  asJson() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ds.cloneWithRows(this.props.results.toJS());
  }

  amountFormatter(row) {
    const format = '0,0[.]00';
    const currencies = {
      EUR: '€',
      USD: '$',
      GBP: '£',
      JPY: '¥'
    };

    let symbol = currencies[row.currency];
    if (symbol === undefined) {
      symbol = row.currency;
    }

    return `${numeral(row.amount).format(format)} ${symbol}`;
  }

  dateFormatter(cell) {
    return moment.unix(cell / 1000).format('DD/MM/YYYY');
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  render() {
    if (!this.props.results || this.props.results.size === 0) {
      return (
        <View>
          <Text>No rows available</Text>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <View style={[styles.section, styles.row]}>
          <Text style={[styles.accountid, styles.sectionText]}>Id</Text>
          <Text style={[styles.accountname, styles.sectionText]}>Name</Text>
          <Text style={[styles.amount, styles.sectionText]}>Amount</Text>
        </View>
        <ScrollView style={styles.main}>
          <ListView
            automaticallyAdjustContentInsets={false}
            renderSeparator={this.renderSeparator}
            dataSource={this.asJson()}
            renderRow={(child) =>
              <View>
                <View style={styles.row}>
                  <Text style={styles.accountid}>{child.account}</Text>
                  <Text style={styles.accountname} numberOfLines={2}>{child.accountName}</Text>
                  <Text 
                    style={[styles.amount, { color: child.amount > 0 ? 'black' : 'red' }]}
                  >{this.amountFormatter(child)}</Text>
                </View>
              </View>
            }
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 8,
    marginBottom: 16
  },
  section: {
    backgroundColor: '#00a5c0'
  },
  sectionText: {
    color: '#fff',
    fontSize: 15
  },
  accountid: {
    flex: 1, 
    textAlign: 'right', 
    paddingRight: 20,
    fontSize: 16
  },
  accountname: {
    flex: 2,
    fontSize: 16
  },
  amount: {
    flex: 2,
    fontSize: 16,
    textAlign: 'right',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row', 
    padding: 5
  }
});

const mapStateToProps = (state) => {
  return {
    results: getCashBalancesQueryResults(state),
    favoriteAccount: getFavoriteAccount(state)
  };
};

export default connect(mapStateToProps, { selectFavoriteAccount })(BalancesList);
