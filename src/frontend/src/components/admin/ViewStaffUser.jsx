import React, { useEffect, useState } from "react";
import { GetStaffUser, DeleteStaffUser } from "../../services/admin/apiMethods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiPencilAlt } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";

const ViewStaffUser = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;
    const [loading, setLoading] = useState(false);
    const [staffUsers, setStaffUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    useEffect(() => {
        fetchStaffUsers();
    }, []);

    const fetchStaffUsers = () => {
        setLoading(true);
        GetStaffUser()
            .then((response) => {
                console.log("Staff users data:", response);
                setStaffUsers(response.data || []);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to fetch staff users.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = staffUsers.filter(
        (user) =>
            user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser).reverse();
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const confirmDeleteUser = (userId, name) => {
        setUserIdToDelete(userId);
        setModalMessage(`Are you sure you want to delete staff user ${name}?`);
        setModalOpen(true);
    };

    const handleDeleteUser = () => {
        DeleteStaffUser(userIdToDelete)
            .then((response) => {
                toast.success(response.data?.message || "Staff user deleted successfully");
                fetchStaffUsers(); // Refresh the list
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to delete staff user.");
            })
            .finally(() => {
                setModalOpen(false);
            });
    };

    return (
        <div className="p-4 w-full">
            <div className="text-2xl font-bold mb-6 text-center">Staff Users List</div>

            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                            placeholder="Search staff users..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    #
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Joined from
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentUsers.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {indexOfFirstUser + index + 1}
                                    </td>
                                    <td
                                        onClick={() => navigate("/admin/edit-staff", { state: { staffUserData: user } })}
                                        className="px-6 py-4 whitespace-nowrap"
                                    >
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={
                                                        user.image
                                                            ? BASE_URL + user.image
                                                            : "https://ui-avatars.com/api/?name=" +
                                                              encodeURIComponent(user.first_name || "")
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {user.first_name} {user.last_name}
                                                </div>
                                                <div className="text-sm text-gray-500">@{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.date_joined
                                            ? formatDistanceToNow(new Date(user.date_joined), { addSuffix: true })
                                            : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                        >
                                            {user.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => confirmDeleteUser(user.id, user.first_name)}
                                            className="text-red-600 hover:text-red-900 mr-4"
                                            title="Delete"
                                        >
                                            <HiOutlineTrash className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                navigate("/admin/edit-staff", { state: { staffUserData: user } })
                                            }
                                            className="text-amber-600 hover:text-amber-900"
                                            title="Edit"
                                        >
                                            <HiPencilAlt className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && <div className="text-center py-8 text-gray-500">No staff users found</div>}

                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                        Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                        {filteredUsers.length} entries
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                                currentPage === Math.ceil(filteredUsers.length / usersPerPage) || filteredUsers.length === 0
                            }
                            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDeleteUser}
                message={modalMessage}
            />
        </div>
    );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
                <p className="mb-6">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewStaffUser;
