import { formatDistanceToNow } from "date-fns";
import React, { useState, useRef, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { TbMasksTheater } from "react-icons/tb";
import { Popover } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "flowbite-react";
// import { userProfile } from "../../utils/context/reducers/authSlice";

function MyPostsList({ myPosts }) {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();
    const [moreOpenId, setMoreOpenId] = useState(null);
    const menuRef = useRef(null);

    // Close More menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMoreOpenId(null);
            }
        }
        if (moreOpenId !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [moreOpenId]);

    const userProfile = (state) => state.auth.profile || "";
    const profile = useSelector(userProfile);

    const handleMoreClick = (postId) => {
        setMoreOpenId((prevId) => (prevId === postId ? null : postId));
    };

    //     const handleViewPost = (post) => {
    //         navigate(`/view-post-bus/${post.id}`, { state: { post } });
    // }

    const handleViewPost = (postData) => {
        const profile = postData?.entity_type;
        switch (profile) {
            case "business":
                navigate(`/view-post-bus/${postData.id}`, { state: { post: postData } });
                break;
            case "franchise":
                navigate(`/view-post-fra/${postData.id}`, { state: { post: postData } });
                break;
            case "investor":
                navigate(`/view-post-inv/${postData.id}`, { state: { post: postData } });
                break;
            case "advisor":
                navigate(`/view-post-adv/${postData.id}`, { state: { post: postData } });
                break;
            default:
                console.warn("Unknown profile type:", profile);
        }
    };

    return (
        <div>
            <div className="p-1 md:p-4 md:m-4 md:px-10 md: mt-7  bg-amber-100 rounded-md h-fit">
                <div className=" text-2xl font-medium text-violet-900 text-center  ">My Posts</div>
                {/* thick-yellow-underline */}
                <hr className="p-4 m-4 border-gray-400 " />
                {myPosts && myPosts.length > 0 ? (
                    myPosts.map((post) => (
                        <div key={post.id} className="flex md:w-full m-2 md:m-4 bg-gray-50 rounded-2xl">
                            <img
                                onClick={() => handleViewPost(post)}
                                src={
                                    post.image1
                                        ? `${BASE_URL}${post.image1}`
                                        : post.logo
                                        ? `${BASE_URL}${post.logo}`
                                        : "https://dummyimage.com/200x200/000/fff"
                                }
                                className="relative object-cover rounded-l-2xl w-24 h-24 md:max-h-42 md:max-w-44 cursor-pointer"
                                alt="Post thumbnail"
                            />
                            <div className="flex flex-col justify-evenly pl-3 lg:pl-10 w-full">
                                <div className="font-semibold text-xl text-gray-600">{post.name}</div>
                                <div className="flex items-center justify-between">
                                    <div className="font-normal text-xs md:text-sm text-violet-900">
                                        {post?.listed_on
                                            ? `Posted ${formatDistanceToNow(new Date(post.listed_on), {
                                                  addSuffix: true,
                                              })}`
                                            : "Date not available"}
                                    </div>

                                    <div className="mr-4 relative">
                                        <Popover>
                                            {({ open }) => (
                                                <>
                                                    <Popover.Button
                                                        type="button"
                                                        className={`
                                            ${
                                                post?.block || !post?.verified || !post?.subscribed
                                                    ? "bg-red-400"
                                                    : "bg-green-400"
                                            }
                                            text-white font-medium rounded-lg text-xs px-3 py-1 text-center
                                        `}
                                                    >
                                                        {post?.block || !post?.verified || !post?.subscribed
                                                            ? "Inactive"
                                                            : "Active"}
                                                    </Popover.Button>

                                                    <Popover.Panel className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md p-2 text-xs text-gray-700">
                                                        <p>Block Status: {post?.block ? "Blocked" : "Not Blocked"}</p>
                                                        <p>Verified: {post?.verified ? "Yes" : "No"}</p>
                                                        <p>
                                                            Subscription:{" "}
                                                            {post?.subscribed ? "Subscribed" : "Not Subscribed"}
                                                        </p>
                                                    </Popover.Panel>
                                                </>
                                            )}
                                        </Popover>
                                    </div>
                                </div>

                                <div className="flex justify-around">
                                    <div className="flex">
                                        <div className="flex items-center">
                                            <IconButton aria-label="impressions" size="large">
                                                <TbMasksTheater fontSize="large" />
                                            </IconButton>
                                            <div className="lg:flex">
                                                <div>{post.impressions || "0"}</div>
                                                <div className="hidden lg:block pl-1">Impressions</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex items-center">
                                            <IconButton aria-label="enquiry" size="large">
                                                <FaSearch fontSize="large" />
                                            </IconButton>
                                            <div>{post.total_count || "0"}</div>
                                            <div className="hidden lg:block pl-1"> Enquiry</div>
                                        </div>
                                    </div>

                                    {/* More button with dynamic popup */}
                                    <div className="relative">
                                        <div
                                            onClick={() => handleMoreClick(post.id)}
                                            className="flex items-center lg:gap-x-1 m-1 px-2 cursor-pointer  hover:bg-gray-200 rounded-lg"
                                        >
                                            <Button className="p-2 text-gray-500" aria-label="edit" size="large">
                                                <FaEdit fontSize="large" />
                                            </Button>
                                            <div className="text-gray-700 font-medium">More</div>
                                        </div>

                                        {moreOpenId === post.id && (
                                            <div
                                                ref={menuRef}
                                                className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-lg z-50"
                                            >
                                                {/* <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                                    Pause
                                                </button> */}
                                                {/* <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                                    Promote
                                                </button> */}
                                                {(() => {
                                                    switch (profile) {
                                                        case "business":
                                                            return (
                                                                <button
                                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() =>
                                                                        navigate("/bus-edit", {
                                                                            state: { singlePost: post },
                                                                        })
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            );
                                                        case "investor":
                                                            return (
                                                                <button
                                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() =>
                                                                        navigate("/inv-edit", {
                                                                            state: { singlePost: post },
                                                                        })
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            );
                                                        case "franchise":
                                                            return (
                                                                <button
                                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() =>
                                                                        navigate("/fra-edit", {
                                                                            state: { singlePost: post },
                                                                        })
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            );
                                                        case "advisor":
                                                            return (
                                                                <button
                                                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() =>
                                                                        navigate("/adv-edit", {
                                                                            state: { singlePost: post },
                                                                        })
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>
                                                            );
                                                        default:
                                                            return null; // If no profile matches, return nothing
                                                    }
                                                })()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mx-4 my-5 font-semibold text-gray-600">You have't added a post yet. Please add a Post</p>
                )}
            </div>
        </div>
    );
}

export default MyPostsList;
