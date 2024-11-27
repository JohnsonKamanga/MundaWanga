import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Budget from ".";
import Income from "./income";
import Expense from "./expense";
import Inventory from "./inventory";
import { View } from "react-native";

const Tabs = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {
          justifyContent: "space-around",
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        component={Budget}
        options={{
          title: "Budget",
          tabBarIcon: ({ color, focused }) => (
           <View className="items-center justify-center"> 
            <TabBarIcon
              name={focused ? "calculator" : "calculator-outline"}
              color={color}
              size={20}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="income"
        component={Income}
        options={{
          title: "Income",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
            <TabBarIcon
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
              size={20}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Expenses"
        component={Expense}
        options={{
          title: "Expenses",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
            <TabBarIcon
              name={focused ? "card" : "card-outline"}
              color={color}
              size={20}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Inventory"
        component={Inventory}
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, focused }) => (
            <View className="items-center justify-center">
            <TabBarIcon
              name={focused ? "cube" : "cube-outline"}
              color={color}
              size={20}
            />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
