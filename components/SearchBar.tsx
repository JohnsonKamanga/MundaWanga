import * as React from "react";
import { FAB, Menu, Searchbar } from "react-native-paper";
import { View } from "react-native";
import { findRecordsByQuery } from "@/model/records/records";
import { useSQLiteContext } from "expo-sqlite";

const Search = ({
  search,
  setItems,
}: {
  search: () => void;
  setItems: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [query, setQuery] = React.useState("");
  const db = useSQLiteContext();

  return (
    <View className="">
      <Searchbar
        onIconPress={async () => {
          const res = await findRecordsByQuery(query, db);
          console.log("Search results: ", res);
          setItems(res);
        }}
        placeholder="Search"
        onChangeText={(text) => {
          setQuery(text);
        }}
        value={query}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View className="w-full ">
            <View className="w-[55px] items-center justify-center p-3 ">
              <FAB
                style={{
                  backgroundColor: "gray",
                }}
                icon="menu"
                onPress={openMenu}
              />
            </View>
          </View>
        }
      >
        <Menu.Item onPress={() => console.log("A-Z")} title="A-Z" />
        <Menu.Item onPress={() => console.log("Z-A")} title="Z-A" />
        <Menu.Item onPress={() => console.log("Recent")} title="Recent" />
        <Menu.Item onPress={() => console.log("Earliest")} title="Earlist" />
      </Menu>
    </View>
  );
};

export default Search;
