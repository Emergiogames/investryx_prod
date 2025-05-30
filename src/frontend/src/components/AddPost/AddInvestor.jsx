import React, { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addInvestorPost } from "../../services/user/apiMethods";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";

import { initialInvestorValues, validationInvestorSchema } from "../../utils/validation/postInvestorValidation";
import Loader from "../loader/loader";


function AddInvestor() {
    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    const userId = user.id || "";

    const [stateCityMapping, setStateCityMapping] = useState({});

    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [selectedFiles3, setSelectedFiles3] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    const states = Object.keys(stateCityMapping).map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: key,
    }));

    console.log("444 ::", states);

    const handleClose = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(-1); // Default browser back
        }
    };
    //cleanup functions for blobs
    const resetState1 = () => {
        formik.resetForm();
        setSelectedFiles1([]);
    };
    const resetState2 = () => {
        formik.resetForm();
        setSelectedFiles2([]);
    };
    const resetState3 = () => {
        formik.resetForm();
        setSelectedFiles3([]);
    };

    const formik = useFormik({
        initialValues: { ...initialInvestorValues },
        validationSchema: validationInvestorSchema,
        onSubmit: async () => {
            setLoading(loading);
            const {
                name,
                industry,
                state,
                city,
                profile_summary,
                preferences,
                location_interested,
                range_starting,
                range_ending,
                evaluating_aspects,
                company,
                url,
                description,
            } = formik.values;

            const formData = new FormData();

            //for city

            // For images
            selectedFiles1?.forEach((file, index) => {
                formData.append(`image${index + 1}`, file);
            });

            // For documents
            selectedFiles2?.forEach((file, index) => {
                formData.append(`doc${index + 1}`, file);
            });

            // For proofs
            selectedFiles3?.forEach((file, index) => {
                formData.append(`proof${index + 1}`, file);
            });
            formData.append("name", name);
            formData.append("industry", industry);
            formData.append("state", state);
            formData.append("city", city);
            formData.append("profile_summary", profile_summary);
            formData.append("preference", JSON.stringify(formik.values.preferences));
            formData.append("location_interested", location_interested);
            formData.append("range_starting", range_starting);
            formData.append("range_ending", range_ending);
            formData.append("evaluating_aspects", evaluating_aspects);
            formData.append("company", company);
            formData.append("url", url);
            formData.append("description", description);
            formData.append("userId", userId);

            try {
                const response = await addInvestorPost(formData);
                if (response.data.status === true) {
                    toast.success("Post Added Successfull");
                    resetState1();
                    resetState2();
                    resetState3();
                    setLoading(!loading);
                    handleCancelClick();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
    });

    const handleCancelClick = () => {
        resetState1();
        resetState2();
        resetState3();
        // closeAddPost();
        navigate("/");
    };

    // Select state and city
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);

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

    //Handle file change one
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

    const handleFileChange1 = useCallback(
        (event) => {
            const files = Array.from(event.target.files);
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

            const invalidFiles = files.filter((file) => !validImageTypes.includes(file.type));

            if (invalidFiles.length > 0) {
                toast.error("Please select only image files (JPEG, PNG, GIF)");
                return;
            }

            const totalFiles = [...selectedFiles1, ...files];
            if (totalFiles.length > 4) {
                toast.error("Maximum 4 images allowed");
                return;
            }

            setSelectedFiles1(totalFiles);
            formik.setFieldValue("image1", totalFiles);
        },
        [selectedFiles1, setSelectedFiles1, formik]
    );

    const handleDeleteImage = (index) => {
        const newFiles = selectedFiles1.filter((_, i) => i !== index);
        setSelectedFiles1(newFiles);
        formik.setFieldValue("image1", newFiles);
        if (selectedPreviewIndex >= newFiles.length) {
            setSelectedPreviewIndex(Math.max(0, newFiles.length - 1));
        }
    };

    const handleThumbnailClick = (index) => {
        setSelectedPreviewIndex(index);
    };

    // Handle file change two (documents)
    const [selectedPreviewIndexTwo, setSelectedPreviewIndexTwo] = useState(0);

    const handleFileChange2 = useCallback(
        (event) => {
            const files = Array.from(event.target.files);
            const validFileTypes = [
                "application/pdf",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/jpeg",
                "image/png",
                "image/gif",
            ];

            // Filter out invalid file types
            const invalidFiles = files.filter((file) => !validFileTypes.includes(file.type));
            if (invalidFiles.length > 0) {
                toast.error("Please select only valid files (PDF, Excel, Word, Images, etc.)");
                return;
            }

            // Check if total file count exceeds the limit (4 files)
            const totalFiles = [...selectedFiles2, ...files];
            if (totalFiles.length > 4) {
                toast.error("Maximum 4 files allowed");
                return;
            }

            setSelectedFiles2(totalFiles);
            formik.setFieldValue("documents", totalFiles); // Update Formik value
        },
        [selectedFiles2, formik]
    );

    // Handle file deletion for documents
    const handleDeleteFile2 = (index) => {
        const newFiles = selectedFiles2.filter((_, i) => i !== index);
        setSelectedFiles2(newFiles);
        formik.setFieldValue("documents", newFiles); // Update Formik value
        if (selectedPreviewIndexTwo >= newFiles.length) {
            setSelectedPreviewIndexTwo(Math.max(0, newFiles.length - 1)); // Adjust preview index
        }
    };

    const handleThumbnailClick2 = (index) => {
        setSelectedPreviewIndexTwo(index);
    };

    // Handle file change three (proof)
    // const [selectedFiles3, setSelectedFiles3] = useState([]);
    const [selectedPreviewIndexThree, setSelectedPreviewIndexThree] = useState(0);

    const handleFileChange3 = useCallback(
        // console.log();

        (event) => {
            const files = Array.from(event.target.files);
            const validFileTypes = [
                "application/pdf",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/jpeg",
                "image/png",
                "image/gif",
            ];

            console.log("helloosssssss");

            // Filter valid files
            const validFiles = files.filter((file) => validFileTypes.includes(file.type));

            // Check total files including existing ones
            if (validFiles.length + selectedFiles3.length > 4) {
                toast.error("Maximum 4 files allowed");
                return;
            }

            if (validFiles.length < files.length) {
                toast.error("Some files are not supported. Please select valid file types.");
            }

            const newFiles3 = [...selectedFiles3, ...validFiles];
            console.log("pre data", newFiles3);

            setSelectedFiles3(newFiles3);
            formik.setFieldValue("proofs", proof1);
        },
        [selectedFiles3, formik]
    );

    // Handle deletion for proofs
    const handleDeleteFile3 = (index) => {
        const newFiles = selectedFiles3.filter((_, i) => i !== index);
        setSelectedFiles3(newFiles);
        formik.setFieldValue("proofs", newFiles);
        if (selectedPreviewIndexThree >= newFiles.length) {
            setSelectedPreviewIndexThree(Math.max(0, newFiles.length - 1));
        }
    };

    const handleThumbnailClick3 = (index) => {
        setSelectedPreviewIndexThree(index);
    };

    //Handle Preference
    const preferences = ["Buying a business", "Investing in a business", "Lending to a business", "Buying business assets"];

    // Handle checkbox changes
    const handleCheckboxChange = (preference) => {
        const currentPreferences = formik.values.preferences || [];
        const newPreferences = currentPreferences.includes(preference)
            ? currentPreferences.filter((p) => p !== preference)
            : [...currentPreferences, preference];

        formik.setFieldValue("preferences", newPreferences);
    };

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
                            <h2 className="flex justify-center w-full font-bold text-2xl my-10">Add Investor Post</h2>
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
                                    enctype="multipart/form-data"
                                    className=""
                                    method="post"
                                >
                                    <div className=" lg:flex justify-center ">
                                        <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10 ">
                                            {/* name 1*/}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="name"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Investor Name
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

                                            {/* industry  3*/}

                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="industry"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Select Investor' Industry
                                                </label>

                                                <select
                                                    value={formik.values.industry}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="industry"
                                                    id="industry"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                >
                                                    <option value="" disabled>
                                                        Select Industry
                                                    </option>
                                                    <option value="Education">Education</option>
                                                    <option value="IT">IT</option>
                                                    <option value="HealthCare">HealthCare</option>
                                                    <option value="Fashion">Fashion</option>
                                                    <option value="Food">Food</option>
                                                    <option value="Automobile">Automobile</option>
                                                    <option value="Banking">Banking</option>
                                                    <option value="Others">Others</option>
                                                </select>

                                                {formik.values.industry === "Others" && (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Industry"
                                                        value={formik.values.industry || ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        name="industry"
                                                        id="industry"
                                                        className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    />
                                                )}

                                                {formik.touched.industry && formik.errors.industry && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.industry}</p>
                                                )}
                                                {/* {formik.touched.industry &&
                          formik.errors.industry && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.industry}
                            </p>
                          )} */}
                                            </div>

                                            <div className="space-y-6 mb-4">
                                                {/* State Dropdown */}
                                                <div className="relative z-0 w-full group mb-4">
                                                    <label className="block text-lg font-medium text-gray-700 mb-1">
                                                        Select State
                                                    </label>
                                                    <Select
                                                        options={states}
                                                        value={
                                                            states.find((option) => option.value === formik.values.state) ||
                                                            selectedState
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
                                                <Select
                                                    options={cityOptions.map((city) => ({ value: city, label: city }))} // Transform here
                                                    value={cityOptions
                                                        .map((city) => ({ value: city, label: city }))
                                                        .find((option) => option.value === formik.values.city)}
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
                                                    isDisabled={!selectedState}
                                                />
                                                 {formik.touched.city && formik.errors.city && (
                                                        <p className="text-red-600 text-xs mt-1">{formik.errors.city}</p>
                                                    )}
                                            </div>

                                            {/* Describe yourself */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="profile_summary"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Describe yourself
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.profile_summary}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="profile_summary"
                                                    id="profile_summary"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.profile_summary && formik.errors.profile_summary && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.profile_summary}
                                                    </p>
                                                )}
                                            </div>

                                            {/* preference */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                    Choose Your Preferences
                                                </label>
                                                <div className="space-y-3">
                                                    {preferences.map((preference) => (
                                                        <div key={preference} className="flex items-center">
                                                            <input
                                                                type="checkbox"
                                                                id={preference}
                                                                name="preferences"
                                                                value={preference}
                                                                checked={(formik.values.preferences || []).includes(
                                                                    preference
                                                                )}
                                                                onChange={() => handleCheckboxChange(preference)}
                                                                onBlur={formik.handleBlur}
                                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded bg-amber-50 dark:bg-gray-800 dark:border-gray-600 focus:ring-blue-600"
                                                            />
                                                            <label
                                                                htmlFor={preference}
                                                                className="ml-3 text-sm text-gray-900 dark:text-gray-300"
                                                            >
                                                                {preference}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {formik.touched.preferences && formik.errors.preferences && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.preferences}</p>
                                                )}
                                            </div>

                                            {/* location interest */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="location_interested"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Location you are interested in
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.location_interested}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="location_interested"
                                                    id="location_interested"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.location_interested &&
                                                    formik.errors.location_interested && (
                                                        <p className="text-red-600 text-xs mt-1">
                                                            {formik.errors.location_interested}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>

                                        {/* row one col one end */}

                                        <div className=" lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10">
                                            {/* asking price */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="range_starting"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Minumum investement range
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.range_starting}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="range_starting"
                                                    id="range_starting"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.range_starting && formik.errors.range_starting && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.range_starting}
                                                    </p>
                                                )}
                                            </div>

                                            {/* url 17 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="range_ending"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Maximum investement range
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.range_ending}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="range_ending"
                                                    id="range_ending"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.range_ending && formik.errors.range_ending && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.range_ending}
                                                    </p>
                                                )}
                                            </div>

                                            {/*reason 21 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="evaluating_aspects"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Aspects you consider when evaluating a business
                                                </label>
                                                <textarea
                                                    value={formik.values.evaluating_aspects}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="evaluating_aspects"
                                                    id="evaluating_aspects"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.evaluating_aspects && formik.errors.evaluating_aspects && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.evaluating_aspects}
                                                    </p>
                                                )}
                                            </div>

                                            {/* your company name */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="company"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Your company name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.company}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="company"
                                                    id="company"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.company && formik.errors.company && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.company}</p>
                                                )}
                                            </div>

                                            {/* your comp website url*/}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="url"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Company website url
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.url}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="url"
                                                    id="url"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.url && formik.errors.url && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.url}</p>
                                                )}
                                            </div>

                                            {/*about your company */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="description"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    About your company
                                                </label>
                                                <textarea
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="description"
                                                    id="description"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.description && formik.errors.description && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* image section start */}
                                    <div>
                                        {/* box1 */}
                                        <div className="lg:flex justify-center">
                                            <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10" key={1}>
                                                <div>
                                                    <label
                                                        htmlFor="custom-file-upload1"
                                                        className="font-medium text-gray-700 flex justify-center pb-5"
                                                    >
                                                        Upload Investor Image
                                                    </label>

                                                    {!selectedFiles1.length ? (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            <p className="text-red-600 text-xs">{formik.errors.image1}</p>
                                                            <img
                                                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                                                alt="Upload"
                                                                className="w-24 h-24 mt-4"
                                                            />
                                                            <p className="text-blue-700 mt-2">Select Image of Investor</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            <img
                                                                src={URL.createObjectURL(
                                                                    selectedFiles1[selectedPreviewIndex]
                                                                )}
                                                                alt="Selected Investor"
                                                                className="h-full w-full object-contain rounded-2xl"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex-shrink-0">
                                                            <label htmlFor="custom-file-upload1" className="cursor-pointer">
                                                                <HiOutlinePlusSm className="w-16 h-16 bg-amber-200 rounded-md" />
                                                            </label>
                                                            <input
                                                                id="custom-file-upload1"
                                                                type="file"
                                                                name="image1"
                                                                className="hidden"
                                                                multiple
                                                                onChange={handleFileChange1}
                                                                accept="image/jpeg,image/png,image/gif"
                                                            />
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedFiles1.map((file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`relative w-16 h-16 group cursor-pointer ${
                                                                        selectedPreviewIndex === index
                                                                            ? "ring-2 ring-amber-500"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() => handleThumbnailClick(index)}
                                                                >
                                                                    <img
                                                                        src={URL.createObjectURL(file)}
                                                                        alt={`Image ${index + 1}`}
                                                                        className="w-full h-full object-cover rounded-md"
                                                                    />
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent click from triggering thumbnail select
                                                                            handleDeleteImage(index);
                                                                        }}
                                                                        className="absolute -top-2 -right-2 bg-white rounded-full"
                                                                    >
                                                                        <XCircle className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                                    </button>
                                                                    <p className="text-xs text-center mt-1 truncate w-16">
                                                                        {file.name}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Box 2 */}
                                            <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10" key={2}>
                                                <div>
                                                    <label
                                                        htmlFor="custom-file-upload1"
                                                        className="font-medium text-gray-700 flex justify-center pb-5"
                                                    >
                                                        Upload Document
                                                    </label>

                                                    {!selectedFiles2.length ? (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            <p className="text-red-600 text-xs">{formik.errors.doc1}</p>
                                                            <img
                                                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                                                alt="Upload"
                                                                className="w-24 h-24 mt-4"
                                                            />
                                                            <p className="text-blue-700 mt-2">Select Document</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            {selectedFiles2[selectedPreviewIndexTwo]?.type.startsWith(
                                                                "image"
                                                            ) ? (
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        selectedFiles2[selectedPreviewIndexTwo]
                                                                    )}
                                                                    alt="Selected Document"
                                                                    className="h-full w-full object-contain rounded-2xl"
                                                                />
                                                            ) : (
                                                                // Render file type specific icon for non-image files
                                                                <div className="flex justify-center items-center w-full h-full">
                                                                    {selectedFiles2[selectedPreviewIndexTwo]?.type ===
                                                                        "application/pdf" && (
                                                                        <img
                                                                            src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                            alt="PDF"
                                                                            className="w-16 h-16"
                                                                        />
                                                                    )}
                                                                    {selectedFiles2[selectedPreviewIndexTwo]?.type ===
                                                                        "application/vnd.ms-excel" && (
                                                                        <img
                                                                            src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                            alt="Excel"
                                                                            className="w-16 h-16"
                                                                        />
                                                                    )}
                                                                    {selectedFiles2[selectedPreviewIndexTwo]?.type ===
                                                                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                                                        <img
                                                                            src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                            alt="Excel"
                                                                            className="w-16 h-16"
                                                                        />
                                                                    )}
                                                                    <p className="text-xs mt-2">
                                                                        {selectedFiles2[selectedPreviewIndexTwo]?.name}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex-shrink-0">
                                                            <label htmlFor="custom-file-upload2" className="cursor-pointer">
                                                                <HiOutlinePlusSm className="w-16 h-16 bg-amber-200 rounded-md" />
                                                            </label>
                                                            <input
                                                                id="custom-file-upload2"
                                                                type="file"
                                                                name="documents" // Ensure this matches the Formik field name
                                                                className="hidden"
                                                                multiple
                                                                onChange={handleFileChange2}
                                                                accept="image/jpeg,image/png,image/gif,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                            />
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedFiles2.map((file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`relative w-16 h-16 group cursor-pointer ${
                                                                        selectedPreviewIndexTwo === index
                                                                            ? "ring-2 ring-amber-500"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() => handleThumbnailClick2(index)}
                                                                >
                                                                    {file.type.startsWith("image") ? (
                                                                        <img
                                                                            src={URL.createObjectURL(file)}
                                                                            alt={`File ${index + 1}`}
                                                                            className="w-full h-full object-cover rounded-md"
                                                                        />
                                                                    ) : (
                                                                        // Display generic icons for non-image files
                                                                        <div className="flex justify-center items-center w-full h-full">
                                                                            {file.type === "application/pdf" && (
                                                                                <img
                                                                                    src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                    alt="PDF"
                                                                                    className="w-16 h-16"
                                                                                />
                                                                            )}
                                                                            {file.type === "application/vnd.ms-excel" && (
                                                                                <img
                                                                                    src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                    alt="Excel"
                                                                                    className="w-16 h-16"
                                                                                />
                                                                            )}
                                                                            {file.type ===
                                                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                                                                <img
                                                                                    src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                    alt="Excel"
                                                                                    className="w-16 h-16"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent click from triggering thumbnail select
                                                                            handleDeleteFile2(index);
                                                                        }}
                                                                        className="absolute -top-2 -right-2 bg-white rounded-full"
                                                                    >
                                                                        <XCircle className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                                    </button>
                                                                    <p className="text-xs text-center mt-1 truncate w-16">
                                                                        {file.name}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* col2  */}
                                        <div className="lg:flex justify-center">
                                            {/* box3 */}
                                            <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10" key={3}>
                                                <div>
                                                    <label
                                                        htmlFor="custom-file-upload1"
                                                        className="font-medium text-gray-700 flex justify-center pb-5"
                                                    >
                                                        Upload Document
                                                    </label>

                                                    {!selectedFiles3.length ? (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            <p className="text-red-600 text-xs">{formik.errors.doc1}</p>
                                                            <img
                                                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                                                alt="Upload"
                                                                className="w-24 h-24 mt-4"
                                                            />
                                                            <p className="text-blue-700 mt-2">Select Document</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            {selectedFiles3[selectedPreviewIndexThree]?.type.startsWith(
                                                                "image"
                                                            ) ? (
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        selectedFiles3[selectedPreviewIndexThree]
                                                                    )}
                                                                    alt="Selected Document"
                                                                    className="h-full w-full object-contain rounded-2xl"
                                                                />
                                                            ) : (
                                                                // Render file type specific icon for non-image files
                                                                <div className="flex justify-center items-center w-full h-full">
                                                                    {selectedFiles3[selectedPreviewIndexThree]?.type ===
                                                                        "application/pdf" && (
                                                                        <img
                                                                            src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                            alt="PDF"
                                                                            className="w-16 h-16"
                                                                        />
                                                                    )}
                                                                    {selectedFiles3[selectedPreviewIndexThree]?.type ===
                                                                        "application/vnd.ms-excel" && (
                                                                        <img
                                                                            src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                            alt="Excel"
                                                                            className="w-16 h-16"
                                                                        />
                                                                    )}
                                                                    {selectedFiles3[selectedPreviewIndexThree]?.type ===
                                                                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                                                        <img
                                                                            src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                            alt="Excel"
                                                                            className="w-16 h-16"
                                                                        />
                                                                    )}
                                                                    <p className="text-xs mt-2">
                                                                        {selectedFiles3[selectedPreviewIndexThree]?.name}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-4 mt-4">
                                                        <div className="flex-shrink-0">
                                                            <label htmlFor="custom-file-upload3" className="cursor-pointer">
                                                                <HiOutlinePlusSm className="w-16 h-16 bg-amber-200 rounded-md" />
                                                            </label>
                                                            <input
                                                                id="custom-file-upload3"
                                                                type="file"
                                                                name="proof1" // Ensure this matches the Formik field name
                                                                className="hidden"
                                                                multiple
                                                                onChange={handleFileChange3}
                                                                accept="image/jpeg,image/png,image/gif,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                            />
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedFiles3.map((file, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`relative w-16 h-16 group cursor-pointer ${
                                                                        selectedPreviewIndexThree === index
                                                                            ? "ring-2 ring-amber-500"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() => handleThumbnailClick3(index)}
                                                                >
                                                                    {file.type.startsWith("image") ? (
                                                                        <img
                                                                            src={URL.createObjectURL(file)}
                                                                            alt={`File ${index + 1}`}
                                                                            className="w-full h-full object-cover rounded-md"
                                                                        />
                                                                    ) : (
                                                                        // Display generic icons for non-image files
                                                                        <div className="flex justify-center items-center w-full h-full">
                                                                            {file.type === "application/pdf" && (
                                                                                <img
                                                                                    src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                    alt="PDF"
                                                                                    className="w-16 h-16"
                                                                                />
                                                                            )}
                                                                            {file.type === "application/vnd.ms-excel" && (
                                                                                <img
                                                                                    src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                    alt="Excel"
                                                                                    className="w-16 h-16"
                                                                                />
                                                                            )}
                                                                            {file.type ===
                                                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                                                                <img
                                                                                    src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                    alt="Excel"
                                                                                    className="w-16 h-16"
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    )}

                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevent click from triggering thumbnail select
                                                                            handleDeleteFile3(index);
                                                                        }}
                                                                        className="absolute -top-2 -right-2 bg-white rounded-full"
                                                                    >
                                                                        <XCircle className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                                    </button>
                                                                    <p className="text-xs text-center mt-1 truncate w-16">
                                                                        {file.name}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-8 flex justify-center items-center">
                                            {/* <button
                                                type="submit"
                                                className="flex items-center bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-4"
                                            >
                                                <HiOutlineClipboardCopy className="w-9 h-9 mr-2" />
                                                <span className="text-xl">Save Draft</span>
                                            </button> */}
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

export default AddInvestor;
