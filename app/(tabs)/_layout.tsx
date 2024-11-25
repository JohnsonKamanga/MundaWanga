import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useContext, useState } from 'react';
import { UserContext } from '@/hooks/useUserContext';
import LoginPage from '@/components/login_component';

export default function SideBar(){
  const colorScheme = useColorScheme();
  const {token} = useContext(UserContext);

  if(!token){
    return <LoginPage/>
  }


  return(
    <GestureHandlerRootView>
      <Drawer
      
      screenOptions={{
        headerStatusBarHeight: 20,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'rgb(230,230,230)',
        drawerStyle:{
          backgroundColor: Colors[colorScheme ?? 'light'].barColor,
          borderColor: 'rgba(256,256,256,0.2)',
          borderRightWidth: 0.3,
        },
        headerTitleAlign: 'center',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].barColor
        }
      }}
      >
        <Drawer.Screen
        name='(home)'
        options={{
          drawerLabel: 'Home',
          title: 'MundaWanga',
        }}
        />
        <Drawer.Screen
        name='settings'
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
        }}
        />
        <Drawer.Screen
        name='feedback'
        options={{
          drawerLabel: 'Feedback',
          title: 'Send us Feedback',
        }}
        />
        <Drawer.Screen
        name='account_management'
        options={{
          drawerLabel: 'Account Management',
          title: 'Account Management-Title',
        }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}