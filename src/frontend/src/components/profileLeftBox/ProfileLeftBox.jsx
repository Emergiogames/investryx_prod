import React from "react";
import { IoMail, IoShieldCheckmark } from "react-icons/io5";
import MorePopUp from "../MorePopUp/MorePopUp";
import { useState } from "react";
import { deleteProfile } from "../../services/user/apiMethods";


function ProfileLeftBox({ user, deleteHandler }) {
    const [moreIsOpen, setMoreIsOpen] = useState(false);
    
    const handleDeleteProfile = () => {
        try {
            deleteProfile().then((response) => {
                if (response.data?.status) {
                    toast.success("Profile deleted successfully");
                }
            });
        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <div>
            <div>
                {/* box two */}
                {user && (
                    <div className="p-4 md:p-6 md:m-6 bg-amber-100 rounded-md mb-6 py-10">
                        <div className="mb-5 text-3xl font-medium font-sans text-violet-900 flex justify-center">
                            General Details
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-6 h-6 text-yellow-400"
                            >
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>

                            <div className="text-xl md:text-2xl font-light text-violet-900">{user?.first_name}</div>
                        </div>
                        <hr className="border-t border-gray-300 m-3 mx-7" />
                        <div className="flex items-center space-x-2">
                            <div className="text-yellow-400 text-2xl ">
                                <IoMail />
                            </div>

                            <div className="text-xl font-light text-violet-900">{user.email}</div>
                        </div>

                        <hr className="border-t border-gray-300 m-3 mx-7" />

                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="size-6  text-yellow-400"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <div className="text-xl md:text-2xl font-light text-violet-900">{user?.username}</div>
                        </div>
                        <hr className="border-t border-gray-300 m-3 mx-7" />
                        <div className="flex items-center space-x-2">
                            <div className="text-yellow-400 text-2xl ">
                                <IoShieldCheckmark />
                            </div>

                            <div className="text-xl font-light text-violet-900">
                                {user.verified ? (
                                    <div>User Verfication Completed</div>
                                ) : (
                                    <div>Verify for better response</div>
                                )}
                            </div>
                        </div>

                        <hr className="border-t border-gray-300 m-3 mx-7" />
                        <div className="flex flex-col items-center text-center">
                            {/* More Button */}
                            <button
                                onClick={() => setMoreIsOpen(true)}
                                className="p-4 m-4 w-full px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 md:min-w-64 rounded-lg shadow-md"
                            >
                                More
                            </button>

                            {/* Render Popup */}
                            <MorePopUp
                                isopen={moreIsOpen}
                                onClose={() => setMoreIsOpen(false)}
                                deleteHandler={deleteHandler}
                                props={user}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileLeftBox;
