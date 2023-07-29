import { Databases, ID, Query } from "appwrite";
import { ENV } from "../config/constants";
import client from "./appwrite-service";

const database = new Databases(client);

export const createToDo = async (data) => {
  try {
    return database.createDocument(
      ENV.DATABASE_ID,
      ENV.COLLECTION_ID,
      ID.unique(),
      data
    );
  } catch (error) {
    alert("Deu ruim");
    console.log(error);
  }
};

export const getAllToDos = async () => {
  try {
    return database.listDocuments(ENV.DATABASE_ID, ENV.COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);
  } catch (error) {
    alert("Deu ruim");
    console.log(error);
  }
};
