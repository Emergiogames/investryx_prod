import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomsWebSocket, notificationNumber } from "../utils/context/reducers/authSlice";

const RoomsWebSocket = () => {
    const BASE_URL_CHAT = import.meta.env.VITE_BASE_URL_CHAT || "";

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const wsRef = useRef(null);

    useEffect(() => {
        let reconnectTimeout;

        const connectWebSocket = () => {
            if (!token) return;

            const wsUrl = `${BASE_URL_CHAT}/rooms?token=${token}`;
            wsRef.current = new WebSocket(wsUrl);

            wsRef.current.onopen = () => {
                console.log("WebSocket Connected");
                // Clear any reconnection timeout if connection is successful
                if (reconnectTimeout) {
                    clearTimeout(reconnectTimeout);
                }
            };

            wsRef.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("%cReceived message @/roomWS:", "color:red", data);
                    if (data.room) {
                        dispatch(roomsWebSocket({ roomsWebSocket: data.room }));
                        dispatch(notificationNumber({ notificationNumber: data.room }));
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            };

            wsRef.current.onclose = () => {
                console.log("WebSocket Disconnected - Attempting to reconnect...");
                // Attempt to reconnect after 3 seconds
                reconnectTimeout = setTimeout(connectWebSocket, 3000);
            };

            wsRef.current.onerror = (error) => {
                console.error("WebSocket Error:", error);
                wsRef.current.close(); // This will trigger onclose and attempt reconnection
            };
        };

        connectWebSocket();

        // Cleanup function
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
        };
    }, [token, dispatch]);

    return null;
};

export default RoomsWebSocket;
