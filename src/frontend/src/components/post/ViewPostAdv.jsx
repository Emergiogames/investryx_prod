import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOneRooms } from "../../services/userChat/apiMethods";
import { toast } from "react-toastify";
import { FaRegImages } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { leftPlan } from "../../services/user/apiMethods";
import { formatDistanceToNow } from "date-fns";

function ViewPostAdv() {
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [planStatus, setPlanStatus] = useState(false);
    const [loader, setLoader] = useState(false);

    const location = useLocation();
    const post = location.state?.post;
    console.log("11 ::", post);

    const selectedUserId = (state) => state.auth.user.id || "";
    const userId = useSelector(selectedUserId);

    const navigate = useNavigate();

    // col 2

    const postUser = post.user;
    const postName = post.name;
    const postCompany = post?.company;
    const postDesig = post?.designation;
    const postState = post.state;
    const postCity = post.city;
    const postNumber = post?.number;
    const postEmail = post?.email;
    const postExperience = post?.experience;
    const postIndustry = post.industry;
    const postInterest = post?.interest;
    const postListedOn = post?.listed_on;
    const postSingleDes = post?.single_desc;
    const postTitle = post?.title;

    // col 1
    const postLogo = post.logo || post.image1;
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
        const checkPlan = async (type = "business") => {
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
    }, [post]);

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
                                {postLogo ? (
                                    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
                                        <img
                                            className="rounded-xl w-full h-full object-cover"
                                            src={`${BASE_URL}${postLogo}`}
                                            alt="main_img"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full " style={{ aspectRatio: "16 / 9" }}>
                                        <FaRegImages className="w-full h-full rounded-lg text-gray-500 bg-white p-4" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex ">
                                    <div className="text-2xl font-bold ">{postName ? postName : "N/A"}</div>
                                </div>
                                <div className="text-xl text-gray-600 font-semibold lg:flex justify-between">
                                    <div>
                                        Location :{postState}, {postCity}
                                    </div>
                                    <div>
                                        Listed on :{" "}
                                        {postListedOn
                                            ? formatDistanceToNow(new Date(postListedOn), { addSuffix: true })
                                            : "N/A"}
                                    </div>
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
                                    <table className="w-full border-collapse">
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold w-1/3">Advisor Name</td>
                                                <td className="py-2">{postName ? postName : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Designation</td>
                                                <td className="py-2">{postDesig ? postDesig : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Company Name</td>
                                                <td className="py-2">{postCompany ? postCompany : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Phone Number</td>
                                                <td className="py-2">{postNumber ? postNumber : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Email</td>
                                                <td className="py-2">{postEmail ? postEmail : "N/A"}</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Experience</td>
                                                <td className="py-2">{postExperience ? postExperience : "N/A"}</td>
                                            </tr>
                                            {/* <tr className="border-b">
                                                <td className="py-2 font-semibold">Post Description</td>
                                                <td className="py-2">{postDescription ? postDescription : "N/A"}</td>
                                            </tr> */}
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Advisor's handson Industry</td>
                                                <td className="py-2">
                                                    {postIndustry
                                                        ? (() => {
                                                              let arr = [];
                                                              try {
                                                                  arr =
                                                                      typeof postIndustry === "string"
                                                                          ? JSON.parse(postIndustry)
                                                                          : postIndustry;
                                                              } catch {
                                                                  arr = [];
                                                              }
                                                              return Array.isArray(arr) && arr.length > 0
                                                                  ? arr.map((item, idx) => <div key={idx}>{item}</div>)
                                                                  : "N/A";
                                                          })()
                                                        : "N/A"}
                                                </td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Advisor's, interest into</td>
                                                <td className="py-2">
                                                    {postInterest
                                                        ? (() => {
                                                              let arr = [];
                                                              try {
                                                                  arr =
                                                                      typeof postInterest === "string"
                                                                          ? JSON.parse(postInterest)
                                                                          : postInterest;
                                                              } catch {
                                                                  arr = [];
                                                              }
                                                              return Array.isArray(arr) && arr.length > 0
                                                                  ? arr.map((item, idx) => <div key={idx}>{item}</div>)
                                                                  : "N/A";
                                                          })()
                                                        : "N/A"}
                                                </td>
                                            </tr>

                                            <tr className="border-b">
                                                <td className="py-2 font-semibold">Singe Description</td>
                                                <td className="py-2">{postSingleDes ? postSingleDes : "N/A"}</td>
                                            </tr>
                                            {/* <tr className="border-b">
                                                <td className="py-2 font-semibold">Post Title</td>
                                                <td className="py-2">{postTitle ? postTitle : "N/A"}</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </ul>
                            {/* buttons  */}
                            <div className=" lg:flex justify-evenly ">
                                {userId === postUser ? null : (
                                    <div
                                        onClick={
                                            loader
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
                                        {loader ? (
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
                                        {loader ? "Checking..." : planStatus ? "Request Connect" : "Subscribe"}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* box bottom */}
                    <div className=" bg-amber-100  min-h-[19rem]  p-8 m-7 rounded-2xl shadow-xl">
                        <div className="text-center text-violet-900 text-2xl font-bold p-3 m-4">Detailed Informtion</div>
                        <div className="text-xl font-semibold p-2 m-2">About</div>
                        <div className="p-2 m-1 mx-6">{postTitle ? postTitle : "N/A"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPostAdv;
