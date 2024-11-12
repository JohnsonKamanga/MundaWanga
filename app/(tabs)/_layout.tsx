import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SideBar(){
  const colorScheme = useColorScheme()
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
          title: 'Settings-Title',
        }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}