import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Container } from "./components/container";
import Header from "./components/header/Header";
import { AuthProvider, useAuthContext } from "./contexts/auth";
import { TodosProvider } from "./contexts/todos";
import CreateTodo from "./pages/createTodo/CreateTodo";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup/Signup";

const SecuredRoute = () => {
  const { isLoggedIn, loading } = useAuthContext();

  if (loading) {
    return (
      <Container>
        <strong>Aguarde...</strong>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <TodosProvider>
      <Outlet />
    </TodosProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<SecuredRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="todo/new" element={<CreateTodo />} />
            <Route path="todo/:id/edit" element={<CreateTodo editMode />} />
          </Route>
          <Route path="/auth-error" element={<h1>Deu merda!</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
