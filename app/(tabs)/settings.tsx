import { Text, View, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';


export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(false);
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const togglePushNotifications = () => setPushNotifications((prev) => !prev);
  const toggleBudgetAlerts = () => setBudgetAlerts((prev) => !prev);

  const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'MM DD,YYYY'];

  const handleLogout = () => {
    Alert.alert('Logout', 'Success.');
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Data exported successfully.');
  };

  const handleImportData = () => {
    Alert.alert('Import Data', 'Data imported successfully.');
  };

  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'cache cleared.');
  };

  const handleBackupAndSync = () => {
    Alert.alert('Backup and Restore', 'Data has been restored.');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className={isDarkMode ? 'bg-gray-900 flex-1 p-6' : 'bg-gray-100 flex-1 p-6'}>
        <Text className={isDarkMode ? 'text-white text-xl mb-2 mt-8 font-bold border-b border-primary' : 'text-gray-900 text-3 xl mb-2 mt-8 font-bold border-b border-primary'}>Settings</Text>

        {/****** General Section *****/}
        <Text className={isDarkMode ? 'text-gray-200 text-xl font-bold mt-2 border-b border-primary' : 'text-gray-800 text-xl font-bold mt-2 border-b border-primary'}>General</Text>
        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Dark Theme</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Date</Text>
            <Picker
              selectedValue={dateFormat}
              style={{ height: 50, width: 150, color: isDarkMode ? 'white' : 'black' }}
              onValueChange={(itemValue) => setDateFormat(itemValue)}
            >
              {dateFormats.map((format) => (
                <Picker.Item key={format} label={format} value={format} />
              ))}
            </Picker>
          </View>
        </View>

        {/****** Notification *****/}
        <Text className={isDarkMode ? 'text-gray-200 text-xl font-bold mt-4 border-b border-primary' : 'text-gray-800 text-xl font-bold mt-4 border-b border-primary'}>Notification</Text>
        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Notifications</Text>
            <Switch value={pushNotifications} onValueChange={togglePushNotifications} />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Budget Alerts</Text>
            <Switch value={budgetAlerts} onValueChange={toggleBudgetAlerts} />
          </View>
        </View>

        {/****** Data Management *****/}
        <Text className={isDarkMode ? 'text-gray-200 text-xl font-bold mt-2 border-b border-primary' : 'text-gray-800 text-xl font-bold mt-2 border-b border-primary'}>Data Management</Text>
        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Export Data</Text>
            <TouchableOpacity onPress={handleExportData}>
              <Text className="text-primary text-lg">Export</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Import Data</Text>
            <TouchableOpacity onPress={handleImportData}>
              <Text className="text-primary text-lg">Import</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={handleBackupAndSync}>
              <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Backup and Restore</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={handleClearCache}>
              <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Clear Cache</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/****** Account Management *****/}
        <Text className={isDarkMode ? 'text-gray-200 text-xl font-bold mt-4 border-b border-primary' : 'text-gray-800 text-xl font-bold mt-4 border-b border-primary'}>Account</Text>
        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Manage Accounts</Text>
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity onPress={handleLogout}>
              <Text className={isDarkMode ? 'text-gray-200 text-lg' : 'text-gray-800 text-lg'}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
