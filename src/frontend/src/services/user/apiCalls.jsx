import { api } from "./api";
import { store } from "../../utils/context/store";
import { logout } from "../../utils/context/reducers/authSlice";

export const apiCall = async (method, url, data = null) => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case "post":
                response = await api.post(url, data);
                break;
            case "get":
                response = await api.get(url, { params: data }); // Ensure query params are passed correctly
                break;
            case "patch":
                response = await api.patch(url, data);
                break;
            case "put":
                response = await api.put(url, data);
                break;
            case "delete":
                response = await api.delete(url);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response;
    } catch (error) {
        const errorMsg = error?.response?.data || error?.message || "An unexpected error occurred";
        console.log("error 1:", error);

        if (error?.response?.status === 401) {
            store.dispatch(logout());
            return Promise.reject(errorMsg);
        }

        console.log("error3", errorMsg);

        return Promise.reject(errorMsg);
    }
};
