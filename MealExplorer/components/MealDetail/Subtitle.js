import { View, Text, StyleSheet } from "react-native";

export default function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subtitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#e2b497",
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e2b497",
    textAlign: "center",
  },
});
