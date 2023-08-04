/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogger } from "../../hooks/use-logger";
import { clearSession, createSession, getCurrentSession, oauthLogin } from "../../services/auth-service";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const log = useLogger("AuthProvider");

  const [pageLoading, setPageLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const isLoggedIn = !!sessionId;

  const logout = async () => {
    setSessionId(null);
    setPageLoading(true);
    try {
      await clearSession();
    } catch (error) {
      log.error(error, { caller: 'logout' });
    } finally {
      setPageLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      oauthLogin()
    } catch (error) {
      log.error(error, { caller: 'loginWithGoogle' });
    }
  };

  const loginWithEmail = async ({ email, password }) => {
    try {
      const session = await createSession({ email, password });
      setSessionId(session.$id);
      navigate("/");
    } catch (error) {
      log.error(error, { caller: 'loginWithEmail' });
    }
  };

  useEffect(() => {
    setPageLoading(true);
    const getUserSession = async () => {
      try {
        const session = await getCurrentSession();
        setSessionId(session.$id);
      } catch (error) {
        log.error(error, { caller: 'useEffect > getUserSession' });
      } finally {
        setPageLoading(false);
      }
    };
    getUserSession();
  }, [log]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading: pageLoading, logout, loginWithGoogle, loginWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
