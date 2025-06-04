import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, ScrollRestoration } from "react-router-dom";
import "./index.css";
import appRouter from "./routes/userRoutes.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./utils/context/store.jsx";
import { Toaster } from "sonner";
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from "react-redux";
import "flowbite";
import ErrorBoundary from "./components/accessories/errorBoundarys/errorBoundary.jsx";
import RoomsWebSocket from "./websocket/RoomsWebSocket.jsx";
import GlobalStorageSync from "./utils/globalStorageSync/GlobalStorageSync.jsx";
import GlobalAdminStorageSync from "./utils/globalStorageSync/GlobalAdminStorageSync.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <ErrorBoundary>
        <Provider store={store}>
            <Toaster richColors position="top-right" />
            <ToastContainer position="top-right"/>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStorageSync />
                <GlobalAdminStorageSync />
                <RoomsWebSocket />
                 <RouterProvider router={appRouter}>
                    <ScrollRestoration />
                </RouterProvider>
            </PersistGate>
        </Provider>
    </ErrorBoundary>
      </React.StrictMode>
);
