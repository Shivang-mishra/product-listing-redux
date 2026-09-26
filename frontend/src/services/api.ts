import axios from "axios";
import { store } from "../redux/store";
import { showSnackbar } from "../redux/uiSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(showSnackbar({ message: "Please login again.", severity: "warning" }));
    } else if (error.response?.status === 403) {
      store.dispatch(showSnackbar({ message: "You don't have permission to perform this action.", severity: "error" }));
    } else if (error.response?.status === 500) {
      store.dispatch(showSnackbar({ message: "Something went wrong on the server.", severity: "error" }));
    } else if (!error.response) {
      store.dispatch(showSnackbar({ message: "Unable to connect to the server.", severity: "error" }));
    } else {
      store.dispatch(showSnackbar({ message: "Something went wrong. Please try again.", severity: "error" }));
    }
    return Promise.reject(error);
  }
);

export default api;