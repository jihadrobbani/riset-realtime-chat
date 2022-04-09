import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://riset-realtime-chat.herokuapp.com/',
});

export default axios;
