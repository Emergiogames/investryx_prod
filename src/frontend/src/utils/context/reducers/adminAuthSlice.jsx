import { createSlice } from "@reduxjs/toolkit";

const AdminInitialState = {
    admin: null,
    token: null,
};

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState: AdminInitialState,
    reducers: {
        AdminLoginSuccess: (state, action) => {
            console.log("hello from login :", action.payload);

            state.token = action.payload;
            // state.admin = { token: action.payload.admin }; // optional
        },

        AdminLogout: (state) => {
            state.admin = null;
            state.token = null;
            localStorage.setItem("adminLogout", Date.now()); // This triggers the storage event
        },
        //   logout: (state) => {
        //     state.user = null;
        //     state.token = null;
        //     state.notifications = null;
        //     state.plans = null;
        //     localStorage.removeItem("persist:root");
        //      localStorage.setItem("logout", Date.now());//For notifying other tabs
        // },
    },
});

export const { AdminLoginSuccess, AdminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
