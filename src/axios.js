import axios from "axios";

const instance = axios.create({
  baseURL: "https://workbytech.host/eventrush/api",
});

export default instance;
