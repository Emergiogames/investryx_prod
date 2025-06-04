import axios from "axios";
import {store} from "../../utils/context/store";
const BASE_URL_MAIN = import.meta.env.VITE_BASE_URL_MAIN || "";


export const api = axios.create({
  withCredentials: false ,
  baseURL: `${BASE_URL_MAIN}/api`,
});

api.interceptors.request.use(  //intersptor used to add addional functionalaity
  async (config) => {
    const state = store.getState()
    const authToken = state.auth.token
    config.headers["token"] = authToken
    return config;
  },
  async(error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

