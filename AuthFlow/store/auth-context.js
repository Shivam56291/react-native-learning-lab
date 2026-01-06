import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_API_KEY } from "../constants/config";

let refreshTimer;

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: (token, refreshToken, expirationTime) => {},
  logout: () => {},
  refreshToken: () => {},
});

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState(null);

  const isAuthenticated = !!token;

  function clearRefreshTimer() {
    if (refreshTimer) clearTimeout(refreshTimer);
  }

  function logout() {
    setToken(null);
    setRefreshTokenValue(null);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("expirationTime");
    clearRefreshTimer();
  }

  function scheduleRefresh(expirationTime) {
    const currentTime = new Date().getTime();
    const remainingTime = expirationTime - currentTime - 5 * 60 * 1000; // 5 min before expiry
    if (remainingTime <= 0) {
      refreshIdToken();
    } else {
      refreshTimer = setTimeout(refreshIdToken, remainingTime);
    }
  }

  async function refreshIdToken() {
    try {
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      if (!storedRefreshToken) {
        logout();
        return;
      }

      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `grant_type=refresh_token&refresh_token=${storedRefreshToken}`,
        }
      );

      const data = await response.json();

      const newToken = data.id_token;
      const newRefreshToken = data.refresh_token;
      const expiresIn = +data.expires_in * 1000;
      const newExpiration = new Date().getTime() + expiresIn;

      // Save to context
      setToken(newToken);
      setRefreshTokenValue(newRefreshToken);

      // Save to AsyncStorage
      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("refreshToken", newRefreshToken);
      await AsyncStorage.setItem("expirationTime", newExpiration.toString());

      // Schedule next refresh
      scheduleRefresh(newExpiration);
    } catch (err) {
      console.warn("Failed to refresh token", err);
      logout();
    }
  }

  function login(token, refreshToken, expiresIn) {
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    setToken(token);
    setRefreshTokenValue(refreshToken);

    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("refreshToken", refreshToken);
    AsyncStorage.setItem("expirationTime", expirationTime.toString());

    scheduleRefresh(expirationTime);
  }

  // Load token on app start
  useEffect(() => {
    async function loadStoredToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedRefreshToken = await AsyncStorage.getItem("refreshToken");
      const storedExpiration = await AsyncStorage.getItem("expirationTime");

      if (
        storedToken &&
        storedRefreshToken &&
        storedExpiration &&
        +storedExpiration > new Date().getTime()
      ) {
        setToken(storedToken);
        setRefreshTokenValue(storedRefreshToken);
        scheduleRefresh(+storedExpiration);
      } else {
        logout();
      }
    }

    loadStoredToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        login,
        logout,
        refreshToken: refreshIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
