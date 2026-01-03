import { View, StyleSheet, Text, Dimensions } from "react-native";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenHeight = Dimensions.get("window").height;

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {

  let content = (
    <View style={Styles.emptyContainer}>
      <Ionicons
        name="receipt-outline"
        size={64}
        color={GlobalStyles.colors.primary50}
      />
      <Text style={Styles.infoText}>{fallbackText}</Text>
    </View>
  );
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={Styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {content}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: screenHeight * 0.15, // ~15% from top
  },
  infoText: {
    marginTop: 12,
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
    textAlign: "center",
  },
});
