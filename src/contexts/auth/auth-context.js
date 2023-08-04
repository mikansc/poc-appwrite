import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: null,
  loading: true,
  logout: () => {},
  loginWithGoogle: () => {},
  loginWithEmail: async () => {},
});
