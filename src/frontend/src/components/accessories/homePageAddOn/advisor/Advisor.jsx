// import React, { useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useNavigate } from "react-router-dom";

// function Advisor() {
//   const navigate = useNavigate();
// //   const posts = featuredData?.data || [];
// //   console.log("featuredData : ", posts);

//   const swiperRef = useRef(null);
  
//   const posts = [
//     { img: "/images/investryx/landing page/Rectangle 11.png" },
//     { img: "/images/investryx/landing page/Rectangle 12.png" },
//     { img: "/images/investryx/landing page/Rectangle 13.png" },
//     { img: "/images/investryx/landing page/Rectangle 14.png" },
//   ];
//   useEffect(() => {
//     if (swiperRef.current) {
//       swiperRef.current.swiper.update();
//     }
//   }, []);

//   const handleViewPost = (postData) => {
//     console.log("4444 :::: ", postData);
//     navigate(`/view-post/${postData.id}`, { state: { post: postData } });
//   };

//   return (
//     <div className="w-full relative">
//       <div className="multiple-slide-carousel swiper-container relative">
//         <div className="text-5xl font-medium mb-5 mt-5 ml-24 mt-28 text-center py-9">
//           Advisors{" "}
//         </div>
//         <Swiper
//           ref={swiperRef}
//           modules={[Navigation]}
//           loop={true}
//           slidesPerView={3}
//           spaceBetween={25}
//           navigation={{
//             nextEl: ".swiper-button-next",
//             prevEl: ".swiper-button-prev",
//           }}
//           breakpoints={{
//             1920: {
//               slidesPerView: 4,
//               spaceBetween: 30,
//             },
//             1028: {
//               slidesPerView: 3,
//               spaceBetween: 30,
//             },
//             990: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             640: {
//               slidesPerView: 1,
//               spaceBetween: 0,
//             },
//           }}
//           className="swiper-wrapper mb-3"
//         >
//           {posts.map((post) => (
//             <SwiperSlide key={post.id}>
//               <article
//                 onClick={() => handleViewPost(post)}
//                 className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border"
//               >
//                 {/* <a
//                   target="_self"
//                 //   href="/blog/slug"
//                   className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
//                 ></a> */}
//                 <div className="relative mb-4 rounded-2xl">
//                   <img
//                     className="h-[30rem]  rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
//                     // src={`${BASE_URL}${post.image1}`}
//                     src={post.img}
//                     alt="image"
//                   />
//                   <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className="h-5 w-5 text-red-700"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                       />
//                     </svg>
//                     <span className="ml-1 text-sm text-slate-400">2</span>
//                   </div>
//                   <a
//                     className="flex justify-center items-center bg-yellow-300 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-white rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
//                     // href="/blog/slug"
//                     target="_self"
//                     rel="noopener noreferrer"
//                   >
//                     Read article
//                     <svg
//                       className="ml-2 w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M13 5l7 7-7 7M5 5l7 7-7 7"
//                       ></path>
//                     </svg>
//                   </a>
//                 </div>
//                 <div className="flex justify-between items-center w-full pb-4 mb-auto">
//                   <div className="flex items-center">
//                     <div className="pr-3">
//                       <img
//                         className="h-12 w-12 rounded-full object-cover"
//                         src="https://images.pexels.com/photos/163097/twitter-social-media-communication-internet-network-163097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//                         alt=""
//                       />
//                     </div>
//                     <div className="flex flex-1">
//                       <div className="">
//                         <p className="text-sm font-semibold">
//                           {/* {post.entity_type} */}
//                           Lorel Ipsum
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           Published on 
//                           {/* {post.listed_on} */}
//                           23/11/2024
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex justify-end">
//                     <div className="text-sm flex items-center text-gray-500">
//                       {/* {post.city} */}
//                       Kerala
//                       <svg
//                         className="ml-1 w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="1"
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         ></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//                 <h3 className="font-medium text-xl leading-8">
//                   <a
//                     // href="/blog/slug"
//                     className="block relative group-hover:text-red-700 transition-colors duration-200"
//                   >
//                     {/* {post.industry} */}
//                     Industry

//                   </a>
//                 </h3>
//               </article>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div class="absolute flex justify-center items-center m-auto left-0 right-0 w-fit bottom-12">
//           <button
//             id="slider-button-left"
//             class="swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full  hover:bg-indigo-600 !-translate-x-16"
//             data-carousel-prev
//           >
//             {/* <svg class="h-5 w-5 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//              <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
//            </svg> */}
//           </button>

//           <button
//             id="slider-button-right"
//             class="swiper-button-next group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600 !translate-x-16"
//             data-carousel-next
//           >
//             {/* <svg class="h-5 w-5 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
//              <path d="M5.99984 4.00012L10 8.00029L5.99748 12.0028" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
//            </svg> */}
//           </button>
//         </div>
//       </div>
//       <style jsx>{`
//         .swiper-wrapper {
//           width: 100%;
//           height: max-content !important;
//           padding-bottom: 64px !important;
//           transition-timing-function: linear !important;
//           position: relative;
//         }
//         .swiper-pagination-bullet {
//           background: #4f46e5;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Advisor;
