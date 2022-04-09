const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  loginSuccess: false,
  loginError: false,
  user: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOGIN_LOADING':
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: true,
        loginSuccess: false,
        loginError: false,
        user: {},
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        loginLoading: false,
        loginSuccess: true,
        loginError: false,
        user: payload,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: false,
        loginSuccess: false,
        loginError: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: false,
        loginSuccess: false,
        loginError: false,
        user: {},
      };
    default:
      return state;
  }
};
