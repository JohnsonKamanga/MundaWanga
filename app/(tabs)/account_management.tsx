import React, { useContext, useEffect, useState } from 'react';  
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Mail, Phone } from 'lucide-react-native';
import { UserContext } from '@/hooks/useUserContext';
import axios from 'axios';
import { baseurl } from '@/constants/url';

const AccountPage = () => {
  const {token} = useContext(UserContext);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('19-12-2005');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('Zomba');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(()=>{
    setLoading(true);
    axios.get(`${baseurl}/user/account-info/${token?.username}`)
    .then((userIno)=>{
      setName(userIno.data.name);
      setUsername(userIno.data.username);
      setDob(userIno.data.dob);
      setEmail(userIno.data.email);
      setPhoneNumber(userIno.data.phone_number);
      setLoading(false);
    })
    .catch((err)=>{
      console.error('An error occured when fetching user data: ', err);
      Alert.alert('Error', 'An error occured when fetching your user info');
    })
  }, []);


  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@MundaWanga.com');
  };

  const handlePhoneSupport = () => {
    Linking.openURL('tel:+265984099754');
  };

  return (
    <>
    {
    loading ?
    <View className=' h-full items-center justify-center'>
      <ActivityIndicator size={65} />
    </View>
    :
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profilePic} />
          ) : (
            <Text style={styles.imagePlaceholder}>
              Tap to Add Image
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Phone Number:</Text>
          <Text style={styles.detailValue}>{phoneNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Farm Name:</Text>
          <Text style={styles.detailValue}>Chimala Farm</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date of Birth:</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInput}
              value={dob}
              onChangeText={setDob}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <Text style={styles.detailValue} onPress={() => setIsEditing(true)}>
              {dob}
            </Text>
          )}
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Location:</Text>
          {isEditing ? (
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <Text style={styles.detailValue} onPress={() => setIsEditing(true)}>
              {location}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        
        <Text style={styles.supportText}>
          Need help? Choose your preferred way to contact our support team:
        </Text>

        <View style={styles.supportOptionsContainer}>
          <TouchableOpacity 
            style={styles.supportOption}
            onPress={handleEmailSupport}
          >
            <Mail color="#007BFF" size={24} />
            <Text style={styles.supportOptionTitle}>Email Support</Text>
            <Text style={styles.supportOptionDesc}>
              Get help via email.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.supportOption}
            onPress={handlePhoneSupport}
          >
            <Phone color="#007BFF" size={24} />
            <Text style={styles.supportOptionTitle}>Call Support</Text>
            <Text style={styles.supportOptionDesc}>
              Reach us by phone.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  email: {
    fontSize: 14,
    color: '#666666',
  },
  detailsSection: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444444',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    color: '#333333',
  },
  supportText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 10,
  },
  supportOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportOption: {
    flex: 0.45,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
  },
  supportOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: '#333333',
  },
  supportOptionDesc: {
    fontSize: 14,
    color: '#666666',
  },
});

export default AccountPage;