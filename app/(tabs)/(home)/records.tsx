import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  useColorScheme,
} from "react-native";
import { FAB, Menu, PaperProvider, Portal } from "react-native-paper";
import {
  deleteRecord,
  findAllRecords,
  parseRecord,
  TRecord,
} from "@/model/records/records";
import { useSQLiteContext } from "expo-sqlite";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import { DynamicForm } from "@/components/DynamicForm";
import { Colors } from "@/constants/Colors";
import { RecordForm, formStyles } from "@/components/RecordForm";
import { findRecordSchemaById, findRecordSchemaByName } from "@/model/records/record_schema";
import Search from "@/components/SearchBar";

interface TExtendedRecord extends TRecord {
  schema: any
}
export default function Records() {
  const [records, setRecords] = useState<TExtendedRecord[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showRecordSchemaForm, setShowRecordSchemaForm] = useState(false);
  const db = useSQLiteContext();
  const [isDynamicFormVisible, setIsDynamicFormVisible] = useState(false);
  const colorScheme = useColorScheme();

  const loadRecords = async () => {
    const storedRecords: TExtendedRecord[] = [];
    const jsonRecords = await findAllRecords(db);
    for (let i = 0; i < jsonRecords.length; i++) {
      const sch = await findRecordSchemaById(jsonRecords[i].schema_id, db);
      console.log('example schema: ', sch)
      storedRecords.push({...parseRecord(jsonRecords[i]), schema:sch});
      console.log(i, 'th element: ', parseRecord(jsonRecords[i]))
    }
    console.log('records: ',storedRecords);
    setRecords(storedRecords);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const viewRecordDetails = (item: TRecord) => {
    
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

  const renderItem = ({ item, index }: { item: TExtendedRecord; index: number }) => (
    <View style={formStyles.recordContainer}>
      <View style={formStyles.recordHeader}>
        
      </View>
      <Text>Schema Name: {item.schema?.name}</Text>
      <Text>Name: id : {item?.id}</Text>
      <Text>description: something</Text>
      
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
            <Search
              search={() => {
                console.log("searching...");
              }}
              setItems={setRecords}
            />

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
