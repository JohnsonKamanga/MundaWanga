import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { FormField } from "./FormField";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useSQLiteContext } from "expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";
import { addIncome, TIncome } from "@/model/finances/income";
import { useEffect, useState } from "react";
import { findAllInventory, TInventory } from "@/model/inventory/inventory";

export function IncomeModal({
  incomeArray,
  setIncomeArray,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  incomeArray: TIncome[];
  setIncomeArray: React.Dispatch<React.SetStateAction<TIncome[]>>;
}) {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();
  const [inventory, setInventory] = useState<TInventory>();
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [description, setDescription] = useState<string>("");
  const [amountOfMoney, setAmountOfMoney] = useState(0);
  const [inventoryList, setInventoryList] = useState<
    {
      label: string;
      value: TInventory;
    }[]
  >([]);

  const clearForm = () => {
    setDescription("");
    setAmountOfMoney(0);
    setQuantityAdded(0);
    setInventory(undefined);
  };

  const fetchInventoryList = async () => {
    const list = await findAllInventory(db);
    list.map((item) => {
      setInventoryList([
        ...inventoryList,
        {
          label: item.name,
          value: item,
        },
      ]);
    });
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

              <Text className="font-bold text-3xl dark:text-white">Income Details</Text>
            </View>
            <View className=" flex flex-col gap-y-4">
              <View>
                <Text className="dark:text-white">
                  Income Description
                </Text>
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
                <Text className="dark:text-white">
                  Amount of Money
                </Text>
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
                <Text className="dark:text-white">
                  Quantity Added
                </Text>
              <FormField>
                <TextInput
                  onChangeText={(text) => {
                    setQuantityAdded(Number(text));
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
                  console.log('submitting...')
                  const newIncome = inventory?.id
                    ? {
                        inventory_id: inventory?.id,
                        last_modified: Date.now(),
                        set_date: Date.now(),
                        quantity_added: quantityAdded,
                        description: description,
                        amount_of_money: amountOfMoney,
                      }
                    : {
                        last_modified: Date.now(),
                        set_date: Date.now(),
                        quantity_added: quantityAdded,
                        description: description,
                        amount_of_money: amountOfMoney,
                      };
                  addIncome(newIncome, db)
                    .then((value) => {
                      console.log("Budget added:", value);
                      setIncomeArray([...incomeArray, value]);
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
