import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdminLogout } from "../../utils/context/reducers/adminAuthSlice";
import { toast } from "react-toastify";
import { MdDashboard, MdBusinessCenter, MdBusiness, MdOutlineSupport, MdReport, MdEditNotifications   } from "react-icons/md";
import { GrDocumentVerified } from "react-icons/gr";
import { TbZoomMoneyFilled, TbBusinessplan  } from "react-icons/tb";
import { PiFlagBannerFill, PiFlagBannerFoldFill  } from "react-icons/pi";
import { FaUserCog, FaUserEdit  } from "react-icons/fa";



function AdminSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [superUser, setSuperUser] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const superStatus = useSelector((state) => state.adminAuth.admin.is_superuser);
    const staffStatus = useSelector((state) => state.adminAuth.admin.is_staff);

    useEffect(() => {
        setSuperUser(!!superStatus && !!staffStatus);
    }, [superStatus, staffStatus]);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        dispatch(AdminLogout());
        toast.info("Logout successful");
        navigate("/admin/login");
    };

    return (
        <>
            {/* Burger button */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded bg-amber-400 text-white shadow-md md:hidden"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sidebar */}
            <div>
                <aside
                    id="logo-sidebar"
                    className={`
            pl-2 ml-0 border hover:shadow-md fixed top-0 left-0 z-40 w-60 h-screen transition-transform bg-white dark:bg-black
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto">
                        <div className="flex justify-between">
                            <div className="logo-container max-w-32 h-auto overflow-hidden flex">
                                <img
                                    className="logo-img transition-transform duration-300 ease-in-out transform hover:scale-110 w-28 flex"
                                    src=""
                                    alt=""
                                />
                            </div>
                            <div className="flex justify-end p-2 md:hidden">
                                <button
                                    onClick={closeSidebar}
                                    className="text-white px-2 py-2 rounded"
                                    aria-label="Close sidebar"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18 17.94 6M18 18 6.06 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <ul className="space-y-2 font-medium">
                            <li>
                                <img className="px-3 py-3 " src="/images/black_nvestryx.png" alt="" />
                            </li>
                            <li>
                                <Link
                                    to={"/admin/"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <MdDashboard className="text-gray-600 w-5 h-5" />

                                    <span className="ms-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/postVerify"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <GrDocumentVerified className="text-gray-600 w-5 h-5" />
                                    <span className="ms-3">Post Verification</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/users"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                    </svg>
                                    <span className="ms-3">Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/business"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                   <MdBusinessCenter className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Business Posts</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/franchise"}
                                    i
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <MdBusiness className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Franchise Posts</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/investor"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                   <TbZoomMoneyFilled className="text-gray-600 w-5 h-5" />

                                    <span className="ms-3">Investor Posts</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/advisor"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                   <MdOutlineSupport className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Advisors List</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/banner"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                   <PiFlagBannerFill className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Banner</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to={"/admin/banner-sub"}
                                    // onClick={closeSidebar}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <PiFlagBannerFoldFill className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Banner-Sub</span>
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to={"/admin/reports"}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                  <MdReport className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Reports</span>
                                </Link>
                            </li>
                            <li></li>
                            <li>
                                <Link
                                    to={"/admin/notification"}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <MdEditNotifications className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Push Notification</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={"/admin/plans"}
                                    className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                   <TbBusinessplan className="text-gray-600 w-5 h-5"/>

                                    <span className="ms-3">Add Plans</span>
                                </Link>
                            </li>
                            {superUser ? (
                                <div>
                                    <li>
                                        <Link
                                            to={"/admin/staff"}
                                            className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                        >
                                            <FaUserCog className="text-gray-600 w-5 h-5"/>

                                            <span className="ms-3">Staff-user</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={"/admin/viewStaff"}
                                            className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100  00 dark:hover:bg-gray-700 dark:text-white group"
                                        >
                                           <FaUserEdit className="text-gray-600 w-5 h-5"/>

                                            <span className="ms-3">View Staff-user</span>
                                        </Link>
                                    </li>
                                </div>
                            ) : null}

                            {/* <li>
                      <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" 
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">Notifications</span>
                      </a>
                  </li> */}
                            {/* <li>
                    <Link
                      to={""}
                      className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                    >
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 22"
                      >
                        <path fill-rule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd"/>
                    </svg>
                    <span className="ms-3">Create</span>
                  </Link>
                </li> */}
                        </ul>
                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            {/* <li>
                <Link
                  to={"#"}
                  className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 22"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="ms-3">Settings</span>
                </Link>
              </li> */}
                            <li>
                                <div
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 22"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            strokeWidth="2"
                                            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                                        />
                                    </svg>

                                    <span className="ms-3">Logout</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}

export default AdminSidebar;
