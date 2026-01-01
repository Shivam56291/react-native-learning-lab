import { View, Text, StyleSheet } from "react-native";
import { MEALS } from "../data/dummy-data";

export default function MealsOverviewScreen() {
  return (
    <View style={styles.container}>
      <Text>MealsOverviewScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
