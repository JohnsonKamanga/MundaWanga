// HomeScreen Component
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/Card";
import Slideshow from "@/components/slide show";
import {useTailwind} from 'tailwindcss-react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { ProgressBar } from "@/components/ProgressBar";
import { useSQLiteContext } from "expo-sqlite";
import { findAllBudgets, TBudget, TSubmitData } from "@/model/finances/budget";
import { formatRelative } from "date-fns";
import { ActivityIndicator } from "react-native-paper";
export default function HomeScreen() {
  const db = useSQLiteContext();
  const [budgets, setBudgets] = useState<TBudget[] | TSubmitData[]>([]);
  const [loading, setloading] = useState(true);
  useEffect(()=>{
    setloading(true);
    findAllBudgets(db)
    .then((fetchedBudgets)=>{
      setBudgets(fetchedBudgets);
      console.log("Fetched budgets: ", fetchedBudgets);
      setloading(false);
    })
    .catch(()=>{
      console.error("Error when fetching budgets");
      setloading(false);
    })
  },[])
  return (
    
    <>
    {loading ?
    <View>
    <ActivityIndicator size={75}/>
    </View>
    :
    <ScrollView className="flex-1 bg-[#a2af9f]">
      {/*income summary  card */}
      <View className="my-5 px-2">
        <Card className="p-[10px]">
        <View className="w-full flex flex-col p-3 rounded-md" style={{
            borderWidth: 1,
            borderColor: 'rgba(34,139,34,0.3)',
          }}>
          <View className="flex flex-row gap-x-2 items-centre justify-center">
            <Ionicons name= "cash-outline" size={30}/>
          <CardHeader content="Income" />
          </View>
          <CardBody className="flex flex-row x-2 items-centre">
          
          <View className="p-2">
           <Text>Date</Text>
            </View>
            <View
            style={{
              borderLeftWidth: 1,
              borderColor: '#228b22',
              
            }}
            className="p-3">
          <Text className="text-indigo-950">
            Amount :
            </Text>
          <Text className="text-gray-950">
            Quantity : 
          </Text>
            </View>
            <View
            style={{
              borderLeftWidth: 1,
                borderColor: '#228b22'
          }}
            className="p-3">
          <Text className="text-gray-800">
            Desc : sold cows
            </Text>
            </View>
            <Text className="text-gray-700">
             
            </Text> 
          </CardBody>
        
          
          </View>
        </Card>
      </View>

      {/* Slideshow  */}
      <View className="my-0 px-4">
        <Slideshow />
      </View>

    {/*records summary card*/}
      <View className="my-5 px-2">
        <Card className="p-[10px]">
        <View className="w-full flex flex-col p-3 rounded-md" style={{
            borderWidth: 1,
            borderColor: 'rgba(34,139,34,0.3)',
          }}>
          <View className="flex flex-row gap-x-2 items-centre justify-center">
            <Ionicons name= "receipt-outline" size={30}/>
          <CardHeader content="Records" />
          </View>
          <CardBody className="flex flex-row x-2 items-centre">
          <View className="p-2">
          <Text className="text-gray-950">
              Date
              </Text>
              
            </View>
            <View
            style={{
              borderLeftWidth: 1,
              borderColor: '#228b22'
            }}
            className="p-3">
          <Text className="text-gray-800">
            Title:
            </Text>

            <Text className="text-gray-950">
            Description: 
            </Text>
            
            </View>

            <View
            style={{
              borderLeftWidth: 1,
              borderColor: '#228b22'
            }}
            className="p-3">
          <Text className="text-gray-800">
            Amount : sold cows
            </Text>
            </View>
          </CardBody>
          </View>
        </Card>
      </View>
      

        <View className="my-5 px-2">
        {/*Budjet summary card*/}
        <Card>
        <View className="w-full flex flex-col p-3 rounded-md" style={{
            borderWidth: 1,
            borderColor: 'rgba(34,139,34,0.3)',
          }}>
          <View className="flex flex-row gap-x-2 items-center">
            <Ionicons name= "calculator-outline" size={30}/>
          <CardHeader content={budgets.length > 0 ? budgets[0].name : "Budget"} />
          </View>
          <CardBody className="flex flex-row x-2 items-centre">
          <View className="p-2">
            {
              budgets.length > 0 ?
              <>
         <Text className="text-gray-950">
          Here is a summary that was created {formatRelative(budgets[0].set_date, Date.now())}
         </Text>
         <ProgressBar dividend={budgets[0].used} divisor={budgets[0].max_amount}/>
         </>
         : <Text>
          no budgets
         </Text>
            }  
            </View>   
          </CardBody>
          </View>
         
        </Card>
      </View>
  </ScrollView>
  }
  </>
  )
}