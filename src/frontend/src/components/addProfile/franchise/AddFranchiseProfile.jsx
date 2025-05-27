import React, { useEffect } from "react";
import * as Yup from "yup";
import { useState } from "react";
import {  toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addProfile } from "../../../services/user/apiMethods";

const FranchiseProfileSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "Name must contain only English alphabets and spaces"
    )
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  number: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/,
      "Number must be a valid international format (e.g., +1234567890)"
    )
    .required("Number is required"),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format. Must be in the format something@something.something"
    )
    .required("Email is required"),

  industry: Yup.string().required("Please select an industry"),

  web_url: Yup.string()
    .matches(
      /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/,
      "Invalid URL. Must start with http:// or https://"
    )
    .required("Website URL is required"),

  city: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "City name must contain only English alphabets and spaces"
    )
    .max(50, "City name is too long")
    .required("City is required"),

  state: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "State name must contain only English alphabets and spaces"
    )
    .max(50, "State name is too long")
    .required("State is required"),

  about: Yup.string()
    .matches(
      /^[A-Za-z0-9\s.,'-]+$/,
      "About section must contain only English alphabets, numbers, and punctuation"
    )
    .min(20, "About section must be at least 20 characters long")
    .max(500, "About section must be less than 500 characters")
    .required("About section is required"),

  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "File size must not exceed 5MB", (value) => {
      return value ? value.size <= 5 * 1024 * 1024 : false;
    })
    .test("fileType", "Only JPEG, PNG, or GIF files are allowed", (value) => {
      return value
        ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        : false;
    }),
});

