import { Record, List } from 'immutable';
import { BalanceQuery } from './model';
import { QUERY_BALANCES, QUERY_BALANCES_SUCCESS, QUERY_BALANCES_FAILURE } from '../actions/index';

const StateRecord = new Record({
  isQuerying: false,
  queryResults: new List(),
  queryParameters: new BalanceQuery()
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default (state = INITIAL_STATE, action) => {
  const { parameters } = action;

  switch (action.type) {
    case QUERY_BALANCES:
      return state
        .set('isQuerying', true)
        .update('queryParameters', (queryParameters) =>
          queryParameters
            .set('account', parameters.account)
            .set('dateFrom', parameters.dateFrom)
            .set('dateTo', parameters.dateTo));
    case QUERY_BALANCES_SUCCESS:
      const { response } = action;
      if (response) {
        const result = response.result || [];

        // New query results
        const queryResults = new List(result);
        return state
          .set('isQuerying', false)
          .set('queryResults', queryResults);
      } 
      return state;
    case QUERY_BALANCES_FAILURE:
      return state
        .set('isQuerying', false);
    default:
      return state;
  }
};
