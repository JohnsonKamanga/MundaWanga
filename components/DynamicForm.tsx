import { Colors } from "@/constants/Colors";
import { addRecordSchema } from "@/model/records/record_schema";
import { Ionicons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  TextInput,
  useColorScheme,
} from "react-native";
import { Text, View } from "react-native";
import { FormField } from "./FormField";
import { Divider } from "react-native-paper";

export type TField = {
  fieldname: string;
  fieldType: any;
};

const ListOfFormFieldElements = [<TextInput />];

export function DynamicForm({
  setFormVisible,
}: {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formFieldList, setFormFieldList] = useState<TField[]>([]);
  const [record, setRecord] = useState({});
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("");
  const [schemaName, setSchemaName] = useState("");
  const [isModalVisisble, setisModalVisisble] = useState(false);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();
  const handleFormClose = () => {
    setFormVisible(false);
  };

  const handleFormDone = () => {
    addRecordSchema(
      {
        name: schemaName,
        fields: JSON.stringify(formFieldList),
      },
      db
    )
      .then((schema) => {
        console.log("schema added: ", schema);
        Alert.alert(
          "Record Schema succesfully added",
          "Your new record schema has be saved"
        );
        setFormVisible(false);
      })
      .catch((err) => {
        console.error("An error occured: ", err);
        Alert.alert(
          "Record Schema was not added",
          "Your new record schema could not be saved"
        );
      });
  };

  const addFormField = (field: TField) => {
    setFormFieldList([...formFieldList, field]);
  };

  const renderFormFields = ({
    item,
    index,
  }: {
    item: TField;
    index: number;
  }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
          marginBottom: 10,
          padding: 15,
          minWidth: "100%",
        }}
        className="bg-gray-200 flex-row justify-between rounded-xl"
      >
        <Text>{item.fieldname}</Text>
        <View
          style={{
            borderLeftWidth: 1,
          }}
        ></View>
        <Text>{item.fieldType}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.9)",
      }}
      className="h-full absolute p-4"
    >
      <Text className="text-white font-bold text-3xl text-center mb-7 mt-3">
        Create New Record Schema
      </Text>
      <View
        className="bg-white rounded-xl"
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
        }}
      >
        <View className="p-10">
          <View>
            <Text className="font-semibold text-lg">Schema Name</Text>
            <FormField>
              <TextInput
                placeholder="Enter Schema Name"
                value={schemaName}
                onChangeText={(text) => {
                  setSchemaName(text);
                }}
              />
            </FormField>
          </View>
        </View>
        <View className="flex flex-col justify-center items-center min-h-[250px]">
          <Text className="font-semibold text-xl">Other fields</Text>
          <FlatList
            className="p-10"
            data={formFieldList}
            renderItem={renderFormFields}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "gray",
                }}
              >
                No Fields Added
              </Text>
            )}
          />
        </View>
        <View className="p-10">
          <View className="flex flex-row justify-end p-2">
            <Pressable
              onPress={() => {
                setisModalVisisble(true);
              }}
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].barColor,
              }}
              className="p-2 rounded-[6px] justify-end"
            >
              <Ionicons name="add" size={35} color={"white"} />
            </Pressable>
          </View>
          <View className="flex flex-row w-full justify-between items-center p-2">
            <Pressable
              onPress={handleFormClose}
              className="p-4 bg-[#ff0000] rounded-[3px]"
            >
              <Text className="text-white font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              disabled={
                newFieldName === "" && newFieldType === "" && schemaName === ""
              }
              onPress={handleFormDone}
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].barColor,
              }}
              className="p-4 rounded-[3px]"
            >
              <Text className="text-white font-semibold">Done</Text>
            </Pressable>
          </View>
        </View>
        <View className="w-full min-h-screen h-full absolute">
          <Modal visible={isModalVisisble} animationType="fade" transparent>
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
              className="p-[40px] min-h-screen h-full items-center justify-center w-full rounded-lg"
            >
              <KeyboardAvoidingView behavior="position">
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                  className="bg-white p-10 rounded-xl"
                >
                  <View>
                    <Text className="font-bold text-center text-3xl mb-5">
                      Enter Schema Details
                    </Text>
                  </View>
                  <View className="gap-y-3 ">
                    <View>
                      <Text className="font-semibold text-lg">Field name</Text>
                      <FormField className="p-4 bg-gray-50">
                        <TextInput
                          placeholder="Enter field name"
                          value={newFieldName}
                          onChangeText={(text) => {
                            setNewFieldName(text);
                          }}
                        />
                      </FormField>
                    </View>
                    <View>
                      <Text className="font-semibold text-lg">Field Type</Text>
                      <FormField className="p-0 bg-gray-50">
                        <RNPickerSelect
                          items={[
                            { label: "Date", value: "Date" },
                            { label: "Numeric", value: "Numeric" },
                            { label: "Text", value: "Text" },
                          ]}
                          onValueChange={(value) => {
                            setNewFieldType(value);
                          }}
                        />
                      </FormField>
                    </View>
                  </View>
                  <View className="flex flex-row w-full justify-between items-center p-2">
                    <Pressable
                      onPress={() => {
                        setNewFieldName("");
                        setNewFieldType("");
                        setisModalVisisble(false);
                      }}
                      className="p-4 bg-[#ff0000] rounded-[3px]"
                    >
                      <Text className="text-white font-semibold">Cancel</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setFormFieldList([
                          ...formFieldList,
                          {
                            fieldname: newFieldName,
                            fieldType: newFieldType,
                          },
                        ]);
                        setNewFieldName("");
                        setNewFieldType("");
                        setisModalVisisble(false);
                      }}
                      style={{
                        backgroundColor:
                          Colors[colorScheme ?? "light"].barColor,
                      }}
                      className="p-4 rounded-[3px]"
                    >
                      <Text className="text-white font-semibold">Done</Text>
                    </Pressable>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}
