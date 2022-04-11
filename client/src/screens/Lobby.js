import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ViewBase,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { getUsers, logout } from '../store/actions/user';
import { createOrFindRoom } from '../store/actions/room';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    user,
    loginLoading,
    loginSuccess,
    loginError,
    getUsersLoading,
    getUsersSuccess,
    getUsersError,
    users,
  } = useSelector(state => state.user);
  const { room, getRoomLoading, getRoomSuccess, getRoomError } = useSelector(
    state => state.room,
  );

  const [allUser, setAllUser] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('https://riset-realtime-chat.herokuapp.com'));
    dispatch(getUsers());

    return () => {
      socket?.emit('logout', user);
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('login', user);
      socket.on('newUser', data => {
        console.log('data', data);
        const newUser = data?.filter(el => el.id != user.id) || [];
        setAllUser(newUser);
      });
    }

    return () => {
      socket?.emit('logout', user);
    };
  }, [socket]);

  const onPressChat = userId => {
    dispatch(createOrFindRoom(userId));
  };

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!loginLoading && !loginSuccess) {
      navigation.navigate('Home');
      socket?.emit('logout', user);
    }
  }, [loginLoading]);

  useEffect(() => {
    if (!getUsersLoading && getUsersSuccess) {
      setAllUser(users);
      console.log('fetching new user');
    }
  }, [getUsersLoading]);

  useEffect(() => {
    if (!getRoomLoading && getRoomSuccess) {
      navigation.navigate('Room');
    }
  }, [getRoomLoading]);

  return (
    <>
      <SafeAreaView />
      <View
        style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
        }}>
        <Text style={{ fontSize: 16 }}>
          Logged in as{' '}
          <Text style={{ fontWeight: 'bold' }}>{user?.username}</Text>
        </Text>
        <TouchableOpacity
          onPress={onLogout}
          style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{}}>
        {allUser.map((usr, idx) => (
          <TouchableOpacity
            onPress={() => onPressChat(usr.id)}
            key={usr.id}
            style={{
              backgroundColor: idx % 2 === 0 ? '#d4d4d3' : '#eae9e9',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 16, margin: 10 }}>
              Chat with {usr.username}
            </Text>
            <Text style={{ fontSize: 14, margin: 10, color: 'green' }}>
              {usr.isOnline ? 'online' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};
