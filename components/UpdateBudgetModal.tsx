import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { FormField } from "./FormField";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { formatRelative } from "date-fns";
import { addBudget, findAllBudgets, TBudget, TSubmitData, updateBudget } from "@/model/finances/budget";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
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


export function UpdateBudgetModal({
  targetUpdateBudget,
  setTargetUpdateBudget,
  budgets,
  setBudgets,
  showDatePicker,
  setShowDatePicker,
  open,
  setOpen,
}: {
  targetUpdateBudget: TBudget ;
  setTargetUpdateBudget: React.Dispatch<React.SetStateAction<TBudget | undefined>>;
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
  const [maxAmount, setMaxAmount] = useState<number>(targetUpdateBudget.max_amount);
  const [endDate, setEndDate] = useState<Date>(new Date(targetUpdateBudget.end_date));
  const [newName, setNewName] = useState<string>(targetUpdateBudget.name);

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
    setNewName("");
    setMaxAmount(0);
    setEndDate(new Date());
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
            backgroundColor: colorScheme === 'light' ? 'white' : Colors['dark'].barColor
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

              <Text className="font-bold text-3xl dark:text-white">Update Budget Details</Text>
            </View>
            <View className=" flex flex-col gap-y-4">
                <View>
                <Text className="font-semibold text-xl dark:text-white">
                    Name
                </Text>
              <FormField className="">
                <TextInput
                className=""
                  onChangeText={(text) => {
                    setNewName(text);
                  }}
                  placeholder={targetUpdateBudget.name.toString()}
                  defaultValue={newName}
                />
              </FormField>
              </View>
              <View>
                <Text className="font-semibold text-xl dark:text-white">
                    Maximum Amount
                </Text>
              <FormField>
                <TextInput
                className=""
                  onChangeText={(text) => {
                    setMaxAmount(Number(text));
                  }}
                  placeholder={targetUpdateBudget.max_amount.toString()}
                  defaultValue={maxAmount.toString()}
                />
              </FormField>
              </View>
              <View>
                <Text className="font-semibold text-xl dark:text-white">
                    End Date
                </Text>
              <FormField>
                <Pressable
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                  className="py-1"
                >
                  <Text
                  >
                    {formatRelative(endDate, new Date(Date.now()))}
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
                  setTargetUpdateBudget(undefined);
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
                  const {name, max_amount, end_date, last_modified, id, ...otherProperties} = targetUpdateBudget;
                  updateBudget(
                    {   id,
                      name: newName,
                      max_amount: maxAmount,
                      last_modified: Date.now(),
                      end_date: endDate.getTime(),
                      ...otherProperties
                    },
                    db
                  )
                    .then(async (value) => {
                      const newBudgets = await findAllBudgets(db);
                      setBudgets(newBudgets);
                      console.log("Budget updated:", value);
                      Alert.alert("Updating data", "success");
                      if(value?.used/value?.max_amount > 0.9 ){
                        await Notifications.scheduleNotificationAsync({
                          content: {
                            title: `Budget limit nearing finish`,
                            body: `You've used more than 90% of your budget ${value.name} `,
                            data: {
                              data: value,
                            },
                          },
                          trigger: {
                            seconds: 1
                          },
                        });
                      }
                      setTargetUpdateBudget(undefined);
                      clearForm();
                      setOpen(false);
                    })
                    .catch((err) => {
                      console.error("failed: ", err);
                      Alert.alert("Updating data", "failed");
                    });
                }}
                className="flex flex-row items-center justify-center p-3 bg-[#228b22] rounded-xl w-[150px]"
              >
                <Text className="font-extrabold text-2xl text-white">
                  Update
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
