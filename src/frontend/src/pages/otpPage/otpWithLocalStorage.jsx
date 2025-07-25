import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import { getUserProfile, postRegOtp, postRegister } from "../../services/user/apiMethods";
import { useDispatch } from "react-redux";
import { setToken } from "../../utils/context/reducers/authSlice";

function Otp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [getOtp, setGetOtp] = useState("");
    const [error, setError] = useState();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const phone = queryParams.get("phone") || "";
    const email = queryParams.get("email") || "";

    const initialTimer = parseInt(localStorage.getItem("otpTimer") || "30");
    const [timer, setTimer] = useState(initialTimer);
    const [resend, setResend] = useState(false);

    //main resend logic on register-normal-resend
    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
                localStorage.setItem("otpTimer", (timer - 1).toString);
            } else {
                clearInterval(countdownInterval);
                setResend(true);
                toast.error("Timer expired please resend OTP");
            }
        }, 1000);
        return () => clearInterval(countdownInterval);
    }, [timer]);

    const startResendTimer = () => {
        setResend(false);
        setTimer(30);
        localStorage.setItem("otpTimer", "30");
    };

    const handleResendOTP = () => {
        startResendTimer();
        setGetOtp("");
        postRegOtp({ phone: phone, email: email }) //activate resend otp with credential heres we have all data
            .then((response) => {
                toast.success("OTP has beens resend to " + phone);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error?.message);
            });
    };

    //getsession data
    const regData = JSON.parse(sessionStorage.getItem("signupData"));

    const handleChange = (e) => {
        let value = e.target.value.replace(/\D/g, "").slice(0, 4); // Remove non-numeric characters & limit to 4 digits
        setGetOtp(value);

        if (value.length < 4) {
            setError("OTP must be exactly 4 digits");
        } else {
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otp = getOtp?.trim() || ""; // Ensure it's trimmed

        console.log("otp:", otp);

        if (otp.length !== 4) {
            toast.error("Invalid OTP. Please enter a 4-digit number.");
            return;
        }

        const updatedRegData = { ...regData };
        delete updatedRegData.confirmPassword;
        // ,onesignal_id : "3483278hfidhi"
        postRegister({ ...updatedRegData, otp: getOtp })
            .then((response) => {
                const data = response.data;
                if (data.status === true) {
                    toast.success("Otp verification successfull");
                    dispatch(setToken(response.data.token));
                    sessionStorage.removeItem("sessionData");

                    getUserProfile().then((response) => {
                        console.log(response);
                    });

                    navigate("/preference");
                } else if (data.status === false) {
                    toast.error(data?.message || "Error in connections");
                }
            })
            .catch((error) => {
                console.log("error5", error);

                toast.error(error?.message || "error occured");
            });
    };

    return (
        <div className="lg:h-screen w-full bg-center bg-no-repeat md:bg-[url('/images/signIn_one.png')] md:bg-cover">
            <div className="">
                {/* otp page, for general regisra */}
                {/* left side */}
                <div className="flex h-screen items-center justify-center md:w-1/2 flex-col md:flex-row hover:scale-105 transition-transform duration-500">
                    <div className="max-w-md w-full p-8 shadow-lg">
                        <h2 className="text-2xl font-semibold text-start mb-2">Enter Your OTP</h2>
                        <h2 className=" text-start mb-6">OTP has been send to your watsapp</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={getOtp}
                                    onChange={handleChange}
                                    className="w-full border border-yellow-300 rounded-xl py-2 px-2 text-2xl text-center focus:outline-none focus:ring-0 focus:border-yellow-400"
                                    autoComplete="off"
                                />
                            </div>

                            {/* logic for resend otp */}
                            <div className="flex justify-between mb-4  items-center ">
                                <div className="flex gap-2  items-center">
                                    {!resend ? (
                                        <p className="text-sm text-grey-600">
                                            OTP expires in <span className="text-yellow-400 text-lg">{timer}</span> seconds
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {resend ? (
                                    <button onClick={handleResendOTP} className=" hover:text-red-600 hover:underline">
                                        Resend OTP
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Verify
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Otp;
