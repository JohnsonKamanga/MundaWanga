import React, { useContext, useEffect, useState } from 'react'; 
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, Alert, ActivityIndicator, useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Mail, Phone } from 'lucide-react-native';
import { UserContext } from '@/hooks/useUserContext';
import axios from 'axios';
import { baseurl } from '@/constants/url';

const AccountPage = () => {
  const { token } = useContext(UserContext);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('19-12-2005');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${baseurl}/user/account-info/${token?.username}`)
      .then((userInfo) => {
        setName(userInfo.data.name);
        setUsername(userInfo.data.username);
        setDob(userInfo.data.dob);
        setEmail(userInfo.data.email);
        setPhoneNumber(userInfo.data.phone_number);
        setLoading(false);
      })
      .catch((err) => {
        console.error('An error occurred when fetching user data: ', err);
        Alert.alert('Error', 'An error occurred when fetching your user info');
        setLoading(false);
      });
  }, [token]);

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@MundaWanga.com');
  };

  const handlePhoneSupport = () => {
    Linking.openURL('tel:+265984099754');
  };

  const darkMode = colorScheme === 'dark'; 

  return (
    <>
      {
        loading ? 
          <View style={[styles.loaderContainer, darkMode && styles.darkLoader]}>
            <ActivityIndicator size={65} color={darkMode ? '#FFF' : '#000'} />
          </View>
        :
          <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
            {/* Profile Section */}
            <View style={[styles.profileSection, darkMode && styles.darkProfileSection]}>
              <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.profilePic} />
                ) : (
                  <Text style={[styles.imagePlaceholder, darkMode && styles.darkText]}>Tap to Add Image</Text>
                )}
              </TouchableOpacity>
              <Text style={[styles.name, darkMode && styles.darkText]}>{name}</Text>
              <Text style={[styles.email, darkMode && styles.darkText]}>{email}</Text>
            </View>

            {/* Account Details Section */}
            <View style={[styles.detailsSection, darkMode && styles.darkDetailsSection]}>
              <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Account Details</Text>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>Username:</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{username}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>Phone Number:</Text>
                <Text style={[styles.detailValue, darkMode && styles.darkText]}>{phoneNumber}</Text>
              </View>
            </View>

            {/* About Section */}
            <View style={[styles.detailsSection, darkMode && styles.darkDetailsSection]}>
              <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>About</Text>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, darkMode && styles.darkText]}>Date of Birth:</Text>
                {isEditing ? (
                  <TextInput
                    style={[styles.textInput, darkMode && styles.darkInput]}
                    value={dob}
                    onChangeText={setDob}
                    onBlur={() => setIsEditing(false)}
                  />
                ) : (
                  <Text style={[styles.detailValue, darkMode && styles.darkText]} onPress={() => setIsEditing(true)}>{dob}</Text>
                )}
              </View>
            </View>

            {/* Contact Section */}
            <View style={[styles.detailsSection, darkMode && styles.darkDetailsSection]}>
              <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Contact Us</Text>
              <Text style={[styles.supportText, darkMode && styles.darkText]}>Need help? Choose your preferred way to contact our support team:</Text>

              <View style={styles.supportOptionsContainer}>
                <TouchableOpacity style={[styles.supportOption, darkMode && styles.darkSupportOption]} onPress={handleEmailSupport}>
                  <Mail color={darkMode ? '#FFF' : '#007BFF'} size={24} />
                  <Text style={[styles.supportOptionTitle, darkMode && styles.darkText]}>Email Support</Text>
                  <Text style={[styles.supportOptionDesc, darkMode && styles.darkText]}>Get help via email.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.supportOption, darkMode && styles.darkSupportOption]} onPress={handlePhoneSupport}>
                  <Phone color={darkMode ? '#FFF' : '#007BFF'} size={24} />
                  <Text style={[styles.supportOptionTitle, darkMode && styles.darkText]}>Call Support</Text>
                  <Text style={[styles.supportOptionDesc, darkMode && styles.darkText]}>Reach us by phone.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  darkProfileSection: {
    backgroundColor: '#333333',
  },
  profileImageContainer: {
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imagePlaceholder: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
  },
  darkText: {
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  email: {
    fontSize: 14,
    color: '#666666',
  },
  darkInput: {
    backgroundColor: '#555555',
    color: '#FFF',
  },
  detailsSection: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  darkDetailsSection: {
    backgroundColor: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  detailItem: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#333333',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
  },
  textInput: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkLoader: {
    backgroundColor: '#121212',
  },
  supportOptionsContainer: {
    marginTop: 20,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  darkSupportOption: {
    borderBottomColor: '#555555',
  },
  supportOptionTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  supportOptionDesc: {
    fontSize: 12,
    marginLeft: 10,
    color: '#666666',
  },
  supportText: {
    fontSize: 14,
    marginBottom: 20,
    color: '#333333',
  },
});

export default AccountPage;
