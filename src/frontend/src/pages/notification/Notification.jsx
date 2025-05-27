import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { notificationNumber } from "../../utils/context/reducers/authSlice";
import { unseenNotification } from "../../services/user/apiMethods";

const NotificationFeed = () => {
    const myToken = (state) => state.auth.token;
    const token = useSelector(myToken);
    const location = useLocation();
    const dispatch = useDispatch();

    // Get notifications from the Redux store
    const notifications = useSelector((state) => state.auth.notifications);

    const notificationRefs = useRef([]);

    useEffect(() => {
        // Example of how to dispatch notification data if needed (uncomment if required)
        // dispatch(notificationUser(newNotifications));

        // Handle Intersection Observer for lazy loading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = entry.target.dataset.index;
                        gsap.to(notificationRefs.current[index], {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power3.out",
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe each notification item
        notificationRefs.current.forEach((item) => {
            if (item) observer.observe(item); // Ensure item is not null
        });

        return () => {
            // Clean up observer when component unmounts
            observer.disconnect();
        };
    }, [notifications]);

    //unseen notification
    useEffect(() => {
        try {
            unseenNotification(token);
        } catch (error) {
            console.error("Error in notificaion unseen", error);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6 px-4">
                    <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                    <Bell className="h-6 w-6 text-gray-600" />
                </div>

                <div className="space-y-4">
                    {notifications?.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div
                                key={notification.id}
                                ref={(el) => (notificationRefs.current[index] = el)}
                                data-index={index}
                                className="notification-item bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 opacity-0 transform translate-y-4 transition-all duration-300 ease-out"
                                style={{ minHeight: "80px" }}
                            >
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={notification?.image || "/images/year_glorified.gif"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{notification.title}</p>

                                    <span className="text-sm text-gray-500">
                                        {notification.created_on ? (
                                            formatDistanceToNow(parseISO(notification.created_on))
                                        ) : (
                                            <div className="text-gray-500">loading ...</div>
                                        )}
                                    </span>
                                    <p className="text-gray-800 font-medium">{notification.description}</p>
                                    {notification?.url ? (
                                        <p
                                            className="text-blue-700 underline font-semibold text-sm"
                                            onClick={() => (window.location.href = notification.url)}
                                        >
                                            Know More..
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No notifications yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationFeed;
