import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import ManageAccount from "./manage_account";
import AdminFeedBack from ".";


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
        component={AdminFeedBack}
        options={{
          title: "FeedBack",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "mail" : "mail-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="manage_account"
        component={ManageAccount}
        options={{
          title: "Manage Accout",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
