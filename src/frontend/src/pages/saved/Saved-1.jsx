import React, { useState, useEffect } from "react";
import { deleteWishList, getWishList } from "../../services/post/apiMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoaderWishlist from "../../components/loader/LoaderWishlist";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {  toast } from 'react-toastify';

function Saved() {
  const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  // const userData = (state) => state.auth.user || "";
  // const user = useSelector(userData);
  // const userId = user.userid || "";

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    fetchWishList();
  }, []);

  const fetchWishList = () => {
    setLoading(true);
    getWishList()
      .then((response) => {
        const wishlistData = response.data;
        setPost(wishlistData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };
  const handleDelete = (postId) => {
    console.log("handle delete posId :", postId);

    deleteWishList(postId)
      .then((response) => {
        console.log("response front : ", response);
        toast.success(
          response.status === 200
            ? "Deleted successfully!"
            : "Failed to delete."
        );
        setPost((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  
  //handle view post from saved list
  const handleViewPosts = (postData) => {
    navigate(`/view-post/${postData.id}`, { state: { post: postData } });
  };

  return (
    <div className="w-screen min-h-screen bg-slate-200">
      <div className="flex items-center justify-center h-full">
        <div className="w-2/3 min-h-screen bg-white py-16 px-4 border-4 ">
          {/* <div className="pl-28 pt-12">Saved Posts</div>   */}
          {/* <div className="text-left ml-32 pt-4">{post.name} </div> */}
          {/* Check if the posts array is empty */}
          {posts.length === 0 ? (
            <div className="flex flex-col items-center">
              {/* Render an image if no posts are available */}
              <img
                className="h-64 w-64 object-cover"
                src="animations/empty_cart.gif"
                alt="No Saved Posts"
              />
              <p className="text-gray-500 text-lg mt-4">No saved posts found</p>

              {/* button with Border: to explore */}

              <a
                className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 mt-28 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
                href="/Business"
              >
                <span className="font-medium transition-colors group-hover:text-white">
                  {" "}
                  Explore New Business{" "}
                </span>

                <span className="shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500">
                  <svg
                    className="size-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
            </div>
          ) : (
            posts.map((post) => {
              return (
                <div key={post.id}>
                  {loading && <LoaderWishlist />}
                  {!loading && (
                    // <div className="">
                    <div
                      href="#"
                      class="m-auto flex my-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <div className="hover: cursor-pointer">
                        <img
                          onClick={() => handleViewPosts(post)}
                          // onClick={() => handleDelete(post.id)}
                          className="h-40 w-36 object-cover rounded-none md:rounded-s-lg"
                          src={`${BASE_URL}${post.image1}`}
                          alt=""
                        />
                      </div>

                      <div class="flex flex-col justify-between p-4 leading-normal">
                        <h4 class="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
                          {post.name}
                          {/* {post.establish_yr}
                        {post.city} */}
                        </h4>
                        <p>
                          {" "}
                          <a className="text-gray-500">Industry : </a>
                          {post.industry}{" "}
                          <a className="text-gray-500">, City : </a> {post.city}
                        </p>

                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {post.description}
                        </p>
                      </div>
                      <button onClick={() => handleDelete(post.id)}>
                        <XMarkIcon
                          aria-hidden="true"
                          className=" h-6 w-6 mr-3"
                        />
                      </button>
                      {/* <XMarkIcon aria-hidden="true" className=" h-6 w-6 mr-3" /> */}
                    </div>

                    // </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Saved;
