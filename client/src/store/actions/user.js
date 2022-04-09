import axios from '../../config/axios';

export const login = username => async (dispatch, getState) => {
  dispatch({ type: 'LOGIN_LOADING' });
  try {
    const { data } = await axios({
      method: 'POST',
      url: 'login',
      data: { username },
    });
    dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  } catch (e) {
    dispatch({ type: 'LOGIN_ERROR' });
    console.log(e);
  }
};

export const logout = username => async (dispatch, getState) => {
  dispatch({ type: 'LOGIN_LOADING' });
  try {
    await axios({
      method: 'POST',
      url: 'logout',
      data: { username },
    });
    dispatch({ type: 'LOGOUT' });
  } catch (e) {
    dispatch({ type: 'LOGIN_ERROR' });
    console.log(e);
  }
};
