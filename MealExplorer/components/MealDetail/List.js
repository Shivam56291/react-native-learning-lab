import { View, Text, StyleSheet } from "react-native";

export default function Subtitle({ data }) {
  return data.map((dataPoint) => (
    <View style={styles.listItem} key={dataPoint}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 4,
    marginHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#e2b497",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  itemText: {
    color: "#351401",
    fontSize: 16,
    textAlign: "center",
  },
});
