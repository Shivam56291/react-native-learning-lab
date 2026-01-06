import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      // createUser now returns token, refreshToken, expiresIn
      const { token, refreshToken, expiresIn } = await createUser(email, password);

      // Use the new login method from AuthContext
      authCtx.login(token, refreshToken, expiresIn);
    } catch (error) {
      let message = "Could not create user. Please try again later.";

      const errorCode = error?.response?.data?.error?.message;

      if (errorCode === "EMAIL_EXISTS") {
        message = "Email already exists.";
      } else if (errorCode === "INVALID_EMAIL") {
        message = "Please enter a valid email address.";
      }

      Alert.alert("Authentication failed", message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
