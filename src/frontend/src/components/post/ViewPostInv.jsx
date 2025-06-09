import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOneRooms } from "../../services/userChat/apiMethods";
import { MdOutlineLocationOn } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaRegImages } from "react-icons/fa6";
import { toast } from "react-toastify";
import { use } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { leftPlan } from "../../services/user/apiMethods";
import { HiChevronLeft } from "react-icons/hi";

function ViewPostInv() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [planStatus, setPlanStatus] = useState(false);
    const [loader, setLoader] = useState(false);
    const { postId } = useParams();
    const location = useLocation();
    const post = location.state?.post;
    const selectedUserId = (state) => state?.auth?.user?.id || "";
    const userId = useSelector(selectedUserId);
    console.log("user ud from view detailedInvestor ::", userId);

    const navigate = useNavigate();

    // Column 2
    const postName = post.name;
    const postState = post.state;
    const postCity = post.city;
    const postDescription = post.description;
    const postProfileSummary = post.profile_summary;
    const postLocationInterested = post.location_interested;
    const postEvaluatingAspects = post.evaluating_aspects;
    const postPreference = post.preference;
    const postRangeStart = post.range_starting;
    const postRangeEnd = post.range_ending;
    const postDate = formatDistanceToNow(new Date(post.listed_on), {
        addSuffix: true,
    });

    // Column 1
    const postSingDes = post.single_desc.slice(0, 60);
    const postIndustry = post.industry;
    const postUrl = post.url;
    const postCompany = post.company;

    // Image and Documents
    const postImage = {
        img1: post?.image1,
        img2: post?.image2,
        img3: post?.image3,
        img4: post?.image4,
    };
    const postDoc1 = post.doc1;
    const postDoc2 = post.doc2;
    const postDoc3 = post.doc3;
    const postDoc4 = post.doc4;
    const postProof1 = post.proof1;
    const postProof2 = post.proof2;
    const postProof3 = post.proof3;
    const postProof4 = post.proof4;

    // Additional fields
    const postBlock = post.block;
    const postVerified = post.verified;
    const postSubscribed = post.subcribed;
    const postUser = post.user;
    const postLogo = post.logo;
    const postProfile = post.profile;

    //selected image
    const [selectedImage, setSelectedImage] = useState(post?.image1);

    //receiverId of post to generate room etc
    const receiverId = post.id;

    const handleConnectRequest = (receiverId) => {
        setLoader(true);
        try {
            getOneRooms(receiverId)
                .then((response) => {
                    if (response.data.status === true) {
                        toast.success("chat accessing");
                        navigate("/connectionAll", { state: { roomData: response.data } });
                    }
                })
                .catch((error) => {
                    console.error("Error Occured :", error);
                });
        } catch (error) {
            console.error("error occured", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        const checkPlan = async (type = "investor") => {
            try {
                setLoader(true);
                const response = await leftPlan(type);
                if (response?.data?.status === true) {
                    setPlanStatus(true);
                } else {
                    setPlanStatus(false);
                }
            } catch (error) {
                console.error("Error happened in subscription check:", error);
            } finally {
                setLoader(false);
            }
        };

        checkPlan();
    }, []);

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="rounded-3xl w-[90%] min-h-screen ">
                    <div className="flex items-center p-4">
                        <button onClick={handleClose} className="px-2 py-2 rounded">
                            <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
                        </button>
                        <span className="font-semibold">BACK</span>
                    </div>
                    <div className="lg:flex">
                        {/* box left  */}
                        <div className="lg:w-1/2 min-h-[30rem] lg:p-8 lg:m-7  bg-amber-100 rounded-2xl shadow-xl">
                            {/* main imag */}
                            <div className="text-2xl font-bold m-3 my-4">{postSingDes}</div>

                            <div className="p-3">
                                {selectedImage ? (
                                    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                                        <img
                                            className="rounded-xl w-full h-full object-cover"
                                            src={`${BASE_URL}${selectedImage}`}
                                            alt="main_img"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                        <FaRegImages className="w-full h-full rounded-lg text-gray-500 bg-white p-4" />
                                    </div>
                                )}
                            </div>

                            {/* subsidry imag */}

                            <div className="flex lg:gap-4 lg:p-3 m-3">
                                {Object.entries(postImage).map(([key, value], index) =>
                                    value ? (
                                        <div key={index} className="" onClick={() => setSelectedImage(value)}>
                                            <img
                                                className="rounded-xl w-24 h-24 "
                                                src={`${BASE_URL}${value}`}
                                                alt={`subsidiary_img_${index}`}
                                            />
                                        </div>
                                    ) : null
                                )}
                            </div>

                            <div>
                                <div className="flex ">
                                    <div className="text-2xl font-bold ">{postName}</div>
                                </div>
                                <div className="text-xl text-gray-600 font-semibold lg:flex justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <MdOutlineLocationOn />
                                        {postState}, {postCity}
                                    </div>
                                    <div>Posted {postDate ? postDate : "N/A"}</div>

                                    {/* <div>rice : {postOffering ? postOffering : "N/A"}</div> */}
                                </div>
                            </div>
                        </div>
                        {/* box right */}
                        <div className="lg:w-1/2 min-h-[30rem] p-6 m-6 bg-amber-100 rounded-2xl shadow-xl">
                            <h1 className="text-2xl font-bold text-violet-900 flex justify-center">Overview</h1>
                            <ul className="pl-2 ">
                                <div className="flex justify-between">
                                    <div className="font-bold text-xl text-gray-500 py-3">General</div>
                                    {userId === postUser && (
                                        <div>
                                            <Button variant="contained" size="small">
                                                Owner
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full">
                                    {/* Basic Information Section */}
                                    <div className="mb-6">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">Company name</td>
                                                    <td className="py-2">{postCompany ? postCompany : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Industry</td>
                                                    <td className="py-2">{postIndustry ? postIndustry : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">City</td>
                                                    <td className="py-2">{postCity ? postCity : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">State</td>
                                                    <td className="py-2">{postState ? postState : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Financials Section */}
                                    <div className="mb-6">
                                        <h2 className="font-bold text-xl text-gray-500 mb-3">Financials</h2>
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">Minimum investment range</td>
                                                    <td className="py-2">{postRangeStart ? postRangeStart : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Maximum investment range</td>
                                                    <td className="py-2">{postRangeEnd ? postRangeEnd : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Additional Information Section */}
                                    <div>
                                        <h2 className="font-bold text-xl text-gray-500 mb-3">Additional Informations</h2>
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">Website</td>
                                                    <td className="py-2">{postUrl ? postUrl : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Business Preference</td>
                                                    <td className="py-2">{postPreference ? postPreference : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Evaluation aspects</td>
                                                    <td className="py-2">
                                                        {postEvaluatingAspects ? postEvaluatingAspects : "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Transaction Preference</td>
                                                    <td className="py-2">{postUrl ? postUrl : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </ul>
                            {/* buttons  */}
                            <div className=" lg:flex justify-evenly ">
                                {userId === postUser ? null : (
                                    <div
                                        onClick={
                                            !userId
                                                ? () => navigate("/login")
                                                : loader
                                                ? undefined
                                                : planStatus
                                                ? () => handleConnectRequest(receiverId)
                                                : () => (window.location.href = "/subscribe")
                                        }
                                        className={`bg-yellow-300 hover:cursor-pointer hover:bg-yellow-400 p-3 m-4 px-7 text-xl font-semibold rounded-lg flex items-center justify-center ${
                                            loader ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                        style={{ minWidth: "180px" }}
                                    >
                                        {loader && userId ? (
                                            <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                            </svg>
                                        ) : null}
                                        {!userId
                                            ? "Sign In"
                                            : loader
                                            ? "Checking..."
                                            : planStatus
                                            ? "Request Connect"
                                            : "Subscribe"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* box bottom */}

                    <div className=" bg-amber-100  min-h-[19rem]  p-8 m-7 rounded-2xl shadow-xl">
                        <div className="text-center text-violet-900 text-2xl font-bold p-3 m-4">Detailed Informtion</div>
                        <div className="text-xl font-semibold p-2 m-2">About Investor</div>
                        <div className="p-2 m-1 mx-6">{postProfileSummary ? postProfileSummary : "N/A"}</div>
                        <div className="text-xl font-semibold p-2 m-2">Companies Description</div>
                        <div className="p-2 m-1 mx-6">{postDescription ? postDescription : "N/A"}</div>
                        <div className="text-xl font-semibold p-2 m-2">Locations Intrested</div>
                        <div className="p-2 m-1 mx-6">{postLocationInterested ? postLocationInterested : "N/A"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPostInv;
