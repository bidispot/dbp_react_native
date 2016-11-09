import React, { Component } from 'react';
import { StyleSheet, ListView, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getFavoriteAccount, getAccountsQueryResults } from '../../selectors';
import { selectFavoriteAccount } from '../../actions';

class AccountsList extends Component {

  constructor(props) {
    super(props);

    this.state = { showModal: false };

    this.onSelectRow = this.onSelectRow.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.displayFavoriteAccount = this.displayFavoriteAccount.bind(this);
    this.renderPopupText = this.renderPopupText.bind(this);
  }

  onSelectRow(row) {
    this.openModal(row);
    this.props.selectFavoriteAccount(row);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  displayFavoriteAccount() {
    if (this.props.favoriteAccount) {
      return (
        <Text>Favorite account: {this.props.favoriteAccount.name}</Text>
      );
    }
    return '';
  }

  asJson() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ds.cloneWithRows(this.props.results.toJS());
  }

  renderPopupText() {
    if (this.props.favoriteAccount) {
      return (
        `Account ${this.props.favoriteAccount.accountName} is the new favorite.`
      );
    }
    return ('');
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
          <Text style={[styles.accountid, styles.sectionText]}>Account id</Text>
          <Text style={[styles.accountname, styles.sectionText]}>Account name</Text>
        </View>
        <ScrollView style={styles.main}>
          <ListView
            automaticallyAdjustContentInsets={false}
            renderSeparator={this.renderSeparator}
            dataSource={this.asJson()}
            renderRow={(child) =>
              <View style={styles.row}>
                <Text style={styles.accountid}>{child.account}</Text>
                <Text style={styles.accountname}>{child.name}</Text>
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
    flex: 3,
    fontSize: 16
  },
  row: {
    flexDirection: 'row', 
    padding: 5
  }
});

const mapStateToProps = (state) => {
  return {
    results: getAccountsQueryResults(state),
    favoriteAccount: getFavoriteAccount(state)
  };
};

export default connect(mapStateToProps, { selectFavoriteAccount })(AccountsList);
