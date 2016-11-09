import { Map } from 'immutable';
import { Balance, BalanceMap, Account, AccountMap } from './model';

const INITIAL_STATE = new Map({
  balances: new BalanceMap(),
  accounts: new AccountMap()
});

export default (state = INITIAL_STATE, action) => {
  if (action.response && action.response.entities) {
    // Entities are normalized --> convert them to ImmutableJS structures
    const { balances: balanceEntities, accounts: accountEntities } = action.response.entities || [];
    const balanceKeys = Object.keys(balanceEntities || []);
    const balanceRecords = new BalanceMap(balanceKeys.map(key =>
      [balanceEntities[key].id, new Balance(balanceEntities[key])]
      // super-important to use balanceEntities[key].id instead of key for the first
      // element because key is of type string due to Object.keys (and we want a number maybe)
    ));

    const accountKeys = Object.keys(accountEntities || []);
    const accountRecords = new AccountMap(accountKeys.map(key =>
      [accountEntities[key].id, new Account(accountEntities[key])]
    ));

    const records = new Map({
      balances: balanceRecords,
      accounts: accountRecords
    });

    // Merge them to the current state
    return state.mergeDeep(records);
  }

  return state;
};
