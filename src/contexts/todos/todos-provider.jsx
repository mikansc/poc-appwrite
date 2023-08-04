/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { createToDo, deleteTodo, getAllToDos, getTodoById, updateTodo as update } from "../../services/database-service";
import { TodosContext } from "./todos-context";

export const TodosProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(undefined);
  const todoCount = useRef(0);

  const loadTodos = async () => {
    setLoading(true);
    await getAllToDos().then((data) => {
      setTodos(data.documents);
      todoCount.current = data.total;
    });
    setLoading(false);
  };

  const loadTodo = async (id) => {
    setLoading(true);
    const todo = await getTodoById(id)
    setTodo(todo);
    setLoading(false);
  }

  const addTodo = async (todo) => {
    setLoading(true);
    await createToDo(todo);
    await loadTodos();
    setLoading(false);
  };

  const updateTodo = async (todo) => {
    setLoading(true);
    await update(todo);
    await loadTodos();
    setTodo(undefined);
    setLoading(false);
  };

  const removeTodo = async (todo) => {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      setLoading(true);
      await deleteTodo(todo);
      await loadTodos();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, todoCount, loadTodos, addTodo, updateTodo, removeTodo, loadTodo, editingTodo: todo, loading }}
    >
      {children}
    </TodosContext.Provider>
  );
};
