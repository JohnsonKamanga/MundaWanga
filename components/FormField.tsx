import { View } from "react-native";

export interface TFormField {
  children: React.ReactNode;
  className?: string;
}

export function FormField({ children, className }: TFormField) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
      }}
      className={className + " p-3 bg-gray-200 rounded-xl"}
    >
      {children}
    </View>
  );
}
