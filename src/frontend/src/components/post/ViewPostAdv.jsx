import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrls";
import { getOneRooms } from "../../services/userChat/apiMethods";
import { toast } from "react-toastify";
import { FaRegImages } from "react-icons/fa6";

function ViewPostAdv() {
    const location = useLocation();
    const post = location.state?.post;

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

    const postIncomeSource = post.income_source;

    // col 1
    const postLogo = post.logo || post.image1;

    const postEstablish = post.establish_yr;
    const postIndustry = post.industry;
    const postEmployees = post.employees;
    const postEntity = post.entity;
    const postAvgMonthly = post.avg_monthly;
    const postLatestYearly = post.latest_yearly;
    const postEbitda = post.ebitda;
    const postRate = post.rate;
    const postSaleType = post.sale;
    const postUrl = post.url;
    const postTopSelling = post.top_selling;
    const postfeatures = post.features;
    const postFacility = post.facility;

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
                        navigate("/chatUsersAll", { state: { roomData: response.data } });
                    }
                })
                .catch((error) => {
                    console.error("Error Occured :", error);
                });
        } catch (error) {
            console.error("error occured", error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="mt-20 rounded-3xl w-[90%] min-h-screen ">
                    <div className="lg:flex">
                        {/* box left  */}
                        <div className="lg:w-1/2 min-h-[30rem] lg:p-8 lg:m-7  bg-amber-100 rounded-2xl shadow-xl">
                            {/* main imag */}
                            <div className="p-3">
                                {postLogo ? (
                                    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                                        <img
                                            className="rounded-xl w-full h-full object-cover"
                                            src={`${BASE_URL}${postLogo}`}
                                            alt="main_img"
                                        />
                                    </div>
                                ) :  (
                                    <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                        <FaRegImages className="w-full h-full rounded-lg text-gray-500 bg-white p-4" />
                                    </div>
                                )}
                            </div>

                            {/* subsidry imag */}

                            {/* <div className="flex lg:gap-4 lg:p-3 m-3">
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
                            </div> */}

                            <div>
                                <div className="flex ">
                                    <div className="text-2xl font-bold ">{postName ? postName : "N/A"}</div>
                                </div>
                                <div className="text-xl text-gray-600 font-semibold lg:flex justify-between">
                                    <div>
                                        Location :{postState}, {postCity}
                                    </div>
                                    <div>Price : {postOffering ? postOffering : "N/A"}</div>
                                </div>
                            </div>
                        </div>
                        {/* box right */}
                        <div className="lg:w-1/2 min-h-[30rem] p-6 m-6 bg-amber-100 rounded-2xl shadow-xl">
                            <h1 className="text-2xl font-bold text-violet-900 flex justify-center">Over</h1>
                            <ul className="pl-2 ">
                                <div className="w-full">
                                    <table className="w-full border-collapse">
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold w-1/3">Established</td>
                                                <td className="py-2">{postEstablish ? postEstablish : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Industry</td>
                                                <td className="py-2">{postIndustry ? postIndustry : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Entity</td>
                                                <td className="py-2">{postEntity ? postEntity : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Employees</td>
                                                <td className="py-2">{postEmployees ? postEmployees : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Average Monthly Turnover</td>
                                                <td className="py-2">{postAvgMonthly ? postAvgMonthly : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Latest Yearly Turnover</td>
                                                <td className="py-2">{postLatestYearly ? postLatestYearly : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">EBITDA</td>
                                                <td className="py-2">{postEbitda ? postEbitda : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Rate</td>
                                                <td className="py-2">{postRate ? postRate : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Sale</td>
                                                <td className="py-2">{postSaleType ? postSaleType : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Url</td>
                                                <td className="py-2">{postUrl ? postUrl : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Top-selling</td>
                                                <td className="py-2">{postTopSelling ? postTopSelling : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Features</td>
                                                <td className="py-2">{postfeatures ? postfeatures : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Facilities</td>
                                                <td className="py-2">{postFacility ? postFacility : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Income-source</td>
                                                <td className="py-2">{postIncomeSource ? postIncomeSource : "N/A"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </ul>
                            {/* buttons  */}
                            <div className=" lg:flex justify-evenly ">
                                <div
                                    onClick={() => handleConnectRequest(receiverId)}
                                    className="bg-yellow-300 hover: cursor-pointer hover:bg-yellow-400 p-3 m-4 px-7 text-xl font-semibold rounded-lg"
                                >
                                    Request Connect
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* box bottom */}
                    <div className=" bg-amber-100  min-h-[19rem]  p-8 m-7 rounded-2xl shadow-xl">
                        <div className="text-center text-violet-900 text-2xl font-bold p-3 m-4">Detailed Informtion</div>
                        <div className="text-xl font-semibold p-2 m-2">Reason for Selling</div>
                        <div className="p-2 m-1 mx-6">{postDescription ? postDescription : "N/A"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPostAdv;
