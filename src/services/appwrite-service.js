import { Client } from "appwrite";
import { ENV } from "../config/constants";

const client = new Client();
client.setEndpoint(ENV.ENDPOINT).setProject(ENV.PROJECT_ID);

export default client;
