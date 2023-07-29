import { createContext } from "react";

export const TodosContext = createContext({
  todos: [],
  todoCount: 0,
  loading: false,
  loadTodos: () => {},
  addTodo: () => {},
});
