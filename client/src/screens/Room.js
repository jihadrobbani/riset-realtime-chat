import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { resetRoomActive } from '../store/actions/room';
import { getChats, sendChat } from '../store/actions/chat';
import ChatBubble from '../components/ChatBubble';

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { room, partner } = useSelector(state => state.room);
  const { chats: chatFromApi } = useSelector(state => state.chat);
  const [socket, setSocket] = useState(null);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const goToLobby = () => {
    dispatch(resetRoomActive());
    navigation.goBack();
  };

  useEffect(() => {
    setSocket(io('https://riset-realtime-chat.herokuapp.com'));
    dispatch(getChats(room.id));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', room.id);
      socket.on('newChat', chats => {
        setChat(chats);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (chatFromApi) {
      setChat(chatFromApi);
    }
  }, [chatFromApi]);

  const onPressSend = () => {
    dispatch(sendChat(room.id, input));
    socket.emit('chat', room.id);
    setInput('');
  };

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
          Chat with{' '}
          <Text style={{ fontWeight: 'bold' }}>{partner?.username}</Text>
        </Text>
        <TouchableOpacity
          onPress={goToLobby}
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>Lobby</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column-reverse',
            backgroundColor: 'pink',
          }}>
          {chat.map(ch => (
            <ChatBubble key={ch.id} chat={ch} user={user} />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderTopWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <View
            style={{
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              flex: 1,
              marginRight: 10,
            }}>
            <TextInput
              style={{ padding: 0, flex: 1, fontSize: 16 }}
              value={input}
              onChangeText={text => setInput(text)}
            />
          </View>
          <TouchableOpacity
            onPress={onPressSend}
            style={{
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text style={{ fontSize: 16 }}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
