import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { FormField } from "./FormField";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatRelative } from "date-fns";
import { addBudget, TBudget, TSubmitData } from "@/model/finances/budget";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import * as Notifications from "expo-notifications";
import { useContext, useEffect } from "react";
import Constants from "expo-constants";
import { Platform } from "react-native";
import {
  addNotification,
  findAllNotifications,
} from "@/model/notification/notification";
import {
  scheduleNotifications,
  registerForPushNotificationsAsync,
} from "@/functions/notifications";
import { UserContext } from "@/hooks/useUserContext";


export function BudgetModal({
  name,
  setName,
  budgets,
  setBudgets,
  maxAmount,
  setMaxAmount,
  endDate,
  setEndDate,
  wasDateUpdated,
  setWasDateUpdated,
  showDatePicker,
  setShowDatePicker,
  open,
  setOpen,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  maxAmount: number;
  setMaxAmount: React.Dispatch<React.SetStateAction<number>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  wasDateUpdated: boolean;
  setWasDateUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  budgets: TBudget[] | TSubmitData[];
  setBudgets: React.Dispatch<React.SetStateAction<TBudget[] | TSubmitData[]>>;
}) {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();
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
      Notifications.addNotificationReceivedListener(async (notification) => {
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
              
            })
            .catch((err) => {
              console.log("An error occured: ", err);
            });
        setNotifications(await findAllNotifications(db));
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        
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


  const clearForm = () => {
    setName("");
    setMaxAmount(0);
    setEndDate(new Date());
    setWasDateUpdated(false);
  };

  return (
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
          style={{
            backgroundColor:
              colorScheme === "light" ? "white" : Colors["dark"].barColor,
          }}
          className="relative w-full p-10 mt-[15%] rounded-xl gap-y-3">
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

              <Text className="font-bold text-3xl dark:text-white">Budget Details</Text>
            </View>
            <View className=" flex flex-col gap-y-4">
              <View>
                <Text className="dark:text-white">
                  Budget Name
                </Text>
              <FormField>
                <TextInput
                  onChangeText={(text) => {
                    setName(text);
                  }}
                  placeholder="Enter Budget Name"
                  defaultValue={name}
                />
              </FormField>
              </View>
              <View>
              <Text className="dark:text-white">
                  Budget Amount
                </Text>
              <FormField>
                <TextInput
                  onChangeText={(text) => {
                    setMaxAmount(Number(text));
                  }}
                  placeholder="Enter Budget Amount"
                />
              </FormField>
              </View>
              <View>
                <Text className="dark:text-white">
                  Date
                </Text>
              <FormField>
                <Pressable
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                  className="py-1"
                >
                  <Text
                  style={{
                    color: "gray",
                  }}
                  >
                    {wasDateUpdated
                      ? formatRelative(endDate, new Date(Date.now()))
                      : "Choose a Date"}
                  </Text>
                </Pressable>
                {showDatePicker && (
                  <RNDateTimePicker
                    mode="date"
                    display="calendar"
                    value={endDate}
                    minimumDate={new Date(Date.now())}
                    onChange={(event) => {
                      setEndDate(new Date(event.nativeEvent.timestamp));
                      setWasDateUpdated(true);
                      setShowDatePicker(false);
                    }}
                  />
                )}
              </FormField>
              </View>
            </View>
            <View className="flex flex-row justify-center">
              <Pressable
                onPress={(e) => {
                  clearForm();
                  setOpen(!open);
                }}
                className="flex flex-row items-center justify-center p-3 rounded-xl w-[150px]"
              >
                <Text className="font-extrabold text-2xl text-[#228b22]">
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={(event) => {
                  event.preventDefault();
                  addBudget(
                    {
                      name: name,
                      max_amount: maxAmount,
                      end_date: endDate.getTime(),
                    },
                    db
                  )
                    .then(async(value) => {
                      console.log("Budget added:", value);
                      setBudgets([value, ...budgets]);
                      Alert.alert("Adding data", "success");
                      await Notifications.scheduleNotificationAsync({
                        content: {
                          title: `Budget deadline`,
                          body: `Your budget ${value.name} has reached the end of it's time frame`,
                          data: {
                            data: value,
                          },
                        },
                        trigger: new Date(value.end_date),
                      });
                      clearForm();
                      setOpen(false);
                    })
                    .catch((err) => {
                      console.error("failed: ", err);
                      Alert.alert("Adding data", "failed");
                    });
                }}
                className="flex flex-row items-center justify-center p-3 bg-[#228b22] rounded-xl w-[150px]"
              >
                <Text className="font-extrabold text-2xl text-white">
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].barColor,
        }}
        className="border-[1px] p-3 rounded-full absolute bottom-[240px] right-[33px]"
        onPress={() => {
          setOpen(true);
        }}
      >
        <Ionicons name="add" color="white" size={35} />
      </Pressable>
    </View>
  );
}
