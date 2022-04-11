import axios from '../../config/axios';

export const getChats = roomId => async (dispatch, getState) => {
  dispatch({ type: 'GET_CHATS_LOADING' });
  try {
    const { data } = await axios({
      method: 'GET',
      url: `chats/${roomId}`,
    });
    dispatch({ type: 'GET_CHATS_SUCCESS', payload: data.payload });
  } catch (e) {
    dispatch({ type: 'GET_CHATS_ERROR' });
    console.log(e);
  }
};

export const sendChat = (roomId, text) => async (dispatch, getState) => {
  dispatch({ type: 'SEND_CHAT_LOADING' });
  const { token } = getState().user;
  try {
    const { data } = await axios({
      method: 'POST',
      url: 'chats/send',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        roomId,
        text,
      },
    });
    dispatch({ type: 'SEND_CHAT_SUCCESS' });
  } catch (e) {
    dispatch({ type: 'SEND_CHAT_ERROR' });
    console.log('ere', e);
  }
};
