import axios from "axios";
import { store } from "../../utils/context/store";
import { logout } from "../../utils/context/reducers/authSlice";
import { toast } from "react-toastify";

const BASE_URL_MAIN = import.meta.env.VITE_BASE_URL_MAIN || "";

export const api = axios.create({
    withCredentials: true,
    baseURL: `${BASE_URL_MAIN}/api`,
});

api.interceptors.request.use(
    async (config) => {
        const state = store.getState();
        const authToken = state.auth.token;
        config.headers["token"] = authToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Show toast on network status change
let hasShownOfflineToast = false;

window.addEventListener("offline", () => {
    if (!hasShownOfflineToast) {
        toast.error("No internet connection. Please check your network.");
        hasShownOfflineToast = true;
    }
});

window.addEventListener("online", () => {
    toast.success("You are back online!");
    hasShownOfflineToast = false;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const res = error.response;
        if (res && res.status === 400 && res.data.status === false) {
            toast.info("Your account has been blocked. Please contact the Investryx team.");
            store.dispatch(logout());
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
