import { StyleSheet, Text, View, Pressable } from "react-native";

export default function GoalItem({ text, id, onDeleteItem }) {

  return (
    
    <View style={styles.goalItem}>
      <Pressable android_ripple={{ color: "#210644" }} onPress={onDeleteItem.bind(this, id)} style={({pressed}) => pressed && styles.pressedItem} >
      <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
    
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    backgroundColor: "#5e0acc",
    borderRadius: 6,
  },
  pressedItem: {
    opacity: 0.5
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});
