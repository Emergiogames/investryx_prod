import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FaImage } from "react-icons/fa6";
import { IoBookmarks } from "react-icons/io5";

function RecentListing({ recentActivitiesData }) {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();
    const posts = recentActivitiesData || [];
    const swiperRefRecent = useRef(null);

    useEffect(() => {
        if (swiperRefRecent.current) {
            swiperRefRecent.current.swiper.update();
        }
    }, []);

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
        <div className="w-full relative">
            <div className="multiple-slide-carousel swiper-container relative">
                <h2 className="text-3xl lg:text-5xl font-medium mb-5 mt-10 text-center">Recent Posts</h2>

                {/* Navigation Buttons */}
                {/* prev button */}
                {/* CUSTOM CSS FOR BUTTON APPLIED ON INDEX.CSS */}
                <div className="absolute z-10 inset-y-0 left-8 flex items-center ">
                    <button className="swiper-button-prev custom-swiper-button inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-yellow-300 group-hover:text-white transition-colors duration-300"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 4.5L3 12m0 0l7.5 7.5M3 12h18" />
                        </svg>
                    </button>
                </div>

                <div className="absolute z-10 inset-y-0 right-8 flex items-center mb-16">
                    <button className="swiper-button-next custom-swiper-button inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-yellow-300 group-hover:text-white transition-colors duration-300"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>

                <Swiper
                    ref={swiperRefRecent}
                    modules={[Navigation]}
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={25}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    breakpoints={{
                        1920: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        100: {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                    }}
                    className="swiper-wrapper px-24"
                >
                    {posts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <article
                                onClick={() => handleViewPost(post)}
                                className="bg-white p-4 lg:p-6  shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
                            >
                                <div>
                                    {post.entity_type === "advisor" ? (
                                        <div className="relative mb-4 rounded-2xl">
                                            {post.logo ? (
                                                <img
                                                    className="h-60 lg:h-80 w-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
                                                    src={`${BASE_URL}${post.logo}`}
                                                    alt={post.title || "Post Image"}
                                                />
                                            ) : post.image1 ? (
                                                <img
                                                    className="h-60 lg:h-80 w-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
                                                    src={`${BASE_URL}${post.image1}`}
                                                    alt={post.title || "Post Image"}
                                                />
                                            ) : (
                                                <div className="h-60 lg:h-80 w-full object-cover flex justify-center items-center rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
                                                    <FaImage className="w-full h-full p-7 text-gray-400" />
                                                </div>
                                            )}
                                            {/* <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <IoBookmarks className="text-amber-400 hover:text-blue-500" />
                                            </div> */}
                                        </div>
                                    ) : (
                                        <div className="relative mb-4 rounded-2xl">
                                            {post.image1 ? (
                                                <img
                                                    className="h-60 lg:h-80 w-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
                                                    src={`${BASE_URL}${post.image1}`}
                                                    alt={post.title || "Post Image"}
                                                />
                                            ) : (
                                                <div className="h-60 lg:h-80 w-full object-cover flex justify-center items-center rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
                                                    <FaImage className="w-full h-full p-7 text-gray-400" />
                                                </div>
                                            )}
                                            {/* <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <IoBookmarks className="text-amber-400 hover:text-amber-500" />
                                            </div> */}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center w-full pb-4">
                                    <div className="flex items-center">
                                        {post.logo ? (
                                            <img
                                                className="h-12 w-12 rounded-full object-cover mr-3"
                                                src={post.logo}
                                                alt="Author"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full object-cover mr-3 flex justify-center items-center bg-amber-200 font-extrabold text-gray-500 text-2xl">
                                                {post?.name.slice(0, 1).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {post.single_desc ? post.single_desc : "Nil"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {post?.listed_on
                                                    ? `Published ${formatDistanceToNow(new Date(post.listed_on), {
                                                          addSuffix: true,
                                                      })}`
                                                    : "Date not available"}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">{post.city}</p>
                                </div>
                                <h3 className="font-medium text-xl leading-8">
                                    {post.title ? post.title.slice(0, 40) : "Nil"}
                                </h3>

                                <h3 className="text-sm font-semibold leading-8">{post.industry ? post.industry : "Nil"}</h3>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <style jsx>{`
                .swiper-wrapper {
                    width: 100%;
                    padding-bottom: 18px;
                }
                .swiper-pagination-bullet {
                    background: #4f46e5;
                }
                .swiper-button-prev::after,
                .swiper-button-next::after {
                    display: none;
                }
            `}</style>
        </div>
    );
}

export default RecentListing;
