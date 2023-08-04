import { Databases, ID, Query } from "appwrite";
import { ENV } from "../config/constants";
import client from "./appwrite-service";

const database = new Databases(client);

export const createToDo = async (data) => {
  return database.createDocument(
    ENV.DATABASE_ID,
    ENV.COLLECTION_ID,
    ID.unique(),
    data
  );
};

export const getAllToDos = async () => {
  return database.listDocuments(ENV.DATABASE_ID, ENV.COLLECTION_ID, [
    Query.orderDesc("$createdAt"),
  ]);
};

export const getTodoById = async (id) => {
  if (!id) throw new Error("Missing id on getTodoById function");

  return database.getDocument(ENV.DATABASE_ID, ENV.COLLECTION_ID, id);
};

export const updateTodo = async (data) => {
  if (!data.$id) throw new Error("Missing $id on update function");

  return database.updateDocument(
    ENV.DATABASE_ID,
    ENV.COLLECTION_ID,
    data.$id,
    data
  );
};

export const deleteTodo = async (data) => {
  if (!data.$id) throw new Error("Missing $id on delete function");

  return database.deleteDocument(ENV.DATABASE_ID, ENV.COLLECTION_ID, data.$id);
};