function AddFranchiseProfile() {
  const [imagePreview, setImagePreview] = useState(null);
  const initialValues = {
    name: "",
    number: "",
    email: "",
    industry: "",
    web_url: "",
    city: "",
    state: "",
    about: "",
    image: null,
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const updatedValues = { ...values, type: "franchise" };
    console.log("updataed form submission :;", updatedValues);

    addPost(updatedValues)
      .then((response) => {
        if (response.data.status === true) {
          toast.success("Added Franchise Profile Successfully!");
        } else {
          toast.info(response.data.message);
          navigate("/user-profile")
        }
      })
      .catch((error) => {
        // toast.error(error.message)
        navigate("/user-profile")
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
        resetForm();
        setImagePreview(null);
      });
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file); // Update Formik state
      setImagePreview(URL.createObjectURL(file)); // Set preview URL(creatign a local url for image blob)
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview); // Cleanup URL object
      console.log("imagepreview 2::", imagePreview);
    };
  }, [imagePreview]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FranchiseProfileSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="w-screen ">
            <div className=" h-28  bg-gradient-to-r from-amber-300 to-yellow-400 mb-9">
              <div className="text-4xl font-bold flex h-full w-full justify-center items-center">
                Add Franchise Profile
              </div>
            </div>
            <div className="xl:flex">
              <div className="xl:w-1/3 h-screen">
                <div className="flex flex-col justify-center items-center">
                  <div className="mb-20 my-6">
                    <label
                      // htmlFor="image"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Upload File
                    </label>
                    <div className="flex justify-center items-center">
                      <div className="rounded-md border border-[#e0e0e0] bg-gray-50 p-4 shadow-md">
                        <label
                          htmlFor="image"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          {imagePreview ? (
                            // Show the preview if an image is selected
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="h-40 w-40 object-cover rounded-md"
                            />
                          ) : (
                            // Show the upload icon if no image is selected
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-20 w-40 fill-white stroke-yellow-300"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span className="text-gray-600 font-medium">
                                Upload file
                              </span>
                            </>
                          )}
                        </label>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setFieldValue)}
                          className="hidden"
                        />
                      </div>
                    </div>
                    {/* Optionally, display any error messages */}
                    {errors.image && touched.image && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.image}
                      </div>
                    )}
                    {/* Re-upload instructions */}
                    {imagePreview && (
                      <p className="text-sm text-gray-500 mt-2">
                        Click on the image to re-upload.
                      </p>
                    )}
                  </div>

                  <div className="h-1/2">
                    <div className="w-96 h-72 bg-amber-100  rounded-lg flex justify-center items-center">
                      <div>
                        <ol class="relative text-gray-600 border-s border-gray-600 dark:border-gray-700 dark:text-gray-800 ml-12 mt-4 ">
                          <li class="mb-10 ms-6">
                            <span class="absolute flex items-center justify-center w-8 h-8 bg-amber-300 rounded-full -start-4 ring-4 ring-grey-600 dark:ring-gray-900 dark:bg-yellow-900">
                              <svg
                                class="w-3.5 h-3.5 text-yellow-500 dark:text-yellow-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  strokeWidth="2"
                                  d="M1 5.917 5.724 10.5 15 1.5"
                                />
                              </svg>
                            </span>
                            <h3 class="font-medium leading-tight">
                              Sign-Into Digilocker
                            </h3>
                            {/* <p class="text-sm">Step details here</p> */}
                          </li>
                          <li class="mb-10 ms-6">
                            <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-grey-600 dark:ring-gray-900 dark:bg-gray-700">
                              <svg
                                class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 16"
                              >
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                              </svg>
                            </span>
                            <h3 class="font-medium leading-tight">
                              Authorize DigiLocker to share your data with
                              Investryx
                            </h3>
                            {/* <p class="text-sm">Step details here</p> */}
                          </li>
                          {/* <li class="mb-10 ms-6">
        <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-grey-600 dark:ring-gray-900 dark:bg-gray-700">
            <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h3 class="font-medium leading-tight">Review</h3>
    </li> */}
                          <li class="ms-6">
                            <span class="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-grey-600 ">
                              <svg
                                class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                              </svg>
                            </span>
                            <h3 class="font-medium leading-tight">
                              take a live selfie for match with your digiLocker
                              data{" "}
                            </h3>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* //center column */}
              <div className="xl:w-1/3 bg-amber-100 rounded-lg mb-9">
                <div className="flex items-center justify-center p-12">
                  <div className="mx-auto w-full max-w-[550px] bg-amber-100">
                    {/* Full Name Field */}
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className={`w-full rounded-md border ${
                          errors.name && touched.name
                            ? "border-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* number Number Field */}
                    <div className="mb-5">
                      <label
                        htmlFor="number"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Phone Number
                      </label>
                      <Field
                        type="text"
                        name="number"
                        placeholder="Enter your phone number"
                        className={`w-full rounded-md border ${
                          errors.number && touched.number
                            ? "border-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                      />
                      <ErrorMessage
                        name="number"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className={`w-full rounded-md border ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Industry Field */}
                    <div className="mb-5">
                      <label
                        htmlFor="industry"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Industry
                      </label>
                      <Field
                        as="select"
                        name="industry"
                        className={`w-full rounded-md border ${
                          errors.industry && touched.industry
                            ? "border-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                      >
                        <option value="" disabled>
                          Select Industry
                        </option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="finance">Finance</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="transportation">Transportation</option>
                        <option value="construction">Construction</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="energy">Energy</option>
                        <option value="telecommunications">
                          Telecommunications
                        </option>
                        <option value="consulting">Consulting</option>
                        <option value="others">Others</option>
                      </Field>
                      <ErrorMessage
                        name="industry"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Franchise Website URL Field */}
                    <div className="mb-5">
                      <label
                        htmlFor="web_url"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Franchise Website Url
                      </label>
                      <Field
                        type="url"
                        name="web_url"
                        placeholder="https://investryx.com"
                        className={`w-full rounded-md border ${
                          errors.web_url && touched.web_url
                            ? "border-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                      />
                      <ErrorMessage
                        name="web_url"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Address Details */}
                    <div className="mb-5 pt-3">
                      <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                        Address Details
                      </label>
                      <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <Field
                              type="text"
                              name="city"
                              placeholder="Enter city"
                              className={`w-full rounded-md border ${
                                errors.city && touched.city
                                  ? "border-red-500"
                                  : "border-[#e0e0e0]"
                              } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                          <div className="mb-5">
                            <Field
                              type="text"
                              name="state"
                              placeholder="Enter state"
                              className={`w-full rounded-md border ${
                                errors.state && touched.state
                                  ? "border-red-500"
                                  : "border-[#e0e0e0]"
                              } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                            />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* About Field */}
                    <div className="mb-5">
                      <label
                        htmlFor="about"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        About
                      </label>
                      <Field
                        as="textarea"
                        name="about"
                        placeholder="Enter About Your Company"
                        rows="6"
                        className={`w-full rounded-md border ${
                          errors.about && touched.about
                            ? "border-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                      />
                      <ErrorMessage
                        name="about"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="hover:shadow-form w-full rounded-md bg-yellow-300 hover:bg-yellow-400 py-3 px-8 text-center text-base font-semibold outline-none disabled:opacity-50"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Add Franchise Profile"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="xl:w-1/3">
                <div className="m-8">
                  <img src="/public/images/image-r.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddFranchiseProfile;
