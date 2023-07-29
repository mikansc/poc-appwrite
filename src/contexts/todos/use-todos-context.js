import { useContext } from "react";
import { TodosContext } from "./todos-context";

export const useTodosContext = () => useContext(TodosContext);
