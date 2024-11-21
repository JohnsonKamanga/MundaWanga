import React, { useState } from 'react';  
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from 'react-native';
import { Mail, Phone } from 'lucide-react-native';

const AccountPage = () => {
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('********');
  const [dob, setDob] = useState('19-12-2005');
  const [location, setLocation] = useState('Zomba');
  const [isEditing, setIsEditing] = useState(false);
  const [showPhone, setShowPhone] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@MundaWangacom');
  };

  const handlePhoneSupport = () => {
    Linking.openURL('tel:+265984099754');
  };

  const colorScheme = useColorScheme();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    background: isDarkMode ? '#0a192f' : '#F3F4F6',
    cardBackground: isDarkMode ? '#112240' : '#FFFFFF',
    primaryText: isDarkMode ? '#e6f1ff' : '#333333',
    secondaryText: isDarkMode ? '#8892b0' : '#666666',
    labelText: isDarkMode ? '#a8b2d1' : '#444444',
    inputBackground: isDarkMode ? '#1e2d4d' : '#FFFFFF',
    inputBorder: isDarkMode ? '#234173' : '#DDDDDD',
    accent: isDarkMode ? '#64ffda' : '#007BFF',
    switchTrack: isDarkMode ? '#1e2d4d' : '#E4E6EB',
    imagePlaceholder: isDarkMode ? '#1e2d4d' : '#e0e0e0',
    shadowColor: isDarkMode ? '#050d1a' : '#000000',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.profileSection, { 
        backgroundColor: theme.cardBackground,
        shadowColor: theme.shadowColor,
      }]}>
       <TouchableOpacity onPress={pickImage} style={[styles.profileImageContainer, {
          backgroundColor: theme.imagePlaceholder
        }]}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profilePic} />
          ) : (
            <Text style={[styles.imagePlaceholder, { color: theme.secondaryText }]}>
              Tap to Add Image
            </Text>
          )}
        </TouchableOpacity>
        <Text style={[styles.name, { color: theme.primaryText }]}>Kai Chimala</Text>
        <Text style={[styles.email, { color: theme.secondaryText }]}>kaimomo2005@gmail.com.com</Text>
      </View>

      <View style={[styles.detailsSection, { 
        backgroundColor: theme.cardBackground,
        shadowColor: theme.shadowColor,
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Account Details</Text>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Phone Number:</Text>
          {showPhone && <Text style={[styles.detailValue, { color: theme.secondaryText }]}>+265 999 888 777</Text>}
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Farm Name:</Text>
          <Text style={[styles.detailValue, { color: theme.secondaryText }]}>Chimala Farm</Text>
        </View>
      </View>

      <View style={[styles.detailsSection, { 
        backgroundColor: theme.cardBackground,
        shadowColor: theme.shadowColor,
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>About</Text>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Password:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
                color: theme.primaryText 
              }]}
              value={password}
              onChangeText={setPassword}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <Text style={[styles.detailValue, { color: theme.secondaryText }]} onPress={() => setIsEditing(true)}>
              {password}
            </Text>
          )}
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Date of Birth:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
                color: theme.primaryText 
              }]}
              value={dob}
              onChangeText={setDob}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <Text style={[styles.detailValue, { color: theme.secondaryText }]} onPress={() => setIsEditing(true)}>
              {dob}
            </Text>
          )}
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Location:</Text>
          {isEditing ? (
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
                color: theme.primaryText 
              }]}
              value={location}
              onChangeText={setLocation}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <Text style={[styles.detailValue, { color: theme.secondaryText }]} onPress={() => setIsEditing(true)}>
              {location}
            </Text>
          )}
        </View>
      </View>
      
      <View style={[styles.detailsSection, { 
        backgroundColor: theme.cardBackground,
        shadowColor: theme.shadowColor,
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Profile Privacy</Text>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Show Phone Number:</Text>
          <Switch 
            value={showPhone} 
            onValueChange={setShowPhone}
            trackColor={{ false: theme.switchTrack, true: theme.accent }}
          />
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Show Email Address:</Text>
          <Switch 
            value={showEmail} 
            onValueChange={setShowEmail}
            trackColor={{ false: theme.switchTrack, true: theme.accent }}
          />
        </View>
      </View>

      <View style={[styles.detailsSection, { 
        backgroundColor: theme.cardBackground,
        shadowColor: theme.shadowColor,
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Appearance</Text>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: theme.labelText }]}>Dark Mode:</Text>
          <Switch 
            value={isDarkMode} 
            onValueChange={toggleTheme}
            trackColor={{ false: theme.switchTrack, true: theme.accent }}
          />
        </View>
      </View>

      <View style={[styles.detailsSection, { 
        backgroundColor: theme.cardBackground,
        shadowColor: theme.shadowColor,
      }]}>
        <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>Contact Us</Text>
        
        <Text style={[styles.supportText, { color: theme.secondaryText }]} >
          Need help? Choose your preferred way to contact our support team:
        </Text>

        <View style={styles.supportOptionsContainer}>
          <TouchableOpacity 
            style={[styles.supportOption, { backgroundColor: theme.accent + '20' }]}
            onPress={handleEmailSupport}
          >
            <Mail color={theme.accent} size={24} />
            <Text style={[styles.supportOptionTitle, { color: theme.primaryText }]}>Email Support</Text>
            <Text style={[styles.supportOptionDesc, { color: theme.secondaryText }]}>
              Get help via email.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.supportOption, { backgroundColor: theme.accent + '20' }]}
            onPress={handlePhoneSupport}
          >
            <Phone color={theme.accent} size={24} />
            <Text style={[styles.supportOptionTitle, { color: theme.primaryText }]}>Call Support</Text>
            <Text style={[styles.supportOptionDesc, { color: theme.secondaryText }]}>
              Reach us by phone.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imagePlaceholder: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
  },
  supportText: {
    fontSize: 14,
    fontWeight: '400',
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
  },
  supportOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  supportOptionDesc: {
    fontSize: 14,
    color: '#666',
  },
});

export default AccountPage;
