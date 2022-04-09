import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/actions/user';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {} = useSelector(state => state.chat);

  return (
    <>
      <SafeAreaView />
    </>
  );
};
