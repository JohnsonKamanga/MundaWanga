import { baseurl } from '@/constants/url';
import { UserContext } from '@/hooks/useUserContext';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import SignupScreen from './signup';

const LoginPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { setToken } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<"Login" | "SignUp">("Login");

  const onSubmit = (data: { username: string; password: string }) => {
    setLoading(true);
    axios
      .post(`${baseurl}/auth/login`, data)
      .then((response) => {
        if (response?.data) {
          console.log('Token received: ', response.data);
          setToken(response.data);
        }
      })
      .catch((err) => {
        console.error('Login error: ', err);
      })
      .finally(() => setLoading(false));
  };
 
  return (
    <>
{
  formState === "Login" ?

    <ImageBackground
      source={require('../assets/images/background-image.jpeg')} // Replace with the path to your image in the assets folder
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <Text style={styles.title}>MundaWanga</Text>

        {/* Username Field */}
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Username is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="Username"
              placeholderTextColor="#999"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

        {/* Password Field */}
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <TouchableOpacity
          onPress={() => setFormState('SignUp')} // Update with the correct route name for your signup page
          style={styles.signupLinkContainer}
        >
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign Up Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>

    : 

    <SignupScreen handleComponentChange={()=>{
      setFormState("Login");
    }}/>
  }  
  </>
);
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white for contrast
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 2, // Added border
    borderColor: '#228B22', // Green border color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#228B22',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9acd32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLinkContainer: {
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    color: '#228B22',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});

export default LoginPage;
