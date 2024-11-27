import { findAllIncome } from "@/model/finances/income";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { IncomeModal } from "@/components/IncomeModal";
import { UpdateIncomeModal } from "@/components/UpdateIncomeModal";
import { DeleteIncomeDialog } from "@/components/DeleteIncomeDialogue";
import { PaperProvider } from "react-native-paper";
import IncomeCard from "@/components/IncomeCard";
import { TIncome } from "@/model/finances/income";

export default function Income() {
  const [incomeArray, setIncomeArray] = useState<TIncome[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateIncome, setUpdateIncome] = useState(false);
  const [targetUpdateIncome, setTargetUpdateIncome] = useState<TIncome>();
  const [deleteIncome, setDeleteIncome] = useState(false);
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const { colorScheme } = useColorScheme();

  const mapIncomeCards = (incomeItem: TIncome) => {
    return (
      <IncomeCard
        income={incomeItem}
        key={incomeItem.id}
        setUpdate={setUpdateIncome}
        setTargetIncome={setTargetUpdateIncome}
        setDelete={setDeleteIncome}
      />
    );
  };

  const loadIncome = () => {
    findAllIncome(db)
      .then((income) => {
        setIncomeArray(income);
        console.log("fetch successful");
        console.log("Income items: ", income);
        setLoading(false);
      })
      .catch((err) => {
        console.error("failed to get income records: ", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadIncome();
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
        ) : incomeArray.length === 0 ? (
          <View className="h-full w-full items-center mt-20">
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 16,
                color: "gray",
              }}
            >
              No Income records found
            </Text>
          </View>
        ) : (
          <>
            <ScrollView className="w-full gap-y-3">
              {incomeArray.map(mapIncomeCards)}
            </ScrollView>
            {targetUpdateIncome && (
              <>
                <UpdateIncomeModal
                  targetUpdateIncome={targetUpdateIncome}
                  setTargetUpdateIncome={setTargetUpdateIncome}
                  incomeArray={incomeArray}
                  setIncomeArray={setIncomeArray}
                  open={updateIncome}
                  setOpen={setUpdateIncome}
                />
                <DeleteIncomeDialog
                  visible={deleteIncome}
                  setVisible={setDeleteIncome}
                  targetIncome={targetUpdateIncome}
                  loadIncome={loadIncome}
                />
              </>
            )}
          </>
        )}
        <IncomeModal
          incomeArray={incomeArray}
          setIncomeArray={setIncomeArray}
          open={open}
          setOpen={setOpen}
        />
      </View>
    </PaperProvider>
  );
}
