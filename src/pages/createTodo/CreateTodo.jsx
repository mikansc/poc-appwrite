/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { useTodosContext } from "../../contexts/todos/use-todos-context";

import { Form } from "../../components/form";
import { uploadFile } from "../../services/bucket-service";
import styles from "./CreateTodo.module.scss";

const CreateTodo = ({ editMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addTodo, loading, editingTodo, loadTodo, updateTodo } = useTodosContext();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editMode) {
      loadTodo(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editMode])

  const submit = async (event) => {
    event.preventDefault();
    const entries = Object.fromEntries(new FormData(event.target));

    if (!editMode) {
      let file;
      if (image) {
        file = await uploadFile(image.file);
        entries.image_id = file.$id;
      }
      delete entries.avatar_url;
      await addTodo(entries).then(() => navigate("/"));
    } else {
      await updateTodo(entries)
      navigate("/");
    }
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

  const renderImageSelector = () => {
    return (<>
      <Form.FieldGroup>
        <Form.InputLabel htmlFor="avatar_url">Avatar</Form.InputLabel>
        <Form.Input
          type="file" id="avatar_url" name="avatar_url"
          accept="image/png, image/jpeg, image/jpg, image/svg"
          onChange={handleSelectImage}
        />
      </Form.FieldGroup>
      <Form.FieldGroup>
        <div className={styles["image-preview-container"]}>
          {image && <img src={image.src} alt={image.alt} title={image.title} width={image.width} height={image.height} />}
        </div>
      </Form.FieldGroup>
    </>)
  }

  if (editMode && !editingTodo) {
    return false
  }

  return (
    <Container>
      <h2>{
        editMode ? "Editar tarefa" : "Criar tarefa"
      }</h2>
      <Form onSubmit={submit}>
        {editMode && (
          <Form.Input type="hidden" name="$id" defaultValue={editingTodo.$id} />
        )}
        <Form.FieldGroup>
          <label htmlFor="title">Título</label>
          <input
            defaultValue={editMode ? editingTodo.title : ""}
            type="text" id="title" name="title" />
        </Form.FieldGroup>
        <Form.FieldGroup>
          <Form.InputLabel htmlFor="description">Descrição</Form.InputLabel>
          <textarea id="description" name="description"
            defaultValue={editMode ? editingTodo.description : ""}
          ></textarea>
        </Form.FieldGroup>
        <Form.FieldGroup>
          <Form.InputLabel htmlFor="dueDate">Data de entrega</Form.InputLabel>
          <Form.Input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            defaultValue={(editMode ? new Date(editingTodo.dueDate) : new Date()).toISOString().split("T")[0]}
            id="dueDate"
            name="dueDate"
          />
        </Form.FieldGroup>
        {!editMode && renderImageSelector()}
        <Form.FieldGroup>
          <Form.InputLabel htmlFor="priority">Prioridade</Form.InputLabel>
          <select
            defaultValue={editMode ? editingTodo.priority : "medium"}
            id="priority" name="priority">
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
        </Form.FieldGroup>
        <Form.Action>
          <button disabled={loading} type="submit">
            {editMode ? "Salvar" : "Criar"}
          </button>
        </Form.Action>
      </Form>
      <Link to="/">Voltar</Link>
    </Container>
  );
};

export default CreateTodo;
