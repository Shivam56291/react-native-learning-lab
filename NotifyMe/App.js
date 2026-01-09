import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  View,
  Alert,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Permission required", "You need to enable notifications");
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if (Platform.OS === "ios") {
        Notifications.setNotificationCategoriesAsync([
          {
            id: "reminders",
            actions: [
              {
                id: "markAsDone",
                title: "Mark as done",
                options: {
                  foreground: true,
                  authenticationRequired: false,
                  destructive: false,
                },
              },
            ],
          },
        ]);
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
        Alert.alert(
          "Notification received!",
          notification.request.content.data.userName
        );
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
        Alert.alert(
          "Notification response received!",
          response.notification.request.content.data.userName
        );
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const scheduleNotificationHandler = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello",
        body: "This is a notification",
        data: { userName: "Shivam" },
      },
      trigger: { seconds: 5 },
    });
    Alert.alert("Notification scheduled!");
  };

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[YOUR_DEVICE_TOKEN]",
        title: "Test - sent from a device",
        body: "This is a test notification",
        data: { userName: "Shivam" },
      }),
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={scheduleNotificationHandler}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={sendPushNotificationHandler}
      >
        <Text style={styles.buttonText}>Send Push Notification</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#4B7BEC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
  secondaryButton: {
    backgroundColor: "#2ed573",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
