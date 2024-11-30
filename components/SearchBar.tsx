import * as React from "react";
import { FAB, Menu, Searchbar } from "react-native-paper";
import { View } from "react-native";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { Query } from "expo-sqlite/legacy";

const Search = ({
  search,
  setItems,
}: {
  search: (
    query: string,
    db: SQLiteDatabase,
    queryOption?: {
      fields?: "ASC" | "DESC";
      last_modified?: "ASC" | "DESC";
    }
  ) => Promise<any>;
  setItems: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [visible, setVisible] = React.useState(false);
  const [queryOptions, setQueryOptions] = React.useState<{
    fields?: "ASC" | "DESC";
    last_modified?: "ASC" | "DESC";
  }>();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [query, setQuery] = React.useState("");
  const db = useSQLiteContext();

  return (
    <View className="">
      <Searchbar
        onIconPress={async () => {
          const res = await search(query, db, queryOptions);
          console.log("Search results: ", res);
          setItems(res);
        }}
        onClearIconPress={() => {
          setQuery("");
          setQueryOptions(undefined);
        }}
        onEndEditing={async () => {
          const res = await search(query, db, queryOptions);
          console.log("search result", res);
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
        <Menu.Item
          onPress={() => {
            setQueryOptions({ fields: "ASC" });
            closeMenu();
          }}
          title="A-Z"
        />
        <Menu.Item
          onPress={() => {
            setQueryOptions({ fields: "DESC" });
            closeMenu();
          }}
          title="Z-A"
        />
        <Menu.Item
          onPress={() => {
            setQueryOptions({ last_modified: "ASC" });
            closeMenu();
          }}
          title="Recent"
        />
        <Menu.Item
          onPress={() => {
            setQueryOptions({ last_modified: "DESC" });
            closeMenu();
          }}
          title="Earlist"
        />
      </Menu>
    </View>
  );
};

export default Search;
