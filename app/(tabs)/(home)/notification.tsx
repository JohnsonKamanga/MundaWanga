import { registerForPushNotificationsAsync } from "@/functions/notifications";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { Card, Title } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { UserContext } from "@/hooks/useUserContext";
import { formatRelative } from "date-fns";
import {
  addNotification,
  findAllNotifications,
} from "@/model/notification/notification";
import { useSQLiteContext } from "expo-sqlite";

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
  const db = useSQLiteContext();
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
        if (
          notification.request.content.title &&
          notification.request.content.body
        )
          addNotification(
            {
              data: JSON.stringify(notification.request.content.data),
              title: notification.request.content.title,
              body: notification.request.content.body,
              added_date: notification.date,
            },
            db
          )
            .then(async (not) => {
              setNotifications(await findAllNotifications(db));
              console.log("Notification added: ", not);
            })
            .catch((err) => {
              console.log("An error occured: ", err);
            });
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

  useEffect(() => {
    findAllNotifications(db)
      .then((records) => {
        console.log("notifications: ", records);
        setNotifications(records);
      })
      .catch((err) => {
        console.error("An error occured when fetching notifications: ", err);
      });
  }, []);

  return (
    <>
      <View className="h-full bg-gray-300 ">
        {notifications.map((not) => {
          return (
            <Card
              key={not.id}
              className="bg-white h-36 rounded-e-lg mx-4 my-3 "
            >
              <View className="flex-row items-center p-3 ">
                <MaterialIcons name="warning" size={24} />
                <Title>
                  <Text className=""> {not.title}</Text>
                </Title>
              </View>
              <View>
                <Text className="mx-2 text-s">{not.body}</Text>
                <Text className="text-right text-s text-gray-600 mx-2">
                  {formatRelative(not.added_date, Date.now())}
                </Text>
              </View>
            </Card>
          );
        })}
      </View>
    </>
  );
}
