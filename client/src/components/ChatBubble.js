import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

export default ({ chat, user }) => {
  const bubbleStyle = () => ({
    alignSelf: chat.userId == user.id ? 'flex-end' : 'flex-start',
    backgroundColor: chat.userId == user.id ? '#25D366' : '#fff',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  });

  const chatStyle = () => ({
    textAlign: chat.userId == user.id ? 'right' : 'left',
    fontSize: 16,
  });
  return (
    <View style={bubbleStyle()}>
      <Text style={chatStyle()}>{chat.text}</Text>
      <Text
        style={[chatStyle(), { fontSize: 10, color: '#777', marginTop: 3 }]}>
        {moment(chat.createdAt).format('hh:mm')}
      </Text>
    </View>
  );
};
