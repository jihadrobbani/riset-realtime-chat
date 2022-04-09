import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { login, logout } from '../store/actions/user';

export default () => {
  const dispatch = useDispatch();

  return (
    <>
      <SafeAreaView />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ fontSize: 30 }}>Realtime Chat</Text>
        <TouchableOpacity
          onPress={() => dispatch(login('A'))}
          style={{
            backgroundColor: 'blue',
            padding: 20,
            borderRadius: 10,
            marginVertical: 30,
          }}>
          <Text style={{ color: 'white', fontSize: 20 }}>Login as User A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(login('B'))}
          style={{
            backgroundColor: 'pink',
            padding: 20,
            borderRadius: 10,
          }}>
          <Text style={{ color: 'black', fontSize: 20 }}>Login as User B</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
