export const onShoppingStoreIncrementAction = (dispatch, index) => {
  dispatch({ type: 'increment', index });
};

export const onShoppingStoreDecrementAction = (dispatch, index) => {
  dispatch({ type: 'decrement', index });
};

export const onShoppingStoreResetAction = dispatch => {
  dispatch({ type: 'reset' });
};
