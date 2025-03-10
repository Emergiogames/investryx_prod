import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginimage from "/images/investment_img/emergio_ai.png";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, postLogin } from "../../services/user/apiMethods";
import { signInWithPopup } from "firebase/auth";
import { setToken, setUserData } from "../../utils/context/reducers/authSlice";
import { toast } from "sonner";
import blackLogo from "/images/logo_black.png";
import { auth, provider } from "../../utils/firebase/config";
import {
  initialValues,
  validationSchema,
} from "../../utils/validation/loginValidation";
import { getUserProfile } from "../../services/user/apiMethods";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectUser = (state) => state.auth.user;
  const user = useSelector(selectUser);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submit = (values) => {
    console.log('heluzzzzzzzz');
     postLogin(values)
      .then((response) => {
        console.log("login response data:", response);
        if (response.data.status === true) {
          // Set token in Redux store
          dispatch(setToken(response.data.token));
          console.log("Token set after login");

          // Return the token so we can use it in the next .then block
          return response.data.token;
        } else {
          throw new Error(response.data.message || "Login failed");
        }
      })
      .then((token) => {
        // Now that we have the token, we can call getUserProfile
        return getUserProfile(token);
      })
      .then((profileResponse) => {
        console.log("@login :", profileResponse);
        dispatch(setUserData(profileResponse.data));
        toast.success("Login Successful");
        navigate("/");
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error(error.message || "Something went wrong while logging in");
      });
  };

  //google login
  const handlegoogleSignIn = () => {
 
    
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log("userdata from firebase", data);
        const username = { username: data.user.email }; //username is email
        console.log('gsignin ::', username);
        
        return googleSignIn(username);
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === true) {
          dispatch(setToken(response.data.token));
          toast.success("Google Sign-in Successful");
          return getUserProfile();
        } else {
          throw new Error(response.data.message || "Google Sign-in failed");
        }
      })
      .then((profileResponse) => {
        if (profileResponse && profileResponse.data) {
          dispatch(setUserData(profileResponse.data));
          navigate("/");
        } else {
          throw new Error("Failed to fetch user profile");
        }
      })
      .catch((error) => {
        console.error("Error during Google Sign-up:", error);
        toast.error(error.message || "Something went wrong during sign-up");
      });
  };

  return (
    <div>
      <div className="lg:h-screen bg-center bg-no-repeat md:bg-[url('/images/signIn_one.png')] md:bg-cover">
        <div className="flex  justify-center h-screen">
          {/* Left side: Login form */}

          <div className="flex items-center justify-center md:w-1/2 hover:scale-105 transition-transform duration-500">
            <div className=" max-w-md w-full px-8 pb-8 ">
              <div className="flex justify-center font-audiowide text-3xl md:hidden mb-16 text-center">
                <div className="text-yellow-300">I</div>
                <div>nvestryx</div>
              </div>

              <h2 className="text-2xl font-semibold mb-5">
                <span className="text-6xl text-yellow-300 font-extrabold ">
                  W
                </span>
                <span className="text-6xl font-extrabold  ">elcome</span>
                <div className="text-6xl font-extrabold">Back</div>
              </h2>
              {/* <img src="/images/signIn_one.png" alt="" /> */}

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
              >
                <Form className="max-w-md mx-auto">
                  <div className="relative z-0 w-full mb-5 group">
                    <Field
                      type="phone"
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
                      Phone Number
                    </label>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-600 text-xs"
                    />
                  </div>

                  <div className="relative z-0 w-full mb-1 group">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="block py-2.5 px-0 pl-2 w-full text-sm text-gray-900 bg-transparent  border-2 rounded-xl border-yellow-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                      placeholder=" "
                      autoComplete="on" // Add this line
                    />
                    <label
                      htmlFor="password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 px-4 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-text-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
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
                            stroke-width="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            stroke-width="2"
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
                            stroke-width="2"
                            d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </span>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-xs"
                    />
                  </div>

                  {/* forgot password */}
                  <div className="flex justify-end">
                    <a
                      href="/forgot-password"
                      className="text-sm text-gray-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="text-sm  text-black flex justify-end mb-6">
                    {/* <Link to="/forgot-password" className='hover:underline hover:text-red-600'>
                  Forgot Password
                </Link> */}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                  <button
  type="submit" // Ensure this is a submit button for Formik to handle the form submission
  className="z-30 w-full py-1.5 px-4 bg-yellow-300 hover:bg-yellow-400 rounded-md relative font-bold font-sans overflow-hidden transition-all duration-700"
>
  Sign In
</button>

                  </div>
                </Form>
              </Formik>

              <div className="text-center mb-3">
                <span className="text-gray-600">Or</span>
              </div>
              {/* google signIn button */}

              <button
                type="button"
                onClick={handlegoogleSignIn}
                className="bg-white font-medium justify-center w-full active:bg-blueGray-50 text-blueGray-700  px-4 py-3 rounded-md outline-grey focus:outline-none mr-3 mb-5  uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
              >
                <img
                  alt="..."
                  className="w-5 mr-1"
                  src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"
                />
                <span>Sign In with Google</span>
              </button>

              <div className="text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="hover:text-blue-700 text-gray-800 font-semibold py-1 px-1 rounded focus:outline-none focus:shadow-outline "
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          {/* Right side: Image */}
          <div className="hidden md:flex md:w-1/2 items-center">
            {/* <img className='w-auto h-20' src={logoImg} alt="" /> */}
            {/* <div>
            <img className="" src={blackLogo} alt="" />
          </div> */}
            {/* <div className="p-25">
            <img
              className="w-full p-0 " // Add hover effect here
              src={loginimage}
              alt=""
            />
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
// }

export default Login;
