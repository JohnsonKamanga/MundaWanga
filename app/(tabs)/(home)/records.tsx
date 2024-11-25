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
  Pressable,
  useColorScheme,
} from "react-native";
import { FAB, Menu, PaperProvider, Portal } from "react-native-paper";
import {
  addRecord,
  deleteRecord,
  findAllRecords,
  parseRecord,
} from "@/model/records/records";
import { useSQLiteContext } from "expo-sqlite";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { DynamicForm } from "@/components/DynamicForm";
import { Colors } from "@/constants/Colors";
import { RecordForm } from "@/components/RecordForm";

export interface TRecord {
  id?: number;
  type: "livestock" | "crop";
  name: string;
  description: string;
  quantity: string;
  breedOrVariety: string;
  date: string;
}

export default function Records() {
  const [records, setRecords] = useState<TRecord[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showRecordSchemaForm, setShowRecordSchemaForm] = useState(false);
  const db = useSQLiteContext();
  const [isDynamicFormVisible, setIsDynamicFormVisible] = useState(false);
  const colorScheme = useColorScheme();

  const loadRecords = async () => {
    const storedRecords: TRecord[] = [];
    const jsonRecords = await findAllRecords(db);
    for (let i = 0; i < jsonRecords.length; i++) {
      storedRecords.push(parseRecord(jsonRecords[i]));
    }
    console.log(storedRecords);
    setRecords(storedRecords);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const viewRecordDetails = (item: TRecord) => {
    Alert.alert(
      "Record Details",
      `Type: ${item.type === "livestock" ? "Animal" : "Crop"}\nName: ${
        item.name
      }\ndescription: ${item.description}\nquantity: ${item.quantity}\n${
        item.type === "livestock" ? "Breed" : "Variety"
      }: ${item.breedOrVariety}\nDate: ${item.date}`
    );
  };

  const removeRecord = async (index: number) => {
    if (records[index]?.id) {
      deleteRecord(records[index]?.id, db)
        .then((deleted) => {
          if (deleted) loadRecords();
          else {
            console.error("Failed to delete record");
          }
        })
        .catch((err) => {
          console.error(err, "Failed to delete record");
        });
    }
  };

  const renderItem = ({ item, index }: { item: TRecord; index: number }) => (
    <View style={formStyles.recordContainer}>
      <View style={formStyles.recordHeader}>
        <Icon
          name={item.type === "livestock" ? "cow" : "corn"}
          size={24}
          color="black"
          style={formStyles.recordIcon}
        />
        <Text style={formStyles.recordTitle}>
          {item.type === "livestock" ? "Livestock Record" : "Crop Record"}
        </Text>
      </View>
      <Text>Name: {item?.Quantity}, id : {item.id}</Text>
      <Text>description: {item.description}</Text>
      <Text>
        {item.type === "livestock" ? "Breed" : "Variety"}: {item.breedOrVariety}
      </Text>
      <Text>Date: {item.date}</Text>
      <View style={formStyles.buttonContainer}>
        <TouchableOpacity
          style={formStyles.viewMoreButton}
          onPress={() => viewRecordDetails(item)}
        >
          <Text style={formStyles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={formStyles.deleteButton}
          onPress={() => removeRecord(index)}
        >
          <Text style={formStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <PaperProvider>
      <View style={formStyles.container}>
        {isFormVisible ? (
          <RecordForm
            loadRecords={loadRecords}
            setIsFormVisible={setIsFormVisible}
            records={records}
          />
        ) : (
          <>
            <FlatList
              data={records}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <Text style={formStyles.emptyListText}>No records found</Text>
              )}
            />
            {showRecordSchemaForm && (
              <Portal>
                <View className="h-full w-full bg-red-500 flex flex-row items-center justify-center">
                  <Text className="black">record schema</Text>
                  <Pressable
                    onPress={() => {
                      setShowRecordSchemaForm(false);
                    }}
                  >
                    <Ionicons name="close" size={35} />
                  </Pressable>
                </View>
              </Portal>
            )}
            <View
              style={{
                position: "absolute",
                right: 20,
                bottom: "15%",
              }}
            >
              <Menu
                visible={showMenu}
                onDismiss={() => {
                  setShowMenu(false);
                }}
                anchor={
                  <FAB
                    icon="plus"
                    onPress={() => {
                      setShowMenu(true);
                    }}
                    color="white"
                    style={{
                      backgroundColor: Colors[colorScheme ?? "light"].barColor,
                    }}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    setShowMenu(false);
                    setIsFormVisible(true);
                  }}
                  title="Create Record"
                />
                <Menu.Item
                  onPress={() => {
                    setShowMenu(false);
                    setIsDynamicFormVisible(true);
                  }}
                  title="Create Record Schema"
                />
              </Menu>
            </View>
          </>
        )}
      </View>
      {isDynamicFormVisible && (
        <DynamicForm setFormVisible={setIsDynamicFormVisible} />
      )}
    </PaperProvider>
  );
}

export const formStyles = StyleSheet.create({
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
