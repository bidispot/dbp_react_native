import { createSelector } from 'reselect';

const getCashBalances = (state) => state.database.get('balances');

const getCashBalanceResultIds = (state) => state.balances.queryResults;

export const getCashBalancesQueryParameters = (state) => state.balances.queryParameters;

export const getIsCashBalancesQuerying = (state) => state.balances.isQuerying;

// Memoized selector that receives the state as argument and returns the list of
// Balance objects representing the Cash Balances query results.
export const getCashBalancesQueryResults = createSelector(
  [getCashBalances, getCashBalanceResultIds],
  (balances, ids) => {
    return ids.map((id) => balances.get(id));
  }
);

const getChartResultIds = (state) => state.charts.queryResults;

export const getChartBalancesQueryParameters = (state) => state.charts.queryParameters;

export const getChartBalancesQueryResults = createSelector(
  [getCashBalances, getChartResultIds],
  (balances, ids) => {
    return ids.map((id) => balances.get(id));
  }
);

const getAccounts = (state) => state.database.get('accounts');

const getAccountsResultIds = (state) => state.accounts.queryResults;

export const getAccountsQueryParameters = (state) => state.accounts.queryParameters;

export const getIsAccountsQuerying = (state) => state.accounts.isQuerying;

// Memoized selector that receives the state as argument and returns the list of
// Account objects representing the Accounts query results.
export const getAccountsQueryResults = createSelector(
  [getAccounts, getAccountsResultIds],
  (accounts, ids) => {
    return ids.map((id) => accounts.get(id));
  }
);

export const getFavoriteAccount = (state) => state.charts.favoriteAccount;
