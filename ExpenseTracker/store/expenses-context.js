import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  // ✅ Inside last 7 days
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 4979.17,
    date: new Date("2026-01-04"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 7409.07,
    date: new Date("2026-01-03"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 497.17,
    date: new Date("2026-01-01"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 1244.17,
    date: new Date("2025-12-30"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 1543.97,
    date: new Date("2025-12-29"),
  },

  // ❌ Older than 7 days
  {
    id: "e6",
    description: "Coffee maker",
    amount: 4159.17,
    date: new Date("2025-12-20"),
  },
  {
    id: "e7",
    description: "Groceries",
    amount: 6340.86,
    date: new Date("2025-12-10"),
  },
  {
    id: "e8",
    description: "Movie tickets",
    amount: 2116.5,
    date: new Date("2025-11-28"),
  },
  {
    id: "e9",
    description: "Headphones",
    amount: 9960.0,
    date: new Date("2025-11-15"),
  },
  {
    id: "e10",
    description: "Gym membership",
    amount: 3735.0,
    date: new Date("2025-10-05"),
  },
  {
    id: "e11",
    description: "Backpack",
    amount: 2987.17,
    date: new Date("2025-09-18"),
  },
  {
    id: "e12",
    description: "Lunch at cafe",
    amount: 1058.25,
    date: new Date("2025-08-30"),
  },
];


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}
