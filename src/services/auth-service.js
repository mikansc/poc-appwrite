import { Account } from "appwrite";

import client from "./appwrite-service";

const auth = new Account(client);

export default auth;
