import axios from "axios";
import { API_URL } from "./constants";

axios.defaults.headers.common["Authorization"] = `Bearer `;
axios.defaults.baseURL = API_URL;

export default axios;
