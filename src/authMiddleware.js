export const loginAction = dispatch => {
  dispatch({ type: 'login', userName: 'Prateek' });
};

export const logoutAction = dispatch => {
  dispatch({ type: 'logout' });
};
