/* eslint-disable react/prop-types */

import styles from "./Form.module.scss";

export const Form = ({ onSubmit, children }) => {
  return (
    <form className={styles["form"]} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.FieldGroup = ({ children }) => (
  <div className={styles["field-group"]}>
    {children}
  </div>
)

Form.FieldGroup.displayName = "FieldGroup";

Form.InputLabel = ({ children, id }) => (
  <label htmlFor={id}>{children}</label>
)

Form.InputLabel.displayName = "InputLabel";

Form.Input = ({ id, name, type = "text", ...props }) => (
  <input type={type} id={id} name={name} {...props} />
)

Form.Input.displayName = "Input";

Form.Action = ({ children }) => (
  <div className={styles["action"]}>
    {children}
  </div>
)

Form.Action.displayName = "FormAction";