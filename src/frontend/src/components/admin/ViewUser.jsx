import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { adminUserBlock } from "../../services/admin/apiMethods";
import { toast } from "react-toastify";

export default function AdminViewUser() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(location.state?.userData || {});
    const [loading, setLoading] = useState(false);

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
        if (type === "image") {
            return value ? (
                <img
                    src={value.startsWith("http") ? value : BASE_URL + value}
                    alt="profile"
                    className="w-24 h-24 rounded-full border-4 border-amber-400 object-cover bg-white"
                />
            ) : (
                <span className="italic text-gray-400">N/A</span>
            );
        }
        if (type === "array") {
            return Array.isArray(value) && value.length > 0 ? (
                value.map((v, i) => (
                    <span key={i} className="inline-block px-2 py-1 m-1 rounded bg-amber-400 text-white">
                        {v}
                    </span>
                ))
            ) : (
                <span className="italic text-gray-400">N/A</span>
            );
        }
        if (value === null || value === undefined || value === "") {
            return <span className="italic text-gray-400">N/A</span>;
        }
        return value;
    };

    const handleClose = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(-1); // Default browser back
        }
    };

    // Block/Unblock handler
    const handleBlockToggle = async () => {
        setLoading(true);
        const action = userData.block ? "unblock" : "block";
        try {
            const response = await adminUserBlock({ id: userData.id, type: "profile" });
            if (response.data?.status) {
                toast.success(response.data.message || `User ${action}ed successfully`);
                setUserData((prev) => ({ ...prev, block: !prev.block }));
            } else {
                toast.error(response.data?.message || `Failed to ${action} user`);
            }
        } catch (error) {
            toast.error("Failed to update user status.");
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="w-full">
         <div className="flex items-center">
                <button onClick={handleClose} className="px-2 py-2 rounded">
                    <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
                </button>
                <span className="font-semibold">BACK</span>
            </div>
        <div className="flex justify-center items-center min-h-screen bg-white w-full">
            <div className="w-full max-w-2xl shadow-lg rounded-2xl p-8 bg-white border border-amber-400">
                <div className="flex flex-col items-center mb-8">
                    {displayValue(userData.image, "image")}
                    <h2 className="text-3xl font-bold mt-4 mb-2 text-amber-900">
                        {displayValue(userData.first_name)} {displayValue(userData.last_name)}
                    </h2>
                    <div className="text-lg text-amber-700">{displayValue(userData.email)}</div>
                    <div className="mt-4">
                        <button
                            onClick={handleBlockToggle}
                            disabled={loading}
                            className={`px-6 py-2 rounded-lg font-semibold text-white transition ${
                                userData.block
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-red-600 hover:bg-red-700"
                            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                            {loading
                                ? (userData.block ? "Unblocking..." : "Blocking...")
                                : (userData.block ? "Unblock User" : "Block User")}
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">User ID</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.id)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Username</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.username)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Mobile Device</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.mobile_device)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Web Device</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.web_device)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Is Staff</label>
                        <div>{displayValue(userData.is_staff, "boolean")}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Is Active</label>
                        <div>{displayValue(userData.is_active, "boolean")}</div>
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
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Date Joined</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.date_joined)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Last Login</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.last_login)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Active From</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.active_from)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Inactive From</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.inactive_from)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Deactivated On</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.deactivated_on)}</div>
                    </div>
                    <div>
                        <label className="block font-semibold text-amber-900 mb-1">Total HR Spend</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.total_hr_spend)}</div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-semibold text-amber-900 mb-1">OneSignal ID</label>
                        <div className="bg-amber-100 rounded p-2">{displayValue(userData.onesignal_id)}</div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-semibold text-amber-900 mb-1">Groups</label>
                        <div>{displayValue(userData.groups, "array")}</div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-semibold text-amber-900 mb-1">User Permissions</label>
                        <div>{displayValue(userData.user_permissions, "array")}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}
