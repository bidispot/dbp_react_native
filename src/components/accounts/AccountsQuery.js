import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Picker } from 'react-native';
import { connect } from 'react-redux';
import { queryAccounts } from '../../actions';
import { getAccountsQueryParameters, getIsAccountsQuerying } from '../../selectors';
import { MyPicker } from '../../framework/components/MyPicker';
import { Button } from '../../framework/components/Button';

class Accounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      paramAccount: props.queryParameters.account || '',
      paramName: props.queryParameters.name || '',
      paramCurrency: props.queryParameters.currency || ALL
    };

    this.onAccountParameterChange = this.onAccountParameterChange.bind(this);
    this.onNameParameterChange = this.onNameParameterChange.bind(this);
    this.onCurrencyParameterChange = this.onCurrencyParameterChange.bind(this);
    this.onQuerySubmit = this.onQuerySubmit.bind(this);
    this.onQueryReset = this.onQueryReset.bind(this);
  }

  onQuerySubmit() {
    this.props.queryAccounts(this.buildQueryParametersFromLocalState());
  }

  onQueryReset() {
    this.setState({
      paramAccount: '',
      paramName: '',
      paramCurrency: ALL
    });
  }

  onAccountParameterChange(event) {
    this.setState({ paramAccount: event.nativeEvent.text });
  }

  onNameParameterChange(event) {
    this.setState({ paramName: event.nativeEvent.text });
  }

  onCurrencyParameterChange(paramCurrency) {
    this.setState({ paramCurrency });
  }

  buildQueryParametersFromLocalState() {
    return {
      account: this.state.paramAccount !== '' ? this.state.paramAccount : null,
      name: this.state.paramName !== '' ? this.state.paramName : null,
      currency: this.state.paramCurrency !== ALL ? this.state.paramCurrency : null
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
          <View style={styles.row}>
            <View style={styles.field}>
              <TextInput
                style={[styles.inputText, styles.input]}
                placeholder='Account name e.g. UBS'
                value={this.state.paramName}
                onChange={this.onNameParameterChange}
              />
            </View>
          </View>
          <View style={styles.row}>
            <MyPicker
              textStyle={styles.inputText}
              style={[styles.dropdown, styles.input]}
              selectedValue={this.state.paramCurrency}
              onValueChange={this.onCurrencyParameterChange}
            >
              <Picker.Item label='All currencies' value='ALL' />
              <Picker.Item label='Euro (EUR - €)' value='EUR' />
              <Picker.Item label='US Dollar (USD - $)' value='USD' />
              <Picker.Item label='British Pound (GBP - £)' value='GBP' />
            </MyPicker>
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

const ALL = 'ALL';

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
    padding: 4
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
    queryParameters: getAccountsQueryParameters(state),
    isQuerying: getIsAccountsQuerying(state)
  };
};

export default connect(mapStateToProps, { queryAccounts })(Accounts);

