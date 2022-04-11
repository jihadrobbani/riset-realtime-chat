const initialState = {
  isLoggedIn: false,
  loginLoading: false,
  loginSuccess: false,
  loginError: false,
  token: '',
  user: {},
  getUsersLoading: false,
  getUsersSuccess: false,
  getUsersError: false,
  users: [],
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
        token: payload.token,
        user: payload.user,
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
    case 'GET_USERS_LOADING':
      return {
        ...state,
        getUsersLoading: true,
        getUsersSuccess: false,
        getUsersError: false,
        users: [],
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        getUsersLoading: false,
        getUsersSuccess: true,
        getUsersError: false,
        users: payload,
      };
    case 'GET_USERS_ERROR':
      return {
        ...state,
        getUsersLoading: false,
        getUsersSuccess: false,
        getUsersError: true,
      };
    default:
      return state;
  }
};
