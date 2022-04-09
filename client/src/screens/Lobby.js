import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/actions/user';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, loginLoading, loginSuccess, loginError } = useSelector(
    state => state.user,
  );

  useEffect(() => {
    if (!loginLoading && !loginSuccess) {
      navigation.navigate('Home');
    }
  }, [loginLoading]);

  return (
    <>
      <SafeAreaView />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
        }}>
        <Text style={{ fontSize: 16 }}>
          Logged in as{' '}
          <Text style={{ fontWeight: 'bold' }}>{user.username}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => dispatch(logout(user.username))}
          style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
