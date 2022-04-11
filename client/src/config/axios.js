import Axios from 'axios';
import { store } from '../store';

const { token } = store.getState().user;

const axios = Axios.create({
  // baseURL: 'http://localhost:9000/',
  baseURL: 'https://riset-realtime-chat.herokuapp.com/',
});

export default axios;
