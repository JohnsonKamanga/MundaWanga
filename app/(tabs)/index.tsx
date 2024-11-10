// HomeScreen Component
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card, CardBody, CardFooter, CardHeader } from "./recordscard";
import Slideshow from "@/components/slide show";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-[#a2af9f]">
      {/* Header Section */}
      <View className="h-[110px] bg-[#228b22] items-center justify-center">
        <Text className="text-white text-2xl font-bold">MundaWanga</Text>
      </View>

      {/* Introduction Card */}
      <View className="my-5 px-4">
        <Card>
          <CardHeader content="Welcome to MundaWanga" />
          <CardBody>
            <Text className="text-gray-700">
              MundaWanga helps you efficiently manage your agricultural budgets, records, and reports. Keep track of your farm activities, monitor spending, and generate insightful reports.
            </Text>
          </CardBody>
        </Card>
      </View>


      {/* Slideshow Section */}
      <View className="my-5 px-4">
        <Slideshow />
      </View>

      {/* Featured Services */}
      <View className="my-5 px-4">
        <Card>
          <CardHeader content="Budget Management" />
          <CardBody>
            <Text className="text-[#228b22]">
              Plan and track your agricultural expenses with ease. Set up budgets for seeds, fertilizer, labor, and more to ensure you stay within your limits and maximize profitability.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Learn More</Text>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader content="Record Keeping" />
          <CardBody>
            <Text className="text-[#228b22]">
              Maintain detailed records of crop yields, livestock performance, and daily farming activities. Accurate records help you make data-driven decisions and increase farm productivity.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Learn More</Text>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader content="Report Generation" />
          <CardBody>
            <Text className="text-[#228b22]">
              Generate insightful reports to analyze financial health, track productivity, and forecast future expenses. Access monthly, quarterly, or annual reports to stay informed.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">View Reports</Text>
          </CardFooter>
        </Card>
      </View>
      {/* Additional Features */}
      <View className="my-5 px-4">
        <Card>
          <CardHeader content="Track Inventory" />
          <CardBody>
            <Text className="text-[#228b22]">
              Keep a detailed log of your inventory levels, including equipment, seeds, and pesticides. Avoid stockouts and track seasonal supply needs.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">Manage Inventory</Text>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader content="Labor Management" />
          <CardBody>
            <Text className="text-[#228b22]">
              Assign tasks, track labor hours, and monitor productivity to optimize workforce efficiency and reduce operational costs.
            </Text>
          </CardBody>
          <CardFooter>
            <Text className="text-[#228b22] font-bold">View Labor Reports</Text>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  );
}
