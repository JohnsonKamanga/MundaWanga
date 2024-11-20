import { View } from "react-native";


export interface TFormField {
    children: React.ReactNode;
  }

export function FormField({ children }: TFormField) {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.1)",
        }}
        className="p-3 bg-gray-200 rounded-xl"
      >
        {children}
      </View>
    );
  }