import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { useThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';
import { baseurl } from '@/constants/url';
import axios from 'axios';
import { UserContext } from '@/hooks/useUserContext';

export default function Feedback() {
  // const { isDarkMode } = useThemeContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const color = isDarkMode ? Colors.dark : Colors.light;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const {token} = useContext(UserContext);

  const handleSubmit = () => {

    if (!name || !email || !feedback) {
      Alert.alert('Error', 'All fields are required');
    }else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Alert.alert('Error', 'Invalid email');
    }
else {
  axios.post(`${baseurl}/feedback`,{
    message: feedback, user: {
      username: token?.username
    },
  }).then((addedMessage) => {
    console.log('success:', addedMessage.data?.message);
    Alert.alert('Feedback Submitted', `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`);
  })
  .catch((err => {
    console.error('An error occured when sending feedback:',err);
    console.log("username: ",token?.username);
  }))
}
  };

  

  return (
    <View style={{ flex: 1, backgroundColor: color.bg, padding: 16, marginTop: 50 }}>
      {/* <Text style={{ color: color.text, fontSize: 24, marginBottom: 16 }}>Send Us Feedback</Text> */}

      <TextInput
        style={{
          borderColor: color.borderColor,
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          color: color.text,
          backgroundColor: '9d9d9d',
          borderRadius: 8,
        }}
        placeholder="Your Name"
        placeholderTextColor={color.background}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={{
          borderColor: color.borderColor,
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          color: color.text,
          backgroundColor: 'white',
          borderRadius: 8,
        }}
        placeholder="Your Email"
        placeholderTextColor={color.background}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          borderColor: color.borderColor,
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          color: color.text,
          backgroundColor: 'white',
          borderRadius: 8,
        }}
        placeholder="Your Feedback"
        placeholderTextColor={color.background}
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      <TouchableOpacity
        style={{
          backgroundColor: color.borderColor,
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontWeight: '900', fontSize: 18 }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
