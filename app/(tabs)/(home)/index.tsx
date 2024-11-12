// HomeScreen Component
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/Card";
import Slideshow from "@/components/slide show";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#a2af9f]">

      {/*income summary  card */}
      <View className="my-5 px-4">
        <Card>
          <View className="flex flex-row gap-x-2 items-centre">
            <Ionicons name= "cash-outline" size={30}/>
          <CardHeader content="Income" />
          </View>
          <CardBody className="flex flex-row-x-2 items-centre">
            <View>
          <Text></Text>
            </View>
            <View>

            </View>
            <Text className="text-gray-700">
             
            </Text> 
          </CardBody>
        </Card>
      </View>


      {/* Slideshow  */}
      <View className="my-0 px-4">
        <Slideshow />
      </View>

      <View className="my-1 px-4">
        <Card>
          <View className="flex flex-row gap-x-2 items-center"> 
          <Ionicons name="receipt-outline" size={30}/>
          <CardHeader content="Records" />
          </View>
          <CardBody>
            <Text className="text-[#228b22]">
              Plan and track your agricultural expenses with ease. Set up budgets for seeds, fertilizer, labor, and more to ensure you stay within your limits and maximize profitability.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Learn More</Text>
          </CardFooter>
        </Card>
        {/*Budjet summary card*/}
        <Card>
          <View className="flex flex-row gap-x-2 items-centre">
          <Ionicons name="calculator-outline" size={30}/>
          <CardHeader content="Budget" />
          </View>
          <CardBody>
            <Text className="text-[#228b22]">
              Maintain detailed records of crop yields, livestock performance, and daily farming activities. Accurate records help you make data-driven decisions and increase farm productivity.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Learn More</Text>
          </CardFooter>
        </Card>
      </View>
  </ScrollView>
  )
}