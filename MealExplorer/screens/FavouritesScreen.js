import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import Screen from "../components/Screen";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

export default function FavouritesScreen() {

  const favouriteMealsIds = useSelector((state) => state.favouriteMeals.ids);

  const favouriteMeals = favouriteMealsIds.map((id) => {
    return MEALS.find((meal) => meal.id === id);
  });

  if (favouriteMeals.length === 0) {
    return (
      <Screen>
        <View style={styles.rootContainer}>
          <Ionicons name="alert-circle-outline" size={78} color="#e4baa1" style={styles.icon} />
          <Text style={styles.text}>No favourite meals found.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <MealsList items={favouriteMeals} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 16, 
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});