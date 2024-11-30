import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { FormField } from "./FormField";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { useEffect, useState, useContext } from "react";
import { findAllInventory, TInventory } from "@/model/inventory/inventory";
import { addexpense, TExpense } from "@/model/finances/expense";
import { findAllBudgets, findBudgetRowById, TBudget, TSubmitData } from "@/model/finances/budget";
import * as Notifications from "expo-notifications";
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


export function ExpenseModal({
  expenses,
  setExpenses,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expenses: TExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<TExpense[]>>;
}) {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();
  const [inventory, setInventory] = useState<TInventory>();
  const [budget, setBudget] = useState<TBudget | TSubmitData>()
  const [quantityUsed, setQuantityUsed] = useState(0);
  const [description, setDescription] = useState<string>("");
  const [amountOfMoney, setAmountOfMoney] = useState(0);
  const [inventoryList, setInventoryList] = useState<
    {
      label: string;
      value: TInventory;
    }[]
  >([]);
  const [budgetList, setBudgetList] = useState<
    {
      label: string;
      value: TBudget | TSubmitData;
    }[]
  >([]);

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
    setDescription("");
    setAmountOfMoney(0);
    setQuantityUsed(0);
    3;
    setInventory(undefined);
  };

  const fetchInventoryList = async () => {
    const list = await findAllInventory(db);
    const budgets = await findAllBudgets(db);
    setInventoryList([]);
    list.map((item) => {
      setInventoryList([
        ...inventoryList,
        {
          label: item.name,
          value: item,
        },
      ]);
    });
    setBudgetList([])
    budgets.map((item) => {
      setBudgetList([
        ...budgetList,
        {
          label: item.name,
          value: item,
        },
      ]);
    })
  };

  useEffect(() => {
    fetchInventoryList();
  }, []);

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

              <Text className="font-bold text-3xl dark:text-white">Expense Details</Text>
            </View>
            <View className=" flex flex-col gap-y-4">
              <View>
                <Text className="dark:text-white">Expense Description</Text>
                <FormField>
                  <TextInput
                    onChangeText={(text) => {
                      setDescription(text);
                    }}
                    placeholder="Enter Income Description"
                    defaultValue={description}
                    value={description}
                  />
                </FormField>
              </View>
              <View>
                <Text className="dark:text-white">Amount of Money</Text>
                <FormField>
                  <TextInput
                    onChangeText={(text) => {
                      setAmountOfMoney(Number(text));
                    }}
                    placeholder="Enter Amount of Money"
                  />
                </FormField>
              </View>
              <View>
                <Text className="dark:text-white">Quantity Used</Text>
                <FormField>
                  <TextInput
                    onChangeText={(text) => {
                      setQuantityUsed(Number(text));
                    }}
                    placeholder="Enter Quanity Added"
                  />
                </FormField>
              </View>
              <View>
              <Text className="dark:text-white">Choose an inventory type</Text>
              <FormField>
                <RNPickerSelect
                  items={inventoryList}
                  onValueChange={(value) => {
                    setInventory(value);
                  }}
                />
              </FormField>
              </View>
              <View>
              <Text className="dark:text-white">Choose a Budget</Text>
              <FormField>
                <RNPickerSelect
                  items={budgetList}
                  onValueChange={(value) => {
                    console.log('chosen budget: ', value)
                    setBudget(value);
                  }}
                />
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
                  console.log("submitting...");
                  const newExpense = inventory?.id
                    ? {
                        inventory_id: inventory?.id,
                        last_modified: Date.now(),
                        set_date: Date.now(),
                        quantity_used: quantityUsed,
                        description: description,
                        amount_of_money: amountOfMoney,
                      }
                    : {
                        last_modified: Date.now(),
                        set_date: Date.now(),
                        quantity_used: quantityUsed,
                        description: description,
                        amount_of_money: amountOfMoney,
                      };

                    
                   const finalExpense = budget?.id ? {...newExpense, budget_id: budget.id} : newExpense;
                  addexpense(finalExpense, db)
                    .then(async (value) => {
                      console.log("Expense added:", value);
                      const budget = await findBudgetRowById(value.budget_id,db)
                      setExpenses([...expenses, value]);
                      if((budget?.used/budget?.max_amount > 0.9) && budget ){
                        await Notifications.scheduleNotificationAsync({
                          content: {
                            title: `Budget limit nearing finish`,
                            body: `You've used more than 90% of your budget: ${budget.name} `,
                            data: {
                              data: value,
                            },
                          },
                          trigger: {
                            seconds: 1
                          },
                        });
                      }
                      Alert.alert("Adding data", "success");
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
