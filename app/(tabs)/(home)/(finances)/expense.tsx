import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { UpdateExpenseModal } from "@/components/UpdateExpenseModal";
import { DeleteExpenseDialog } from "@/components/DeleteExpenseDialogue";
import { PaperProvider } from "react-native-paper";
import { findAllExpenses, TExpense } from "@/model/finances/expense";
import { ExpenseModal } from "@/components/ExpenseModal";
import ExpenseCard from "@/components/ExpenseCard";

export default function Expense() {
  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateExpense, setUpdateExpense] = useState(false);
  const [targetUpdateExpense, setTargetUpdateExpense] = useState<TExpense>();
  const [deleteExpense, setDeleteExpense] = useState(false);
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();

  const mapIncomeCards = (expenseItem: TExpense) => {
    return (
      <ExpenseCard
        expense={expenseItem}
        key={expenseItem.id}
        setUpdate={setUpdateExpense}
        setTargetExpense={setTargetUpdateExpense}
        setDelete={setDeleteExpense}
      />
    );
  };

  const loadExpenses = () => {
    findAllExpenses(db)
      .then((expense) => {
        setExpenses(expense);
        console.log("fetch successful");
        console.log("expense items: ", expense);
        setLoading(false);
      })
      .catch((err) => {
        console.error("failed to get records: ", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadExpenses();
  }, []);

  return (
    <PaperProvider>
      <View
        style={{
          alignContent: "space-around",
        }}
        className="h-full flex flex-col p-1"
      >
        {loading ? (
          <View className="h-full justify-center flex flex-col items-center">
            <ActivityIndicator
              size={75}
              color={colorScheme === "light" ? "#228b22" : "white"}
            />
          </View>
        ) : expenses.length === 0 ? (
          <View className="h-full w-full items-center mt-20">
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 16,
                color: "gray",
              }}
            >
              No Expense records found
            </Text>
          </View>
        ) : (
          <>
            <ScrollView className="w-full gap-y-3">
              {expenses.map(mapIncomeCards)}
            </ScrollView>
            {targetUpdateExpense && (
              <>
                <UpdateExpenseModal
                  targetUpdateExpense={targetUpdateExpense}
                  setTargetUpdateExpense={setTargetUpdateExpense}
                  expenses={expenses}
                  setExpenses={setExpenses}
                  open={updateExpense}
                  setOpen={setUpdateExpense}
                />
                <DeleteExpenseDialog
                  visible={deleteExpense}
                  setVisible={setDeleteExpense}
                  targetExpense={targetUpdateExpense}
                  loadExpenses={loadExpenses}
                />
              </>
            )}
          </>
        )}
        <ExpenseModal
          expenses={expenses}
          setExpenses={setExpenses}
          open={open}
          setOpen={setOpen}
        />
      </View>
    </PaperProvider>
  );
}
