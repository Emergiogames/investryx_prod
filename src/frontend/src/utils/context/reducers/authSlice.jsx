import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: null,
  token: null,
  profile: "business",
  notifications: [],
  notificationNumber:null,
  plans: [],
  
};

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.notifications = null;
      state.plans = null;
    },
    userProfile: (state, action) => {
      state.profile = action.payload.profile || state.profile;
    },
    setPlans: (state,action) => {
      state.plans = action.payload.plans;
    },
    notificationUser: (state,action) => {
      state.notifications = action.payload
    },
    notificationNumber: (state, action) => {
      state.notificationNumber = action.payload.notificationNumber
    },
    roomsWebSocket: (state,action) => {
      state.roomsWebSocket = action.payload.roomsWebSocket
    },
    filter: (state,action) => {
      state.filter = action.payload.filter;
    }
  },
});

export const { setToken, setUserData,loginSuccess, logout, userProfile, setPlans, notificationUser,notificationNumber, roomsWebSocket, filter
} = authSlice.actions;
export default authSlice.reducer;
