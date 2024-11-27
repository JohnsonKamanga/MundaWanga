import { Colors } from "@/constants/Colors";
import { deleteExpense, TExpense } from "@/model/finances/expense";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { useColorScheme } from "react-native";
import { Alert, Pressable, Text, View } from "react-native";
import {
  ActivityIndicator,
  Dialog,
  Portal,
} from "react-native-paper";

export function DeleteExpenseDialog({
  visible,
  setVisible,
  targetExpense,
  loadExpenses,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loadExpenses: React.Dispatch<React.SetStateAction<void>>;
  targetExpense: TExpense;
}) {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        style={{
          backgroundColor: colorScheme === 'light' ? 'white' : Colors['dark'].barColor,
          shadowOpacity: 0.02,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
        }}
      >
        <Dialog.Title>
          <Text className="text-4xl font-bold">Delete Budget</Text>
        </Dialog.Title>
        <Dialog.Content>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Text className="dark:text-white text-xl">
                Are you sure you want to delete this income record: {" "}
                <Text className="font-semibold dark:text-white">
                  {targetExpense.description}?
                </Text>
              </Text>
            </View>
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Pressable
            onPress={() => {
              setLoading(true);
              if(targetExpense.id)
              deleteExpense(targetExpense.id, db)
                .then((deleted) => {
                  if (deleted) {
                    loadExpenses();
                    setVisible(false);
                    Alert.alert(
                      "Record deleted succesfully",
                      "The record has been deleted"
                    );
                    setLoading(false);
                  }
                })
                .catch((err) => {
                  console.error("Failed to delete record: ", err);
                  Alert.alert(
                    "Record failed deleted",
                    "The record was not deleted"
                  );
                  setLoading(false);
                });
            }}
          >
            <View className="bg-[#ff0000] p-2 rounded-[3px]">
              <Text className="text-white font-semibold">Accept</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setVisible(false);
            }}
          >
            <View className="p-2">
              <Text className="dark:text-white font-semibold">Cancel</Text>
            </View>
          </Pressable>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
