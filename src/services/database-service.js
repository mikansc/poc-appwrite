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
