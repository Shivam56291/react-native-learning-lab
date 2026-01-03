import { View, StyleSheet } from "react-native";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 4979.17,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 7409.07,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 497.17,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 1244.17,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 1543.97,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "Coffee maker",
    amount: 4159.17,
    date: new Date("2022-03-10"),
  },
  {
    id: "e7",
    description: "Groceries",
    amount: 6340.86,
    date: new Date("2022-03-12"),
  },
  {
    id: "e8",
    description: "Movie tickets",
    amount: 2116.5,
    date: new Date("2022-03-15"),
  },
  {
    id: "e9",
    description: "Headphones",
    amount: 9960.0,
    date: new Date("2022-04-01"),
  },
  {
    id: "e10",
    description: "Gym membership",
    amount: 3735.0,
    date: new Date("2022-04-05"),
  },
  {
    id: "e11",
    description: "Backpack",
    amount: 2987.17,
    date: new Date("2022-04-08"),
  },
  {
    id: "e12",
    description: "Lunch at cafe",
    amount: 1058.25,
    date: new Date("2022-04-10"),
  },
];

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {
  return (
    <View style={Styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
});
