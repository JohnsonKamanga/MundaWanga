import { View, Text } from "react-native";
import { useColorScheme } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "@/constants/url";


export default function AdminFeedBack(){
    const [feedbackArray, setFeedbackArray] = useState([]);
    const colorScheme = useColorScheme();
    const color = Colors[colorScheme ?? 'light']


    useEffect(()=>{
        axios.get(`${baseurl}/feedback`)
        .then((fetchedData)=>{
            setFeedbackArray(fetchedData.data);
        })
    },[])

    return(
        <>
            <ScrollView>
            {
                feedbackArray.length > 0 ?
                feedbackArray.map((item)=>(
            <View key={item?.id} style={{
                backgroundColor: color.background,}} className="w-full">
                <View style={{
                    backgroundColor: 'white',
                    borderColor: color.borderColor,
                    margin: 10,
                }} className="border-solid border rounded-xl mx-4 w-11/12">
                    <Text className="text-lg font-bold m-2 text-center">{item?.username}</Text>
                    <Text className="mx-3 text-center font-semibold text-sm mb-4">
                        {item?.message}
                    </Text>
                </View>
            </View>))
        :
        <View  style={{
            backgroundColor: color.background,}} className="w-full">
                <View style={{
                    backgroundColor: 'white',
                    borderColor: color.borderColor,
                    margin: 10,
                }} className="border-solid border rounded-xl mx-4 w-11/12 items-center justify-center min-h-[200px]">
                    <Text>
                        No Feedback available
                    </Text>
                </View>
        </View>    
        }
            </ScrollView>
        </>
    )
}