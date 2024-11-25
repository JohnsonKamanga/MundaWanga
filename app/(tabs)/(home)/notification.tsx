import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card, Title } from "react-native-paper";

export default function Notification() {
  return (
    <>
      <View className="h-full bg-gray-300 ">
        <Card className="bg-white h-36 rounded-e-lg mx-4 my-3 ">
          <View className="flex-row items-center p-3 ">
            <MaterialIcons name="warning" size={24} />
            <Title> Alert</Title>
          </View>
          <View>
            <Text className="mx-2 text-s">
              You have exceeded your monthly expenses. Please review and adjust
              your budget.
            </Text>
            <Text className="text-right text-s text-gray-600 mx-2">
              13:32 pm
            </Text>
          </View>
        </Card>
        <Card className="bg-white h-36 rounded-e-lg mx-4 my-3">
          <View className="flex-row items-center  p-3 ">
            <MaterialIcons name="notifications" size={24} />
            <Title> Notification</Title>
          </View>
          <View>
            <Text className="mx-2 text-s">
              You haven’t entered your expenses or income for today. Please
              update your records.
            </Text>
            <Text className="text-right text-s text-gray-600 mx-2">
              13:32 pm
            </Text>
          </View>
        </Card>
      </View>
    </>
  );
}
