import { registerForPushNotificationsAsync } from "@/functions/notifications";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Card, Title } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { UserContext } from "@/hooks/useUserContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Notification() {
  const {
    expoPushToken,
    setExpoPushToken,
    channels,
    setChannels,
    notifications,
    setNotifications,
    notification,
    setNotification,
    notificationListener,
    responseListener,
  } = useContext(UserContext);

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        setNotifications([...notifications, notification]);
        console.log("Notification listener in notification: ", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Response listener: in notification: ", response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <View className="h-full bg-gray-300 ">
        {notifications.map((not) => {
          return (
            <Card className="bg-white h-36 rounded-e-lg mx-4 my-3 ">
              <View className="flex-row items-center p-3 ">
                <MaterialIcons name="warning" size={24} />
                <Title>
                  <Text> Alert: {not?.request.content.title}</Text>
                </Title>
              </View>
              <View>
                <Text className="mx-2 text-s">
                  {notification && notification.request.content.body}
                </Text>
                <Text>
                  Data:{" "}
                  {notification &&
                    JSON.stringify(notification.request.content.data)}
                </Text>
                <Text className="text-right text-s text-gray-600 mx-2">
                  13:32 pm
                </Text>
              </View>
            </Card>
          );
        })}
      </View>
    </>
  );
}
