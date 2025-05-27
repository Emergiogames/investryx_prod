import React, { useState } from "react";
import forgotpswdIng from "/images/forgotpswdImg.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {  toast } from 'react-toastify';
import { forgotPassword } from "../../services/user/apiMethods";
import animationData  from "../../../public/animations/rolling_animation.json"
import Lottie from "lottie-react";

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    phone: "",
  };
  const phoneValidationSchema = Yup.object({
    phone: Yup.string()
      .required("Phone number is required")
      .transform((value) => value.replace(/\s+/g, "")) // Remove all spaces
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digit number"),
  });

  const submit = async (values, { setSubmitting }) => {
    // Check if already submitting to prevent concurrent requests
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitting(true);
      console.log("click forgotpws>@enterPhoneNumber :", values);

      const response = await forgotPassword({ number: values.phone });
      
      if (response.data.status === true) {
        toast.success("OTP sent successfully!");
        navigate(`/forgot-otp?phone=${values.phone}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error?.message);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="lg:h-screen bg-center bg-no-repeat lg:bg-[url('/images/signIn_one.png')] md:bg-cover">
      <div className="h-screen">
        {/* Left side: Login form */}
        <div className="flex items-center justify-center lg:w-1/2 hover:scale-105 transition-transform duration-500 h-screen w-full">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex justify-center font-audiowide text-3xl lg:hidden mb-16 text-center">
              <div className="text-yellow-300">I</div>
              <div>nvestryx</div>
            </div>

            <div className="max-w-md w-full p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-center mb-5">
                Forgot Password
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={phoneValidationSchema}
                onSubmit={submit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="relative z-0 w-full mb-8 group">
                      <Field
                        type="phone"
                        name="phone"
                        id="phone"
                        autoComplete="off"
                        className="block py-2.5 px-0 pl-2 w-full text-sm text-black bg-transparent border-1 border-2 rounded-xl border-yellow-300  dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                      >
                        Phone Number
                      </label>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-600 text-xs"
                      />
                    </div>
                    {/* signIn button */}
                    {!isSubmitting ? (
                    <div className="flex items-center justify-between mb-6">
                      <button
                        className="w-full py-1.5 px-4 bg-yellow-300 hover:bg-yellow-400 rounded-md  relative font-bold font-sans overflow-hidden transition-all duration-700 "
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Send OTP
                        
                      </button>
                    </div>
                    ): (
                      <div className="flex items-center justify-between mb-6">
                      <button
                        className="w-full  p-1 flex justify-center items-center bg-yellow-300 hover:bg-yellow-400 rounded-md  relative font-bold font-sans overflow-hidden transition-all duration-700 "
                        disabled
                      >
                         <Lottie animationData={animationData} className="w-10 h-10" />
                      </button>
                    </div>
                    )}
                  </Form>
                )}
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
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;