import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import dateUtils from '../../utils/dates';
import { queryBalances } from '../../actions';
import { getCashBalancesQueryParameters, getIsCashBalancesQuerying } from '../../selectors';
import { Button } from '../../framework/components/Button';

class Balances extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paramAccount: props.queryParameters.account || '',
      paramDateFrom: props.queryParameters.dateFrom,
      paramDateTo: props.queryParameters.dateTo
    };

    this.onAccountParameterChange = this.onAccountParameterChange.bind(this);
    this.onDateFromParameterChange = this.onDateFromParameterChange.bind(this);
    this.onDateToParameterChange = this.onDateToParameterChange.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.onQueryReset = this.onQueryReset.bind(this);
  }

  onQuerySubmit() {
    this.props.queryBalances(this.buildQueryParametersFromLocalState());
  }

  onQueryReset() {
    this.setState({
      paramAccount: '',
      paramDateFrom: null,
      paramDateTo: null
    });
  }

  onAccountParameterChange(paramAccount) {
    this.setState({ paramAccount });
  }

  onDateFromParameterChange(date) {
    this.setState({ 
      paramDateFrom: dateUtils.convertToUTCStartOfDay(dateUtils.parseDateToMillis(date))
    });
  }

  onDateToParameterChange(date) {
    this.setState({ 
      paramDateTo: dateUtils.convertToUTCEndOfDay(dateUtils.parseDateToMillis(date)) 
    });
  }

  buildQueryParametersFromLocalState() {
    return {
      account: this.state.paramAccount !== '' ? this.state.paramAccount : null,
      dateFrom: this.state.paramDateFrom,
      dateTo: this.state.paramDateTo
    };
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.row}>
            <View style={styles.field}>
              <TextInput
                style={[styles.inputText, styles.input]}
                placeholder='Account e.g. 12345'
                value={this.state.paramAccount}
                onChange={this.onAccountParameterChange}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttons}>
          <Button onPress={this.onQuerySubmit} main>Query</Button>
          <Button onPress={this.onQueryReset}>Reset</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    margin: 4
  },
  buttons: {
    flexDirection: 'row',
    margin: 4
  },
  label: {
    flex: 1,
    alignItems: 'flex-start',
  },
  field: {
    flex: 3,
    alignItems: 'center'
  },
  labelText: {
    color: '#333'
  },
  inputText: {
    color: '#333',
    textAlign: 'left',
    alignItems: 'flex-start',
    fontSize: 16
  },
  dropdown: {
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5
  }
});

const mapStateToProps = (state) => {
  return {
    queryParameters: getCashBalancesQueryParameters(state),
    isQuerying: getIsCashBalancesQuerying(state)
  };
};

export default connect(mapStateToProps, { queryBalances })(Balances);
