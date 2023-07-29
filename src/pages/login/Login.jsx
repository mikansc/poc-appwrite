import { Navigate } from "react-router-dom";
import GoogleLogoSvg from "../../assets/images/google-logo.svg";
import { Container } from "../../components/container";
import { useAuthContext } from "../../contexts/auth/use-auth-context";

import styles from "./Login.module.scss";

export const Login = () => {
  const { isLoggedIn, loginWithGoogle } = useAuthContext();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <Container>
      <h1>Login</h1>
      <button className={styles.googleButton} onClick={handleGoogleLogin}>
        <div className={styles["googleLogo"]}>
          <img src={GoogleLogoSvg} alt="Google" width={16} height={16} />
        </div>
        <div className={styles["googleButtonText"]}>Entrar com Google</div>
      </button>
    </Container>
  );
};
