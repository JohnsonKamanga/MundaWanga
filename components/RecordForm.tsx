import { addRecord, deleteRecord, TRecord } from "@/model/records/records";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FormField } from "./FormField";
import {
  findAllRecordSchemas,
  parseRecordSchema,
  TRecordSchema,
} from "@/model/records/record_schema";
import { formatRelative } from "date-fns";
import { Ionicons } from "@expo/vector-icons";

type voidFunc = () => void;


function CalenderComponent({
  item,
  fields,
  setFields,
  fieldsRef,
}: {
  item: { fieldname: string; fieldType: "Text" | "Numeric" | "Date" };
  fields: Record<string, any>;
  setFields: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  fieldsRef: React.MutableRefObject<Record<string, any>>;
}) {
  const [showCalender, setShowCalender] = useState(false);
  const [date, setDate] = useState<Date | string | number>(0);
  return (
    <>
      <View>
        <Text>{item.fieldname}</Text>
        <FormField>
          <Pressable
            onPress={() => {
              setShowCalender(true);
            }}
          >
            <Text>
              {date === 0 ? "Enter a date" : formatRelative(date, Date.now())}
            </Text>
          </Pressable>
        </FormField>
      </View>
      {showCalender && (
        <RNDateTimePicker
          mode="date"
          display="calendar"
          value={new Date(date)}
          minimumDate={new Date()}
          onChange={(e) => {
            setDate(e.nativeEvent.timestamp);
            fieldsRef.current[item.fieldname] = e.nativeEvent.timestamp;
            setFields(fieldsRef.current);
            setShowCalender(false);
          }}
        />
      )}
    </>
  );
}

function TextInputField({
  item,
  fields,
  setFields,
  fieldsRef,
}: {
  item: { fieldname: string; fieldType: "Text" | "Numeric" | "Date" };
  fields: Record<string, any>;
  setFields: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  fieldsRef: React.MutableRefObject<Record<string, any>>;
}) {
  const [userText, setUserText] = useState("");

  return (
    <>
      <Text>{item.fieldname}</Text>
      <TextInput
        value={userText}
        style={formStyles.input}
        onChangeText={(text) => {
          if (fieldsRef.current) {
            setUserText(text);
            fieldsRef.current[item.fieldname] = text;
            setFields(fieldsRef.current);
          }
        }}
        placeholder={"Enter " + item.fieldname}
      />
    </>
  );
}

function NumericTextField({
  item,
  fields,
  setFields,
  fieldsRef,
}: {
  item: { fieldname: string; fieldType: "Text" | "Numeric" | "Date" };
  fields: Record<string, any>;
  setFields: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  fieldsRef: React.MutableRefObject<Record<string, any>>;
}) {
  const [userText, setUserText] = useState("");

  return (
    <>
      <Text>{item.fieldname}</Text>
      <TextInput
        value={userText}
        style={formStyles.input}
        onChangeText={(text) => {
          if (fieldsRef.current) {
            setUserText(text);
            fieldsRef.current[item.fieldname] = text;
            setFields(fieldsRef.current);
          }
        }}
        placeholder={"Enter " + item.fieldname}
      />
    </>
  );
}

export function RecordForm({
  records,
  setIsFormVisible,
  loadRecords,
}: {
  records: TRecord[];
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loadRecords: voidFunc;
}) {
  const [record, setRecord] = useState<TRecord>({
    fields: ''
  });

  const [fieldValue, setFieldValue] = useState<string | number | Date>(0);
  const [fields, setFields] = useState<Record<string, any>>({});
  const fieldsRef = useRef(fields);

  const db = useSQLiteContext();
  const [showSchemaOptions, setShowSchemaOptions] = useState(true);
  const [schemas, setSchemas] = useState<TRecordSchema[]>();
  const [targetSchema, setTargetSchema] = useState<{
    id?: number;
    name: string;
    fields: any[];
  }>();

  const drawFields = ({
    item,
    index,
  }: {
    item: { fieldname: string; fieldType: "Text" | "Numeric" | "Date" };
    index: number;
  }) => {
    const component =
      item.fieldType === "Date" ? (
        <CalenderComponent
          item={item}
          fields={fields}
          setFields={setFields}
          fieldsRef={fieldsRef}
        />
      ) : item.fieldType === "Numeric" ? (
        <NumericTextField
          item={item}
          fields={fields}
          setFields={setFields}
          fieldsRef={fieldsRef}
        />
      ) : (
        <TextInputField
          item={item}
          fields={fields}
          setFields={setFields}
          fieldsRef={fieldsRef}
        />
      );

    return (
      <View>
        <Text className="font-semibold text-lg">{item.fieldname}</Text>
        <FormField>{component}</FormField>
      </View>
    );
  };

  const saveRecord = () => {
    addRecord({ fields: JSON.stringify(fields) }, db)
      .then((rec) => {
        console.log('new record: ',rec)
        loadRecords();
        setIsFormVisible(false);
      })
      .catch((err) => {
        console.error("Error when storing record", err);
      });

    setRecord({
      fields:''
    });
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

  const loadRecordSchemas = () => {
    findAllRecordSchemas(db)
      .then((items) => {
        setSchemas(items);
      })
      .catch((err) => {
        console.log("An error occured: ", err);
      });
  };

  const drawSchemas = ({
    item,
    index,
  }: {
    item: TRecordSchema;
    index: number;
  }) => {
    return (
      <Pressable
        onPress={() => {
          const target = parseRecordSchema(item);
          setTargetSchema(target);
          setShowSchemaOptions(false);
        }}
        className="mb-4"
      >
        <FormField>
          <Text>{item.name}</Text>
        </FormField>
      </Pressable>
    );
  };

  useEffect(() => {
    loadRecordSchemas();
  }, []);

  return (
    <>
      {showSchemaOptions ? (
        <View style={formStyles.form}>
          <View className="w-full">
            <Pressable
            className="p-4 "
            onPress={()=>{
              setShowSchemaOptions(false);
            }}
            >
            <Ionicons color='black' name="close" size={35}/>
            </Pressable>
          </View>
          <FlatList
            data={schemas}
            renderItem={drawSchemas}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "gray",
                }}
              >
                No Schemas Available, please create some
              </Text>
            )}
          />
        </View>
      ) : (
        <View style={formStyles.form}>
          <Text style={formStyles.formTitle}>Add New Record</Text>
          <FlatList
            data={targetSchema?.fields}
            renderItem={drawFields}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "gray",
                }}
              >
                No Schemas Available, please create some
              </Text>
            )}
          />
          <View style={formStyles.buttonContainer}>
            <Button
              title="Cancel"
              onPress={() => setIsFormVisible(false)}
              color="gray"
            />
            <Button title="Save" onPress={saveRecord} color="green" />
          </View>
        </View>
      )}
    </>
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