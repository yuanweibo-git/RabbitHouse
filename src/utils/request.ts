import axios from "axios";
import { BASE_URL } from "./url";

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

server.interceptors.request.use((config) => {
  return config;
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
  }
);

export default server;
