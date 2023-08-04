import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth/use-auth-context";

import { Container } from "../../components/container";
import { Form } from "../../components/form";

import { createUser } from "../../services/auth-service";
import styles from "./Signup.module.scss";

export const Signup = () => {
  const { isLoggedIn, } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const submit = async (event) => {
    event.preventDefault();
    const entries = Object.fromEntries(new FormData(event.target));
    if (!entries.name || !entries.email || !entries.password || !entries.confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (entries.password !== entries.confirmPassword) {
      alert("Senhas não conferem");
      return;
    }

    delete entries.confirmPassword;

    setLoading(true);
    await createUser(entries)
    alert("Usuário criado com sucesso. Faça o login");
    setLoading(false);
    navigate("/login");
  };

  return (
    <Container>
      <h2>Novo usuário</h2>
      <Form onSubmit={submit}>
        <Form.FieldGroup className={styles["field-group"]}>
          <Form.InputLabel htmlFor="name">Nome</Form.InputLabel>
          <Form.Input id="name" name="name" />
        </Form.FieldGroup>

        <Form.FieldGroup>
          <Form.InputLabel htmlFor="email">Email</Form.InputLabel>
          <Form.Input type="email" id="email" name="email" />
        </Form.FieldGroup>

        <Form.FieldGroup>
          <Form.InputLabel htmlFor="password">Senha</Form.InputLabel>
          <Form.Input type="password" minLength={8} id="password" name="password" />
        </Form.FieldGroup>

        <Form.FieldGroup>
          <Form.InputLabel htmlFor="confirmPassword">Confirmar senha</Form.InputLabel>
          <Form.Input type="password" minLength={8} id="confirmPassword" name="confirmPassword" />
        </Form.FieldGroup>

        <Form.Action>
          <button disabled={loading} type="submit">
            {loading ? "Criando..." : "Criar"}
          </button>
        </Form.Action>
      </Form>
      <Link to="/">Voltar</Link>

    </Container>
  );
};
