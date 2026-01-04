import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, style, textInputConfig }) {
  let inputStyles = [Styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(Styles.inputMultiline);
  }

  return (
    <View style={[Styles.inputContainer, style]}>
      <Text style={Styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
}

const Styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: GlobalStyles.colors.primary100,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
