import { Ionicons } from "@expo/vector-icons";
import { Card, CardBody, CardFooter, CardHeader } from "./Card";
import { View } from "react-native";
import { Text } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { TBudget } from "@/model/finances/budget";
import { formatRelative } from "date-fns";

export default function BudgetCard({
  budget,
}: {
  budget: TBudget;
}) {
  return (
    <Card className="my-1 ml-3">
      <CardHeader
        content={budget.name}
        containerClassName="flex flex-row w-full items-center justify-between"
      >
        <Ionicons name="ellipsis-vertical-outline" size={20} />
      </CardHeader>
      <CardBody className="w-[80%]">
        <View className="flex flex-row">
          <Text className="dark:text-white font-bold mr-2">Spent:</Text>
          <Text className="dark:text-white font-light">
            MWK {budget.max_amount}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="dark:text-white font-bold mr-2">Last Modified:</Text>
          <Text className="dark:text-white font-light">
            {formatRelative(budget.last_modified, new Date())}
          </Text>
        </View>
        <ProgressBar
          dividend={budget.max_amount / 40}
          divisor={budget.max_amount}
        />
      </CardBody>
      <CardFooter className="w-full flex flex-row gap-x-2">
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.16)",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
          }}
          className="flex flex-row items-center justify-center opacity-40 p-2 rounded-3xl"
        >
          <Ionicons name="calendar-clear-outline" size={25} />
          <Text className="dark:text-white ml-1 text-sm font-light">
            {formatRelative(budget.set_date, new Date())}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.16)",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.1)",
          }}
          className="flex flex-row items-center justify-center opacity-40 p-2 rounded-3xl"
        >
          <Ionicons name="stopwatch-outline" size={25} />
          <Text className="dark:text-white ml-1 text-sm font-light">
            {formatRelative(budget.end_date, new Date())}
          </Text>
        </View>
      </CardFooter>
    </Card>
  );
}
