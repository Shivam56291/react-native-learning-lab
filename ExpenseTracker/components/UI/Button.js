import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => pressed && Styles.pressed}
      >
        <View style={[Styles.button, mode === "flat" && Styles.flat]}>
          <Text style={[Styles.buttonText, mode === "flat" && Styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary50,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: 4,
  },
});
