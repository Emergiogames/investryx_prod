
import { store } from "../../utils/context/store";
import { adminApi } from "./api";
import { AdminLogout } from "../../utils/context/reducers/adminAuthSlice";

export const adminApiCalls = async (method, url, data = null) => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case "post":
                response = await adminApi.post(url, data);
                break;
            case "get":
                response = await adminApi.get(url, { params: data }); // Ensure query params are passed correctly
                break;
            case "patch":
                response = await adminApi.patch(url, data);
                break;
            case "put":
                response = await adminApi.put(url, data);
                break;
            case "delete":
                response = await adminApi.delete(url);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response;
    } catch (error) {
        const errorMsg = error?.response?.data || error?.message || "An unexpected error occurred";
        console.log("error 1:", error);

        if (error?.response?.status === 401) {
            store.dispatch(AdminLogout());
            return Promise.reject(errorMsg);
        }

        console.log("error3", errorMsg);

        return Promise.reject(errorMsg);
    }
};
