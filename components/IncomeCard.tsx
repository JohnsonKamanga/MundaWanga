import { Ionicons } from "@expo/vector-icons";
import { Card, CardBody, CardFooter, CardHeader } from "./Card";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import { TIncome } from "@/model/finances/income";
import { formatRelative } from "date-fns";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { findInventoryById, TInventory } from "@/model/inventory/inventory";
import { useSQLiteContext } from "expo-sqlite";

export default function IncomeCard({ income, setTargetIncome, setUpdate, setDelete }: { income: TIncome, setTargetIncome: React.Dispatch<React.SetStateAction<TIncome | undefined>>, setUpdate: React.Dispatch<React.SetStateAction<boolean>>, setDelete: React.Dispatch<React.SetStateAction<boolean>> }) {
  const {colorScheme} = useColorScheme();
  const [owningInventory, setOwningInventory] = useState<TInventory>({
    id:0 ,
    last_modified: Date.now(),
    set_date: Date.now(),
    available_quantity: 0,
    name:""
});
  const db = useSQLiteContext();

  const loadOwningInventory = async ()=>{
    if(income.id){
    const inv = await findInventoryById(income.id, db);
    if(inv)
    setOwningInventory(inv);
    }
  }


  useEffect(()=>{
    loadOwningInventory();
  },[])

  return (
    <Card className="my-1 ml-3">
      <CardHeader
        content={owningInventory.name}
        containerClassName="flex flex-row w-full items-center justify-between"
      >
        <View className="w-[70px] flex-row justify-between">
        <Pressable
        onPress={()=>{
          setTargetIncome(income);
          setUpdate(true);
        }}
        >
        <Ionicons name="create-outline" size={20} color={colorScheme === "light" ? "black" : "white"} />
        </Pressable>
        <Pressable
        onPress={()=>{
          setTargetIncome(income);
          setDelete(true);
        }}
        >
        <Ionicons name="trash-outline" size={20} color={colorScheme === "light" ? "black" : "white"} />
        </Pressable>
        </View>
      </CardHeader>
      <CardBody className="w-[80%]">
        <View className="flex flex-row">
          <Text className="dark:text-white font-bold mr-2">Spent:</Text>
          <Text className="dark:text-white font-light">
            MWK {income.amount_of_money}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="dark:text-white font-bold mr-2">Quantity added:</Text>
          <Text className="dark:text-white font-light">
            {income.quantity_added}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="dark:text-white font-bold mr-2">Description:</Text>
          <Text className="dark:text-white font-light">
           {income.description}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text className="dark:text-white font-bold mr-2">Last Modified:</Text>
          <Text className="dark:text-white font-light">
            {formatRelative(income.last_modified, new Date())}
          </Text>
        </View>
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
            {formatRelative(income.set_date, new Date())}
          </Text>
        </View>
      </CardFooter>
    </Card>
  );
}
