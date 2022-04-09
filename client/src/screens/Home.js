import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../store/actions/user';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loginLoading, loginSuccess, loginError } = useSelector(
    state => state.user,
  );
  const [input, setInput] = useState('');

  useEffect(() => {
    if (loginSuccess) {
      navigation.navigate('Lobby');
    } else if (loginError) {
      Alert.alert('Login error');
    }
  }, [loginLoading]);

  onSubmit = () => {
    dispatch(login(input));
  };

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
        <View
          style={{
            marginTop: 50,
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 30,
            paddingVertical: 10,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            value={input}
            placeholder="Username"
            onChangeText={text => setInput(text)}
            style={{ paddingBottom: 0, fontSize: 16 }}
          />
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          disabled={!input}
          style={{
            backgroundColor: 'pink',
            padding: 20,
            borderRadius: 10,
          }}>
          <Text style={{ color: 'black', fontSize: 20 }}>
            {input ? `Login as ${input}` : 'Input username'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
