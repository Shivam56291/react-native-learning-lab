import { View, Text, StyleSheet } from "react-native";

import {GlobalStyles} from "../../constants/styles";

export default function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View style={Styles.container}>
      <Text style={Styles.period}>{periodName}</Text>
      <Text style={Styles.sum}>₹{expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});
