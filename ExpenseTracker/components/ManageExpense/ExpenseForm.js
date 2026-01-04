import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";

import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

export default function ExpenseForm() {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((prevInputValues) => {
      return {
        ...prevInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  return (
    <View style={Styles.form}>
      <Text style={Styles.title}>Log the Damage</Text>
      <View style={Styles.inputsRow}>
        <Input
          style={Styles.rowInput}
          label="Amount"
          textInputConfig={{
            placeholder: "Spent how much?",
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={Styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            keyboardType: "numeric",
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          placeholder: "Explain yourself...",
          multiline: true,
          keyboardType: "default",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  form: {
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: GlobalStyles.colors.primary50,
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    gap: 12,
  },
  rowInput: {
    flex: 1,
  },
});
