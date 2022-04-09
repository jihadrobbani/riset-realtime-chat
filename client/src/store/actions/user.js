import axios from '../../config/axios';

export const login = username => async (dispatch, getState) => {
  try {
    const data = await axios({
      method: 'POST',
      url: 'https://riset-realtime-chat.herokuapp.com/login',
      data: { username },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

export const logout = username => (dispatch, getState) => {};
