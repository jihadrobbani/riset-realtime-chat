import { combineReducers } from 'redux';

import chat from './chat';
import user from './user';
import room from './room';

const reducers = combineReducers({ chat, user, room });

export default reducers;
