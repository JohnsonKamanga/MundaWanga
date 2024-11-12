import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";
interface Record {
  title: string;
  description: string;
  type: "Income" | "Expense";
  amount: string;
  date: string;
}

export default function Record() {
  const [record, setRecord] = useState<Record>({
    title: "",
    description: "",
    type: "Expense",
    amount: "",
    date: "",
  });
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const saveRecord = async () => {
    if (
      !record.title ||
      !record.description ||
      !record.amount ||
      !record.date
    ) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const newRecords = [...records, record];
    await AsyncStorage.setItem("records", JSON.stringify(newRecords));
    setRecords(newRecords);
    setRecord({
      title: "",
      description: "",
      type: "Expense",
      amount: "",
      date: "",
    });
  };

  const deleteRecord = async (index: number) => {
    const newRecords = [...records];
    newRecords.splice(index, 1);
    await AsyncStorage.setItem("records", JSON.stringify(newRecords));
    setRecords(newRecords);
  };

  const loadRecords = async () => {
    const storedRecords = await AsyncStorage.getItem("records");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  };

  const deleteRecordAlert = (index: number) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteRecord(index),
        },
      ],
      { cancelable: false }
    );
  };

  const renderDeleteButton = (index: number) => (
    <TouchableOpacity onPress={() => deleteRecordAlert(index)}>
      <Text style={styles.deleteButton}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }: { item: Record; index: number }) => (
    <View style={styles.recordCard}>
      <View style={styles.cardContent}>
        {/* Icon */}
        <IconButton icon={item.title === "Seeds" ? "leaf" : "cow"} size={30} />

        {/* Record Details */}
        <View style={styles.details}>
          <Text style={styles.recordTitle}>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        {/* Amount */}
        <Text
          style={[
            styles.amount,
            item.type === "Income" ? styles.income : styles.expense,
          ]}
        >
          MK {item.amount}
        </Text>
      </View>
      {renderDeleteButton(index)}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={record.title}
          onChangeText={(text) => setRecord({ ...record, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={record.description}
          onChangeText={(text) => setRecord({ ...record, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount (e.g., MK 20000)"
          value={record.amount}
          onChangeText={(text) => setRecord({ ...record, amount: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (e.g., 16 Oct 2024)"
          value={record.date}
          onChangeText={(text) => setRecord({ ...record, date: text })}
        />
        <Button title="Save" onPress={saveRecord} />
      </View>
      <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.recordList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No records found</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingTop: 20,
  },
  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  recordList: {
    paddingHorizontal: 10,
  },
  recordCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  details: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  income: {
    color: "green",
  },
  expense: {
    color: "red",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
  },
});
