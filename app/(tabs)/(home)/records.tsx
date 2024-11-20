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
import { FAB } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Record {
  type: "livestock" | "crop";
  name: string;
  description: string;
  quantity: string;
  breedOrVariety: string;
  date: string;
}

export default function Records() {
  const [records, setRecords] = useState<Record[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [record, setRecord] = useState<Record>({
    type: "livestock",
    name: "",
    description: "",
    quantity: "",
    breedOrVariety: "",
    date: "",
  });

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const storedRecords = await AsyncStorage.getItem("records");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  };

  const saveRecord = async () => {
    if (!record.name || !record.quantity || !record.date) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const newRecords = [...records, record];
    await AsyncStorage.setItem("records", JSON.stringify(newRecords));
    setRecords(newRecords);
    setRecord({
      type: "livestock",
      name: "",
      description: "",
      quantity: "",
      breedOrVariety: "",
      date: "",
    });
    setIsFormVisible(false);
  };

  const viewRecordDetails = (item: Record) => {
    Alert.alert(
      "Record Details",
      `Type: ${item.type === "livestock" ? "Animal" : "Crop"}\nName: ${
        item.name
      }\ndescription: ${item.description}\nquantity: ${item.quantity}\n${
        item.type === "livestock" ? "Breed" : "Variety"
      }: ${item.breedOrVariety}\nDate: ${item.date}`
    );
  };

  const deleteRecord = async (index: number) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    await AsyncStorage.setItem("records", JSON.stringify(updatedRecords));
    setRecords(updatedRecords);
  };

  const renderItem = ({ item, index }: { item: Record; index: number }) => (
    <View style={styles.recordContainer}>
      <View style={styles.recordHeader}>
        <Icon
          name={item.type === "livestock" ? "cow" : "corn"}
          size={24}
          color="black"
          style={styles.recordIcon}
        />
        <Text style={styles.recordTitle}>
          {item.type === "livestock" ? "Livestock Record" : "Crop Record"}
        </Text>
      </View>
      <Text>Name: {item.name}</Text>
      <Text>description: {item.description}</Text>
      <Text>
        {item.type === "livestock" ? "Breed" : "Variety"}: {item.breedOrVariety}
      </Text>
      <Text>Date: {item.date}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => viewRecordDetails(item)}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteRecord(index)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Add New Record</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={record.name}
            onChangeText={(text) => setRecord({ ...record, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="description"
            value={record.description}
            onChangeText={(text) => setRecord({ ...record, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="quantity"
            value={record.quantity}
            onChangeText={(text) => setRecord({ ...record, quantity: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Breed/Variety"
            value={record.breedOrVariety}
            onChangeText={(text) =>
              setRecord({ ...record, breedOrVariety: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Date etc 16 oct 2024 "
            value={record.date}
            onChangeText={(text) => setRecord({ ...record, date: text })}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => setIsFormVisible(false)}
              color="gray"
            />
            <Button title="Save" onPress={saveRecord} color="green" />
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>No records found</Text>
            )}
          />
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => setIsFormVisible(true)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  form: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  recordContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  recordIcon: {
    marginRight: 10,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  viewMoreButton: {
    backgroundColor: "green",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "green",
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});
