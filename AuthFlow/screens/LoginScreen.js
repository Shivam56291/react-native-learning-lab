import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      // login now returns token, refreshToken, expiresIn
      const { token, refreshToken, expiresIn } = await login(email, password);

      // Use the new login method from AuthContext
      authCtx.login(token, refreshToken, expiresIn);
    } catch (error) {
      let message = "Could not log you in. Please try again later.";

      const errorCode = error?.response?.data?.error?.message;

      if (errorCode === "INVALID_LOGIN_CREDENTIALS") {
        message = "Invalid email or password.";
      } else if (errorCode === "INVALID_EMAIL") {
        message = "Please enter a valid email address.";
      }

      Alert.alert("Authentication failed", message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
