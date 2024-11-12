import { Text, View, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import React, { useState } from 'react';

export default function Feedback() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !feedback) {
      Alert.alert('Error', 'All fields are required');
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Alert.alert('Error', 'Invalid email');
    } else {
      Alert.alert('Feedback Submitted', `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`);
    }
  };

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  return (
    <View className={isDarkMode ? 'bg-gray-900 flex-1 items-center justify-center' : 'bg-gray-100 flex-1 items-center justify-center'}>
      <View className={isDarkMode ? 'bg-gray-800 w-11/12 rounded-lg' : 'bg-white w-11/12 rounded-lg'}>
        <View className={isDarkMode ? 'bg-green-600 py-5 items-center' : 'bg-green-600 py-5 items-center'}>
          <Text className="text-white text-xl font-bold">Send Us Feedback</Text>
        </View>

        <View className="p-6">
          <Text className={isDarkMode ? 'text-gray-200 text-lg mb-2 font-bold' : 'text-gray-800 text-lg mb-2 font-bold'}>Name</Text>
          <TextInput
            className={isDarkMode ? 'border border-green-500 p-3 rounded-lg mb-4 text-white' : 'border border-green-500 p-3 rounded-lg mb-4 text-gray-900'}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name..."
            placeholderTextColor={isDarkMode ? "#aaa" : "#555"}/>

          <Text className={isDarkMode ? 'text-gray-200 text-lg mb-2 font-bold' : 'text-gray-800 text-lg mb-2 font-bold'}>Email</Text>
          <TextInput
            className={isDarkMode ? 'border border-green-500 p-3 rounded-lg mb-4 text-white' : 'border border-green-500 p-3 rounded-lg mb-4 text-gray-900'}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email..."
            placeholderTextColor={isDarkMode ? "#aaa" : "#555"}/>

          <Text className={isDarkMode ? 'text-gray-200 text-lg mb-2 font-bold' : 'text-gray-800 text-lg mb-2 font-bold'}>Feedback</Text>
          <TextInput
            className={isDarkMode ? 'border border-green-500 p-3 rounded-lg mb-4 text-white h-24' : 'border border-green-500 p-3 rounded-lg mb-4 text-gray-900 h-24'}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Enter your suggestions..."
            placeholderTextColor={isDarkMode ? "#aaa" : "#555"}
            multiline/>

          <TouchableOpacity className={isDarkMode ? 'bg-green-600 py-3 rounded-lg items-center' : 'bg-green-600 py-3 rounded-lg items-center'} onPress={handleSubmit}>
            <Text className="text-white text-lg font-bold">Submit</Text>
          </TouchableOpacity>
          
          <View className="flex-row items-center justify-between mt-5">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>
      </View>
    </View>
  );
}
