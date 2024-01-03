import axios from "axios";
import { API_URL } from "./constants";

export const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MDQyNDYwNTQsImV4cCI6MTcwNDI0NzQ5NH0.5ZNHakUmmRT8jbLAJulgHpKYHsaaqDw-HGCTxJ_IMm8";

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.baseURL = API_URL;

export default axios;
