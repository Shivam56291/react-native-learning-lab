import { View, FlatList, StyleSheet, Text } from "react-native";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={Styles.fallbackContainer}>
        <Text style={Styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={places}
        renderItem={(itemData) => <PlaceItem place={itemData.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
