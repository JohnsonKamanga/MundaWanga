import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View className="h-full flex flex-col bg-[#a2af9f]">
     <View className="h-[250px] w-full bg-[#228b22] flex flex-row items-center justify-center">
      <View className="flex flex-row items-center justify-center h-[60px] rounded-sm bg-[#a2af9f] w-[90%]">
      <View className="mx-2">
        <AntDesign name="caretleft"/>
      </View>
      <View className="mx-2"><Text className="text-black font-weight">summary</Text></View>
     <View className="mx-2">
     <AntDesign name="caretright"/>
     </View>
     </View>
     </View>
     <View className="bg-primary mt-1 h-12 flex justify-center items-center">
        <Link href={"../Feedback"} className='text-white font-bold'>Feedback</Link>
     </View>
     <View className="bg-black mt-1 h-12 flex justify-center items-center">
        <Link href={"../Settings"} className='text-white font-bold'>Settings</Link>
     </View>
    </View>
  );
}
