import { findAllBudgets, TBudget, TSubmitData } from "@/model/finances/budget";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import BudgetCard from "@/components/BudgetCard";
import { BudgetModal } from "@/components/BudgetModal";
import { UpdateBudgetModal } from "@/components/UpdateBudgetModal";
import { DeleteBudgetDialog } from "@/components/DeleteBudgetDialougue";
import { PaperProvider } from "react-native-paper";
import SummaryCard from "@/components/SummaryCard";

export default function Budget() {
  const [budgets, setBudgets] = useState<TBudget[] | TSubmitData[]>([]);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [wasDateUpdated, setWasDateUpdated] = useState(false);
  const [name, setName] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateBudget, setUpdateBudget] = useState(false);
  const [targetUpdateBudget, setTargetUpdateBudget] = useState<TBudget>();
  const [deleteRecord, setDeleteRecord] = useState(false);
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();

  const mapBudgets = (budget: TBudget) => {
    return (
      <BudgetCard
        budget={budget}
        key={budget.id}
        setUpdate={setUpdateBudget}
        setTargetBudget={setTargetUpdateBudget}
        setDelete={setDeleteRecord}
      />
    );
  };

  const loadBudgets = () => {
    findAllBudgets(db)
      .then((budgets) => {
        setBudgets(budgets);
        console.log("fetch successful", budgets);
        setLoading(false);
      })
      .catch((err) => {
        console.error("failed to get records: ", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadBudgets();
  }, []);

  return (
    <PaperProvider>
      <View
        style={{
          alignContent: "space-around",
        }}
        className="h-full flex flex-col p-1"
      >
        <SummaryCard/>
        {loading ? (
          <View className="h-full justify-center flex flex-col items-center">
            <ActivityIndicator
              size={75}
              color={colorScheme === "light" ? "#228b22" : "white"}
            />
          </View>
        ) : budgets.length === 0 ? (
          <View className="h-full w-full items-center mt-20">
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 16,
                color: "gray",
              }}
            >
              No Budgets found
            </Text>
          </View>
        ) : (
          <>
            <ScrollView className="w-full gap-y-3">
              {budgets.map(mapBudgets)}
            </ScrollView>
            {targetUpdateBudget && (
              <>
                <UpdateBudgetModal
                  targetUpdateBudget={targetUpdateBudget}
                  setTargetUpdateBudget={setTargetUpdateBudget}
                  budgets={budgets}
                  setBudgets={setBudgets}
                  open={updateBudget}
                  setOpen={setUpdateBudget}
                  showDatePicker={showDatePicker}
                  setShowDatePicker={setShowDatePicker}
                />
                <DeleteBudgetDialog
                  visible={deleteRecord}
                  setVisible={setDeleteRecord}
                  targetBudget={targetUpdateBudget}
                  loadBudgets={loadBudgets}
                />
              </>
            )}
          </>
        )}
        <BudgetModal
          name={name}
          setName={setName}
          budgets={budgets}
          setBudgets={setBudgets}
          maxAmount={maxAmount}
          setMaxAmount={setMaxAmount}
          open={open}
          setOpen={setOpen}
          wasDateUpdated={wasDateUpdated}
          setWasDateUpdated={setWasDateUpdated}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </View>
    </PaperProvider>
  );
}
