import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
const Stack = createStackNavigator();

import { store, persistor } from './src/store';

import Home from './src/screens/Home';
import Room from './src/screens/Room';
import Lobby from './src/screens/Lobby';

import axios from './src/config/axios';

export default () => {
  const { isLoggedIn } = store.getState().user;

  useEffect(() => {
    // Waking up heroku server
    axios().then(({ data }) => console.log(data));
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? 'Lobby' : 'Home'}
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Lobby" component={Lobby} />
            <Stack.Screen name="Room" component={Room} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
