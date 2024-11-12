import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Budget from ".";
import Income from "./income";

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
          fontSize: 8
        }
      }}
    >
      <Tabs.Screen
        name="index"
        component={Budget}
        options={{
          title: "Budget",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calculator" : "calculator-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="income"
        component={Income}
        options={{
          title: "Income",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "wallet" : "wallet-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
