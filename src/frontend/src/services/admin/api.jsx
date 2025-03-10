import axios from "axios";
import { store } from "../../utils/context/store";
import { BASE_URL_MAIN } from "../../constants/baseUrls";

export const adminApi = axios.create({
  baseURL: `${BASE_URL_MAIN}/api/`,
});


adminApi.interceptors.request.use(  //intersptor used to add addional functionalaity
  async (config) => {
    const state = store.getState()
    const authToken = state.adminAuth.admin
   
    // config.headers["Authorization"] = `Bearer ${authToken}`
    config.headers["token"] = authToken
    return config;
  },
  async(error) => {
    return Promise.reject(error)
  }
)

adminApi.interceptors.response.use(
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
