import { View, Text } from "react-native";
import { useColorScheme } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors"


export default function AdminFeedBack(){
    const colorScheme = useColorScheme();
    const color = Colors[colorScheme ?? 'light']


    return(
        <>
            <ScrollView>
            <View style={{
                backgroundColor: color.background,}} className="w-full">
                <View style={{
                    backgroundColor: 'white',
                    borderColor: color.borderColor,
                    margin: 10,
                }} className="border-solid border rounded-xl mx-4 w-11/12">
                    <Text className="text-lg font-bold m-2 text-center">John Doe</Text>
                    <Text className="mx-3 text-center font-semibold text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel lorem eu ex varius convallis. Sed ut nulla a nisl efficitur tincidunt sit amet vitae justo. Curabitur tristique eros sit amet neque vestibulum, vel convallis nunc fermentum. Quisque vel consequat sapien. Suspendisse potenti. Nam ut accumsan augue, vel egestas eros. Fusce consequat, odio nec tristique dignissim, libero sapien porttitor felis.
                    </Text>
                </View>
            </View>
            </ScrollView>
        </>
    )
}