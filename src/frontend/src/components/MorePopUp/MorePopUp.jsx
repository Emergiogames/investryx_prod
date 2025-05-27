import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser } from "../../services/user/apiMethods";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

function MorePopUp({ isopen, onClose, deleteHandler, props }) {
    const navigate = useNavigate();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(props);
    const [imagePreview, setImagePreview] = useState("");

    if (!isopen) return null; // Prevent rendering when closed

    const handleEdit = () => setIsEditing(true);
    const handleCancelEdit = () => setIsEditing(false);
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setUserData((prev) => ({ ...prev, image: previewUrl }));
        }
    };

    const handleUpdate = () => setShowConfirmUpdate(true);
    const confirmUpdate = () => {
        try {
            editUser(userData)
                .then((response) => {
                    if (response.status === 200) {
                        toast.success("Profile updated successfully");
                    }
                })
                .catch((err) => {
                    toast.error("error occured :", err);
                });
        } catch (error) {
            console.error("error occured :", error);
        }

        // updateUserData(userData);
        setShowConfirmUpdate(false);
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg overflow-hidden z-50">
            <div className="relative w-[60rem]  bg-white rounded-lg lg:p-6 shadow-xl flex flex-col items-center overflow-y-auto max-h-full">
                {/* Close Button */}
                <div className="text-end absolute top-4 right-4">
                    <Button onClick={onClose} variant="filled" className="bg-amber-300 hover:bg-amber-400">
                        x
                    </Button>
                </div>

                {/* Header */}
                <h2 className="text-2xl font-bold mb-4">User Details</h2>

                {/* User Information Fields */}
                <div className="w-3/4 bg-gray-100 p-6 rounded-lg shadow-md lg:px-36">
                    {isEditing ? (
                        <>
                            <div className="flex justify-center items-center my-2">
                                <div className="w-[7rem] h-[7rem]">
                                    <label htmlFor="image">
                                        <img
                                            src={
                                                userData?.image ||
                                                imagePreview ||
                                                "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                            }
                                            alt="User"
                                            className="w-full h-full object-cover rounded-2xl cursor-pointer"
                                        />
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImgChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <input
                                type="text"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleChange}
                                className="w-full p-2 mb-2 border rounded"
                            />
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                className="w-full p-2 mb-2 border rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                className="w-full p-2 mb-2 border rounded"
                            />
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center items-center my-2">
                                <div className="w-[7rem] h-[7rem]">
                                    <label htmlFor="image">
                                        <img
                                            src={
                                                userData?.image ||
                                                imagePreview ||
                                                "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                            }
                                            alt="User"
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    </label>
                                </div>
                            </div>
                            <p className="mb-2">
                                <strong>Name:</strong> {userData.first_name}
                            </p>
                            <p className="mb-2">
                                <strong>Phone Number:</strong> {userData.username}
                            </p>
                            <p className="mb-2">
                                <strong>Date of Joining:</strong>{" "}
                                {new Date(userData.date_joined).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                            <p className="mb-2">
                                <strong>Hours Spent:</strong> {userData.total_hr_spend}
                            </p>
                            <p className="mb-2">
                                <strong>Email ID:</strong> {userData.email}
                            </p>
                        </>
                    )}

                    {/* Edit and Update Buttons */}
                    {isEditing ? (
                        <div className="flex justify-between">
                            <button
                                onClick={handleUpdate}
                                className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="mt-4 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="mt-4 bg-yellow-300 hover:bg-yellow-400 py-2 px-4 rounded-lg"
                        >
                            Edit Details
                        </button>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center text-center mt-5">
                    <button
                        onClick={() => setShowConfirmDelete(true)}
                        className="p-4 m-4 px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 md:min-w-64 rounded-lg shadow-md"
                    >
                        Delete Account
                    </button>
                    <button
                        onClick={() => navigate("/contact_us")}
                        className="p-4 m-4 px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 md:min-w-64 rounded-lg shadow-md"
                    >
                        Contact Us
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Pop-Up */}
            {showConfirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete your account?</h3>
                        <div className="flex justify-center">
                            <button
                                onClick={deleteHandler}
                                className="p-3 mx-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowConfirmDelete(false)}
                                className="p-3 mx-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Confirmation Pop-Up */}
            {showConfirmUpdate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to update your details?</h3>
                        <div className="flex justify-center">
                            <button
                                onClick={confirmUpdate}
                                className="p-3 mx-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                            >
                                Yes, Update
                            </button>
                            <button
                                onClick={() => setShowConfirmUpdate(false)}
                                className="p-3 mx-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MorePopUp;
