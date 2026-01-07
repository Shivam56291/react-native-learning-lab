import { View, StyleSheet, Alert, Linking } from "react-native";
import * as Location from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

export default function LocationPicker() {
  const [locationPermissionInformation, requestPermission] =
    Location.useForegroundPermissions();

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
    console.log("PERMISSION GRANTED");
    let location = await Location.getLastKnownPositionAsync();
    if (!location) {
      location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 5000,
      });
    }
    console.log(location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={Styles.mapPreview}></View>
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
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
