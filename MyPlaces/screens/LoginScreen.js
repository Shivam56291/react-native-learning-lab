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

      if (error.response) {
        // Axios response error
        console.error("Response data:", error.response.data);
        console.error("Status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }

      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
