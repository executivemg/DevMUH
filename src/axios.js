import axios from "axios";

const instance = axios.create({
  // baseURL: "https://workbytech.host/eventrush/api",
  baseURL: "http://127.0.0.1:8000/ranaevent",
});

export default instance;
