import { storage } from './asyncStorage';
import { AUTH_KEY } from './constants';

export const onLoginAction = dispatch => {
  const onLoginCallback = auth =>
    storage.setItem(AUTH_KEY, JSON.stringify(auth));

  dispatch({ type: 'login', userName: 'Prateek', onLoginCallback });
};

export const onLogoutAction = dispatch => {
  const onLogoutCallback = auth =>
    storage.setItem(AUTH_KEY, JSON.stringify(auth));

  dispatch({ type: 'logout', onLogoutCallback });
};

export const onRestoreStateFromStorageAction = (dispatch, auth) => {
  dispatch({ type: 'restore', auth });
};
