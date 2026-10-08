import { storage } from './asyncStorage';

export const onShoppingStoreIncrementAction = (dispatch, index) => {
  const onIncrementCallback = shoppingStore =>
    storage.setItem('shoppingStore', JSON.stringify(shoppingStore));

  dispatch({ type: 'increment', index, onIncrementCallback });
};

export const onShoppingStoreDecrementAction = (dispatch, index) => {
  const onDecrementCallback = shoppingStore =>
    storage.setItem('shoppingStore', JSON.stringify(shoppingStore));

  dispatch({ type: 'decrement', index, onDecrementCallback });
};

export const onShoppingStoreResetAction = dispatch => {
  const onResetCallback = () => storage.removeItem('shoppingStore');

  dispatch({ type: 'reset', onResetCallback });
};

export const onShoppingStoreRestoreAction = (dispatch, shoppingStore) => {
  dispatch({ type: 'restore', shoppingStore });
};
