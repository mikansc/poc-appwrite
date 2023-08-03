import { Container } from "../../components/container";
import { useTodosContext } from "../../contexts/todos";
import { getFileUrl } from "../../services/bucket-service";
import styles from "./Dashboard.module.scss";

const toLocalDate = (date) => {
  // convert string to local date time with Intl
  const localDate = new Date(date);
  return new Intl.DateTimeFormat("pt-BR").format(localDate);
};

export const Dashboard = () => {
  const { todos, todoCount } = useTodosContext();

  return (
    <Container>
      <h2>Tarefas</h2>
      <div className={styles["todo-list"]}>
        <div className={styles["todo-count"]}>
          <span>
            {todoCount.current +
              (todoCount.current === 1 ? " tarefa" : " tarefas")}
          </span>
        </div>
        {todos.map((todo) => (
          <div className={styles["todo"]} key={todo.id}>
            <div className={styles["todo-header"]}>
              <h3 className={styles["todo-title"]}>{todo.title}</h3>
              <span className={styles["todo-date"]}>
                Previsão: {toLocalDate(todo.dueDate)}
              </span>
            </div>
            {todo.image_id && (
              <div className={styles["todo-image"]}>
                <img src={getFileUrl(todo.image_id)} alt="Avatar" />
              </div>
            )}
            <div className={styles["todo-body"]}>
              <h4 className={styles["todo-title"]}>{todo.title}</h4>
              <p className={styles["todo-body"]}>{todo.description}</p>
            </div>
            <div className={styles["todo-footer"]}>
              <span className={styles["todo-priority"]}>{todo.priority}</span>
              <span className={styles["todo-status"]}>
                {todo.completedAt ? "finalizado" : "em aberto"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
