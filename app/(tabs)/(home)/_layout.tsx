import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle:{
          backgroundColor: Colors[colorScheme ?? 'light'].barColor,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
      name="records"
      options={{
        title:"Records",
        tabBarIcon: ({color, focused})=> (
          <TabBarIcon name={focused ? 'clipboard' : 'clipboard-outline'} color={color}/>
        ),
      }}
      />
       <Tabs.Screen
      name="(finances)"
      options={{
        title:"Finances",
        tabBarIcon: ({color, focused})=> (
          <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color}/>
        ),
      }}
      />
      </Tabs>
    
  );
}
