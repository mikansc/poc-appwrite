import { useEffect, useRef, useState } from "react";
import { createToDo, getAllToDos } from "../../services/database-service";
import { TodosContext } from "./todos-context";

export const TodosProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const todoCount = useRef(0);

  const loadTodos = async () => {
    setLoading(true);
    await getAllToDos().then((data) => {
      setTodos(data.documents);
      todoCount.current = data.total;
    });
    setLoading(false);
  };

  const addTodo = async (todo) => {
    setLoading(true);
    await createToDo(todo);
    await loadTodos();
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, todoCount, loadTodos, addTodo, loading }}
    >
      {children}
    </TodosContext.Provider>
  );
};
