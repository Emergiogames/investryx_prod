import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BASE_URL } from "../../../../constants/baseUrls";
import { formatDistanceToNow } from "date-fns";
import { FaImage } from "react-icons/fa6";
import { IoBookmarks } from "react-icons/io5";
import { FaFileImage } from "react-icons/fa";

const RecommendedListing = ({ props }) => {
    const posts = props || []
    console.log("llllll11", posts);

    const swiperRefRecommend = useRef(null);

    useEffect(() => {
        if (swiperRefRecommend.current) {
            swiperRefRecommend.current.swiper.update();
        }
    }, [posts]);

    return posts?.length  ? (
        <div className="w-full relative px-4 md:px-8 lg:px-16">
            <div className="text-3xl md:text-5xl font-medium mb-5 mt-8 text-center">Recommended Listings</div>
            {/* Navigation Buttons */}
            {/* prev button */}
            {/* CUSTOM CSS FOR BUTTON APPLIED ON INDEX.CSS */}
            <div className="absolute z-10 inset-y-0 left-8 lg:left-24 flex items-center mb-16">
                <button className="swiper-button-prev1 custom-swiper-button inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
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

            {/* next button */}
            <div className="absolute z-10 inset-y-0 right-8 lg:right-24 flex items-center mb-16">
                <button className="swiper-button-next1 custom-swiper-button inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
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
                ref={swiperRefRecommend}
                modules={[Navigation]}
                loop={true}
                slidesPerView={4}
                spaceBetween={20}
                navigation={{
                    nextEl: ".swiper-button-next1",
                    prevEl: ".swiper-button-prev1",
                }}
                breakpoints={{
                    1280 : { slidesPerView: 4, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    0: { slidesPerView: 1, spaceBetween: 10 }, // Fix smallest breakpoint
                }}
                className="swiper-wrapper mb-8 mx-auto"
            >
                {posts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <article className="bg-white p-4 md:p-6 shadow-md rounded-lg group cursor-pointer transition-transform duration-300 hover:scale-105 border">
                            {post.entity_type === "advisor" ? (
                                <div className="relative mb-4">
                                    {post.logo ? (
                                        <img
                                            className="h-60 lg:h-80 w-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
                                            src={`${BASE_URL}${post.logo}`}
                                            alt={post.title || "Post Image"}
                                        />
                                    ) : (
                                        <div className="h-60 lg:h-80 w-full object-cover flex justify-center items-center rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
                                            <FaImage className="w-full h-full p-7 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                        <IoBookmarks className="text-amber-400 hover:text-amber-500" />
                                    </div>
                                </div>
                            ) : (
                                <div className="relative mb-4">
                                    {post.image1 ? (
                                        <img
                                            className="h-60 lg:h-80 w-full object-cover rounded-2xl transition-transform duration-300 transform group-hover:scale-105"
                                            src={`${BASE_URL}${post.image1}`}
                                            alt={post.title || "Post Image"}
                                        />
                                    ) : (
                                        <div className="h-60 lg:h-80 w-full object-cover flex justify-center items-center rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
                                            <FaFileImage className="w-full h-full  text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                        <IoBookmarks className="text-amber-400 hover:text-amber-500" />
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className="flex ">
                                    {post.logo ? (
                                        <img
                                            className="h-12 w-12 rounded-full object-cover mr-3"
                                            src={post.logo}
                                            alt="Author"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full object-cover mr-3 flex justify-center items-center bg-amber-200 font-extrabold text-gray-500 text-2xl">
                                            {post.name ? post?.name.slice(0, 1).toUpperCase() : "N/A"}
                                        </div>
                                    )}
                                    <div>
                                        <div className=" font-semibold mb-2">
                                            {post.single_desc ? <div>{post.single_desc.slice(0, 25)}</div> : "Nill"}
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {post?.listed_on
                                                ? `Published ${formatDistanceToNow(new Date(post.listed_on), {
                                                      addSuffix: true,
                                                  })}`
                                                : "Date not available"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {post?.company ? `by: ${post.company}` : "Not Disclosed"}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-2">{(post?.city && post?.city) || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="text-md font-semibold mb-2">{post.single_desc.slice(0, 30) || "N/A"}</div>
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    ) : (
        <div className="text-yellow-500 font-semibold text-center text-2xl shadow-md border border-yellow-600 p-4 rounded-lg animate-pulse mt-8">
            Recommended Loading . . .
        </div>
    );
};

export default RecommendedListing;
