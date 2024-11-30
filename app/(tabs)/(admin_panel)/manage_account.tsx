import { Colors } from "@/constants/Colors";
import { View,Text, useColorScheme  } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ManageAccount(){
    const colorScheme = useColorScheme();
    const color =Colors[colorScheme ?? 'light'];
    return(
        <>
            <View
            style={{
                backgroundColor: color.background,
            }} className="w-full"
            >
                <View style={{
                    backgroundColor: 'white',
                    borderColor: color.borderColor,
                }} className="m-2 border rounded-xl p-2">
                    <Text className="font-extrabold text-xl text-center">Username</Text>
                    
                        <Text className="my-5 text-center">Delete account request</Text>
                        <View style={{}} className="flex flex-row justify-evenly items-center mt-2">
                        <View 
                        style={{backgroundColor: color.barColor}} className="h-8 w-1/3 flex justify-center items-center rounded-lg"><Text className="text-white font-bold">Accept</Text></View>
                        <View style={{backgroundColor: 'red',}} className="h-8 w-1/3 flex justify-center items-center rounded-lg"><Text className="text-white font-bold">Decline</Text></View>
                    </View>
                </View>
            </View>
        </>
    )
}