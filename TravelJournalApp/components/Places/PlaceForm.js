import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }

  return (
    <ScrollView style={Styles.form}>
      <View>
        <Text style={Styles.label}>Title</Text>
        <TextInput
          value={enteredTitle}
          onChangeText={changeTitleHandler}
          style={Styles.input}
          placeholder="Enter a title"
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  form: {
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    fontSize: 16,
    marginVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary700,
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: Colors.primary100,
  },
});
