import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Alert } from "react-native";
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
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
        Alert.alert(
          "Notification received!",
          notification.request.content.data.userName
        );
      }
    );

    const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
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

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
