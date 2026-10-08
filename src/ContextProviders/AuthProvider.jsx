import { useEffect, useReducer } from 'react';
import { createSafeContext } from '../context';
import { storage } from '../asyncStorage';
import { onRestoreStateFromStorageAction } from '../middlewares/authMiddleware';
import { AUTH_KEY } from '../constants';

const [AuthContext, useAuth] = createSafeContext();

const INIT_AUTH_STATE = {
  user: {
    userName: '',
    isLoggedIn: false,
  },
};

function authReducer(authState, action) {
  switch (action.type) {
    case 'login': {
      const state = { ...authState };

      state.user.userName = action.userName;
      state.user.isLoggedIn = true;

      action.onLoginCallback(state);

      return state;
    }

    case 'logout': {
      const state = { ...authState };

      state.user.userName = '';
      state.user.isLoggedIn = false;

      action.onLogoutCallback(state);

      return state;
    }

    case 'restore': {
      let state = { ...action.auth };

      return state;
    }
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, INIT_AUTH_STATE);

  useEffect(() => {
    storage.getItem(AUTH_KEY).then(authString => {
      if (authString) {
        onRestoreStateFromStorageAction(dispatch, JSON.parse(authString));
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };
