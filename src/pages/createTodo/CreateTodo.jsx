import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { useTodosContext } from "../../contexts/todos/use-todos-context";
import styles from "./CreateTodo.module.scss";

const CreateTodo = () => {
  const navigate = useNavigate();
  const { addTodo, loading } = useTodosContext();

  const submit = async (event) => {
    event.preventDefault();
    const entries = Object.fromEntries(new FormData(event.target));
    await addTodo(entries).then(() => navigate("/"));
  };

  return (
    <Container>
      <h2>Criar uma tarefa</h2>
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field-group"]}>
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="description">Descrição</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="dueDate">Data de entrega</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            defaultValue={new Date().toISOString().split("T")[0]}
            id="dueDate"
            name="dueDate"
          />
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="priority">Prioridade</label>
          <select defaultValue="medium" id="priority" name="priority">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div className={styles["action"]}>
          <button disabled={loading} type="submit">
            {loading ? "Criando..." : "Criar"}
          </button>
        </div>
      </form>
      <Link to="/">Voltar</Link>
    </Container>
  );
};

export default CreateTodo;
