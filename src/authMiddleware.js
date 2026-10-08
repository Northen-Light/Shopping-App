import { storage } from './asyncStorage';

export const onLoginAction = dispatch => {
  const onLoginCallback = auth => storage.setItem('auth', JSON.stringify(auth));

  dispatch({ type: 'login', userName: 'Prateek', onLoginCallback });
};

export const onLogoutAction = dispatch => {
  const onLogoutCallback = auth =>
    storage.setItem('auth', JSON.stringify(auth));

  dispatch({ type: 'logout', onLogoutCallback });
};

export const onRestoreStateFromStorageAction = (dispatch, auth) => {
  dispatch({ type: 'restore', auth });
};
