/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import auth from "../../services/auth-service";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const isLoginPage = !!useMatch("login");
  console.log(isLoginPage);
  const [loading, setLoading] = useState(true);
  const sessionId = useRef("");
  const isLoggedIn = !!sessionId.current;

  const getUserSession = async () => {
    try {
      setLoading(true);
      const session = await auth.getSession("current");
      sessionId.current = session.$id;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logout = async () => {
    sessionId.current = "";
    setLoading(true);
    await auth.deleteSession(sessionId.current);
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    auth.createOAuth2Session(
      "google",
      "http://localhost:5173",
      "http://localhost:3000/auth-error",
      [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ]
    );
  };

  useEffect(() => {
    if (!isLoginPage) {
      getUserSession();
    }
  }, [isLoginPage]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
