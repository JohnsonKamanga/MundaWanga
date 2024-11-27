import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { FormField } from "./FormField";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { findAllExpenses, TExpense, updateExpense } from "@/model/finances/expense";

export function UpdateExpenseModal({
  targetUpdateExpense,
  setTargetUpdateExpense,
  expenses,
  setExpenses,
  open,
  setOpen,
}: {
  targetUpdateExpense: TExpense;
  setTargetUpdateExpense: React.Dispatch<
    React.SetStateAction<TExpense | undefined>
  >;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  expenses: TExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<TExpense[]>>;
}) {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();
  const [quantityUsed, setQuantityUsed] = useState<number>(
    targetUpdateExpense.quantity_used
  );
  const [amountOfMoney, setAmountOfMoney] = useState<number>(
    targetUpdateExpense.amount_of_money
  );
  const [newDescription, setNewDescription] = useState<string>(
    targetUpdateExpense.description
  );

  const clearForm = () => {
    setNewDescription("");
    setAmountOfMoney(0);
    setQuantityUsed(0);
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
            className="relative w-full p-10 mt-[15%] rounded-xl gap-y-3"
          >
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

              <Text className="font-bold text-3xl dark:text-white">
                Update Record Details
              </Text>
            </View>
            <View className=" flex flex-col gap-y-4">
              <View>
                <Text className="font-semibold text-xl dark:text-white">
                  Description
                </Text>
                <FormField className="dark:bg-green-700">
                  <TextInput
                    className="dark:text-white"
                    onChangeText={(text) => {
                      setNewDescription(text);
                    }}
                    placeholder={targetUpdateExpense.description}
                    defaultValue={newDescription}
                  />
                </FormField>
              </View>
              <View>
                <Text className="font-semibold text-xl dark:text-white">
                  Amount of Money
                </Text>
                <FormField>
                  <TextInput
                    className="dark:text-white"
                    onChangeText={(text) => {
                      setAmountOfMoney(Number(text));
                    }}
                    placeholder={targetUpdateExpense.amount_of_money.toString()}
                    defaultValue={amountOfMoney.toString()}
                  />
                </FormField>
              </View>
              <View>
                <Text className="font-semibold text-xl dark:text-white">
                  Quantity Added
                </Text>
                <FormField>
                  <TextInput
                    className="dark:text-white"
                    onChangeText={(text) => {
                      setQuantityUsed(Number(text));
                    }}
                    placeholder={targetUpdateExpense.quantity_used.toString()}
                    defaultValue={quantityUsed.toString()}
                  />
                </FormField>
              </View>
            </View>
            <View className="flex flex-row justify-center">
              <Pressable
                onPress={(e) => {
                  clearForm();
                  setTargetUpdateExpense(undefined);
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
                  const {
                    description,
                    amount_of_money,
                    quantity_used,
                    last_modified,
                    ...otherProperties
                  } = targetUpdateExpense;
                  updateExpense(
                    {
                      description: newDescription,
                      amount_of_money: amountOfMoney,
                      quantity_used: quantityUsed,
                      last_modified: Date.now(),
                      ...otherProperties,
                    },
                    db
                  )
                    .then(async (value) => {
                      const newExpenses = await findAllExpenses(db);
                      setExpenses(newExpenses);
                      console.log("Expenses updated:", value);
                      Alert.alert("Updating data", "success");
                      setTargetUpdateExpense(undefined);
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
