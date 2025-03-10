import React from "react";
import * as Yup from "yup";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { renewPassword } from "../../services/user/apiMethods";
import resetpswdImg from "/images/resetpswdImg.jpg";
import { useLocation } from "react-router-dom";

function RenewPassword() {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get("phone");
  console.log("phone no @renedpwd :", phone);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .trim() // Removes leading and trailing spaces
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      )
      .strict(), // Ensure strict validation (no leading/trailing spaces allowed)

    confirmPassword: Yup.string()
      .trim() // Removes leading and trailing spaces
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .strict(), // Ensure strict validation (no leading/trailing spaces allowed)
  });

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
      renew passwork page
      {/* Left side: Login form */}
      <div className="flex items-center justify-center lg:w-1/2 ">
      <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="flex justify-center font-audiowide text-3xl lg:hidden mb-16 text-center">
              <div className="text-yellow-300">I</div>
              <div>nvestryx</div>
            </div>
        <div className="max-w-md w-full p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Reset Password
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            <Form>
              <div className="relative z-0 w-full mb-4 group">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 pl-2 w-full text-sm text-gray-900 bg-transparent  border-2 rounded-xl border-yellow-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                  placeholder=" "
                  autoComplete="off" // Add this line
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-text-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Password
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
              <div className="relative z-0 w-full mb-8 group">
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="block py-2.5 px-0 pl-2 w-full text-sm text-gray-900 bg-transparent  border-2 rounded-xl border-yellow-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                  placeholder=" "
                  autoComplete="off" // Add this line
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-text-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                >
                  Confim Password
                </label>
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
