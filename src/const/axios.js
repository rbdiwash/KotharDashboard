import axios from "axios";
import { API_URL } from "./constants";
import { toast } from "react-toastify";

axios.defaults.baseURL = API_URL;

export default axios;

export const delete_data = (url, onSuccess, token) => {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res?.json())
    .then(() => {
      onSuccess();
      toast.success("Data Deleted Successfully");
    })
    .catch(() => {
      toast.error("Error Deleting Data");
    });
};