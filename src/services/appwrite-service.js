import { Client } from "appwrite";
import { ENV } from "../config/constants";
console.log(ENV);
const client = new Client();
client.setEndpoint(ENV.ENDPOINT).setProject(ENV.PROJECT_ID);

export default client;
