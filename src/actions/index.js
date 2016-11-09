import { Schemas } from '../middleware/schema';
import { API_CALL_INFO } from '../middleware/api';

export const QUERY_BALANCES = 'QUERY_BALANCES';
export const QUERY_BALANCES_SUCCESS = 'QUERY_BALANCES_SUCCESS';
export const QUERY_BALANCES_FAILURE = 'QUERY_BALANCES_FAILURE';
export const QUERY_CHART_BALANCES = 'QUERY_CHART_BALANCES';
export const QUERY_CHART_BALANCES_SUCCESS = 'QUERY_CHART_BALANCES_SUCCESS';
export const QUERY_CHART_BALANCES_FAILURE = 'QUERY_CHART_BALANCES_FAILURE';
export const QUERY_ACCOUNTS = 'QUERY_ACCOUNTS';
export const QUERY_ACCOUNTS_SUCCESS = 'QUERY_ACCOUNTS_SUCCESS';
export const QUERY_ACCOUNTS_FAILURE = 'QUERY_ACCOUNTS_FAILURE';
export const RESET_ERRORS = 'RESET_ERRORS';
export const SELECT_FAVORITE_ACCOUNT = 'SELECT_FAVORITE_ACCOUNT';

const BALANCES_URL = 'balances/query';
const ACCOUNTS_URL = 'accounts/query';

function qBalances(params, 
  types = [QUERY_BALANCES, QUERY_BALANCES_SUCCESS, QUERY_BALANCES_FAILURE]) {
  return dispatch => {
    dispatch(resetErrors());

    dispatch({
      [API_CALL_INFO]: {
        actionTypes: types,
        endpoint: BALANCES_URL,
        parameters: params,
        schema: Schemas.BALANCE_ARRAY
      }
    });
  };
}

/**
 * Runs a query against cash balances for the query screen
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [account string, dateFrom number, dateTo number]
 * @return {object}         The action created for a query on cash balances
 */
export function queryBalances(params) {
  return qBalances(params, [QUERY_BALANCES, QUERY_BALANCES_SUCCESS, QUERY_BALANCES_FAILURE]);
}

/**
 * Runs the query against cash balances for the cash balances chart
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [account string, dateFrom number, dateTo number]
 * @return {object}         The action created for a query on cash balances
 */
export function queryChartBalances(params) {
  return qBalances(params, [QUERY_CHART_BALANCES, QUERY_CHART_BALANCES_SUCCESS, QUERY_CHART_BALANCES_FAILURE]);
}

/**
 * Runs a query against accounts
 * @param  {object} params  The query string parameters in form of a JSON object.
 *                          Supported properties: [account string, name string, currency string]
 * @return {object}         The action created for a query on accounts
 */
export function queryAccounts(params) {
  return dispatch => {
    dispatch(resetErrors());

    dispatch({
      [API_CALL_INFO]: {
        actionTypes: [QUERY_ACCOUNTS, QUERY_ACCOUNTS_SUCCESS, QUERY_ACCOUNTS_FAILURE],
        endpoint: ACCOUNTS_URL,
        parameters: params,
        schema: Schemas.ACCOUNT_ARRAY
      }
    });
  };
}

export function resetErrors() {
  return {
    type: RESET_ERRORS
  };
}

export function selectFavoriteAccount(account) {
  return dispatch => {
    dispatch(resetErrors());
    dispatch(selectAccount(account));
    //const accountId = account.account;
    dispatch(queryChartBalances({ account }));
  };
}

export function selectAccount(account) {
  return {
    type: SELECT_FAVORITE_ACCOUNT,
    account
  };
}
