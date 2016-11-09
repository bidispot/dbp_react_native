import { Record, List } from 'immutable';
import { AccountQuery } from './model';
import { QUERY_ACCOUNTS, QUERY_ACCOUNTS_SUCCESS, QUERY_ACCOUNTS_FAILURE } from '../actions/index';

const StateRecord = new Record({
  isQuerying: false,
  queryResults: new List(),
  queryParameters: new AccountQuery()
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default (state = INITIAL_STATE, action) => {
  const { parameters } = action;

  switch (action.type) {
    case QUERY_ACCOUNTS:
      return state
        .set('isQuerying', true)
        .update('queryParameters', (queryParameters) =>
          queryParameters
            .set('account', parameters.account)
            .set('name', parameters.name)
            .set('currency', parameters.currency));
    case QUERY_ACCOUNTS_SUCCESS:
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
    case QUERY_ACCOUNTS_FAILURE:
      return state
        .set('isQuerying', false);
    default:
      return state;
  }
};
