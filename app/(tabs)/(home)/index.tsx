// HomeScreen Componen
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/Card";
import Slideshow from "@/components/slide show";
import { useTailwind } from "tailwindcss-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from "@/components/ProgressBar";
export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#a2af9f]">
      {/*income summary  card */}
      <View className="my-5 px-2">
        <Card className="p-[10px]">
          <View
            className="w-full flex flex-row p-3 rounded-md"
            style={{
              borderWidth: 1,
              borderColor: "rgba(34,139,34,0.3)",
            }}
          >
            <View className="flex flex-row gap-x-2 items-centre">
              <Ionicons name="cash-outline" size={30} />
              <CardHeader content="Income" />
            </View>
            <CardBody className="flex flex-row x-2 items-centre">
              <View className="p-2">
                <Text>Amount: k20,000</Text>
              </View>
              <View
                style={{
                  borderLeftWidth: 1,
                  borderColor: "#228b22",
                }}
                className="p-3"
              >
                <Text>Quantity:20</Text>
              </View>
              <View></View>
              <Text className="text-gray-700"></Text>
            </CardBody>
          </View>
        </Card>
      </View>

      {/* Slideshow  */}
      <View className="my-0 px-4">
        <Slideshow />
      </View>

      <View className="my-5 px-2">
        <Card>
          <View className="flex flex-row gap-x-2 items-center">
            <Ionicons name="receipt-outline" size={30} />
            <CardHeader content="Records" />
          </View>
          <CardBody>
            <Text className="text-[#228b22]"></Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Learn More</Text>
          </CardFooter>
        </Card>
      </View>

      <View className="my-5 px-2">
        {/*Budjet summary card*/}
        {}
        <Card>
          <View className="flex flex-row gap-x-2 items-centre">
            <Ionicons name="calculator-outline" size={30} />
            <CardHeader content="Budget" />
          </View>
          <CardBody>
            <Text className="text-[#228b22]">
              Here is a summary on the Budget created on 12 November 2024.
            </Text>
          </CardBody>
          <View className="flex flex-column gap-x-2 items-centre"></View>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Learn More</Text>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  );
}
