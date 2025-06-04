import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginimage from "/images/adminLoginImg.png";
import {
  initialValues,
  validationSchema,
} from "../../../utils/validation/adminValidation/adminLoginValidation";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminPostLogin } from "../../../services/admin/apiMethods";
import { AdminLoginSuccess } from "../../../utils/context/reducers/adminAuthSlice";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = (values) => {
    setLoading(true);
    const { email, ...rest } = values;
    const newValues = { username: email, ...rest };

    adminPostLogin(newValues)
      .then((response) => {
        console.log('adminpost datazzzz :', response);

        if (response.data?.status === true) {
          toast.success("Admin login success");
          dispatch(AdminLoginSuccess({ admin: response?.data }));
          navigate("/admin/");
        } else {
          console.log(response.error || "Unknown error");
          toast.error(response.message || "Login failed");
        }
      })
      .catch((error) => {
        console.log(error?.message || "An error occurred");
        toast.error(error?.message || "An error occurred while logging in");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col md:flex-row justify-center bg-white h-screen">
      {/* Left side: Login form */}
      <div className="flex items-center justify-center md:w-1/2 ">
        <div className="max-w-md w-full p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Admin Login
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-500 text-xs font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="off"
                  disabled={loading}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
              <div className="mb-6 relative">
                <label
                  className="block text-gray-500 text-xs font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 pr-10"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="off"
                  disabled={loading}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-11 transform -translate-y-1/2 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-white"
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
                      className="w-6 h-6 text-gray-600 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 28 28"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
              {/* signIn button */}
              <div className="flex items-center justify-between mb-3">
                <button
                  className="w-full bg-gray-500 hover:bg-amber-400 text-white font-bold py-1.5 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {/* Right side: Image */}
      <div className="hidden md:flex md:w-1/2 items-center bg-white">
        <div className="p-14">
          <img className="w-full p-10" src={loginimage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
