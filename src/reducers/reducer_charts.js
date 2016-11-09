import { Record, List } from 'immutable';
import { BalanceQuery } from './model';
import { 
  SELECT_FAVORITE_ACCOUNT, 
  QUERY_CHART_BALANCES, 
  QUERY_CHART_BALANCES_SUCCESS, 
  QUERY_CHART_BALANCES_FAILURE 
} from '../actions/index';

const StateRecord = new Record({
  isQuerying: false,
  queryResults: new List(),
  queryParameters: new BalanceQuery(),
  favoriteAccount: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default (state = INITIAL_STATE, action) => {
  const { parameters } = action;

  switch (action.type) {
    case QUERY_CHART_BALANCES:
      return state
        .set('isQuerying', true)
        .update('queryParameters', (queryParameters) =>
          queryParameters
            .set('account', parameters.account)
            .set('dateFrom', parameters.dateFrom)
            .set('dateTo', parameters.dateTo));
    case QUERY_CHART_BALANCES_SUCCESS:
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
    case QUERY_CHART_BALANCES_FAILURE:
      return state
        .set('isQuerying', false);
    case SELECT_FAVORITE_ACCOUNT:
      return state.set('favoriteAccount', action.account);
    default:
      return state;
  }
}
