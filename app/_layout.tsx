import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SQLiteProvider } from "expo-sqlite";
import { UserContext, useUserContext } from "../hooks/useUserContext";
import { createTables } from "@/model/schema";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { registerForPushNotificationsAsync } from "@/functions/notifications";
import { TNotification } from "@/model/notification/notification";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { token, setToken } = useUserContext();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const [notifications, setNotifications] = useState<TNotification[]>([]);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="MundaWanga.db">
      <UserContext.Provider
        value={{
          token,
          setToken,
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
        }}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </UserContext.Provider>
    </SQLiteProvider>
  );
}
