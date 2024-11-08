import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

export default function Feedback() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !feedback){
      Alert.alert('Error', 'All fields are reqired');
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
      Alert.alert('Error', 'Invalid email');
    } else {
      Alert.alert('Feedback Submitted', `Name: ${name}\n Email: ${email}\nFeedback: ${feedback}`);
    }
  }
  return (

    <>
    
    <View className='bg-grey-300 w-full h-full flex justify-center items-center'>
      <View className='bg-white w-full h-full border-2 border-primary'>
        <View className='bg-primary h-20 w-full mt-5 flex justify-center items-center pt-4'><Text className="text-xl text-white font-bold mb-4 ">Send Us Feedback</Text></View>
        <View className="p-6">
          

          <Text className="text-lg mb-2 font-bold">Name</Text>
          <TextInput className="border border-primary p-3 rounded-xl mb-4" value={name} onChangeText={setName} placeholder='Enter your name...'></TextInput>

          <Text className="text-lg mb-2 font-bold">Email</Text>
          <TextInput className="border border-primary p-3 rounded-xl mb-4" value={email} onChangeText={setEmail} placeholder='Enter your email...'></TextInput>

          <Text className="text-lg mb-2 font-bold">Feedback</Text>
          <TextInput className="border border-primary p-3 rounded-xl mb-4 min-h-[120px] text-start" multiline value={feedback} onChangeText={setFeedback} placeholder='Enter your suggestions...'></TextInput>

          <TouchableOpacity className='bg-primary h-10 flex justify-center items-center rounded-lg' onPress={handleSubmit}><Text className='text-white text-lg font-bold '>Submit</Text></TouchableOpacity>
        </View>

      
      </View>
    </View>
    </>
  )
}



