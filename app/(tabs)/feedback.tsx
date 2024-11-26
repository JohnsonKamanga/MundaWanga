import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useThemeContext } from '@/components/ThemeContext';
import { Colors } from '@/constants/Colors';

export default function Feedback() {
  // const { isDarkMode } = useThemeContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const color = isDarkMode ? Colors.dark : Colors.light;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !feedback) {
      Alert.alert('Error', 'All fields are required');
    } else {
      Alert.alert('Feedback Submitted', `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.bg, padding: 16 }}>
      <Text style={{ color: color.text, fontSize: 24, marginBottom: 16 }}>Send Us Feedback</Text>

      <TextInput
        style={{
          borderColor: color.borderColor,
          borderWidth: 1,
          padding: 10,
          marginBottom: 16,
          color: color.text,
          backgroundColor: '9d9d9d',
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
          backgroundColor: color.text,
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
          backgroundColor: color.text,
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
        <Text style={{ color: color.text }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
