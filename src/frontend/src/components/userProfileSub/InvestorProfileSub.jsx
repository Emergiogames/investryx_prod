import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Popover } from "@headlessui/react";
import { TbMasksTheater } from "react-icons/tb";
import { getInvPost } from "../../services/user/apiMethods";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import ProfileLeftBox from "../profileLeftBox/ProfileLeftBox";
import { useSelector } from "react-redux";
import MyPostsList from "../myPostsList/MyPostsList";
import ManagePref from "./preferenceManagement/ManagePref";



function InvestorProfileSub(props) {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();
    const recommPlan = props.recommPlan;
    const myPlan = props.myPlans;
    const loading = props.loading;
    const deleteHandler = props.deleteHandler;
    console.log("myPlan ::", myPlan);
    console.log("myRecommInv ::", recommPlan);
    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);

    //handle Add Post check
    const handleAddPost = () => {
        const pass = "investor";
        navigate("/add-post");
    };

    //get my post
    const [myPosts, setMyPosts] = useState("");
    const [myPostsLoader, setMyPostsLoader] = useState(null);
    useEffect(() => {
        setMyPostsLoader(true);
        const fetchPost = async () => {
            try {
                const post = await getInvPost();
                if (post.data && Array.isArray(post.data)) {
                    console.log("my buz post", post);
                    setMyPosts(post.data);
                }
            } catch (error) {
                console.error("Error fetching my post", error);
            } finally {
                setMyPostsLoader(false);
            }
        };
        fetchPost();
    }, []);

    const handleViewPost = (post) => {
        navigate(`/view-post-inv/${post.id}`, { state: { post } });
    };

    //handle view profile
    const [isSubProfileOpen, setIsSubProfileOpen] = useState(false);
    const viewProfile = () => {
        setIsSubProfileOpen(true);
    };

    //handle more and edit
    const [moreOpenId, setMoreOpenId] = useState(null);

    const handleMoreClick = (postId) => {
        setMoreOpenId((prevId) => (prevId === postId ? null : postId));
    };

    return (
        <>
            {/* profile name center */}
            <div className="bg-slate-50">
                <div className="text-xl lg:text-5xl mt-40  md:mt-12 text-violet-900 font-semibold  lg:h-12 flex justify-center">
                    Investor Profile
                </div>

                {/* Main content */}
                <div className="xl:flex">
                    {/* Left box  1*/}
                    <div className="xl:w-1/4  ">
                        {/* box two */}
                        <ProfileLeftBox user={user} deleteHandler={deleteHandler} />
                        <ManagePref user={user} deleteHandler={deleteHandler} />
                    </div>

                    {/* middle box */}
                    <div className="xl:w-1/2 min-h-[90vh]">
                        <div className="m-2 p-2 pb-4 md:p-6 md:m-6 md:mb-5  bg-amber-100 rounded-md ">
                            <div className="text-center">
                                <div className="text-2xl font-medium text-violet-900 thick-yellow-underline">Analytics</div>
                            </div>
                            <hr className="border-gray-300 my-9" />
                            <div className="flex justify-evenly md:text-2xl font-normal text-violet-900">
                                <div className="flex items-center md:gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    <div className="">Post Views</div>
                                </div>
                                <div className="flex items-center md:gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
                                    </svg>
                                    <div> Impressions</div>
                                </div>
                                <div className="flex items-center md:gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.219 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.721 10.721 0 0 0 15 1.75a.75.75 0 0 0-.75-.75c-3.133 0-5.953 1.34-7.917 3.478ZM12 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                            clipRule="evenodd"
                                        />
                                        <path d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.75.75 0 1 0-.725-1.312 3.231 3.231 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81Z" />
                                    </svg>

                                    <div> Reached</div>
                                </div>
                            </div>
                        </div>
                        {/* my posts list */}
                        <MyPostsList myPosts={myPosts} />
                    </div>

                    {/* right box */}
                    <div className="xl:w-1/4 ">
                        <div className="md:p-6 md:m-6   rounded-md flex flex-col justify-center items-center">
                            <div className="flex items-center space-x-2 py-2">
                                <div className="text-2xl font-light text-violet-900">
                                    <div>
                                        <div className="">
                                            <button>
                                                <div
                                                    onClick={() => handleAddPost()}
                                                    className=" w-[20rem] text-center  right-[5rem] bg-transparent border-2 border-yellow-300 p-4 m-4 rounded-xl hover:bg-yellow-300  transition-colors duration-300"
                                                >
                                                    Add Investor Post
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 m-6  bg-amber-100 rounded-md text-center ">
                            <div className="mb-5 text-3xl font-medium font-sans text-violet-900">Profile Status</div>
                            <div className="flex flex-row justify-center items-center">
                                <div className="w-[5rem] h-[5rem] m-2">
                                    <div
                                        className=" radial-progress bg-yellow-300 text-yellow-500 border-yellow-300 border-8"
                                        style={{ "--value": 90 }}
                                        role="progressbar"
                                    >
                                        90%
                                    </div>
                                </div>
                                <div className="m-2">You are few steps away from profile completion!</div>
                            </div>
                            <div>
                                <div className="my-6 flex justify-center mt-16">
                                    <button
                                        onClick={() => navigate("/add-Profile-pre-investor")}
                                        className="bg-yellow-300 hover:bg-yellow-400 p-2 px-10 rounded-lg font-medium text-lg flex items-center gap-2"
                                    >
                                        <CheckCircle size={24} className="text-green-600" />
                                        Verify Profile
                                    </button>
                                </div>
                            </div>
                            <div className="text-gray-600">*Verfied Profile makes sure the Authenticity of User</div>
                        </div>

                        {/* //plans status , if plans available */}
                        <div className="p-6 m-6 bg-amber-100 rounded-md text-center ">
                            <div className="mb-5 text-3xl font-medium font-sans text-violet-900">Current Plan Status</div>
                            <div className="flex flex-row justify-center items-center"></div>
                            <div></div>

                            <div className=" w-full mb-5 mt-5 flex">
                                <div className="text-violet-900 pl-5">
                                    <div className=" text-xl font-light">Post Left : {myPlan && myPlan.posts}</div>
                                </div>
                            </div>
                            <div className=" w-full mb-5 flex">
                                <div className="text-violet-900 pl-5">
                                    <div className=" text-xl font-light">Plan Name : {myPlan && myPlan?.plan?.name}</div>
                                </div>
                            </div>
                            <div className=" w-full mb-5 flex">
                                <div className="text-violet-900 pl-5">
                                    <div className=" text-xl font-light">Plan Expiry : {myPlan && myPlan.expiry}</div>
                                </div>
                            </div>
                        </div>

                        {!myPlan && (
                            <div className="p-6 m-6 bg-amber-100 rounded-md">
                                <div className="flex">
                                    <div>
                                        <div className="text-4xl text-violet-900 font-semibold">{recommPlan?.name}</div>
                                        <div>Duration : {recommPlan?.time_period} months</div>
                                        <div className="text-4xl text-violet-900 font-semibold">₹{recommPlan.rate}</div>
                                        {/* <div></div> */}
                                    </div>
                                    <div>
                                        <img src="/images/plans/Union.png" alt="pointing_ime" className="h-40" />
                                    </div>
                                </div>

                                <div
                                    onClick={() => navigate("/subscribe")}
                                    className="cursor-pointer bg-blue-700 text-2xl p-3 m-3 px-6 text-white rounded-xl text-center"
                                >
                                    Buy Now
                                </div>

                                <div>
                                    {Object.values(recommPlan.description).length > 0 ? (
                                        Object.values(recommPlan.description)
                                            .slice(0, 3) // Limit to 3 items
                                            .map((item, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        className="w-6 h-6 flex-shrink-0" // Prevent shrinking
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <div>{item}</div>
                                                </div>
                                            ))
                                    ) : (
                                        <div>No description available</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InvestorProfileSub;
