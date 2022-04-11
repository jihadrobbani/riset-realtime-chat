const initialState = {
  room: {},
  getRoomLoading: false,
  getRoomSuccess: false,
  getRoomError: false,
  partner: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_ROOM_LOADING':
      return {
        ...state,
        room: {},
        partner: {},
        getRoomLoading: true,
        getRoomSuccess: false,
        getRoomError: false,
      };
    case 'GET_ROOM_SUCCESS':
      return {
        ...state,
        room: payload.room,
        partner: payload.partner,
        getRoomLoading: false,
        getRoomSuccess: true,
        getRoomError: false,
      };
    case 'GET_ROOM_ERROR':
      return {
        ...state,
        getRoomLoading: false,
        getRoomSuccess: false,
        getRoomError: true,
      };
    case 'REFRESH_ROOM_STATE':
      return {
        ...state,
        getRoomLoading: false,
        getRoomSuccess: false,
        getRoomError: false,
      };
    case 'RESET_ROOM_ACTIVE':
      return {
        ...state,
        room: {},
        partner: {},
        getRoomLoading: false,
        getRoomSuccess: false,
        getRoomError: false,
      };
    default:
      return state;
  }
};
