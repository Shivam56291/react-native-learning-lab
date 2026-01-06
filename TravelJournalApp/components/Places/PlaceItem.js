import { View, Text, Image, Pressable, StyleSheet } from "react-native";

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable android_ripple={{ color: "#ccc" }} onPress={() => onSelect(place.id)}>
      <Image source={{uri: place.imageUri}} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}


const Styles = StyleSheet.create({
  
});