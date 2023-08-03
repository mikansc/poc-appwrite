import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../components/container";
import { useTodosContext } from "../../contexts/todos/use-todos-context";

import { uploadFile } from "../../services/bucket-service";
import styles from "./CreateTodo.module.scss";

const CreateTodo = () => {
  const navigate = useNavigate();
  const { addTodo, loading } = useTodosContext();
  const [image, setImage] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    const file = await uploadFile(image.file);
    const entries = Object.fromEntries(new FormData(event.target));
    delete entries.avatar_url;
    entries.image_id = file.$id;
    await addTodo(entries).then(() => navigate("/"));
  };

  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage({
        file,
        src: event.target.result,
        alt: file.name,
        title: file.name,
        width: 100,
        height: 100,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <h2>Criar uma tarefa</h2>
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field-group"]}>
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="description">Descrição</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="dueDate">Data de entrega</label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            defaultValue={new Date().toISOString().split("T")[0]}
            id="dueDate"
            name="dueDate"
          />
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="avatar_url">Avatar</label>
          <input type="file" id="avatar_url" name="avatar_url"
            accept="image/png, image/jpeg, image/jpg, image/svg"
            onChange={handleSelectImage}
          />
        </div>
        <div className={styles["field-group"]}>
          <div className={styles["image-preview-container"]}>
            {image && <img src={image.src} alt={image.alt} title={image.title} width={image.width} height={image.height} />}
          </div>
        </div>
        <div className={styles["field-group"]}>
          <label htmlFor="priority">Prioridade</label>
          <select defaultValue="medium" id="priority" name="priority">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </div>
        <div className={styles["action"]}>
          <button disabled={loading} type="submit">
            {loading ? "Criando..." : "Criar"}
          </button>
        </div>
      </form>
      <Link to="/">Voltar</Link>
    </Container>
  );
};

export default CreateTodo;
