import axios from '../../config/axios';

export const login = username => async (dispatch, getState) => {
  dispatch({ type: 'LOGIN_LOADING' });
  try {
    const { data } = await axios({
      method: 'POST',
      url: 'login',
      data: { username },
    });
    const { token } = data;

    const { data: user } = await axios({
      method: 'GET',
      url: 'getUser',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user: user.payload } });
  } catch (e) {
    dispatch({ type: 'LOGIN_ERROR' });
    console.log(e);
  }
};

export const logout = () => async (dispatch, getState) => {
  dispatch({ type: 'LOGIN_LOADING' });
  try {
    setTimeout(() => {
      dispatch({ type: 'LOGOUT' });
    }, 1000);
  } catch (e) {
    dispatch({ type: 'LOGIN_ERROR' });
    console.log(e);
  }
};

export const getUsers = () => async (dispatch, getState) => {
  dispatch({ type: 'GET_USERS_LOADING' });
  const { token } = getState().user;
  try {
    const { data } = await axios({
      method: 'GET',
      url: `getUsers`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-control': 'no-cache',
      },
    });
    console.log('user', data.payload);
    dispatch({ type: 'GET_USERS_SUCCESS', payload: data.payload });
  } catch (e) {
    dispatch({ type: 'GET_USERS_ERROR' });
    console.log(e);
  }
};
