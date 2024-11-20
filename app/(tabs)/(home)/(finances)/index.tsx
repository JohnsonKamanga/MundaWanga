import { Card, CardBody, CardFooter, CardHeader } from "@/components/Card";
import {
  Dialouge,
  DialougeAction,
  DialougeClose,
  DialougeContent,
  DialougeTrigger,
} from "@/components/Dialouge";
import { ProgressBar } from "@/components/ProgressBar";
import {
  addBudget,
  FindAllBudgets,
  findBudgetRowById,
  TBudget,
  TSubmitData,
} from "@/model/finances/budget";
import { Ionicons } from "@expo/vector-icons";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

interface TFormField {
  children: React.ReactNode;
}

function FormField({ children }: TFormField) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
      }}
      className="p-3 bg-gray-200 rounded-xl"
    >
      {children}
    </View>
  );
}

export default function Budget() {
  const [budgets, setBudgets] = useState<TBudget[] | TSubmitData[]>([]);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>("");
  const [output, setOutput] = useState<TBudget>();
  const [open, setOpen] = useState(false);
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();

  const mapBudgets = (budget: TBudget) => {
    return (
      <Card key={budget.id}>
        <CardHeader
          content={budget.name}
          containerClassName="flex flex-row w-full items-center justify-between"
        >
          <Ionicons name="ellipsis-vertical-outline" size={20} />
        </CardHeader>
        <CardBody className="w-[80%]">
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">Spent:</Text>
            <Text className="dark:text-white font-light">MWK {budget.max_amount}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">
              Last Modified:
            </Text>
            <Text className="dark:text-white font-light">
              {format(budget.set_date.toLocaleString(), "EEEE dd h m aaa")}
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
              12 June 2023
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
              23 July 2023
            </Text>
          </View>
        </CardFooter>
      </Card>
    );
  };

  useEffect(() => {
    FindAllBudgets(db)
      .then((budgets) => {
        setBudgets(budgets);
        console.log("fetched budgets", budgets);
      })
      .catch((err) => {
        console.error("failed to get records: ", err);
      });
  }, []);

  return (
    <View
      style={{
        alignContent: "space-around",
      }}
      className="h-full flex flex-col p-1"
    >
      <Text className="dark:text-white text-white">Budget cards</Text>

      <ScrollView className="w-full gap-y-3">
        {budgets.map(mapBudgets)}
      </ScrollView>
      <View className="w-full min-h-screen h-full absolute">
        <Modal
          visible={open}
          onRequestClose={() => {
            setOpen(!open);
          }}
          transparent
          animationType="fade"
        >
          <View
            style={{
              backgroundColor: `rgba(0,0,0,0.8)`,
            }}
            className="min-h-screen h-full w-full flex-col items-center p-4"
          >
            <View className="relative w-full p-10 mt-[15%] rounded-xl bg-white dark:bg-[#808080] gap-y-3">
              <View className="flex items-center justify-center">
                <Pressable
                  style={{
                    borderColor: `rgba(0,0,0,0.15)`,
                  }}
                  className="absolute -left-[30px] -top-[30px] bg-white border-[1px] rounded-xl w-[40px] h-[40px] flex items-center justify-center"
                  onPress={(e) => {
                    setOpen(!open);
                  }}
                >
                  <Ionicons name="close" color="black" size={30} />
                </Pressable>

                <Text className="font-bold text-3xl">Budget Details</Text>
              </View>
              <View className=" flex flex-col gap-y-4">
                <FormField>
                  <TextInput
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    placeholder="Budget Name"
                    defaultValue={name}
                  />
                </FormField>
                <FormField>
                  <TextInput
                    onChangeText={(text) => {
                      setMaxAmount(Number(text));
                    }}
                    placeholder="Budget Amount"
                  />
                </FormField>
                <FormField>
                  <RNDateTimePicker mode="date" display="compact" value={endDate} minimumDate={new Date(Date.now())}/>
                </FormField>
              </View>
              <View className="flex flex-row justify-center">
                <Pressable
                  onPress={(e) => {
                    setOpen(!open);
                  }}
                  className="flex flex-row items-center justify-center p-3 rounded-xl w-[150px]"
                >
                  <Text className="font-extrabold text-2xl text-[#228b22]">
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={(event) => {
                    event.preventDefault();
                    addBudget(
                      {
                        name: name,
                        max_amount: maxAmount,
                        end_date: endDate,
                      },
                      db
                    )
                      .then((value) => {
                        console.log("Paul was here", value);
                        setBudgets([value, ...budgets]);
                        Alert.alert("Adding data", "success");
                        setOpen(false);
                      })
                      .catch((err) => {
                        console.error("failed: ", err);
                        Alert.alert("Adding data", "failed");
                      });
                  }}
                  className="flex flex-row items-center justify-center p-3 bg-[#228b22] rounded-xl w-[150px]"
                >
                  <Text className="font-extrabold text-2xl text-white">
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
          style={{
            backgroundColor: Colors[colorScheme ?? "light"].barColor,
          }}
          className="border-[1px] p-3 rounded-full absolute bottom-[240px] right-[33px]"
          onPress={() => {
            setOpen(true);
          }}
        >
          <Ionicons name="add" color="white" size={35} />
        </Pressable>
      </View>
    </View>
  );
}
