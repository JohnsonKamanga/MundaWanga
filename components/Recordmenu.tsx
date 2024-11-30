import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Menu, PaperProvider, Provider } from "react-native-paper";

const Recordmenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View className=" p-5 ">
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<MaterialIcons name="menu" size={34} onPress={openMenu} />}
        >
          <Menu.Item onPress={() => console.log("A-Z")} title="A-Z" />
          <Menu.Item onPress={() => console.log("Z-A")} title="Z-A" />
          <Menu.Item onPress={() => console.log("Recent")} title="Recent" />
          <Menu.Item onPress={() => console.log("Earliest")} title="Earlist" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default Recordmenu;
