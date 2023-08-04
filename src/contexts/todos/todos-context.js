import { createContext } from "react";

export const TodosContext = createContext({
  todos: [],
  todoCount: 0,
  loading: false,
  loadTodos: () => {},
  loadTodo: () => {},
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  editingTodo: undefined,
});
