import React, { useContext, useState } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView, View, Pressable } from 'react-native';
import { TextInput, Button, Snackbar, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { baseurl } from '@/constants/url';
import { UserContext } from '@/hooks/useUserContext';
import RNDateTimePicker from '@react-native-community/datetimepicker';

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone_number: yup
    .string()
    .matches(/^[0-9]{10,14}$/, 'Phone number must be 10-14 digits')
    .required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  verifyPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please verify your password'),
});

const SignupScreen = ({handleComponentChange}:{
    handleComponentChange: ()=>void
}) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const {setToken} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState(0);
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Replace with the backend URL
      const user = await axios.post(`${baseurl}/user/signup`, {...data, dob});
      const token = await axios.post(`${baseurl}/auth/login`,{
        username: user.data.username,
        password: data.password
      })
      setSnackbarMessage('Signup successful!');
      reset();
      if(token.data)
      setToken(token.data);
    } catch (error) {
      setSnackbarMessage( 'Signup failed. Please try again.');
      console.error(error)
    } finally {
      setSnackbarVisible(true);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    style={styles.container}
  ><ScrollView>
    <Text style={styles.title}>Create Account</Text>

    
    <Controller
      control={control}
      name="name"
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            label="Full Name"
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

{/* Username */}
<Controller
      control={control}
      name="username"
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <TextInput
            label="Username"
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

{/* Date of birth */}
        <>
        <Pressable 
        style={{
          borderWidth: 1,
          borderRadius: 5,
          width: '100%',
          padding: 15
        }}
        onPress={()=>{
          setShowDatePicker(true);
        }}>
          <Text>
            Date
          </Text>
        </Pressable>
          {showDatePicker &&
          <RNDateTimePicker
          value={new Date(dob)}
          onChange={(e)=>{
            setDob(e.nativeEvent.timestamp)
            setShowDatePicker(false);
          }
          }
          />
        }
        </>
      

    {/* Phone Number */}
    <Controller
      control={control}
      name="phone_number"
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
      {loading ? 'Signing up...' : 'Create Account'}
    </Button>

    {/* Snackbar */}
    <Snackbar
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}
      duration={3000}
    >
      {snackbarMessage}
    </Snackbar>
    <View>
      <Text className='text-black'>
      Already have an account? 
      <Pressable className='p-2'
      onPress={handleComponentChange}
      >
        <Text>Login</Text>
      </Pressable>
      </Text>
    </View>
    </ScrollView>
    
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#228B22',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'green'
  },
});

export default SignupScreen