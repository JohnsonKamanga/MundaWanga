import { getItem, setItem } from "expo-secure-store";
import { createContext, useState } from "react";
import * as Notifications from "expo-notifications";

interface IToken {
  access_token: string;
  username: string;
}

interface IUserContext {
  setToken: React.Dispatch<React.SetStateAction<IToken | undefined>>;
  token: IToken | undefined;
}

interface SystemContext extends IUserContext {
  expoPushToken: string;
  setExpoPushToken: React.Dispatch<React.SetStateAction<string>>;
  channels: Notifications.NotificationChannel[];
  setChannels: React.Dispatch<
    React.SetStateAction<Notifications.NotificationChannel[]>
  >;
  notifications: Notifications.Notification[];
  setNotifications: React.Dispatch<
    React.SetStateAction<Notifications.Notification[]>
  >;
  notification: Notifications.Notification | undefined;
  setNotification: React.Dispatch<
    React.SetStateAction<Notifications.Notification | undefined>
  >;
  notificationListener: React.MutableRefObject<
    Notifications.Subscription | undefined
  >;
  responseListener: React.MutableRefObject<
    Notifications.Subscription | undefined
  >;
}

export const UserContext = createContext<SystemContext>({
  token: undefined,
  setToken: () => {},
  expoPushToken: "",
  setExpoPushToken: () => "",
  channels: [],
  setChannels: () => [],
  notifications: [],
  setNotifications: () => [],
  notification: undefined,
  setNotification: () => undefined,
  notificationListener: { current: undefined },
  responseListener: { current: undefined },
});

export function useUserContext() {
  const getToken = () => {
    const tokenString = getItem("token");
    const userToken = tokenString ? JSON.parse(tokenString) : undefined;
    return userToken;
  };

  const [token, setToken] = useState<IToken | undefined>(getToken());

  const saveToken = (userToken: React.SetStateAction<IToken | undefined>) => {
    setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return { token, setToken: saveToken };
}
