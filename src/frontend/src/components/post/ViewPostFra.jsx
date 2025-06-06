import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getOneRooms } from "../../services/userChat/apiMethods";
import { toast } from "react-toastify";
import { use } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { leftPlan } from "../../services/user/apiMethods";
import { FaRegImages } from "react-icons/fa6";

function ViewPostFra() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [planStatus, setPlanStatus] = useState(false);
    const [loader, setLoader] = useState(true);
    const { postId } = useParams();
    const location = useLocation();
    const post = location.state?.post;
    const selectedUserId = (state) => state?.auth?.user?.id || "";
    const userId = useSelector(selectedUserId);

    const navigate = useNavigate();

    // col 2
    const postName = post.name;
    const postState = post.state;
    const postCity = post.city;
    const postOffering = post.offering;

    const postAddressOne = post.address_1;
    const postAddressTwo = post.address_2;
    const postDescription = post.description;
    const postPin = post.pin;
    const postReason = post.reason;
    const postUser = post.user;

    const postIncomeSource = post.income_source;

    // col 1
    const postSingDes = post.single_desc.slice(0, 60);
    const postTitle = post.title.slice(0, 70);
    const postServices = post.services;
    const postEstablish = post.yr_period;
    const postIndustry = post.industry;
    const postEmployees = post.employees;
    const postEntity = post.entity;
    const postAvgMonthly = post.avg_monthly_sales;
    const postLatestYearly = post.latest_yearly;
    const postEbitda = post.ebitda;
    const postRate = post.rate;
    const postSaleType = post.sale;
    const postUrl = post.url;
    const postTopSelling = post.top_selling;
    const postfeatures = post.features;
    const postFacility = post.facility;
    const postInitial = post.initial;
    const postPrefLocation = post.locations_available;
    const postotalOutlet = post.total_outlets;
    const postFraTerms = post.yr_period;
    const postMinSpace = post.min_space;
    const postMaxSpace = post.max_space;
    const postRangeEnd = post.range_ending;
    const postRangeStart = post.range_starting;
    const postStaff = post.staff;
    const projROI = post.proj_ROI;
    const postFee = post.brand_fee;

    //col3
    const postSupports = post.supports;

    //img
    const postImage = {
        img1: post?.image1,
        img2: post?.image2,
        img3: post?.image3,
        img4: post?.image4,
    };
    const postDoc = post.doc1;
    const postProof = post.proof1;

    //selected image
    const [selectedImage, setSelectedImage] = useState(post?.image1);

    //receiverId of post to generate room etc
    const receiverId = post.id;

    const handleConnectRequest = (receiverId) => {
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
        }
    };

    useEffect(() => {
        const checkPlan = async (type = "franchise") => {
            try {
                setLoader(true);
                const response = await leftPlan(type);
                if (response?.data?.status === true) {
                    setPlanStatus(true);
                } else {
                    setPlanStatus(false);
                }
                setLoader(false);
            } catch (error) {
                console.error("Error happened in subscription check:", error);
            }
        };

        checkPlan();
    }, []);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="mt-20 rounded-3xl w-[90%] min-h-screen ">
                    <div className="lg:flex">
                        {/* box left  */}
                        <div className="lg:w-1/2 min-h-[30rem] lg:p-8 lg:m-7  bg-amber-100 rounded-2xl shadow-xl">
                            {/* main imag */}
                            <div className="text-2xl font-bold m-3 my-4">{postTitle}</div>

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
                                <div className="text-xl text-gray-600 font-semibold lg:flex justify-between">
                                    <div>
                                        Location :{postState ? postState : "N/A"}, {postCity ? postCity : "N/A"}
                                    </div>
                                    <div>Offering : {postOffering}</div>
                                </div>
                                <div className="text-2xl  font-bold  my-4">{postSingDes}</div>
                            </div>
                        </div>
                        {/* box right */}
                        <div className="lg:w-1/2 min-h-[30rem] p-6 m-6 bg-amber-100 rounded-2xl shadow-xl">
                            <h1 className="text-2xl font-bold text-violet-900 flex justify-center">Overview</h1>
                            <ul className="pl-2 ">
                                <div className="flex justify-between">
                                    <div className="font-bold text-xl text-gray-500 pt-3 pb-1">General</div>
                                    {userId === postUser && (
                                        <div>
                                            <Button variant="contained" size="small">
                                                Owner
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full">
                                    {/* General Information Section */}
                                    <div className="mb-6">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">Industry</td>
                                                    <td className="py-2">{postIndustry ? postIndustry : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Website</td>
                                                    <td className="py-2">{postUrl ? postUrl : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Established Year</td>
                                                    <td className="py-2">{postEstablish ? postEstablish : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Initial Investment</td>
                                                    <td className="py-2">{postInitial ? postInitial : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Project ROI</td>
                                                    <td className="py-2">{projROI ? projROI : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Preferred Location</td>
                                                    <td className="py-2">{postPrefLocation ? postPrefLocation : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Current number of outlets</td>
                                                    <td className="py-2">{postotalOutlet ? postotalOutlet : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Franchise Terms (Time Period)</td>
                                                    <td className="py-2">{postFraTerms ? postFraTerms : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Space Required Section */}
                                    <div className="mb-6">
                                        <h2 className="font-bold text-xl text-gray-500 mb-3">Space Required</h2>
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">Minimum Space</td>
                                                    <td className="py-2">{postMinSpace ? postMinSpace : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Maximum Space</td>
                                                    <td className="py-2">{postMaxSpace ? postMaxSpace : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Investment Range Section */}
                                    <div className="mb-6">
                                        <h2 className="font-bold text-xl text-gray-500 mb-3">Investment Range</h2>
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">From</td>
                                                    <td className="py-2">{postRangeStart ? postRangeStart : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">To</td>
                                                    <td className="py-2">{postRangeEnd ? postRangeEnd : "N/A"}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Additional Information Section */}
                                    <div>
                                        <h2 className="font-bold text-xl text-gray-500 mb-3">Additional Information</h2>
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold w-1/3">Brand Fee</td>
                                                    <td className="py-2">{postFee ? postFee : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Average Staff Required</td>
                                                    <td className="py-2">{postStaff ? postStaff : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Average Monthly Sales</td>
                                                    <td className="py-2">{postAvgMonthly ? postAvgMonthly : "N/A"}</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-2 font-semibold">Average EBITDA per franchise</td>
                                                    <td className="py-2">{postEbitda ? postEbitda : "N/A"}</td>
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
                        <div className="text-xl font-semibold p-2 m-2">About Product :</div>
                        <div className="p-2 m-1 mx-6">{postDescription ? postDescription : "N/A"}</div>
                        <div className="text-xl font-semibold p-2 m-2">Service brand sells :</div>
                        <div className="p-2 m-1 mx-6">{postServices ? postServices : "N/A"}</div>

                        <div className="text-xl font-semibold p-2 m-2">Support you can expect :</div>
                        <div className="p-2 m-1 mx-6">{postSupports ? postSupports : "N/A"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPostFra;
