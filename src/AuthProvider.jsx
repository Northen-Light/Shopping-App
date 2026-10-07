import { useReducer } from 'react';
import { createSafeContext } from './context';

const [AuthContext, useAuth] = createSafeContext();

const INIT_AUTH_STATE = {
  userName: '',
  isLoggedIn: false,
};

function authReducer(authState, action) {
  switch (action.type) {
    case 'login': {
      const state = { ...authState };

      state.userName = action.userName;
      state.isLoggedIn = true;
      return state;
    }

    case 'logout': {
      const state = { ...authState };

      state.userName = '';
      state.isLoggedIn = false;
      return state;
    }
  }
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(authReducer, INIT_AUTH_STATE);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };
