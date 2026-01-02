import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList/MealsList";

export default function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  useLayoutEffect(() => {
    const category = CATEGORIES.find((cat) => cat.id === catId);
    navigation.setOptions({
      title: category.title,
      headerTintColor: "#fff",
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}
