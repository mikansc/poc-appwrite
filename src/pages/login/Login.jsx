import { Link, Navigate } from "react-router-dom";
import GoogleLogoSvg from "../../assets/images/google-logo.svg";
import { Container } from "../../components/container";
import { useAuthContext } from "../../contexts/auth/use-auth-context";

import { useState } from "react";
import { Form } from "../../components/form";
import styles from "./Login.module.scss";

export const Login = () => {
  const { isLoggedIn, loginWithGoogle, loginWithEmail, loading } = useAuthContext();
  const [formLoading, setFormLoading] = useState(false);

  if (loading) {
    return (
      <Container>
        <strong>Aguarde...</strong>
      </Container>
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (formLoading) return (<div>Carregando...</div>);

  const handleGoogleLogin = async () => {
    loginWithGoogle();
  };

  const submit = async (event) => {
    setFormLoading(true);
    event.preventDefault();
    const entries = Object.fromEntries(new FormData(event.target));
    if (!entries.email || !entries.password) {
      alert("Preencha todos os campos");
      return;
    }
    await loginWithEmail(entries);
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={submit}>
        <Form.FieldGroup>
          <Form.InputLabel htmlFor="email">Email</Form.InputLabel>
          <Form.Input type="email" id="email" name="email" />
        </Form.FieldGroup>
        <Form.FieldGroup>
          <Form.InputLabel htmlFor="password">Senha</Form.InputLabel>
          <Form.Input type="password" id="password" name="password" />
        </Form.FieldGroup>
        <Form.Action>
          <button type="submit" disabled={formLoading}>
            {formLoading ? "Carregando..." : "Entrar"}
          </button>
        </Form.Action>
      </Form>
      <hr />
      <br />
      <button className={styles.googleButton} onClick={handleGoogleLogin}>
        <div className={styles["googleLogo"]}>
          <img src={GoogleLogoSvg} alt="Google" width={16} height={16} />
        </div>
        <div className={styles["googleButtonText"]}>Entrar com Google</div>
      </button>
      <Link to="/signup">Criar cadastro</Link>
    </Container>
  );
};
