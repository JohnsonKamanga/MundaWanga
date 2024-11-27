import React, { useContext, useEffect, useState } from 'react';
import { 
  Text, 
  View, 
  Switch, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  useColorScheme
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { deleteItemAsync } from 'expo-secure-store';
import { UserContext } from '@/hooks/useUserContext';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";
// import { useThemeContext } from '@/components/ThemeContext';

export default function Settings() {
  const [pushNotifications, setPushNotifications] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(false);
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const { token, setToken } = useContext(UserContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationToken, setNorificationToken] = useState(null);
  const colorScheme = useColorScheme();

  // const { isDarkMode, toggleDarkMode } = useThemeContext();
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const color = Colors[colorScheme ?? 'light'];

  // const togglePushNotifications = () => setPushNotifications((prev) => !prev);

  // useEffect(() => {
  //   Notifications.requestPermissionsAsync().then((permissionResponse) => {
  //     if(permissionResponse.status === 'granted'){
  //       Notification.registerForNotificationAsync().then((registrationResponse) => {
  //         setNotificationToken(registrationResponse.token);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
      
  //   })
  // }, []);

  const handleNotification = () => {
    Alert.alert(
      'Alert',
      'Turn ON or OFF Notification',
      [
        { text: 'OFF', style: 'cancel' },
        { text: 'ON', onPress: NotificationAlerts, style: 'destructive' }
      ]
    );
  }

  const NotificationAlerts = () => {

  }

  const toggleBudgetAlerts = () => setBudgetAlerts((prev) => !prev);

    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        Alert.alert('Cache Cleared', 'All cached data has been removed.');
      } catch (error) {
        Alert.alert('Error', 'Failed to clear cache. Please try again.');
        console.error('Error clearing AsyncStorage:', error);
      }
    };

  const handleClearCache = () => {
    Alert.alert(
      'Confirm Clear Cache',
      'This will delete all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: clearAsyncStorage, style: 'destructive' }
      ]
    );
  };

  const handleLogout = () => {
    deleteItemAsync('token')
      .then(() => {
        setToken(null);
        Alert.alert('Logout', 'You have been logged out successfully.');
      })
      .catch(() => {
        Alert.alert('Logout Failed', 'There was an error logging out.');
      });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: color.bg }}
    >
      <View style={{ flex: 1, padding: 24 }}>
        {/* <Text
          style={{
            color: color.text,
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: color.borderColor,
          }}
        >
          Settings
        </Text> */}

        <View>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: color.text, fontSize: 18 }}>Dark Theme</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: color.borderColor, true: color.text }}
            />
          </View> */}

          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: color.text, fontSize: 18 }}>Date Format</Text>
            <Picker
              selectedValue={dateFormat}
              style={{ height: 50, width: 150, color: color.text }}
              onValueChange={(itemValue) => setDateFormat(itemValue)}
            >
              {dateFormats.map((format) => (
                <Picker.Item key={format} label={format} value={format} />
              ))}
            </Picker>
          </View> */}
        </View>

        <Text
          style={{
            color: color.text,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: color.borderColor,
          }}
        >
          Notifications
        </Text>
        <View>
        <View>
          <TouchableOpacity onPress={handleNotification} style={{ marginBottom: 16 }}>
            <Text style={{ color: color.text, fontSize: 18 }}>Notification</Text>
          </TouchableOpacity>
        </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={{ color: color.text, fontSize: 18 }}>Budget Alerts</Text>
            <Switch
              value={budgetAlerts}
              onValueChange={toggleBudgetAlerts}
              trackColor={{ false: color.borderColor, true: color.text }}
            />
          </View>
        </View>

        <Text
          style={{
            color: color.text,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: color.borderColor,
          }}
        >
          Storage
        </Text>

        <View>
          <TouchableOpacity onPress={handleClearCache} style={{ marginBottom: 16 }}>
            <Text style={{ color: color.text, fontSize: 18 }}>Clear Cache</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: color.text,
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: color.borderColor,
          }}
        >
          Account
        </Text>
        <View>
          <TouchableOpacity onPress={handleLogout} style={{ marginBottom: 16 }}>
            <Text style={{ color: color.text, fontSize: 18 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}