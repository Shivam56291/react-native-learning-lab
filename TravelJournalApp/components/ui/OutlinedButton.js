import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";

export default function OutlinedButton({ onPress, children, icon }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [Styles.button, pressed && Styles.pressed]}
    >
      <Ionicons
        name={icon}
        size={18}
        color={Colors.primary500}
        style={Styles.icon}
      />
      <Text style={Styles.text}>{children}</Text>
    </Pressable>
  );
}

const Styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
