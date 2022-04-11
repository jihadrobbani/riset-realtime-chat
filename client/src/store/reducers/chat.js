const initialState = {
  chats: [],
  getChatsLoading: false,
  getChatSuccess: false,
  getChatError: false,
  sendChatLoading: false,
  sendChatSuccess: false,
  sendChatError: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_CHATS_LOADING':
      return {
        ...state,
        chats: [],
        getChatsLoading: true,
        getChatSuccess: false,
        getChatError: false,
      };
    case 'GET_CHATS_SUCCESS':
      return {
        ...state,
        chats: payload,
        getChatsLoading: false,
        getChatSuccess: true,
        getChatError: false,
      };
    case 'GET_CHATS_ERROR':
      return {
        ...state,
        getChatsLoading: false,
        getChatSuccess: false,
        getChatError: true,
      };
    case 'SEND_CHAT_LOADING':
      return {
        ...state,
        sendChatLoading: true,
        sendChatSuccess: false,
        sendChatError: false,
      };
    case 'SEND_CHAT_SUCCESS':
      return {
        ...state,
        sendChatLoading: false,
        sendChatSuccess: true,
        sendChatError: false,
      };
    case 'SEND_CHAT_ERROR':
      return {
        ...state,
        sendChatLoading: false,
        sendChatSuccess: true,
        sendChatError: false,
      };
    default:
      return state;
  }
};
