import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

import Button from "../UI/Button";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { isValidDate } from "../../utils/date";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const formTitle =
    submitButtonLabel === "Add" ? "Log the expense" : "Update your masterpiece";

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const amountIsValid =
      !isNaN(+inputs.amount.value) && +inputs.amount.value > 0;
    const dateIsValid = isValidDate(inputs.date.value);
    const descriptionIsValid = inputs.description.value.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        amount: { value: inputs.amount.value, isValid: amountIsValid },
        date: { value: inputs.date.value, isValid: dateIsValid },
        description: {
          value: inputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={Styles.form}>
      <Text style={Styles.title}>{formTitle}</Text>
      <View style={Styles.inputsRow}>
        <Input
          invalid={!inputs.amount.isValid}
          style={Styles.rowInput}
          label="Amount"
          textInputConfig={{
            placeholder: "Spent how much?",
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          invalid={!inputs.date.isValid}
          style={Styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            keyboardType: "numeric",
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label="Description"
        textInputConfig={{
          placeholder: "Explain yourself...",
          multiline: true,
          keyboardType: "default",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={Styles.errorText}>
          Uh-oh! Your masterpiece isn’t quite ready {"\n"}
          {!inputs.amount.isValid ? "- Amount seems fishy\n" : ""}
          {!inputs.date.isValid ? "- Date is from another universe\n" : ""}
          {!inputs.description.isValid
            ? "- Description is mysteriously empty"
            : ""}
        </Text>
      )}

      <View style={Styles.buttons}>
        <Button style={Styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={Styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginVertical: 8,
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20,
  },
});
