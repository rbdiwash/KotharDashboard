import axios from "axios";
import { API_URL } from "./constants";

export const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MDQwOTk0MTksImV4cCI6MTcwNDEwMDg1OX0.gT4LnWiYqupVXvYaQyqzqdCJ0npjZ8ArMC_Q_we5j0Q";

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.baseURL = API_URL;

export default axios;
