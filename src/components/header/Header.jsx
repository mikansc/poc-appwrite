import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import styles from "./Header.module.scss";

const Header = () => {
  const { logout, isLoggedIn } = useAuthContext();

  return (
    <div className={styles["header"]}>
      <nav className={styles["container"]}>
        <h1 className={styles["title"]}>My App</h1>
        {isLoggedIn && (
          <ul className={styles["menu"]}>
            <Link to="/" className={styles["menu-item"]}>
              Home
            </Link>
            <Link to="todo/new" className={styles["menu-item"]}>
              Criar tarefa
            </Link>
            <button className={styles["menu-item"]} onClick={logout}>
              Logout
            </button>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
