import { baseurl } from '@/constants/url';
import { UserContext } from '@/hooks/useUserContext';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import SignupScreen from './signup';

const LoginPage = () => {
  interface IUser {
    username:string;
    password: String;
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const {token, setToken} = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
      axios.post(`${baseurl}/auth/login`, {
        username, password
      })
        .then((response)=>{
          if(response?.data){
          console.log('key: ',response?.data );
          setToken(response?.data);
        }
          console.log('token', response.data);
        })
        .catch((err)=>{
          console.error('error occured: ', err)
        })
  };
const handleRegister=()=>{
  <SignupScreen/>
}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MundaWanga</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text)=>{
          setUsername(text);
        }}
      />
      {errors.username && <Text style={styles.error}>Username is required</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text)=>{
            setPassword(text);
        }}
      />
      {errors.password && <Text style={styles.error}>Password is required</Text>}
      <Button title="Login" onPress={onSubmit} />
      <Text>Dont have an account?</Text>
      <Button title="register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#228B22', // Light background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5, // Rounded corners
    backgroundColor: '#ffffff',
  },
  button: {
    backgroundColor: '#ffffff', 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginPage;