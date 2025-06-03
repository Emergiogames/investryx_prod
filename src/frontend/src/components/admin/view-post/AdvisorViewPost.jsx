import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { HiChevronLeft, HiCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminEditAdvisor } from "../../../services/admin/apiMethods";
import { HiX } from "react-icons/hi";
import Select from "react-select";

import { validationAdvisorSchema } from "../../../utils/validation/postAdvisorValidation";
import Loader from "../../loader/loader";

function AdvisorViewPost() {
    const location = useLocation();
    const singlePost = location.state?.postData || {};

    // Parse industry and interest if they are JSON strings
    function parseArrayField(field) {
        if (Array.isArray(field)) return field;
        if (typeof field === "string") {
            try {
                const arr = JSON.parse(field);
                return Array.isArray(arr) ? arr : [];
            } catch {
                return [];
            }
        }
        return [];
    }

    // Ensure arrays are properly initialized
    const initialValues = {
        name: singlePost.name || "",
        designation: singlePost.designation || "",
        number: singlePost.number || "",
        email: singlePost.email || "",
        industry: parseArrayField(singlePost.industry),
        interest: parseArrayField(singlePost.interest),
        state: singlePost.state || "",
        city: singlePost.city || "",
        company: singlePost.company || "",
        experience: singlePost.experience || "",
        logo: singlePost.logo || null,
    };
    
    const postId = singlePost?.id;

    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    const userId = user.id || "";
    const [otherIndustry, setOtherIndustry] = useState("");
    const [InOtherIndustry, setInOtherIndustry] = useState("");
    const [stateCityMapping, setStateCityMapping] = useState({});

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Store original values for comparison
    const [originalValues, setOriginalValues] = useState({});
    const [logoChanged, setLogoChanged] = useState(false);
    const [logoRemoved, setLogoRemoved] = useState(false);

    useEffect(() => {
        const fetchCityState = async () => {
            try {
                const response = await fetch("/texts/stateCityMapping.json");
                if (!response.ok) throw new Error("Failed to fetch City - States");
                const data = await response.json();
                setStateCityMapping(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching State-cities:", error);
                setLoading(false);
            }
        };
        fetchCityState();
    }, []);

    // Store original values when component mounts
    useEffect(() => {
        if (singlePost && Object.keys(singlePost).length > 0) {
            setOriginalValues({
                name: singlePost.name || "",
                designation: singlePost.designation || "",
                number: singlePost.number || "",
                email: singlePost.email || "",
                industry: parseArrayField(singlePost.industry),
                interest: parseArrayField(singlePost.interest),
                state: singlePost.state || "",
                city: singlePost.city || "",
                company: singlePost.company || "",
                experience: singlePost.experience || "",
                logo: singlePost.logo || null,
            });
        }
    }, [singlePost]);

    const states = Object.keys(stateCityMapping).map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: key,
    }));

       const handleClose = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(-1); // Default browser back
        }
    };


    // Helper function to compare arrays
    const arraysEqual = (a, b) => {
        if (!Array.isArray(a) || !Array.isArray(b)) return a === b;
        if (a.length !== b.length) return false;
        return a.every((val, index) => val === b[index]);
    };

    // Helper function to get only changed fields
    const getChangedFields = (currentValues) => {
        const changedFields = {};

        // Compare each field with original values
        Object.keys(originalValues).forEach((key) => {
            if (key === "industry" || key === "interest") {
                // Special handling for arrays
                if (!arraysEqual(currentValues[key], originalValues[key])) {
                    changedFields[key] = currentValues[key];
                }
            } else if (key === "logo") {
                // Special handling for logo
                if (logoChanged || logoRemoved) {
                    changedFields[key] = currentValues[key];
                }
            } else {
                // Regular field comparison
                if (currentValues[key] !== originalValues[key]) {
                    changedFields[key] = currentValues[key];
                }
            }
        });

        return changedFields;
    };

    const formik = useFormik({
        initialValues: { ...initialValues },
        validationSchema: validationAdvisorSchema,
        onSubmit: async (values) => {
            // Set loading to true at start of submission
            setLoading(true);
         

            const { name, designation, number, email, logo, industry, interest, state, city, company, experience } = values;

            // Prepare the industries, handling 'Others' separately
            // Fix: Ensure industry is an array before calling map
            const industries = Array.isArray(industry) 
                ? industry
                    .map((industry) => (industry === "Others" ? otherIndustry : industry))
                    .filter(Boolean)
                : [];

            // Fix: Ensure interest is an array before calling map
            const inIndustries = Array.isArray(interest)
                ? interest
                    .map((industry) => (industry === "Others" ? InOtherIndustry : industry))
                    .filter(Boolean)
                : [];

            // Prepare current values for comparison
            const currentValues = {
                name: name || "",
                designation: designation || "",
                number: number || "",
                email: email || "",
                industry: industries,
                interest: inIndustries,
                state: state || "",
                city: city || "",
                company: company || "",
                experience: experience || "",
                logo: logoRemoved ? null : logo,
            };

            // Get only changed fields
            const changedFields = getChangedFields(currentValues);

            // If no changes detected, show message and return
            if (Object.keys(changedFields).length === 0 && !logoChanged && !logoRemoved) {
                toast.info("No changes detected");
                setLoading(false);
                return;
            }

            const formData = new FormData();

            // Only append changed fields to FormData
            Object.keys(changedFields).forEach((key) => {
                if (key === "industry" || key === "interest") {
                    formData.append(key, JSON.stringify(changedFields[key]));
                } else if (key === "logo") {
                    if (logoRemoved) {
                        formData.append(key, ""); // Send empty string to remove logo
                    } else if (logoChanged && changedFields[key]) {
                        formData.append(key, changedFields[key]);
                    }
                } else {
                    formData.append(key, changedFields[key]);
                }
            });

            // Log what's being sent for debugging
            console.log("Changed fields:", changedFields);
            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }

            try {
                const response = await AdminEditAdvisor(formData, postId);
                console.log("helo 4", response);
                
                if (response.data) {
                    toast.success("Advisor Post Updated Successfully");

                    // Reset form and states
                    formik.resetForm();
                    setOtherIndustry("");
                    setInOtherIndustry("");
                    setLogoChanged(false);
                    setLogoRemoved(false);
                    setLoading(false);

                    // Navigate back to profile
                    navigate("/admin/postVerify");
                } else {
                    toast.error(response.data);
                    setLoading(false);
                }
            } catch (error) {
                toast.error(error);
                setLoading(false);
            }
        },
    });

    const industryOptions = ["Education", "IT", "HealthCare", "Fashion", "Food", "Automobile", "Banking", "Others"];

    const industryInOptions = ["Education", "IT", "HealthCare", "Fashion", "Food", "Automobile", "Banking", "Others"];

    // Select state and city
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);

    useEffect(() => {
        // Only run if both data are available
        if (!initialValues?.state || Object.keys(stateCityMapping).length === 0) {
            console.log("Waiting for data...", {
                state: initialValues?.state,
                mappingLoaded: Object.keys(stateCityMapping).length > 0,
            });
            return;
        }
        const newCityOptions = stateCityMapping[initialValues?.state] || [];

        setCityOptions(newCityOptions);
    }, [initialValues, stateCityMapping]);

    // Handle state change
    const handleStateChange = (selected) => {
        const newCityOptions = stateCityMapping[selected?.value] || [];
        console.log("Available cities for", selected?.value, ":", newCityOptions);

        setSelectedState(selected?.value);
        setCityOptions(newCityOptions);
        setSelectedCity(null);

        formik.setFieldValue("state", selected?.value || "");
        formik.setFieldValue("city", "");
    };

    useEffect(() => {
        console.log("555 ::", cityOptions);
    }, [cityOptions]);

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        setPreviewImage(singlePost?.logo);
    }, [singlePost?.logo]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            formik.setFieldValue("logo", file);
            setLogoChanged(true);
            setLogoRemoved(false);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        formik.setFieldValue("logo", null);
        setLogoRemoved(true);
        setLogoChanged(false);

        // Reset file input
        const fileInput = document.getElementById("imageUpload");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const handleIndustryChange = (e) => {
        const { value, checked } = e.target;
        let updatedIndustries;

        if (checked) {
            updatedIndustries = [...(formik.values.industry || []), value];
        } else {
            updatedIndustries = (formik.values.industry || []).filter((industry) => industry !== value);
        }

        formik.setFieldValue("industry", updatedIndustries);
    };

    const handleInIndustryChange = (e) => {
        const { value, checked } = e.target;
        let updatedInIndustries;

        if (checked) {
            updatedInIndustries = [...(formik.values.interest || []), value];
        } else {
            updatedInIndustries = (formik.values.interest || []).filter((industry) => industry !== value);
        }

        formik.setFieldValue("interest", updatedInIndustries);
    };

    useEffect(() => {
console.log('111 ::',formik.values);

    }, [])

    return (
        <div className=" w-full mt-20">
            <div>
                <div className="">
                    <div className="">
                        <div className="md:flex ">
                            <div className="flex items-center">
                                {/* close button */}
                                <button onClick={handleClose} className=" px-2 py-2 rounded">
                                    <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
                                </button>
                                <span className="font-semibold">BACK</span>
                            </div>
                            <h2 className="flex justify-center w-full font-bold text-2xl my-10 mr-24">
                                {" "}
                                Edit Advisor Post
                            </h2>
                        </div>
                        <div className="">
                            {loading && (
                                <div className=" justify-center z-0 items-center h-screen ">
                                    <div className="h-screen flex justify-center items-center">
                                        <Loader />
                                    </div>
                                    {/* <p className="mt-6">Uploading...</p> */}
                                </div>
                            )}
                            {!loading && (
                                <form
                                    onSubmit={formik.handleSubmit}
                                    encType="multipart/form-data"
                                    className=""
                                    method="post"
                                >
                                    <div className=" flex flex-col items-center ">
                                        <div className="lg:w-1/3  m-5 flex justify-center">
                                            <div className="w-36 h-36 bg-amber-100 rounded-2xl flex justify-center items-center relative">
                                                <>
                                                    {previewImage ? (
                                                        <img
                                                            src={previewImage}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover rounded-2xl"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500">No Image</span>
                                                    )}

                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="imageUpload"
                                                        onChange={handleImageChange}
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => document.getElementById("imageUpload").click()} // Trigger file input
                                                        className="absolute top-2 right-2 bg-amber-500 rounded-full p-1 text-white font-semibold hover:bg-amber-600"
                                                    >
                                                        Edit
                                                    </button>

                                                    {/* Remove image button - only show if there's an image */}
                                                    {previewImage && (
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute top-2 left-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                                            title="Remove Image"
                                                        >
                                                            <HiX className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </>
                                            </div>
                                        </div>
                                        <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10 ">
                                            {/* profile box */}

                                            {/* name 1*/}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="name"
                                                    id="name"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.name && formik.errors.name && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.name}</p>
                                                )}
                                            </div>

                                            {/* Designation*/}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="designation"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Describe your designation in a single line
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.designation}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="designation"
                                                    id="designation"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.designation && formik.errors.designation && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.designation}</p>
                                                )}
                                            </div>

                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="number"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Enter Phone Number
                                                </label>
                                                <input
                                                    type="number"
                                                    value={formik.values.number}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="number"
                                                    id="number"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.number && formik.errors.number && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.number}</p>
                                                )}
                                            </div>
                                            {/* Email */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="email"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Enter your Email Id
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="email"
                                                    id="email"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.email && formik.errors.email && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.email}</p>
                                                )}
                                            </div>

                                            {/* industry  3*/}

                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="industry"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Select your Industrial Expertise
                                                </label>

                                                {industryOptions?.map((industry) => (
                                                    <div key={industry} className="flex items-center mb-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`industry-${industry}`}
                                                            name="industry"
                                                            value={industry}
                                                            checked={(formik.values.industry || []).includes(industry)}
                                                            onChange={handleIndustryChange}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`industry-${industry}`}>{industry}</label>
                                                    </div>
                                                ))}

                                                {(formik.values.industry || []).includes("Others") && (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Other Industry"
                                                        value={otherIndustry}
                                                        onChange={(e) => setOtherIndustry(e.target.value)}
                                                        className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    />
                                                )}

                                                {formik.touched.industry && formik.errors.industry && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.industry}</p>
                                                )}
                                            </div>

                                            {/* establish 4 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="experience"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Years Of Experience
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.experience}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="experience"
                                                    id="experience"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.experience && formik.errors.experience && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.experience}</p>
                                                )}
                                            </div>

                                            {/* area of intrest 4 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="interest"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Select Industries you intrested in
                                                </label>

                                                {industryInOptions?.map((industry) => (
                                                    <div key={industry} className="flex items-center mb-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`in-industry-${industry}`}
                                                            name="interest"
                                                            value={industry}
                                                            checked={(formik.values.interest || []).includes(industry)}
                                                            onChange={handleInIndustryChange}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`in-industry-${industry}`}>{industry}</label>
                                                    </div>
                                                ))}

                                                {(formik.values.interest || []).includes("Others") && (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Other Industry"
                                                        value={InOtherIndustry}
                                                        onChange={(e) => setInOtherIndustry(e.target.value)}
                                                        className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    />
                                                )}

                                                {formik.touched.interest && formik.errors.interest && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.interest}</p>
                                                )}
                                            </div>

                                            <div className="space-y-6">
                                                {/* State Dropdown */}
                                                <div className="relative z-0 w-full group mb-4">
                                                    <label className="block text-lg font-medium text-gray-700 mb-1">
                                                        Select State
                                                    </label>
                                                    <Select
                                                        options={states}
                                                        value={
                                                            states.find(
                                                                (option) =>
                                                                    option.value.toLowerCase() ===
                                                                    formik.values.state?.toLowerCase()
                                                            ) || null
                                                        }
                                                        onChange={handleStateChange}
                                                        placeholder="Choose a state"
                                                        styles={{
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                        }}
                                                        menuPortalTarget={document.body}
                                                        menuPosition="absolute"
                                                    />
                                                    {formik.touched.state && formik.errors.state && (
                                                        <p className="text-red-600 text-xs mt-1">{formik.errors.state}</p>
                                                    )}
                                                </div>

                                                {/* City Dropdown */}
                                                <div className="relative z-0 w-full group mb-4">
                                                    <label className="block text-lg font-medium text-gray-700 mb-1">
                                                        Select City
                                                    </label>
                                                    <Select
                                                        options={cityOptions.map((city) => ({ value: city, label: city }))}
                                                        value={
                                                            cityOptions
                                                                .map((city) => ({ value: city, label: city }))
                                                                .find(
                                                                    (option) =>
                                                                        option.value.toLowerCase() ===
                                                                        formik.values.city?.toLowerCase()
                                                                ) || null
                                                        }
                                                        onChange={(selected) => {
                                                            setSelectedCity(selected);
                                                            formik.setFieldValue("city", selected?.value || "");
                                                        }}
                                                        placeholder="Choose a city"
                                                        styles={{
                                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                        }}
                                                        menuPortalTarget={document.body}
                                                        menuPosition="absolute"
                                                        // isDisabled={!selectedState}
                                                    />
                                                    {formik.touched.city && formik.errors.city && (
                                                        <p className="text-red-600 text-xs mt-1">{formik.errors.city}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description of advisor */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="company"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    About
                                                </label>
                                                <textarea
                                                    value={formik.values.company}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="company"
                                                    id="company"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.company && formik.errors.company && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.company}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* row one col one end */}
                                    </div>

                                    {/* image section start */}
                                    <div>
                                        {/* box1 */}

                                        <div className="py-8 flex justify-center items-center">
                                            <button
                                                type="submit"
                                                className="flex items-center bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-4"
                                            >
                                                <HiCheck className="w-9 h-9 mr-2" />
                                                <span className="text-xl">Submit</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvisorViewPost;
