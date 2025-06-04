import axios from "axios";
import { store } from "../../utils/context/store";

const BASE_URL_MAIN = import.meta.env.VITE_BASE_URL_MAIN || "";

export const adminApi = axios.create({
    baseURL: `${BASE_URL_MAIN}/api`,
});

//INTERSEPTOR
adminApi.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        const authToken = state.adminAuth.token;
        config.headers["token"] = authToken;
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

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
