import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AccountPage = () => {
  const [image, setImage] = useState('');

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

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profilePic} />
          ) : (
            <Text style={styles.imagePlaceholder}>Tap to Add Image</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.name}>Kai Chimala</Text>
        <Text style={styles.email}>kaimomo2005@gmail.com</Text>
      </View>
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Phone Number:</Text>
          <Text style={styles.detailValue}>+265 999 888 777</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>123 Main Street, Blantyre, Malawi</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 40, 
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImageContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  detailsSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#444',
    marginRight: 8,
    width: 120,
  },
  detailValue: {
    color: '#555',
    flex: 1,
  },
});

export default AccountPage;
