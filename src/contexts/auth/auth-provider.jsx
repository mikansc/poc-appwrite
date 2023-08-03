/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { useLogger } from "../../hooks/use-logger";
import { clearSession, getCurrentSession, oauthLogin } from "../../services/auth-service";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const log = useLogger("AuthProvider");
  const isLoginPage = !!useMatch("login");

  const [loading, setLoading] = useState(true);
  const sessionId = useRef("");
  const isLoggedIn = !!sessionId.current;

  const logout = async () => {
    sessionId.current = "";
    setLoading(true);

    try {
      await clearSession();
    } catch (error) {
      log.error(error, { caller: 'logout' });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      oauthLogin()
    } catch (error) {
      log.error(error, { caller: 'loginWithGoogle' });
    }
  };

  useEffect(() => {
    if (!isLoginPage) {

      const getUserSession = async () => {
        setLoading(true);
        try {
          const session = await getCurrentSession();
          sessionId.current = session.$id;
        } catch (error) {
          log.error(error, { caller: 'useEffect > getUserSession' });
        } finally {
          setLoading(false);
        }
      };

      getUserSession();
    }
  }, [isLoginPage, log]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
