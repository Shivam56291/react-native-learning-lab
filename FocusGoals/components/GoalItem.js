import { StyleSheet, Text, View, Pressable } from "react-native";

export default function GoalItem({ text, id, onDeleteItem }) {

  return (
    <Pressable onPress={onDeleteItem.bind(this, id)}>
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{text}</Text>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    padding: 8,
    backgroundColor: "#5e0acc",
    borderRadius: 6,
  },
  goalText: {
    color: "white",
  },
});
