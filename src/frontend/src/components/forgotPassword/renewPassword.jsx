import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renewPassword } from "../../services/user/apiMethods";
import { useLocation } from "react-router-dom";
import {  renewPasswordValidation } from "../../utils/validation/renewPasswordValidation";

function RenewPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const phone = queryParams.get("phone");

    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const submit = (values) => {
        console.log("at newpwd submit :", values);
        const { confirmPassword, ...newValues } = values;
        renewPassword({ ...newValues, username: phone })
            .then((response) => {
                toast.success("Password changed successfully !");
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="lg:h-screen bg-center bg-no-repeat lg:bg-[url('/images/signIn_one.png')] md:bg-cover">
            <div className=" ">
                {/* Left side: Login form */}
                <div className="flex items-center justify-center lg:w-1/2 ">
                    <div className="w-full flex flex-col justify-center items-center h-screen">
                        <div className="flex justify-center font-audiowide text-3xl lg:hidden mb-16 text-center">
                            <div className="text-yellow-300">I</div>
                            <div>nvestryx</div>
                        </div>
                        <div className="max-w-md w-full p-8 shadow-lg">
                            <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

                            <Formik initialValues={initialValues} validationSchema={renewPasswordValidation} onSubmit={submit}>
                                <Form>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <Field
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            className="block py-2.5 px-0 pl-2 w-full text-sm text-black bg-transparent border-1 border-2 rounded-xl border-yellow-300  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                            placeholder=" "
                                            autoComplete="on" // Add this line
                                        />
                                        <label
                                            htmlFor="password"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                        >
                                            Password
                                        </label>
                                        <span
                                            className="absolute right-3 top-3 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg
                                                    class="w-6 h-6 text-gray-600 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 28 28"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                    />
                                                    <path
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    class="w-6 h-6 text-gray-600 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 28 28"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        strokeWidth="2"
                                                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                        <ErrorMessage name="password" component="div" className="text-red-600 text-xs" />
                                    </div>

                                    <div className="relative z-0 w-full mb-8 group">
                                        <Field
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            className="block py-2.5 px-0 pl-2 w-full text-sm text-black bg-transparent border-1 border-2 rounded-xl border-yellow-300  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                            placeholder=" "
                                            autoComplete="on" // Add this line
                                        />
                                        <label
                                            htmlFor="password"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                        >
                                            Confim Password
                                        </label>
                                        <span
                                            className="absolute right-3 top-3 cursor-pointer"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <svg
                                                    class="w-6 h-6 text-gray-600 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 28 28"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                    />
                                                    <path
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    class="w-6 h-6 text-gray-600 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 28 28"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        strokeWidth="2"
                                                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="div"
                                            className="text-red-600 text-xs"
                                        />
                                    </div>

                                    {/* signIn button */}
                                    <div className="flex items-center justify-between mb-6">
                                        <button
                                            className="z-30 w-full py-1.5 px-4 bg-yellow-300 hover:bg-yellow-400 rounded-md  relative font-bold font-sans overflow-hidden transition-all duration-700"
                                            type="submit"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </Form>
                            </Formik>

                            <div className="text-center mt-4">
                                Get back to login?{" "}
                                <Link
                                    to="/login"
                                    className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Click here
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Right side: Image */}
                    {/* <div className="hidden md:flex md:w-1/2 items-center bg-white">
        <div className="p-20">
          <img
            className="w-full p-20 hover:scale-105 transition-transform duration-500"
            src={resetpswdImg}
            alt=""
          />
        </div>
      </div> */}
                </div>
            </div>
        </div>
    );
}

export default RenewPassword;
