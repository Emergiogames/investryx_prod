import React, { useState, useEffect } from "react";
import otpImg from "/public/images/otpImg.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  toast } from 'react-toastify';
import {
  postRegOtp,
  postRegister,
  getUserProfile,
} from "../../services/user/apiMethods";
import { setToken, setUserData } from "../../utils/context/reducers/authSlice";

// page after sign up using google

function PhoneOtp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setResend(true);
            toast.error("OTP expired. Please resend.");
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const startResendTimer = () => {
    setResend(false);
    setTimer(30);
  };

  const handleResendOTP = async () => {
    try {
      startResendTimer();
      const storedData = JSON.parse(sessionStorage.getItem("signupAuthData"));
      if (!storedData || !storedData.phone) {
        throw new Error("Phone number not found");
      }
      await postRegOtp({ phone: storedData.phone, email: storedData.email });
      toast.success(`OTP has been resent to ${storedData.phone}`);
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP");
    }
  };

  const phoneValidationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .test(
        "no-spaces",
        "Phone number cannot contain spaces",
        (value) => !/\s/.test(value)
      )
      .required("Phone number is required"),
  });

  const otpValidationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]{4}$/, "OTP must be exactly 4 digits")
      .test(
        "no-spaces",
        "OTP cannot contain spaces",
        (value) => !/\s/.test(value)
      )
      .required("OTP is required"),
  });

  const handlePhoneSubmit = async (values, { setSubmitting }) => {
    try {
      const storedData = JSON.parse(
        sessionStorage.getItem("signupAuthData") || "{}"
      );
      const updatedData = { ...storedData, phone: values.phone };
      sessionStorage.setItem("signupAuthData", JSON.stringify(updatedData));

      const response = await postRegOtp({
        phone: values.phone,
        email: updatedData.email,
      });

      if (response.data.status === true) {
        toast.success(response.data?.message || "OTP sent successfully");
        setOtpSent(true);
        startResendTimer();
      } else {
        throw new Error(response.data?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending phone number:", error);
      toast.error(error.message || "An error occurred while sending OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSubmit = async (values, { setSubmitting }) => {
    try {
      const storedData = JSON.parse(sessionStorage.getItem("signupAuthData"));
      if (!storedData) {
        throw new Error("No session data found");
      }

      const updatedData = { ...storedData, otp: values.otp, password: "" };
      sessionStorage.setItem("signupAuthData", JSON.stringify(updatedData));
      console.log("updatedData in gouth 111", updatedData);

      const registerResponse = await postRegister(updatedData);

      if (registerResponse.data.status === true) {
        dispatch(setToken(registerResponse.data.token));
        const profileResponse = await getUserProfile();

        if (profileResponse.status === 200) {
          toast.success("OTP Verification Successful");
          dispatch(setUserData(profileResponse.data));
          navigate("/preference");
        } else {
          throw new Error("Error in fetching user profile");
        }
      } else {
        throw new Error(
          registerResponse.data?.message || "Error in OTP Verification"
        );
      }
    } catch (error) {
      console.error("Error handling OTP submission:", error);
      toast.error(error.message || "An error occurred while processing OTP");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-white">
      {!otpSent ? (
        <PhoneForm
          validationSchema={phoneValidationSchema}
          onSubmit={handlePhoneSubmit}
        />
      ) : (
        <OtpForm
          validationSchema={otpValidationSchema}
          onSubmit={handleOtpSubmit}
          timer={timer}
          resend={resend}
          onResend={handleResendOTP}
        />
      )}
    </div>
  );
}

//form one after, sign up using google
function PhoneForm({ validationSchema, onSubmit }) {
  return (
    <div className="lg:h-screen w-full bg-center bg-no-repeat lg:bg-[url('/images/signIn_one.png')] md:bg-cover">
      <div className=" ">
        <div className=" lg:w-1/2 h-screen  flex justify-center items-center">
          <div className=" max-w-md w-full p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-start mb-2">
              Enter Your Phone Number
            </h2>
            <h2 className="text-start mb-6">
              Make sure to enter your WhatsApp number
            </h2>
            <Formik
              initialValues={{ phone: "" }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="phone"
                      className="w-full border border-gray-300 rounded-xl py-2 px-2 text-2xl text-center focus:outline-none focus:border-blue-500"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-gray-500 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out`}
                  >
                    {isSubmitting ? "Submitting..." : "Verify"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* OTP Image Section */}
      {/* <div className="hidden md:flex md:w-1/2 items-center bg-white">
         <div className="p-20">
           <img
             className="w-full p-20 hover:scale-105 transition-transform duration-500"
             src={otpImg}
             alt=""
           />
         </div>
       </div>  */}
    </div>
  );
}

//addming otp page
function OtpForm({ validationSchema, onSubmit, timer, resend, onResend }) {
  return (
    <div className="lg:h-screen w-full bg-center bg-no-repeat md:bg-[url('/images/signIn_one.png')] md:bg-cover">
      <div className="">
        <div className=" flex h-screen items-center justify-center md:w-1/2 flex-col md:flex-row">
          <div className="max-w-md w-full p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-start mb-2">
              Enter WhatsApp OTP
            </h2>
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="otp"
                      className="w-full border border-gray-300 rounded-xl py-2 px-2 text-2xl text-center focus:outline-none focus:border-blue-500"
                      autoComplete="off"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                  <div className="flex justify-between mb-4 items-center">
                    {!resend && (
                      <p className="text-s text-grey-600">
                        OTP expires in{" "}
                        <span className="text-blue-600 text-lg">{timer}</span>{" "}
                        seconds
                      </p>
                    )}
                    {resend && (
                      <button
                        onClick={onResend}
                        className="hover:text-red-600 hover:underline"
                        type="button"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-gray-500 hover:bg-blue-700"
                    } text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit OTP"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* OTP Image Section */}
        {/* <div className="hidden md:flex md:w-1/2 items-center bg-white">
         <div className="p-20">
           <img
             className="w-full p-20 hover:scale-105 transition-transform duration-500"
             src={otpImg}
             alt=""
           />
         </div>
       </div>  */}
      </div>
    </div>
  );
}

export default PhoneOtp;
