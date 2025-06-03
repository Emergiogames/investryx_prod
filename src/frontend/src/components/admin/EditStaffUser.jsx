import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiChevronLeft, HiOutlineTrash, HiOutlinePencil, HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { UpdateStaffUser, DeleteStaffUser } from "../../services/admin/apiMethods";
import { toast } from "react-toastify";


export default function EditStaffUser() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(location.state?.staffUserData || {});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(location.state?.staffUserData || {});
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);

    // Helper to display N/A for empty/null and badges for booleans
    const displayValue = (value, type = "text") => {
        if (type === "boolean") {
            return (
                <span
                    className={`px-3 py-1 rounded-full font-semibold text-sm border 
                    ${value ? "bg-amber-300 text-amber-900 border-amber-400" : "bg-white text-amber-400 border-amber-300"}`}
                >
                    {value ? "Yes" : "No"}
                </span>
            );
        }
      
        if (value === null || value === undefined || value === "") {
            return <span className="italic text-gray-400">N/A</span>;
        }
        return value;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleEditToggle = () => {
        if (editMode) {
            setFormData(userData);
        }
        setEditMode(!editMode);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await UpdateStaffUser(formData, userData.id);
            if (response.data?.status) {
                toast.success("Staff user updated successfully");
                setUserData(formData);
                setEditMode(false);
            } else {
                toast.error(response.data?.message || "Failed to update staff user");
            }
        } catch (error) {
            toast.error("Failed to update staff user");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setShowDeleteConfirm(false);
        setLoading(true);
        try {
            const response = await DeleteStaffUser(userData.id);
            if (response.data?.status) {
                toast.success("Staff user deleted successfully");
                navigate(-1); // Go back to previous page
            } else {
                toast.error(response.data?.message || "Failed to delete staff user");
            }
        } catch (error) {
            toast.error("Failed to delete staff user");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1); // Go back
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={handleClose} className="px-2 py-2 rounded">
                        <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
                    </button>
                    <span className="font-semibold">BACK</span>
                </div>
                {/* <div className="flex space-x-2">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                <HiOutlineCheck className="mr-2" /> Save
                            </button>
                            <button
                                onClick={handleEditToggle}
                                disabled={loading}
                                className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                <HiOutlineX className="mr-2" /> Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleEditToggle}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <HiOutlinePencil className="mr-2" /> Edit
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                <HiOutlineTrash className="mr-2" /> Delete
                            </button>
                        </>
                    )}
                </div> */}
            </div>

            <div className="flex justify-center items-center min-h-screen bg-white w-full">
                <div className="w-full max-w-2xl shadow-lg rounded-2xl p-8 bg-white border border-amber-400 relative">
                    {/* Action buttons inside the box, top right with margin */}
                    <div className="absolute top-3 right-6 flex space-x-2">
                        {editMode ? (
                            <>
                                <button
                                    onClick={() => setShowSaveConfirm(true)}
                                    disabled={loading}
                                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                                >
                                    <HiOutlineCheck className="mr-2" /> Save
                                </button>
                                <button
                                    onClick={handleEditToggle}
                                    disabled={loading}
                                    className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    <HiOutlineX className="mr-2" /> Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleEditToggle}
                                    className="flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-700"
                                >
                                    <HiOutlinePencil className="mr-2" /> Edit
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                                >
                                    <HiOutlineTrash className="mr-2" /> Delete
                                </button>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col items-center mb-8">
                        {/* {displayValue(userData.image, "image")} */}
                        {editMode ? (
                            <div className="w-full max-w-md space-y-4">
                                <div>
                                    <label className="block font-semibold text-amber-900 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-amber-300 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-amber-900 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name || ''}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-amber-300 rounded"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-bold mt-4 mb-2 text-amber-900">
                                    {displayValue(userData.first_name)} {displayValue(userData.last_name)}
                                </h2>
                                <div className="text-lg text-amber-700">{displayValue(userData.email)}</div>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Editable Fields */}
                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Username</label>
                            {editMode ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-amber-300 rounded"
                                />
                            ) : (
                                <div className="bg-amber-100 rounded p-2">{displayValue(userData.username)}</div>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Email</label>
                            {editMode ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-amber-300 rounded"
                                />
                            ) : (
                                <div className="bg-amber-100 rounded p-2">{displayValue(userData.email)}</div>
                            )}
                        </div>

                        {/* Non-editable Fields */}
                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">User ID</label>
                            <div className="bg-amber-100 rounded p-2">{displayValue(userData.id)}</div>
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Date Joined</label>
                            <div className="bg-amber-100 rounded p-2">{displayValue(userData.date_joined)}</div>
                        </div>

                        {/* Boolean Fields */}
                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Is Staff</label>
                            {editMode ? (
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="is_staff"
                                        checked={formData.is_staff || false}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                                    />
                                    <span>Staff Member</span>
                                </label>
                            ) : (
                                <div>{displayValue(userData.is_staff, "boolean")}</div>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Is Active</label>
                            {editMode ? (
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={formData.is_active || false}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                                    />
                                    <span>Active</span>
                                </label>
                            ) : (
                                <div>{displayValue(userData.is_active, "boolean")}</div>
                            )}
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Is Superuser</label>
                            <div>{displayValue(userData.is_superuser, "boolean")}</div>
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Verified</label>
                            <div>{displayValue(userData.verified, "boolean")}</div>
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Blocked</label>
                            <div>{displayValue(userData.block, "boolean")}</div>
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Deactivated</label>
                            <div>{displayValue(userData.deactivate, "boolean")}</div>
                        </div>

                        {/* Other Fields */}
                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Mobile Device</label>
                            <div className="bg-amber-100 rounded p-2">{displayValue(userData.mobile_device)}</div>
                        </div>

                        <div>
                            <label className="block font-semibold text-amber-900 mb-1">Web Device</label>
                            <div className="bg-amber-100 rounded p-2">{displayValue(userData.web_device)}</div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block font-semibold text-amber-900 mb-1">OneSignal ID</label>
                            <div className="bg-amber-100 rounded p-2">{displayValue(userData.onesignal_id)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
                        <p className="mb-6">Are you sure you want to delete this staff user? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Save Confirmation Modal */}
            {showSaveConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-medium mb-4">Confirm Save</h3>
                        <p className="mb-6">Are you sure you want to save the changes?</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowSaveConfirm(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowSaveConfirm(false);
                                    handleSubmit();
                                }}
                                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}