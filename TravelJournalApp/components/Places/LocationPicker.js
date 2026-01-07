import { View, StyleSheet, Alert, Linking, Image, Text } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import MapPreview from "../../util/MapPreview";

export default function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

  const mapPickedLocation = route.params ? {
    lat: route.params.pickedLat,
    lng: route.params.pickedLng,
  } : null; 

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status ===
      Location.PermissionStatus.UNDETERMINED
    ) {
      console.log("UNDETERMINED");
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (
      locationPermissionInformation.status === Location.PermissionStatus.DENIED
    ) {
      console.log("DENIED");
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    let location = await Location.getLastKnownPositionAsync();
    if (!location) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 5000,
      });
    }
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;
  if (pickedLocation) {
    console.log(pickedLocation);
    locationPreview = (
      <MapPreview
        style={Styles.image}
        lat={pickedLocation.lat}
        lng={pickedLocation.lng}
      />
    );
  }

  return (
    <View>
      <View style={Styles.mapPreview}>{locationPreview}</View>
      <View style={Styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Location User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
