import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { AddStaffUser } from "../../services/admin/apiMethods";
import { toast } from "react-toastify";

export default function StaffUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        is_staff: true,  // Default to true for staff users
        is_active: true,
        groups: [],
        user_permissions: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value.split(',').map(item => item.trim())
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await AddStaffUser(formData);
            if (response.data?.status) {
                toast.success(response.data.message || "Staff user created successfully");
                navigate("/admin"); // Redirect to users list
            } else {
                toast.error(response.data?.message || "Failed to create staff user");
            }
        } catch (error) {
            toast.error("Failed to create staff user. Please try again.");
            console.error("Error creating staff user:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1); // Go back
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
                    <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">Add New Staff User</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Username */}
                            <div className="md:col-span-2">
                                <label className="block font-semibold text-amber-900 mb-1">Username*</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* Email */}
                            <div className="md:col-span-2">
                                <label className="block font-semibold text-amber-900 mb-1">Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* First Name */}
                            <div>
                                <label className="block font-semibold text-amber-900 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* Last Name */}
                            <div>
                                <label className="block font-semibold text-amber-900 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* Password */}
                            <div className="md:col-span-2">
                                <label className="block font-semibold text-amber-900 mb-1">Password*</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* Status Toggles */}
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="is_staff"
                                        checked={formData.is_staff}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                                    />
                                    <span className="font-semibold text-amber-900">Is Staff</span>
                                </label>
                            </div>
                            
                            <div>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
                                    />
                                    <span className="font-semibold text-amber-900">Is Active</span>
                                </label>
                            </div>
                            
                            {/* Groups */}
                            {/* <div className="md:col-span-2">
                                <label className="block font-semibold text-amber-900 mb-1">Groups (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.groups.join(', ')}
                                    onChange={(e) => handleArrayChange('groups', e.target.value)}
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div> */}
                            
                            {/* Permissions */}
                            {/* <div className="md:col-span-2">
                                <label className="block font-semibold text-amber-900 mb-1">Permissions (comma separated)</label>
                                <input
                                    type="text"
                                    value={formData.user_permissions.join(', ')}
                                    onChange={(e) => handleArrayChange('user_permissions', e.target.value)}
                                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div> */}
                        </div>
                        
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-8 py-3 rounded-lg font-semibold text-white bg-amber-600 hover:bg-amber-700 transition ${
                                    loading ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                            >
                                {loading ? "Creating..." : "Create Staff User"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}