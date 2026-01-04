import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

export default function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={Styles.overlay}>
      <View style={Styles.card}>
        <Text style={Styles.title}>Something went wrong!</Text>
        <Text style={Styles.message}>{message}</Text>
        <Button style={Styles.button} onPress={onConfirm}>
          Retry
        </Button>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary800, // solid purple background
    padding: 16,
  },
  card: {
    backgroundColor: GlobalStyles.colors.primary700, // slightly lighter purple for contrast
    padding: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: GlobalStyles.colors.error500, // red for error
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50, // light text for readability
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    minWidth: 120,
  },
});
