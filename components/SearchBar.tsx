import * as React from "react";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View className="bg-">
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
};

export default Search;
