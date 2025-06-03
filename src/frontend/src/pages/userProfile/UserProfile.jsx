import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../utils/context/reducers/authSlice";
import SliderButton from "../../components/accessories/slideButton/SlideButton";
import ActivityBox from "../../components/accessories/activityBox/ActivityBox";

import {
    deleteUserAccount,
    leftPlan,
    // getProfilePlan,
} from "../../services/user/apiMethods";
import { toast } from "react-toastify";
import { logout } from "../../utils/context/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";

import BusinessProfileSub from "../../components/userProfileSub/BusinessProfileSub";
import FranchiseProfileSub from "../../components/userProfileSub/FranchiseProfileSub";
import InvestorProfileSub from "../../components/userProfileSub/InvestorProfileSub";
import AdvisorProfileSub from "../../components/userProfileSub/AdvisorProfileSub";

function UserProfile() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileState = useSelector((state) => state.auth.profile);

    // Recommended plan fetching
    const recommendPlan = useSelector((state) => state.auth.plans) || [];
    console.log("recommendPlans ::", recommendPlan);

    // Ensure `recommendPlan` is an array before calling `.find()`
    const BusinessPlan = recommendPlan?.find((plan) => plan.type === "business" && plan.recommend === true);
    console.log("first business recommended plan ::", BusinessPlan);

    const InvestorPlan = recommendPlan?.find((plan) => plan.type === "investor" && plan.recommend === true);
    console.log("first investor recommended plan ::", InvestorPlan);

    const FranchisePlan = recommendPlan?.find((plan) => plan.type === "franchise" && plan.recommend === true);
    console.log("first franchise recommended plan ::", FranchisePlan);

    const AdvisorPlan = recommendPlan?.find((plan) => plan.type === "advisor" && plan.recommend === true);
    console.log("first advisor recommended plan ::", AdvisorPlan);

    const user = useSelector((state) => state.auth.user);
    console.log("user status @userProfile  ::", profileState);

    const [showSwitchButton, setShowSwitchButton] = useState(true);

    const handleProfileChange = (profile) => {
        dispatch(userProfile({ profile: profile }));
    };

    const popupRef = useRef(null);

    const toggleView = () => setShowSwitchButton((prev) => !prev);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowSwitchButton(true); // Return to "Switch Account" button
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //delete user profile
    const deleteHandler = () => {
        deleteUserAccount()
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Your Account Deleted successfully.You will be soon logged out!");
                    setTimeout(() => {
                        dispatch(logout());
                        localStorage.removeItem("persist:root");
                        // toast.info("Logout successful");
                        navigate("/login");
                    }, 2000);
                }
            })
            .catch((error) => {
                console.error("Error deleting account", error);
            });
    };

    //get left Plans
    const [myPlans, setMyPlan] = useState(null);
    useEffect(() => {
        setMyPlan(null);
        leftPlan(profileState)
            .then((response) => {
                if (response.data?.status === true) {
                    setMyPlan(response.data);
                }
            })
            .catch((err) => {
                toast.info("You dont have any Subscription Yet!");
                console.error(err);
            });
    }, [profileState]);

    const handleNavigation = (profileState) => {
        let targetPath = "/add-Profile-pre";

        // Map the profileState to corresponding routes
        switch (profileState) {
            case "business":
                targetPath = "/add-Profile-pre-business";
                break;
            case "investor":
                targetPath = "/add-Profile-pre-investor";
                break;
            case "franchise":
                targetPath = "/add-Profile-pre-franchise";
                break;
            case "advisor":
                targetPath = "/add-Profile-pre-advisor";
                break;
            default:
                targetPath = "/";
                break;
        }
        // Navigate to the constructed path with state
        navigate(targetPath);
    };

    return (
        <>
            <div className=" md:min-h-screen md:w-full flex flex-col bg-slate-50">
                {/* Outside box */}
                <div className="mt-8 m-2 md:m-7  flex-grow">
                    {/* Top box */}
                    <div className="bg-amber-50 h-28 md:h-96 md:relative">
                        {/* Top box background image */}
                        <img
                            src="/images/profile.png"
                            alt="prof_img"
                            className="hidden md:block h-72 w-full object-cover"
                        />

                        {/* Profile image with overlap */}
                        <div className="flex justify-center md:absolute md:bottom-1 md:left-[5rem] md:mt-16">
                            {user.image ? (
                                <img
                                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 rounded-full shadow-lg"
                                    src={user.image}
                                    alt="super_image"
                                />
                            ) : (
                                <img
                                    className="w-56 h-56 rounded-full shadow-lg"
                                    src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                    alt="super_image"
                                />
                            )}
                        </div>
                        <div className="md:absolute md:bottom-14 flex justify-center md:left-[22rem] text-2xl md:text-3xl text-violet-900 font-bold">
                            {user?.first_name}
                        </div>
                        <div className="flex justify-center md:absolute md:bottom-5 md:left-[22rem] text-2xl md:text-3xl text-violet-900 font-bold">
                            User ID : {user.id}
                        </div>

                        {/* <div className=" w-[12rem] text-center absolute right-[5rem] bg-transparent border-2 border-yellow-300 p-4 m-4 rounded-xl hover:bg-yellow-300  transition-colors duration-300">
              Edit Profile
            </div> */}

                        <div className=" md:relative p-6">
                            {showSwitchButton ? (
                                <div
                                    className="md:absolute md:bottom-[7rem] md:right-[5rem]  
                                bg-yellow-200 rounded-2xl flex justify-center items-center p-4  md :px-7 m-3 font-semibold text-sm md:text-lg"
                                    ref={popupRef}
                                >
                                    <button onClick={toggleView}>Switch Account</button>
                                </div>
                            ) : (
                                <div
                                    className="md:absolute md:bottom-[7rem] md:right-[5rem] bg-yellow-200 rounded-2xl flex items-center font-semibold text-sm md:text-lg"
                                    ref={popupRef}
                                >
                                    {["business", "investor", "franchise", "advisor"].map((profile) => (
                                        <div
                                            key={profile}
                                            onClick={() => handleProfileChange(profile)}
                                            className={`cursor-pointer p-3 md:p-4 md:m-3 rounded-lg transition-all duration-300 ${
                                                profileState === profile
                                                    ? "text-white bg-violet-950 scale-105"
                                                    : "text-violet-950"
                                            } hover:shadow-lg`}
                                        >
                                            {profile.charAt(0).toUpperCase() + profile.slice(1)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {profileState === "business" ? (
                        <BusinessProfileSub
                            recommPlan={BusinessPlan}
                            myPlans={myPlans}
                            // profile={profile}
                            // loading={loading}
                            deleteHandler={deleteHandler}
                        />
                    ) : profileState === "investor" ? (
                        <InvestorProfileSub
                            recommPlan={InvestorPlan}
                            myPlans={myPlans}
                            // profile={profile}
                            // loading={loading}
                            deleteHandler={deleteHandler}
                        />
                    ) : profileState === "franchise" ? (
                        <FranchiseProfileSub
                            recommPlan={FranchisePlan}
                            myPlans={myPlans}
                            // profile={profile}
                            // loading={loading}
                            deleteHandler={deleteHandler}
                        />
                    ) : profileState === "advisor" ? (
                        <AdvisorProfileSub
                            recommPlan={AdvisorPlan}
                            myPlans={myPlans}
                            // profile={profile}
                            // loading={loading}
                            deleteHandler={deleteHandler}
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default UserProfile;
