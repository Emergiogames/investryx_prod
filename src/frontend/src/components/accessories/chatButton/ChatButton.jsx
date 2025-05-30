import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import {  toast } from 'react-toastify';
import { BASE_URL_CHAT } from "../../../constants/baseUrls";
import { notificationNumber } from "../../../utils/context/reducers/authSlice";
import { to } from "@react-spring/web";

const ChatButton = () => {
    const navigate = useNavigate();
    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);


    const handleChatClick = () => {
        if (user) {
            navigate("/connectionAll");
        } else {
            toast.info("Please login to proceed");
            navigate("/login");
        }
    };

    const [chatPopNumber, setChatPopNumber] = useState(null);
    const unread = (state) => state.auth.notificationNumber?.total_unread;
    const total_unreaded = useSelector(unread);

    useEffect(() => {
        setChatPopNumber(total_unreaded);
    }, [total_unreaded]);

    return (
        <div>
            <button
                onClick={handleChatClick}
                className="fixed bottom-4 right-4 z-50 bg-yellow-300 text-white p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-300 ease-in-out "
                aria-label="Open Chat"
            >
                <MessageCircle size={38} />

                {chatPopNumber !== 0 && <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500"></div>}
            </button>
        </div>
    );
};

export default ChatButton;
