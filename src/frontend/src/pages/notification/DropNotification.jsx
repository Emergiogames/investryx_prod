import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";
import { BASE_URL_NOTIFICATION } from "../../constants/baseUrls";
import { getNotification } from "../../services/user/apiMethods";
import { formatDistanceToNow } from "date-fns";
import Loader_block from "../../components/accessories/Loader/Loader_block";
import { notificationUser } from "../../utils/context/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {  toast } from 'react-toastify';


function DropNotification({ props }) {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Initialize Redux dispatch
    // const [unseenCount] = useState(2);
    const token = props;
    const myUser = (state) => state.auth.user;
    const user = useSelector(myUser);
    if (user) {
        const nofiNum = (state) => state.auth.notificationNumber?.total_noti;
        var notifNumber = useSelector(nofiNum);
    }

    // Notification state
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        console.log("nottiii", notifications);
        dispatch(notificationUser(notifications));
    }, [notifications, dispatch]);

    // WebSocket connection for notifications
    useEffect(() => {
        if (!token) {
            console.error("Token is missing");
            return;
        }

        const wsUrl = `${BASE_URL_NOTIFICATION}/notification?token=${token}`;
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("WebSocket connection for notifications established");
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error for notifications:", error);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log("Received notification:", data.notification);
        
                if (!data.notification?.created) {
                    toast.info(data.notification.title);
                }

                setNotifications((prevNotifications) => [data.notification, ...prevNotifications]);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
                console.log("WebSocket connection for notifications closed");
            }
        };
    }, [token]);

    // Notification API call
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const notifications = await getNotification();

                if (notifications.status === 200) {
                    setNotifications((prevNotifications) => [...notifications.data, ...prevNotifications]);
                    console.log("Notifications:", notifications);
                } else {
                    console.error("Error fetching notifications:", notifications.status);
                }
            } catch (err) {
                console.error("Error occurred while fetching notifications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <>
            {/* Notification Dropdown */}
            <div className="flex items-center gap-4 ml-2">
                <Popover className="relative">
                    <Popover.Button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <div>
                            <BellIcon className="h-6 w-6" />
                            {notifNumber ? (
                                <div className="absolute items-center flex justify-center top-[-.5rem] right-[-.5rem] rounded-full bg-green-400 min-w-5 min-h-5">
                                    <div className="absolute text-black font-bold">{notifNumber}</div>
                                </div>
                            ) : null}
                        </div>
                    </Popover.Button>
                    {!loading ? (
                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-80 overflow-hidden rounded-xl bg-slate-700 shadow-lg ring-1 ring-gray-200/5">
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white mb-4">View Notifications</h3>
                                <div className="">
                                    <div>
                                        {notifications?.length === 0 ? (
                                            <p className="text-sm text-gray-400">
                                                <div>
                                                    <Loader_block />
                                                </div>
                                                <div>No notifications available</div>
                                            </p>
                                        ) : (
                                            notifications?.slice(0, 5).map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className="group flex items-center gap-x-4 rounded-lg p-3 hover:bg-gray-500 transition"
                                                >
                                                    {/* Notification Image */}
                                                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={notification?.image || "/images/year_glorified.gif"}
                                                            alt="Notification"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    {/* Notification Details */}
                                                    <div className="flex-auto">
                                                        <p className="text-sm font-medium text-gray-100">
                                                            {notification.title}
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-300">
                                                            {notification?.created_on || notification.created
                                                                ? formatDistanceToNow(new Date(notification.created_on || notification.created), {
                                                                      addSuffix: true,
                                                                  })
                                                                : null}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div
                                    onClick={() => {
                                        // navigate("/notification", { state: { notifications } });
                                        navigate("/notification");
                                    }}
                                    className="text-sm font-medium text-gray-100 text-right hover:underline cursor-pointer"
                                >
                                    view all
                                </div>
                            </div>
                        </Popover.Panel>
                    ) : (
                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-80 overflow-hidden rounded-xl bg-slate-700 shadow-lg ring-1 ring-gray-200/5">
                            <div>
                                <Loader_block />
                            </div>
                        </Popover.Panel>
                    )}
                </Popover>
            </div>
        </>
    );
}

export default DropNotification;
