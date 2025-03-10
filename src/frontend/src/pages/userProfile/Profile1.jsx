import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../utils/context/reducers/authSlice";
import { BASE_URL } from "../../constants/baseUrls";
import SliderButton from "../../components/accessories/slideButton/SlideButton";
import ActivityBox from "../../components/accessories/activityBox/ActivityBox";
import { deleteUserAccount, leftPlan } from "../../services/user/apiMethods";
import { toast } from "sonner";
import { logout } from "../../utils/context/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";

function Profile1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.auth.user);
  console.log("user status ::", profileState);

  const [showSwitchButton, setShowSwitchButton] = useState(true);

  // const toggleView = () => {
  //   setShowSwitchButton((prev) => !prev);
  // };

  const handleProfileChange = (profile) => {
    dispatch(userProfile({ profile }));
  };

  const popupRef = useRef(null);

  const toggleView = () => setShowSwitchButton((prev) => !prev);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowSwitchButton(true); // Return to "Switch Account" button
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //delete user profile
  const deleteHandler = () => {
    deleteUserAccount()
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            "Your Account Deleted successfully.You will be soon logged out!"
          );
          setTimeout(() => {
            dispatch(logout());
            localStorage.removeItem("persist:root");
            // toast.info("Logout successful");
            navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error deleting account", error);
      });
  };

  //get left Plans
  useEffect(() => {
    leftPlan()
      .then((response) => {
        console.log("plans left :::", response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //handle Add Post check
  const handleAddPost = () => {
    leftPlan()
      .then((response) => {
        console.log("plans left check for Add-post ::", response);
        if (response.data.status === true) {
          navigate("/add-post");
        } else {
          toast.error("Your Subscription is Over");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const profileName = () => {
    switch (profileState) {
      case "business":
        return "Business Profile";
      case "investor":
        return "Investor Profile";
      case "franchise":
        return "Franchise Profile";
      case "advisor":
        return "Advisor Profile";
      default:
        return "Profile";
    }
  };
  return (
    <>
      <div className=" min-h-screen w-full flex flex-col">
        {/* Outside box */}
        <div className="mt-24 m-7  flex-grow">
          {/* Top box */}
          <div className="bg-amber-50 h-96 relative">
            {/* Top box background image */}
            <img
              src="/images/profile.png"
              alt="prof_img"
              className="h-72 w-full object-cover"
            />

            {/* Profile image with overlap */}
            <div className="absolute bottom-1 left-[5rem]">
              <img
                className="w-56 h-56 rounded-full shadow-lg"
                // src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                src={`${BASE_URL}${user.image}`}
                alt="super_image"
              />
            </div>
            <div className="absolute bottom-14 left-[22rem] text-3xl text-violet-900 font-bold">
              {user.first_name + user.last_name}
            </div>
            <div className="absolute bottom-5 left-[22rem] text-3xl text-violet-900 font-bold">
              User ID : {user.id}
            </div>

            <div className=" w-[12rem] text-center absolute right-[5rem] bg-transparent border-2 border-yellow-300 p-4 m-4 rounded-xl hover:bg-yellow-300  transition-colors duration-300">
              Edit Profile
            </div>

            <div className="relative p-6">
              {showSwitchButton ? (
                <div
                  className="absolute bottom-[7rem] right-[5rem] w-[12rem] bg-yellow-200 rounded-2xl flex justify-center items-center p-4 px-7 m-3 font-semibold text-lg"
                  ref={popupRef}
                >
                  <button onClick={toggleView}>Switch Account</button>
                </div>
              ) : (
                <div
                  className="absolute bottom-[7rem] right-[5rem] bg-yellow-200 rounded-2xl flex items-center font-semibold text-lg"
                  ref={popupRef}
                >
                  {["business", "investor", "advisor", "franchise"].map(
                    (profile) => (
                      <div
                        key={profile}
                        onClick={() => handleProfileChange(profile)}
                        className={`cursor-pointer p-4 m-3 rounded-lg transition-all duration-300 ${
                          profileState === profile
                            ? "text-white bg-violet-950 scale-105"
                            : "text-violet-950"
                        } hover:shadow-lg`}
                      >
                        {profile.charAt(0).toUpperCase() + profile.slice(1)}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
          {/* profile name center */}
          <div className="text-5xl mt-12 text-violet-900 font-semibold ml-[33rem] h-12">
            {profileName()}
          </div>

          {/* Main content */}
          <div className="flex">
            {/* Left box */}
            <div className="w-1/4 h-[50vh] ">
              <div className="p-6 m-6 bg-amber-100 rounded-md h-full mb-6">
                <div className="text-xl font-medium text-violet-900 text-center">
                  About
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6 text-yellow-400"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>

                  <div className="text-2xl font-light text-violet-900">
                    Male
                  </div>
                </div>
                <hr className="border-t border-gray-300 m-3 mx-7" />

                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6  text-yellow-400"
                  >
                    <path d="m4.75 1-.884.884a1.25 1.25 0 1 0 1.768 0L4.75 1ZM11.25 1l-.884.884a1.25 1.25 0 1 0 1.768 0L11.25 1ZM8.884 1.884 8 1l-.884.884a1.25 1.25 0 1 0 1.768 0ZM4 7a2 2 0 0 0-2 2v1.034c.347 0 .694-.056 1.028-.167l.47-.157a4.75 4.75 0 0 1 3.004 0l.47.157a3.25 3.25 0 0 0 2.056 0l.47-.157a4.75 4.75 0 0 1 3.004 0l.47.157c.334.111.681.167 1.028.167V9a2 2 0 0 0-2-2V5.75a.75.75 0 0 0-1.5 0V7H8.75V5.75a.75.75 0 0 0-1.5 0V7H5.5V5.75a.75.75 0 0 0-1.5 0V7ZM14 11.534a4.749 4.749 0 0 1-1.502-.244l-.47-.157a3.25 3.25 0 0 0-2.056 0l-.47.157a4.75 4.75 0 0 1-3.004 0l-.47-.157a3.25 3.25 0 0 0-2.056 0l-.47.157A4.748 4.748 0 0 1 2 11.534V13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.466Z" />
                  </svg>

                  <div className="text-2xl font-light text-violet-900">DOB</div>
                </div>
                <hr className="border-t border-gray-300 m-3 mx-7" />

                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6  text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div className="text-2xl font-light text-violet-900">
                    Address
                  </div>
                </div>

                <hr className="border-t border-gray-300 m-3 mx-7" />
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6  text-yellow-400"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>

                  <div className="text-2xl font-light text-violet-900">
                    Mail Id
                  </div>
                </div>
                <hr className="border-t border-gray-300 m-3 mx-7" />

                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-6  text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="m3.855 7.286 1.067-.534a1 1 0 0 0 .542-1.046l-.44-2.858A1 1 0 0 0 4.036 2H3a1 1 0 0 0-1 1v2c0 .709.082 1.4.238 2.062a9.012 9.012 0 0 0 6.7 6.7A9.024 9.024 0 0 0 11 14h2a1 1 0 0 0 1-1v-1.036a1 1 0 0 0-.848-.988l-2.858-.44a1 1 0 0 0-1.046.542l-.534 1.067a7.52 7.52 0 0 1-4.86-4.859Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div className="text-2xl font-light text-violet-900">
                    Phone Number
                  </div>
                </div>
              </div>
              <div className=" flex flex-col items-center text-center ">
                <button 
                onClick={deleteHandler}
                 className="p-4 m-4 px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 min-w-64 rounded-lg shadow-md">
                  Delete Account
                </button>
                <button onClick={() => navigate('/contact_us')}  className="p-4 m-4 px-3 bg-yellow-300 hover:bg-yellow-400 mb-6 min-w-64 rounded-lg shadow-md">
                  Contact Us
                </button>
              </div>
            </div>
            {/* middle box */}
            <div className="w-1/2 min-h-[90vh]">
              <div className="p-6 m-6  bg-amber-100 rounded-md h-[30vh]">
                <div className="text-center">
                  <div className="text-2xl font-medium text-violet-900 thick-yellow-underline">
                    Analytics
                  </div>
                </div>
                <hr className="border-gray-300 my-9" />
                <div className="flex justify-evenly text-2xl font-normal text-violet-900">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <div className="">Post Views</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
                    </svg>
                    <div> Post Liked</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.333 4.478A4 4 0 0 0 1 8.25c0 .414.336.75.75.75h3.322c.572.71 1.219 1.356 1.928 1.928v3.322c0 .414.336.75.75.75a4 4 0 0 0 3.772-5.333A10.721 10.721 0 0 0 15 1.75a.75.75 0 0 0-.75-.75c-3.133 0-5.953 1.34-7.917 3.478ZM12 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        clipRule="evenodd"
                      />
                      <path d="M3.902 10.682a.75.75 0 1 0-1.313-.725 4.764 4.764 0 0 0-.469 3.36.75.75 0 0 0 .564.563 4.76 4.76 0 0 0 3.359-.47.75.75 0 1 0-.725-1.312 3.231 3.231 0 0 1-1.81.393 3.232 3.232 0 0 1 .394-1.81Z" />
                    </svg>

                    <div> Reached</div>
                  </div>
                </div>
              </div>
              <div className=" p-6 m-6 px-20  bg-amber-100 rounded-md h-fit">
                <div className="text-2xl font-medium text-violet-900 text-center  ">
                  My Posts
                </div>
                {/* thick-yellow-underline */}
                <hr className="p-4 m-4 border-gray-400 " />
                {/* noti one */}
                <div className="flex max-h-36  m-6 bg-gray-50 rounded-2xl">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="relative  object-cover rounded-l-2xl"
                    alt=""
                  />
                  <div className="flex flex-col justify-evenly pl-10">
                    <div className="font-light text-xl text-gray-600">
                      Strategies define how to react business goals
                    </div>
                    <div className="font-normal text-lg text-violet-900">
                      Posted 3 days before
                    </div>
                    <div className="flex justify-around">
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                        <div>40 Views</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                        <div>3 Like</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                        <div>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex max-h-36 m-6 bg-gray-50 rounded-2xl">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="relative  object-cover rounded-l-2xl"
                    alt=""
                  />
                  <div className="flex flex-col justify-evenly pl-10">
                    <div className="font-light text-xl text-gray-600">
                      Strategies define how to react business goals
                    </div>
                    <div className="font-normal text-lg text-violet-900">
                      Posted 3 days before
                    </div>
                    <div className="flex justify-around">
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                        <div>40 Views</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                        <div>3 Like</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                        <div>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex max-h-36 m-6 bg-gray-50 rounded-2xl">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="relative  object-cover rounded-l-2xl"
                    alt=""
                  />
                  <div className="flex flex-col justify-evenly pl-10">
                    <div className="font-light text-xl text-gray-600">
                      Strategies define how to react business goals
                    </div>
                    <div className="font-normal text-lg text-violet-900">
                      Posted 3 days before
                    </div>
                    <div className="flex justify-around">
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                        <div>40 Views</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                        <div>3 Like</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                        <div>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex max-h-36 m-6 bg-gray-50 rounded-2xl">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="relative  object-cover rounded-l-2xl"
                    alt=""
                  />
                  <div className="flex flex-col justify-evenly pl-10">
                    <div className="font-light text-xl text-gray-600">
                      Strategies define how to react business goals
                    </div>
                    <div className="font-normal text-lg text-violet-900">
                      Posted 3 days before
                    </div>
                    <div className="flex justify-around">
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </div>
                        <div>40 Views</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                          </svg>
                        </div>
                        <div>3 Like</div>
                      </div>
                      <div className="flex gap-3">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                        <div>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right box */}
            <div className="w-1/4 ">
              <div className="p-6 m-6 h-[40vh] bg-amber-100 rounded-md ">
                <div className="mb-5 text-3xl font-medium font-sans text-violet-900">
                  You might know
                </div>
                <div className="h-16 w-full mb-5 flex">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="rounded-full w-14 h-14"
                    alt=""
                  />
                  <div className="text-violet-900 pl-5">
                    <div className=" text-2xl font-light">Name One</div>
                    <div className="font-normal ">mailId@gamil.com</div>
                  </div>
                </div>
                <div className="h-16 w-full  mb-5 flex">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="rounded-full w-14 h-14"
                    alt=""
                  />
                  <div className="text-violet-900 pl-5 ">
                    <div className=" text-2xl font-light">Name One</div>
                    <div className="font-normal ">mailId@gamil.com</div>
                  </div>
                </div>
                <div className="h-16 w-full  mb-5 flex">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="rounded-full w-14 h-14"
                    alt=""
                  />
                  <div className="text-violet-900 pl-5">
                    <div className=" text-2xl font-light">Name One</div>
                    <div className="font-normal ">mailId@gamil.com</div>
                  </div>
                </div>
              </div>

              <div className="p-6 m-6 h-[40vh] bg-amber-100 rounded-md ">
                <div className="mb-5 text-3xl font-medium font-sans text-violet-900">
                  You might know
                </div>
                <div className="h-16 w-full mb-5 flex">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="rounded-full w-14 h-14"
                    alt=""
                  />
                  <div className="text-violet-900 pl-5">
                    <div className=" text-2xl font-light">Name One</div>
                    <div className="font-normal ">mailId@gamil.com</div>
                  </div>
                </div>
                <div className="h-16 w-full  mb-5 flex">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="rounded-full w-14 h-14"
                    alt=""
                  />
                  <div className="text-violet-900 pl-5 ">
                    <div className=" text-2xl font-light">Name One</div>
                    <div className="font-normal ">mailId@gamil.com</div>
                  </div>
                </div>
                <div className="h-16 w-full  mb-5 flex">
                  <img
                    src="https://dummyimage.com/200x200/000/fff"
                    className="rounded-full w-14 h-14"
                    alt=""
                  />
                  <div className="text-violet-900 pl-5">
                    <div className=" text-2xl font-light">Name One</div>
                    <div className="font-normal ">mailId@gamil.com</div>
                  </div>
                </div>
              </div>

              <div className="p-6 m-6 h-[55vh] bg-amber-100 rounded-md ">
                <div className="flex">
                  <div>
                    <div className="text-4xl text-violet-900 font-semibold">
                      Standard
                    </div>
                    <div>Business our Services</div>
                    <div className="text-4xl text-violet-900 font-semibold">
                      $79
                    </div>
                    <div>/per day</div>
                  </div>
                  <div>
                    <img
                      src="/images/plans/Union.png"
                      alt="pointing_ime"
                      className="h-40 "
                    />
                  </div>
                </div>

                <div className="bg-blue-700 text-2xl p-4 m-4 px-6 text-white rounded-xl">
                  Buy Now
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>lorel ipsum</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>lorel ipsum</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>lorel ipsum</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>lorel ipsum</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.5 1.709a.75.75 0 0 0-1 0 8.963 8.963 0 0 1-4.84 2.217.75.75 0 0 0-.654.72 10.499 10.499 0 0 0 5.647 9.672.75.75 0 0 0 .694-.001 10.499 10.499 0 0 0 5.647-9.672.75.75 0 0 0-.654-.719A8.963 8.963 0 0 1 8.5 1.71Zm2.34 5.504a.75.75 0 0 0-1.18-.926L7.394 9.17l-1.156-.99a.75.75 0 1 0-.976 1.138l1.75 1.5a.75.75 0 0 0 1.078-.106l2.75-3.5Z"
                    clipRule="evenodd"
                  />
                </svg>

                <div>lorel ipsum</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile1;
