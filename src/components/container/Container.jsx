import styles from "./Container.module.scss";

export const Container = ({ children }) => {
  return <main className={styles["container"]}>{children}</main>;
};
