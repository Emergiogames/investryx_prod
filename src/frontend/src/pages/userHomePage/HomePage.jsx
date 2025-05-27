import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ImgSlider from "../../components/accessories/homePageImgSlider/ImgSlider";
import {
    getFeaturedList,
    getRecommendedList,
    getRecentActivities,
    getBanner,
    getFeaturedExperts,
    getGraph,
    getAllPlans,
} from "../../services/user/apiMethods";
import FeaturedListing from "../../components/accessories/homePageAddOn/featuredListing/FeaturedListing";
import RecommendedListing from "../../components/accessories/homePageAddOn/recommededListing/RecommendedListing";
import Banner from "../../components/accessories/homePageAddOn/banner/Banner";
import Graph from "../../components/accessories/homePageAddOn/graph/Graph";
import RecentListing from "../../components/accessories/homePageAddOn/recent/RecentListing";
import { motion, useAnimation } from "framer-motion";
import { setPlans, userProfile } from "../../utils/context/reducers/authSlice";
import HomePlans from "../../components/accessories/homePageAddOn/plans/HomePlans";

function HomePage() {
    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    console.log("user from homepage ::", user);
        const playUrl =
    'https://play.google.com/store/apps/details?id=com.investryx.projectemergio&hl=en';



    const [hoveredIndex, setHoveredIndex] = useState(null);
    const profilesExplore = [
        {
            label: "Business",
            imgSrc: "/images/investryx/landing page/Group 8.png",
            route: "/business",
            profile: "business",
        },
        {
            label: "Investor",
            imgSrc: "/images/investryx/landing page/Group 11.png",
            route: "/investment",
            profile: "investor",
        },
        {
            label: "Franchise",
            imgSrc: "/images/investryx/landing page/Group 7.png",
            route: "/franchise",
            profile: "franchise",
        },

        {
            label: "Advisor",
            imgSrc: "/images/investryx/landing page/Group 9.png",
            route: "/advisor",
            profile: "advisor",
        },
    ];

    const navigate = useNavigate();
    if (localStorage.getItem("userData")) {
        console.log("HomePage data :", localStorage.getItem("userData"));
    }

    // featured listing
    // recommendation list
    // banner
    // featured experts
    // graph
    // testmonial
    const [featuredData, setData1] = useState(null);
    const [recommendedData, setData2] = useState(null);
    const [recentActivitiesData, setData3] = useState(null);
    const [bannerData, setData4] = useState(null);
    const [expertsData, setData5] = useState(null);
    const [graphData, setData6] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.allSettled([
                    getFeaturedList(),
                    getRecommendedList(),
                    getRecentActivities(),
                    getBanner(),
                    getFeaturedExperts(),
                    getGraph(),
                ]);

                console.log("%cFetch data status*****:", "color: blue;", results);

                results.forEach((result, index) => {
                    if (result.status === "fulfilled") {
                        const data = result.value;
                        switch (index) {
                            case 0:
                                setData1(data);
                                break;
                            case 1:
                                setData2(data.data);
                                break;
                            case 2:
                                setData3(data.data);
                                break;
                            case 3:
                                setData4(data);
                                break;
                            case 4:
                                setData5(data);
                                break;
                            case 5:
                                setData6(data);
                                break;
                        }
                    } else if (result.status === "rejected") {
                        console.log("%crejected", "color: red");
                    } else {
                        console.error(`%cFailed to fetch data ${index + 1}:`, "color: red;", result.reason);
                    }
                });
            } catch (error) {
                console.error("%cError fetching data:", "color: red;", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log("%cfeatured list:", "color: orange;", featuredData);
    console.log("%cRecent Activities list:", "color: orange;", recentActivitiesData);
    console.log("%cbanner list:", "color: orange;", bannerData);
    console.log("%crecommended list:", "color: orange;", recommendedData);
    console.log("%cfeatured experts list:", "color: orange;", expertsData);
    console.log("%cgraph list:", "color: orange;", graphData);

    const controls = useAnimation();

    // Trigger scroll-based animation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                // Swipe right and fade out on scroll
                controls.start({
                    x: "100vw",
                    opacity: 0,
                    transition: { duration: 0.8 },
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    //fetching all plans at once
    const [homePlans, setHomePlans] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPlans();
                if (response.data.length > 0) {
                    setHomePlans(response.data);
                    console.log("Success:", response);
                    dispatch(setPlans({ plans: response.data })); //dispatching the plans
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="relative h-[60vh] lg:h-[110vh]">
                <img
                    src="/images/investment_img/emergio_tree_grow.jpg"
                    alt="Investment Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-16 lg:top-32 px-4 lg:ml-12">
                    <div className="font-audiowide text-4xl lg:text-9xl font-medium text-white flex">
                        <div className="text-amber-300">I</div>
                        <div>nvestryx</div>
                    </div>
                    <div className="text-white text-base lg:text-2xl font-semibold mt-8 lg:my-14 max-w-[90%] lg:max-w-[50rem]">
                        Explore pre-screened businesses for sale from over 100+ countries and across 900+ different
                        industries. You can find businesses looking for full sale, raising capital through an investment or
                        seeking a business loan. Register as an Investor to buy a business or invest in them 10.
                    </div>
                </div>
            </div>

            {/* Backdrop Section */}
            <div className="relative w-full">
                {/* Background Image */}
                {user ? (
                    <img
                        className="w-full  object-cover
                        h-[410rem] sm:h-[400rem] md:h-[365rem] lg:h-[315rem]"
                        src="/images/Backdrop_Homepage.jpeg"
                        alt="Backdrop"
                    />
                ) : (
                    <img
                        className="w-full object-cover h-[410rem] md:h-[360rem] lg:h-[305rem] "
                        src="/images/Backdrop_Homepage.jpeg"
                        alt="Backdrop"
                    />
                )}

                {/* main container for backdrop wrapping */}
                <div className="absolute top-0 left-0 w-full ">
                    {/* container two: browse profiles : busin, adv, franch, etc */}
                    <div className="px-4 sm:px-6 mt-8">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:flex lg:justify-center lg:space-x-14 gap-4 sm:gap-8 lg:gap-5">
                            {profilesExplore.map((post, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`flex flex-col items-center transition-transform duration-300 ${
                                        hoveredIndex === index && window.innerWidth >= 1024 // Enable hover effect only on large screens
                                            ? "transform scale-110 z-10"
                                            : hoveredIndex === index - 1 || hoveredIndex === index + 1
                                            ? "transform scale-105"
                                            : "transform scale-100"
                                    }`}
                                >
                                    <div
                                        className="w-30 sm:w-40 h-55 sm:h-60 lg:w-72 lg:h-96 rounded-3xl overflow-hidden"
                                        onClick={() => {
                                            dispatch(userProfile({ profile: post.profile }));
                                            navigate(`${post.route}`);
                                        }}
                                    >
                                        <img
                                            src={post.imgSrc}
                                            alt={post.label}
                                            className="w-full h-full object-cover rounded-3xl"
                                        />
                                    </div>
                                    <div className="text-sm sm:text-lg lg:text-xl mt-2 sm:mt-4 text-gray-700 font-semibold transition-transform duration-300">
                                        {post.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Banner start */}
                    <ImgSlider props={bannerData} />
                    {/* Banner End */}

                    {/* Landing page block end */}
                    {/* Recent listing start */}
                    {recentActivitiesData?.length > 0 ? (
                        <RecentListing recentActivitiesData={recentActivitiesData} />
                    ) : (
                        <div className="flex flex-col justify-center items-center bg-amber-50 w-full h-[10rem]">
                            <div className="font-bold text-4xl">Recent Listing</div>
                            <div className="text-2xl font-bold">Oops..!</div>
                            <div className="text-xl">There is no data to be shown</div>
                        </div>
                    )}

                    {/* Recent listing End */}

                    {/* Recommended listing start */}
                    {/* {recommendedData ? ( */}
                    {recommendedData ? (
                        user ? (
                            recommendedData.length > 0 ? (
                                <RecommendedListing props={recommendedData} />
                            ) : (
                                <div className="w-full h-80  flex flex-col justify-center items-center">
                                    <div className="text-5xl font-bold py-8">Recommended List</div>
                                    <div className="text-3xl font-semibold">Oops ... !</div>

                                    <div className="text-3xl">There is No Data to be Shown</div>
                                </div>
                            )
                        ) : null
                    ) : null}
                    {/* <!-- component --> */}
                    {/* business calculator */}
                    <div className="w-full flex flex-col lg:flex-row items-center px-4 lg:px-16">
                        {/* Left Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="w-full flex flex-col justify-center items-center mt-8 lg:mt-16">
                                <div className="text-3xl lg:text-5xl font-medium text-center lg:text-left px-4 lg:px-24">
                                    Business Valuation Calculator
                                </div>
                                <div className="text-gray-600 text-base lg:text-xl text-center lg:text-left px-4 lg:px-24 py-6 lg:py-16">
                                    A business valuation calculator estimate a company's worth based on financial metrics,
                                    market trends, and growth potential, helping investors make informed decisions and
                                    assess investment opportunities. New chat
                                </div>
                            </div>
                            <div
                                onClick={() => navigate("/calculator")}
                                className="cursor-pointer flex justify-center lg:justify-start ml-0 lg:ml-28 gap-x-4 underline text-blue-800"
                            >
                                <div className="text-lg lg:text-2xl">Learn more</div>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
                            <div className="w-60 sm:w-80 lg:w-[30rem]">
                                <img
                                    src="/images/investryx/landing page/business account.png"
                                    alt="calculator_img"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* experts listing */}
                    {/* <Advisor props={expertsData} /> */}
                    <Graph props={graphData} />
                    {/* priceing start */}
                    <HomePlans props={homePlans} />
                    {/* pricing end */}
                    {/* newsletter start */}
                    {/* download mobile app */}
                    <div className="get-start py-8 px-3">
                        <div className="bg-[#FFCC00] rounded-xl py-3 px-4 mx-auto sm:px-8 lg:px-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:justify-between md:h-[400px] md:w-4/5">
                            <div className="text-center space-y-6 sm:text-left">
                                <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold">Get Started for Free</h1>
                                <p className="font-normal text-base md:text-2xl">
                                    You can start for free with download the app or install the extension from your PC
                                    browser
                                </p>
                                <div className="flex flex-col items-center sm:flex-row sm:justify-between md:justify-start gap-4">
                                    <button
                                        onClick={() => (window.location.href = playUrl)}
                                        className="bg-white p-4 rounded-full text-sm font-semibold flex items-center sm:gap-2 sm:text-base sm:p-3 sm:font-semibold"
                                    >
                                        <img className="" src="\investryx\Mobile.svg" alt="" />
                                        Download Mobile App
                                    </button>
                                </div>
                            </div>
                            <img className="hidden sm:block sm:w-1/4  md:size-96" src="\investryx\Group 17.png" alt="" />
                        </div>
                    </div>
                    {/* downloas mobile app end */}
                    {!user ? (
                        <section className="bg-amber-200 bg-opacity-30 dark:bg-gray-900 mt-36 h-[30rem]">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                                <div className="mx-auto max-w-screen-md sm:text-center flex flex-col justify-center ">
                                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                                        Sign up for our newsletter
                                    </h2>
                                    <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
                                        Stay up to date with the roadmap progress, announcements and exclusive discounts
                                        feel free to sign up with your email.
                                    </p>
                                    <form action="#">
                                        <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                            <div className="relative w-full">
                                                <label
                                                    htmlFor="email"
                                                    className=" hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                    Email address
                                                </label>
                                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                    </svg>
                                                </div>
                                                <input
                                                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Enter your email"
                                                    type="email"
                                                    id="email"
                                                    required=""
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="py-3 px-5 w-full text-sm font-medium text-center text-violet-950 rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                >
                                                    Subscribe
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                                            We care about the protection of your data.{" "}
                                            <a
                                                href="#"
                                                className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                                            >
                                                Read our Privacy Policy
                                            </a>
                                            .
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                    ) : null}
                    {/* newsletter end */}
                </div>
            </div>
        </>
    );
}

export default HomePage;
