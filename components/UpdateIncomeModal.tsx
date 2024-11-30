import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { FormField } from "./FormField";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { findAllIncome, TIncome, updateIncome } from "@/model/finances/income";

export function UpdateIncomeModal({
  targetUpdateIncome,
  setTargetUpdateIncome,
  incomeArray,
  setIncomeArray,
  open,
  setOpen,
}: {
  targetUpdateIncome: TIncome;
  setTargetUpdateIncome: React.Dispatch<
    React.SetStateAction<TIncome | undefined>
  >;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  incomeArray: TIncome[];
  setIncomeArray: React.Dispatch<React.SetStateAction<TIncome[]>>;
}) {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();
  const [quantityAdded, setQuantityAdded] = useState<number>(
    targetUpdateIncome.quantity_added
  );
  const [amountOfMoney, setAmountOfMoney] = useState<number>(
    targetUpdateIncome.amount_of_money
  );
  const [newDescription, setNewDescription] = useState<string>(
    targetUpdateIncome.description
  );

  const clearForm = () => {
    setNewDescription("");
    setAmountOfMoney(0);
    setQuantityAdded(0);
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
                    placeholder={targetUpdateIncome.description}
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
                    placeholder={targetUpdateIncome.amount_of_money.toString()}
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
                      setQuantityAdded(Number(text));
                    }}
                    placeholder={targetUpdateIncome.quantity_added.toString()}
                    defaultValue={quantityAdded.toString()}
                  />
                </FormField>
              </View>
            </View>
            <View className="flex flex-row justify-center">
              <Pressable
                onPress={(e) => {
                  clearForm();
                  setTargetUpdateIncome(undefined);
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
                    quantity_added,
                    last_modified,
                    ...otherProperties
                  } = targetUpdateIncome;
                  updateIncome(
                    {
                      description: newDescription,
                      amount_of_money: amountOfMoney,
                      quantity_added: quantityAdded,
                      last_modified: Date.now(),
                      ...otherProperties,
                    },
                    db
                  )
                    .then(async (value) => {
                      const newIncomeArray = await findAllIncome(db);
                      setIncomeArray(newIncomeArray);
                      console.log("Budget updated:", value);
                      Alert.alert("Updating data", "success");
                      setTargetUpdateIncome(undefined);
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
