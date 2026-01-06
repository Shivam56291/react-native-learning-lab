import { FIREBASE_API_KEY } from "../constants/config";
import axios from "axios";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  // Return all necessary data
  return {
    token: response.data.idToken,
    refreshToken: response.data.refreshToken,
    expiresIn: +response.data.expiresIn, // seconds
  };
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
