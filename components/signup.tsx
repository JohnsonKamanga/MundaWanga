import React, { useState } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// Validation Schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10,14}$/, 'Phone number must be 10-14 digits')
    .required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please verify your password'),
});

const SignupScreen = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Submit handler
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Replace with your backend URL
      await axios.post('http://your-backend-url/auth/signup', data);
      setSnackbarMessage('Signup successful!');
      reset();
    } catch (error) {
      setSnackbarMessage( 'Signup failed. Please try again.');
    } finally {
      setSnackbarVisible(true);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>

      {/* First Name */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label="First Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!error}
            />
            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      {/* Last Name */}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label="Last Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!error}
            />
            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!error}
            />
            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      {/* Phone Number */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label="Phone Number"
              mode="outlined"
              keyboardType="phone-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!error}
            />
            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!error}
            />
            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      {/* Verify Password */}
      <Controller
        control={control}
        name="verifyPassword"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              label="Verify Password"
              mode="outlined"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={!!error}
            />
            {error && <HelperText type="error">{error.message}</HelperText>}
          </>
        )}
      />

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </Button>

      {/* Snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ee',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default SignupScreen