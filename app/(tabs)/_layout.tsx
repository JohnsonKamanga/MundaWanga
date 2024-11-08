import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SideBar(){

  return(
    <GestureHandlerRootView>
      <Drawer
      screenOptions={{
        headerStatusBarHeight: 20,
      }}
      >
        <Drawer.Screen
        name='(home)'
        options={{
          drawerLabel: 'Home',
          title: 'Home-title',
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