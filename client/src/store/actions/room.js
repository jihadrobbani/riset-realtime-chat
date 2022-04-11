import axios from '../../config/axios';

export const createOrFindRoom = userId => async (dispatch, getState) => {
  const { user } = getState().user;
  const userIds = [userId, user.id].sort();
  dispatch({ type: 'GET_ROOM_LOADING' });
  try {
    const { data: partner } = await axios({
      method: 'GET',
      url: `getUserById/${userId}`,
    });
    const { data: room } = await axios({
      method: 'POST',
      url: 'rooms/find',
      data: { userIds },
    });

    dispatch({
      type: 'GET_ROOM_SUCCESS',
      payload: { room: room.payload, partner: partner.payload },
    });
    setTimeout(() => {
      dispatch({ type: 'REFRESH_ROOM_STATE' });
    }, 1000);
  } catch (e) {
    console.log(e);
    dispatch({ type: 'GET_ROOM_ERROR' });
  }
};

export const resetRoomActive = () => (dispatch, getState) => {
  dispatch({ type: 'RESET_ROOM_ACTIVE' });
};
