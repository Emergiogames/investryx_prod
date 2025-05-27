import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema, initialValues } from "../../utils/validation/registrationValidation";
import { toast } from "react-toastify";
import { postRegOtp } from "../../services/user/apiMethods";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/config";
import animationData from "../../../public/animations/rolling_animation.json";
import Lottie from "lottie-react";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
 

    const savedData = JSON.parse(sessionStorage.getItem("signupData")) || {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    };

    const submit = (values, { setSubmitting }) => {
        if (isSubmitting) return; // Prevent multiple submissions
        setIsSubmitting(true);
        setSubmitting(true);

        const phoneData = { phone: values.phone, email: values.email };
        postRegOtp(phoneData)
            .then((response) => {
                const data = response.data;
                if (data.status === true) {
                    toast.success("OTP sent");
                    sessionStorage.setItem("signupData", JSON.stringify(values));
                    navigate(`/otp?phone=${encodeURIComponent(values.phone)}&email=${encodeURIComponent(values.email)}`);
                } else {
                    toast.error(data?.message || "Failed to send OTP. Please try again.");
                }
            })
            .catch((error) => {
                toast.error(error?.message || "Error Occurred");
            })
            .finally(() => {
                setIsSubmitting(false);
                setSubmitting(false);
            });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handlegoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        setIsLoading(true);

        try {
            // Sign out before signing in to force account selection
            await signOut(auth);

            const result = await signInWithPopup(auth, provider);
            console.log("User data from Firebase:", result);

            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                images: result.user.photoURL,
            };

            console.log("User data at frontend @signup:", userData);
            sessionStorage.setItem("signupAuthData", JSON.stringify(userData));

            toast.success("Google sign-up successful!");
            navigate("/phoneOtp");
        } catch (error) {
            console.error("Error during Google sign up:", error);
            toast.error("Error signing up with Google. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-center bg-no-repeat lg:bg-[url('/images/signIn_one.png')] lg:bg-cover">
            <div className="relative flex flex-col justify-center h-screen ">
                <div className="flex items-center justify-center lg:w-1/2 hover:scale-105 transition-transform duration-500">
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="flex justify-center font-audiowide text-3xl lg:hidden mb-16 text-center">
                            <div className="text-yellow-300">I</div>
                            <div>nvestryx</div>
                        </div>
                        <div className=" max-w-md w-full shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-center mb-6 mt-2">Get Started Now</h2>

                            <Formik initialValues={savedData} validationSchema={validationSchema} onSubmit={submit}>
                                <Form className="max-w-md mx-auto z-index-10">
                                    <div className="relative z-0 w-full mb-4 group">
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="on"
                                            className="block py-2.5 px-0 pl-2 w-full text-sm text-black bg-transparent border-1 border-2 rounded-xl border-yellow-300  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                            placeholder=" "
                                        />
                                        <label
                                            htmlFor="email"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                        >
                                            Email address
                                        </label>
                                        <ErrorMessage name="email" component="div" className="text-red-600 text-xs" />
                                    </div>
                                    <div className="relative z-0 w-full mb-4 group">
                                        <Field
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="on"
                                            className="block py-2.5 px-0 pl-2 w-full text-sm text-black bg-transparent border-1 border-2 rounded-xl border-yellow-300  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                            placeholder=" "
                                        />
                                        <label
                                            htmlFor="name"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                        >
                                            UserName
                                        </label>
                                        <ErrorMessage name="name" component="div" className="text-red-600 text-xs" />
                                    </div>

                                    <div className="relative z-0 w-full mb-4 group">
                                        <Field
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            autoComplete="on"
                                            className="block py-2.5 px-0 pl-2 w-full text-sm text-black bg-transparent border-1 border-2 rounded-xl border-yellow-300  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                            placeholder=" "
                                        />
                                        <label
                                            htmlFor="phone"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                        >
                                            Phone number
                                        </label>
                                        <ErrorMessage name="phone" component="div" className="text-red-600 text-xs" />
                                    </div>

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

                                    {isSubmitting ? (
                                        <div className="flex items-center justify-between mb-3">
                                            <button class=" z-30 w-full py-1.5 px-4 flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 rounded-md  relative font-bold font-sans overflow-hidden transition-all duration-700 ">
                                                <Lottie animationData={animationData} className="w-10 h-10" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between mb-3">
                                            <button class=" z-30 w-full py-1.5 px-4 bg-yellow-300 hover:bg-yellow-400 rounded-md  relative font-bold font-sans overflow-hidden transition-all duration-700 ">
                                                SignUp
                                            </button>
                                        </div>
                                    )}
                                </Form>
                            </Formik>

                            <div className="text-center mb-3">
                                <span className="text-gray-600">Or</span>
                            </div>

                            <button
                                type="button"
                                onClick={handlegoogleSignUp}
                                className="bg-white font-medium justify-center w-full active:bg-blueGray-50 text-blueGray-700  px-4 py-3 rounded-md outline-grey focus:outline-none mr-3 mb-5  uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                            >
                                <img
                                    alt="..."
                                    className="w-5 mr-1"
                                    src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                                />
                                <span>SignUp with Google</span>
                            </button>

                            <div className="text-center mt-4">
                                Have an account?{" "}
                                <Link
                                    to="/login"
                                    className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline"
                                >
                                    SignIn
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
