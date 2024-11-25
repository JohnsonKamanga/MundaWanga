import React, { useState } from 'react';
import LoginForm from './login_component';
import { Text, View } from 'react-native';

export default function Authentication() {
  const [signup, setSignUp] = useState(false);
  return (
    <View><View>
      <Text>Login Form</Text>
      <LoginForm />
      </View>
    </View>
  );
}
