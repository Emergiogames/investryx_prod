import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../utils/context/reducers/authSlice";
import { BASE_URL } from "../../constants/baseUrls";
import SliderButton from "../../components/accessories/slideButton/SlideButton";
import ActivityBox from "../../components/accessories/activityBox/ActivityBox";
import { deleteUserAccount, leftPlan } from "../../services/user/apiMethods";
import {  toast } from 'react-toastify';
import { logout } from "../../utils/context/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.auth.user);

  const handleProfileChange = (profile) => {
    dispatch(userProfile({ profile }));
  };

  //delete user profile
  const deleteHandler = () => {
    deleteUserAccount()
      .then((response) => {
        console.log("555555 :", response);

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
  const handleAddPost= () => {
    leftPlan()
    .then((response) => {
      console.log('plans left check for Add-post ::', response);      
      if(response.data.status === true){
        navigate("/add-post")
      } else {
        toast.error("Your Subscription is Over")
      }
    })
    .catch((err) => {
      console.error(err)
    })
  }

  return (
    <div class="bg-gray-100 flex items-center  h-screen w-screen">
      <div class="flex w-full h-full shadow-lg">
        {/* <!-- First Column --> */}
        <div class="flex flex-col w-1/3">
          {/* <!-- First Row in First Column --> */}
          <div class="flex justify-center pt-20 p-10 bg-slate-50 ">
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span class="sr-only">Open dropdown</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdown"
                  class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul class="py-2" aria-labelledby="dropdownButton">
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Export Data
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center pb-10">
                <img
                  class="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={
                    user.image
                      ? `${BASE_URL}${user.image}`
                      : "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                  }
                  // src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                  alt="super_image"
                />
                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {user.first_name ? user.first_name : ""}
                </h5>
                {/* <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {profileState.email}
                </h5> */}
                {/* <span class="text-sm text-gray-500 dark:text-gray-400">
                  Digital Entreprenure
                </span> */}
                {/* <div class="flex mt-4 md:mt-6">
                  <a
                    href="#"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    switch-account
                  </a>
                  <a
                    href="#"
                    class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    transactions
                  </a>
                </div> */}
                <div className="text-blue-700 py-4 ">choose from : </div>

                <div
                  className="inline-flex rounded-md shadow-sm py-3"
                  role="group"
                >
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${
                      profileState === "business"
                        ? "text-blue-700 focus:ring-2 focus:ring-blue-700"
                        : "text-gray-900"
                    } bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500`}
                    onClick={() => handleProfileChange("business")}
                  >
                    Business
                  </button>
                  {/* <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${
                      profileState === "business"
                        ? "text-blue-700 ring-2 ring-blue-700"
                        : "text-gray-900"
                    } bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500`}
                    onClick={() => handleProfileChange("business")}
                  >
                    Business
                  </button> */}

                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${
                      profileState === "franchise"
                        ? "text-blue-700"
                        : "text-gray-900"
                    } bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500`}
                    onClick={() => handleProfileChange("franchise")}
                  >
                    Franchise
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${
                      profileState === "investment"
                        ? "text-blue-700"
                        : "text-gray-900"
                    } bg-white border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500`}
                    onClick={() => handleProfileChange("investment")}
                  >
                    Investment
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium ${
                      profileState === "advisor"
                        ? "text-blue-700"
                        : "text-gray-900"
                    } bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500`}
                    onClick={() => handleProfileChange("advisor")}
                  >
                    Advisor
                  </button>
                </div>

                {/* <div class="inline-flex rounded-md shadow-sm py-3" role="group">
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Business
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Franchise
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Investment
                  </button>
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                  >
                    Advisor
                  </button>
                </div> */}

                {/* <Link to="/add-post"> */}
                <button
                  onClick={() => handleAddPost()}
                  className="bg-purple-500 w-1/2  rounded-xl cursor-pointer text-white py-2 border-none  flex items-center px-3"
                >
                  Add Post
                  <svg
                    className="ml-auto"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13.75 6.75L19.25 12L13.75 17.25"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 12H4.75"
                    ></path>
                  </svg>
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>

          {/* <!-- Second Row in First Column --> */}
          <div class="flex-1 bg-slate-50 flex items-center justify-center">
            <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Account Details
                </h5>
                {/* <a
                  href="#"
                  class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  View all
                </a> */}
              </div>
              <div class="flow-root">
                <ul
                  role="list"
                  class="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/> */}
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Email :
                        </p>
                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          State your thoughts
                        </p> */}
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {user.email ? user.email : ""}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Phone Number
                        </p>
                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          pseudo name if any
                        </p> */}
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {user.username ? user.username : ""}
                      </div>
                    </div>
                  </li>
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center">
                      <div class="flex-shrink-0">
                        {/* <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-2.jpg" alt="Michael image"/> */}
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Watsapp Number
                        </p>
                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          Generic history available
                        </p> */}
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {user.username ? user.username : ""}
                      </div>
                    </div>
                  </li>
                  {/* <li class="py-3 sm:py-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Email
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          entered email id
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        test@examplet.com
                      </div>
                    </div>
                  </li> */}
                  <li class="pt-3 pb-0 sm:pt-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        {/* <img clas s="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image"/> */}
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Account Status
                        </p>
                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          checkout saved
                        </p> */}
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {user.is_active === true ? "Active" : "Blocked"}
                      </div>
                    </div>
                  </li>
                  <li class="pt-3 pb-0 sm:pt-4">
                    <div class="flex items-center ">
                      <div class="flex-shrink-0">
                        {/* <img clas s="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt="Thomas image"/> */}
                      </div>
                      <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Approval Status
                        </p>
                        {/* <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          checkout saved
                        </p> */}
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {user.block === true ? "Blocked" : "Unblocked"}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class=" flex justify-center rounded-md shadow-sm m-4"
            role="group"
          >
            <a href="/contact_us">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Contact Us
              </button>
            </a>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              onClick={deleteHandler}
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* <!-- Second Column --> */}
        <div class="w-1/2 bg-slate-50 pt-16 flex flex-col ">
          <div className="text-left ml-32 pt-4">Latest Notifictions :</div>
          <a
            href="#"
            class="m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
              src="/images/image-4.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {" "}
                Business for sale 2021
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>{" "}
          <a
            href="#"
            class="m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
              src="/images/image-4.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {" "}
                Business for sale 2021
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
          <a
            href="#"
            class="m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
              src="/images/image-4.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {" "}
                Business for sale 2021
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
          <a
            href="#"
            class="m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
              src="/images/image-4.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {" "}
                Business for sale 2021
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a>
          {/* <a
            href="#"
            class="m-auto flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
              src="/images/image-4.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {" "}
                Business for sale 2021
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </a> */}
        </div>

        {/* <!-- Third Column --> */}
        <div class="w-1/3  bg-blue-500 flex flex-col ">
          <div className="flex-1 pt-20 p-5 justify-center  bg-slate-50">
            {/* Notification bar */}

            <div class=" max-w-sm p-5 ml-16 mt-5 bg-white border border-gray-200 rounded-lg shadow sm:p-2 dark:bg-gray-800 dark:border-gray-700">
              <div className="">
                <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                  Activities
                </h5>
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Know what is happening
                </p>
                <ActivityBox />

                {/* <div>
                  <a
                    href="#"
                    class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                  >
                    <svg
                      class="w-3 h-3 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    What this is suppose to do?
                  </a>
                </div> */}
                {/* <SliderButton/> */}
              </div>
            </div>
          </div>

          {/* message box  */}
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div class="relative flex justify-center overflow-hidden bg-gray-50 p-1 sm:py-1 ">
              <div class="group relative cursor-pointer overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                <span class="absolute top-10 z-0 h-20 w-20 rounded-full bg-purple-500 transition-all duration-300 group-hover:scale-[10]"></span>
                <div class="relative z-10 mx-auto max-w-md">
                  <span class="grid h-20 w-20 place-items-center rounded-full bg-purple-500 transition-all duration-300 group-hover:bg-purple-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      class="h-10 w-10 text-white transition-all"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                  </span>
                  <div class="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    <p>Chat With Emergio Invest AI bot ?</p>
                  </div>
                  <div class="pt-5 text-base font-semibold leading-7">
                    <p>
                      <a
                        href="#"
                        class="text-purple-500 transition-all duration-300 group-hover:text-white"
                      >
                        Feeling Lucky ! &rarr;
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
