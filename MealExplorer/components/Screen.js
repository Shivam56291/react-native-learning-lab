import { View } from "react-native";

export default function Screen({ children }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#3f2f25" }}>
      {children}
    </View>
  );
}
