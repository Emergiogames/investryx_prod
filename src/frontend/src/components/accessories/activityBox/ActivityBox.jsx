import React, { useState, useEffect } from "react";
import { getActivity } from "../../../services/user/apiMethods";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "../../../constants/baseUrls";

function ActivityBox() {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivity();
        if (response) {
          setActivities(response.data);
        } else {
          console.log(response.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activities]);

  if (activities.length === 0) {
    return <div>Loading...</div>;
  }

  const currentActivity = activities[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <a
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
        >
          <img
            alt={currentActivity.title}
            src={
              currentActivity?.img
                ? `${BASE_URL}${currentActivity.img}`
                : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
            }
            className="h-56 w-full rounded-md object-cover"
          />
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Username</dt>
                <dd className="text-sm text-gray-500">
                  {currentActivity.username}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Title</dt>
                <dd className="font-medium">{currentActivity.title}</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-center gap-8 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="size-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Timestamp</p>
                  <p className="font-medium">
                    {new Date(currentActivity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="size-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Action</p>
                  <p className="font-medium">{currentActivity.action}</p>
                </div>
              </div>
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="size-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">User ID</p>
                  <p className="font-medium">{currentActivity.user}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

export default ActivityBox;