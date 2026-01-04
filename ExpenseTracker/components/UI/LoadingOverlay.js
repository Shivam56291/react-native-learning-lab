import { View, Text, StyleSheet, Animated, ActivityIndicator } from "react-native";
import { useEffect, useRef, useState } from "react";
import { GlobalStyles } from "../../constants/styles";

export default function LoadingOverlay() {
  const [dots, setDots] = useState("");
  const opacity = useRef(new Animated.Value(0.5)).current;

  // Animate spinner opacity (pulse effect)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Animate dots for "Loading..." effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={Styles.container}>
      <Animated.View style={{ opacity }}>
        <ActivityIndicator
          size="large"
          color={GlobalStyles.colors.primary50}
        />
      </Animated.View>
      <Text style={Styles.text}>Loading{dots}</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 16,
  },
  text: {
    color: GlobalStyles.colors.primary50,
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
