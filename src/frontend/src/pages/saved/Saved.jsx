import React, { useState, useEffect } from "react";
import { deleteWishList, getWishList } from "../../services/post/apiMethods";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrls";
import LoaderWishlist from "../../components/loader/LoaderWishlist";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegImages } from "react-icons/fa6";

import { HiChevronLeft } from "react-icons/hi";
import {  toast } from 'react-toastify';
import SavedPageLoader from "../../components/loader/SavedPageLoader";

function Saved() {
    const navigate = useNavigate();
    const location = useLocation()

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState({
        business: [],
        investor: [],
        franchise: [],
        advisor: [],
    });

    useEffect(() => {
        fetchWishList();
    }, []);

    const fetchWishList = () => {
        setLoading(true);
        getWishList()
            .then((response) => {
                const wishlistData = response.data;
                console.log("whislist 33 ::", wishlistData);

                const categorizedPosts = {
                    business: wishlistData.filter((post) => post.entity_type === "business"),
                    investor: wishlistData.filter((post) => post.entity_type === "investor"),
                    franchise: wishlistData.filter((post) => post.entity_type === "franchise"),
                    advisor: wishlistData.filter((post) => post.entity_type === "advisor"),
                };
                setPosts(categorizedPosts);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    };
    console.log("whislist444 ::", posts);

    const handleDelete = (postId, entityType) => {
        console.log("handle delete posId :", postId, entityType);

        deleteWishList(postId)
            .then((response) => {
                console.log("response front : ", response);
                toast.success(response.status === 200 ? "Deleted successfully!" : "Failed to delete.");
                // Update the state based on the entityType
                setPosts((prevPosts) => ({
                    ...prevPosts,
                    [entityType]: prevPosts[entityType].filter((post) => post.id !== postId),
                }));
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    //handle view post from saved list
    const handleViewPosts = (postData) => {
      const profile = postData?.entity_type;
      switch (profile) {
          case "business":
              navigate(`/view-post-bus/${postData.id}`, { state: { post: postData } });
          case "franchise":
              navigate(`/view-post-fra/${postData.id}`, { state: { post: postData } });
          case "investor":
              navigate(`/view-post-inv/${postData.id}`, { state: { post: postData } });
          case "advisor":
              navigate(`/view-post-adv/${postData.id}`, { state: { post: postData } });
      }
    };

    //handle clode
    
  const handleClose = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // Default browser back
    }
  };

    return (
        <>
            <div className=" mt-14 flex justify-center ">
                <div className=" w-full md:w-[90%]  min-h-lvh">
                    {/* top back button + main heading */}
                    <div className="md:flex ">
                        <div className="flex items-center">
                            {/* close button */}
                            <button onClick={handleClose} className=" px-2 py-2 rounded">
                                <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
                            </button>
                            <span className="font-semibold">BACK</span>
                        </div>
                        <h2 className="flex justify-center w-full font-bold text-2xl my-10">Saved Post</h2>
                    </div>
                    {/* business saved */}
                    <div className="p-5 m-5">
                        <div className="flex justify-between text-xl font-medium text-violet-800">
                            <div>Businesses :</div>
                            <div>({posts.business.length})</div>
                        </div>
                        <div className="border-t border-gray-300 w-full my-4" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {posts.business.map((post, index) => (
                                <div key={index} className="flex justify-center">
                                    {loading ? (
                                        // Show loader in place of each post when loading
                                        <SavedPageLoader />
                                    ) : (
                                        // Render actual post content once loading is done
                                        <div className="bg-amber-100 p-4 rounded-md relative shadow-md w-96 h-80 cursor-pointer">
                                            <button
                                                onClick={() => handleDelete(post.id, post.entity_type)}
                                                className="absolute top-2 right-2"
                                            >
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-gray-500" />
                                            </button>
                                            <h4 className="pl-5 text-xl font-semibold tracking-tight text-gray-900">
                                                {post.name}
                                            </h4>
                                            {post.image1 ? (
                                                <img
                                                    onClick={() => handleViewPosts(post)}
                                                    src={`${BASE_URL}${post.image1}`}
                                                    alt=""
                                                    className="w-full h-40 object-cover rounded-md pb-5 mb-4 relative top-5"
                                                />
                                            ) : (
                                                <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                                    <FaRegImages  onClick={() => handleViewPosts(post)} className="w-full h-full rounded-lg text-gray-500 bg-white p-4" />
                                                </div>
                                            )}

                                            <div className="flex flex-col justify-between leading-normal">
                                                <p className="text-gray-500">
                                                    Industry: {post.industry}, City: {post.city}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    {post.description
                                                        ? post.description.length > 30
                                                            ? `${post.description.slice(0, 30)}...`
                                                            : post.description
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* investor saved */}
                    <div className="p-5 m-5">
                        <div className="flex justify-between text-xl font-medium text-violet-800 ">
                            <div>Investor :</div>
                            <div>({posts.investor.length})</div>
                        </div>
                        <div className="border-t border-gray-300 w-full my-4" />
                        {/* investor one */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {posts.investor.map((post, index) => (
                                <div key={index} className="flex justify-center">
                                    {loading ? (
                                        // Show loader in place of each post when loading
                                        <SavedPageLoader />
                                    ) : (
                                        // Render actual post content once loading is done
                                        <div className="bg-amber-100 p-4 rounded-md relative shadow-md w-96 h-80 cursor-pointer">
                                            <button
                                                onClick={() => handleDelete(post.id, post.entity_type)}
                                                className="absolute top-2 right-2"
                                            >
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-gray-500" />
                                            </button>
                                            <h4 className="pl-5 text-xl font-semibold tracking-tight text-gray-900">
                                                {post.name}
                                            </h4>

                                            {post.image1 ? (
                                                <img
                                                    onClick={() => handleViewPosts(post)}
                                                    src={`${BASE_URL}${post.image1}`}
                                                    alt=""
                                                    className="w-full h-40 object-cover rounded-md pb-5 mb-4 relative top-5"
                                                />
                                            ) : (
                                                <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                                    <FaRegImages  onClick={() => handleViewPosts(post)} className="w-full h-full rounded-lg text-gray-500 bg-white p-4" />
                                                </div>
                                            )}

                                            <div className="flex flex-col justify-between leading-normal">
                                                <p className="text-gray-500">
                                                    Industry: {post.industry}, City: {post.city}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    {post.description
                                                        ? post.description.length > 30
                                                            ? `${post.description.slice(0, 30)}...`
                                                            : post.description
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* franchise saved */}
                    <div className="p-5 m-5">
                        <div className="flex justify-between text-xl font-medium text-violet-800 ">
                            <div>Franchise :</div>
                            <div>({posts.franchise.length})</div>
                        </div>
                        <div className="border-t border-gray-300 w-full my-4" />
                        {/* Franchise one */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {posts.franchise.map((post, index) => (
                                <div key={index} className="flex justify-center">
                                    {loading ? (
                                        // Show loader in place of each post when loading
                                        <SavedPageLoader />
                                    ) : (
                                        // Render actual post content once loading is done
                                        <div className="bg-amber-100 p-4 rounded-md relative shadow-md w-96 h-80 cursor-pointer">
                                            <button
                                                onClick={() => handleDelete(post.id, post.entity_type)}
                                                className="absolute top-2 right-2"
                                            >
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-gray-500" />
                                            </button>
                                            <h4 className="pl-5 text-xl font-semibold tracking-tight text-gray-900">
                                                {post.name}
                                            </h4>

                                            {post.image1 ? (
                                                <img
                                                    onClick={() => handleViewPosts(post)}
                                                    src={`${BASE_URL}${post.image1}`}
                                                    alt=""
                                                    className="w-full h-40 object-cover rounded-md pb-5 mb-4 relative top-5"
                                                />
                                            ) : (
                                                <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                                    <FaRegImages  onClick={() => handleViewPosts(post)} className="w-full h-full rounded-lg text-gray-500 bg-white p-4" />
                                                </div>
                                            )}

                                            <div className="flex flex-col justify-between leading-normal">
                                                <p className="text-gray-500">
                                                    Industry: {post.industry}, City: {post.city}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    {post.description
                                                        ? post.description.length > 30
                                                            ? `${post.description.slice(0, 30)}...`
                                                            : post.description
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* advisor saved */}
                    <div className="p-5 m-5">
                        <div className="flex justify-between text-xl font-medium text-violet-800 ">
                            <div>Advisor :</div>
                            <div>({posts.advisor.length})</div>
                        </div>
                        <div className="border-t border-gray-300 w-full my-4" />
                        {/* advisor one */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {posts.advisor.map((post, index) => (
                                <div key={index} className="flex justify-center">
                                    {loading ? (
                                        // Show loader in place of each post when loading
                                        <SavedPageLoader />
                                    ) : (
                                        // Render actual post content once loading is done
                                        <div className="bg-amber-100 p-4 rounded-md relative shadow-md w-96 h-80 cursor-pointer">
                                            <button
                                                onClick={() => handleDelete(post.id, post.entity_type)}
                                                className="absolute top-2 right-2"
                                            >
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-gray-500" />
                                            </button>
                                            <h4 className="pl-5 text-xl font-semibold tracking-tight text-gray-900">
                                                {post.name}
                                            </h4>

                                            {post.image1 ? (
                                                <img
                                                    onClick={() => handleViewPosts(post)}
                                                    src={`${BASE_URL}${post.image1}`}
                                                    alt=""
                                                    className="w-full h-40 object-cover rounded-md pb-5 mb-4 relative top-5"
                                                />
                                            ) : (
                                                <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                                    <FaRegImages  onClick={() => handleViewPosts(post)} className="w-full h-full rounded-lg text-gray-500 bg-white p-4 pb-5 mb-4" />
                                                </div>
                                            )}

                                            <div className="flex flex-col justify-between leading-normal">
                                                <p className="text-gray-500">
                                                    Industry: {post.industry}, City: {post.city}
                                                </p>
                                                <p className="mb-3 font-normal text-gray-700">
                                                    {post.description
                                                        ? post.description.length > 30
                                                            ? `${post.description.slice(0, 30)}...`
                                                            : post.description
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Saved;
