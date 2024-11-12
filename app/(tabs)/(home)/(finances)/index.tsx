import { Card, CardBody, CardFooter, CardHeader } from "@/components/Card";
import {
  Dialouge,
  DialougeAction,
  DialougeClose,
  DialougeContent,
  DialougeTrigger,
} from "@/components/Dialouge";
import { ProgressBar } from "@/components/ProgressBar";
import { addBudget, findBudgetRowById, TBudget } from "@/model/finances/budget";
import { Ionicons } from "@expo/vector-icons";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useState } from "react";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";

interface TFormField {
  children: React.ReactNode;
}

function FormField({children}: TFormField){
  return(
    <View
    style={{
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)'
    }}
    className="p-3 bg-gray-200 rounded-xl">
      {children}
    </View>
  )
}

export default function Budget() {
  const sampleData: TBudget[] = [];
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [endDate, setEndDate] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [output, setOutput] = useState<TBudget>();
  const [open, setOpen] = useState(false);
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();

  const mapBudgets = (budget: TBudget) => {
    return (
      <Card>
        <CardHeader
          content="Fertilizer"
          containerClassName="flex flex-row w-full items-center justify-between"
        >
          <Ionicons name="ellipsis-vertical-outline" size={20} />
        </CardHeader>
        <CardBody className="w-[80%]">
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">Spent:</Text>
            <Text className="dark:text-white font-light">MWK 276,000</Text>
          </View>
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">
              Last Modified:
            </Text>
            <Text className="dark:text-white font-light">
              Monday 23 June 2023
            </Text>
          </View>
          <ProgressBar dividend={276000} divisor={500000} />
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

  return (
    <View className="h-full flex flex-col items-center p-1">
      <Text className="dark:text-white text-white">Budget cards</Text>
      <Card>
        <CardHeader
          content="Fertilizer"
          textClassName="dark:text-white"
          containerClassName="flex flex-row w-full items-center justify-between"
        >
          <Ionicons
            name="ellipsis-vertical-outline"
            size={20}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </CardHeader>
        <CardBody className="w-[80%]">
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">Spent:</Text>
            <Text className="dark:text-white font-light">MWK 276,000</Text>
          </View>
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">Target:</Text>
            <Text className="dark:text-white font-light">MWK 500,000</Text>
          </View>
          <View className="flex flex-row">
            <Text className="dark:text-white font-bold mr-2">
              Last Modified:
            </Text>
            <Text className="dark:text-white font-light">
              Monday 23 June 2023
            </Text>
          </View>
          <ProgressBar dividend={276000} divisor={500000} />
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
            <Ionicons
              name="calendar-clear-outline"
              size={25}
              color={colorScheme === "light" ? "black" : "white"}
            />
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
            <Ionicons
              name="stopwatch-outline"
              size={25}
              color={colorScheme === "light" ? "black" : "white"}
            />
            <Text className="dark:text-white ml-1 text-sm font-light">
              23 July 2023
            </Text>
          </View>
        </CardFooter>
      </Card>
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
            <View
              className="relative w-full p-10 mt-[15%] rounded-xl bg-white dark:bg-[#808080] gap-y-3"
            >
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

                <Text className="font-bold text-3xl">
                  Budget Details
                </Text>
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
              <TextInput
              onChangeText={(text) => {
                setEndDate(text);
              }}
              placeholder="End Date"
              />
              </FormField>
              </View>
              <View className="flex flex-row justify-center">
                <Pressable
                onPress={(e) => {
                  setOpen(!open);
                }}
                className="flex flex-row items-center justify-center p-3 rounded-xl w-[150px]">
                  <Text className="font-extrabold text-2xl text-[#228b22]">Cancel</Text>
                </Pressable>
                
                <Pressable className="flex flex-row items-center justify-center p-3 bg-[#228b22] rounded-xl w-[150px]">
                  <Text className="font-extrabold text-2xl text-white">Submit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
      style={{
        backgroundColor: Colors[colorScheme ?? 'light'].barColor
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

/*
<View>
        <View>
          <Text>Enter budget amount:</Text>
          <TextInput
            onChangeText={(text) => {
              setMaxAmount(200);
            }}
          />
        </View>
          <View>
            <Text>Enter End Date(yyyy-mm-dd):</Text>
            <TextInput
              onChangeText={(text) => {
                setEndDate(Date.parse(text));
              }}
            />
          </View>
          <View>
            <Text>Enter Name :</Text>
            <TextInput
            value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
        <View>
          <Button
          title="Submit"
          onPress={(e)=>{
            e.defaultPrevented=true;
            addBudget({name: name, max_amount: maxAmount, end_date: endDate}, db)
              .then(async (result)=>{
                const data = await findBudgetRowById(result.lastInsertRowId, db);
                setOutput(data);
                console.log("done")
              })
            .catch((err)=>{
              console.log(err)
            })
          }}
          />
        </View>
        <View>
          <Text>
            {output?.name}
          </Text>
          <Text>
            {output?.max_amount}
          </Text>
          <Text>
            {output?.set_date}
          </Text>
          <Text>
            {output?.end_date}
          </Text>
          <Text> 
            {output?.used}
          </Text>
        </View>
      </View>
*/

/*

      <Dialouge open={open} setOpen={setOpen}>
      <DialougeTrigger setOpen={setOpen}/>
      <DialougeContent content="This is a sample dialouge"/>
      <DialougeAction title="Add Record" onClick={()=>{
        console.log('adding a record');
      }}/>
      <DialougeClose title="Close" close={(newVal)=>{
        console.log('Cancelling record adding process');
        setOpen(newVal);
      }}/>
      </Dialouge>
*/
