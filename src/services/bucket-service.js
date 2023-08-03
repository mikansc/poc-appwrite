import { ID, Storage } from "appwrite";
import { ENV } from "../config/constants";
import client from "./appwrite-service";

const storage = new Storage(client);

export const uploadFile = async (file) => {
  if (!(file instanceof File)) {
    throw new Error("You need to pass a File object");
  }

  if (
    file.type !== "image/jpeg" &&
    file.type !== "image/png" &&
    file.type !== "image/svg+xml"
  ) {
    throw new Error("Invalid file type");
  }

  const TWO_MEGABYTES = 2 * 1024 * 1024;

  if (file.size > TWO_MEGABYTES) {
    throw new Error("File size is too big. Max file size is 2MB");
  }

  return await storage.createFile(ENV.BUCKET_ID, ID.unique(), file);
};

export const getFileUrl = (fileId) => {
  return storage.getFilePreview(ENV.BUCKET_ID, fileId, 50, 50);
};
