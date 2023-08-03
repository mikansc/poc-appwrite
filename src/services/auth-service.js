import { Account } from "appwrite";

import client from "./appwrite-service";

const auth = new Account(client);

export const oauthLogin = () => {
  auth.createOAuth2Session(
    "google",
    "http://localhost:5173",
    "http://localhost:3000/auth-error",
    [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ]
  );
};

export const clearSession = async () => {
  await auth.deleteSession("current");
};

export const getCurrentSession = async () => {
  return await auth.getSession("current");
};
