import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // Handle login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MundaWanga</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {errors.username && <Text style={styles.error}>Username is required</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        {...register("password", { required: true })}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>Password is required</Text>}
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
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