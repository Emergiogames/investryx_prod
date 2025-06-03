import React, { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";

import {
    // initialInvestorValues,
    validationInvestorSchema,
} from "../../../utils/validation/postInvestorValidation";
import Loader from "../../loader/loader";
import { AdminEditInvestor } from "../../../services/admin/apiMethods";


function InvestorViewPost() {
    const location = useLocation();
    const singlePost = location.state?.postData || {};
    console.log("single post data of Investor", singlePost);
    const initialValues = singlePost;
    const postId = singlePost?.id;

    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    const userId = user.id || "";

    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [selectedFiles3, setSelectedFiles3] = useState([]);
    const [stateCityMapping, setStateCityMapping] = useState({});

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

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        initialValues: { ...initialValues },
        validationSchema: validationInvestorSchema,
        onSubmit: async () => {
            setLoading(loading);
            const {
                name,
                industry,
                state,
                city,
                profile_summary,
                preference,
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
            console.log("PATCH DATA BEFORE APPENDING:", patchData, patchDataProof, patchDataDoc);

            Object.entries(patchData).forEach(([key, file]) => {
                if (file === null) {
                    formData.append(key, "null"); // Explicitly send "null" as a string
                } else if (file instanceof File) {
                    formData.append(key, file); // Append actual file
                } else {
                    console.warn(`Skipping ${key}: Value is invalid`, file);
                }
            });

            Object.entries(patchDataProof).forEach(([key, file]) => {
                if (file === null) {
                    formData.append(key, "null"); // Explicitly send "null" as a string
                } else if (file instanceof File) {
                    formData.append(key, file); // Append actual file
                } else {
                    console.warn(`Skipping ${key}: Value is invalid`, file);
                }
            });

            Object.entries(patchDataDoc).forEach(([key, file]) => {
                if (file === null) {
                    formData.append(key, "null"); // Explicitly send "null" as a string
                } else if (file instanceof File) {
                    formData.append(key, file); // Append actual file
                } else {
                    console.warn(`Skipping ${key}: Value is invalid`, file);
                }
            });

            formData.append("name", name === null ? "" : name);
            formData.append("industry", industry === null ? "" : industry);
            formData.append("state", state === null ? "" : state);
            formData.append("city", city === null ? "" : city);
            formData.append("profile_summary", profile_summary === null ? "" : profile_summary);
            formData.append("preference", formik.values.preference ? JSON.stringify(formik.values.preference) : "[]");
            formData.append("location_interested", location_interested === null ? "" : location_interested);
            formData.append("range_starting", range_starting === null ? "" : range_starting);
            formData.append("range_ending", range_ending === null ? "" : range_ending);
            formData.append("evaluating_aspects", evaluating_aspects === null ? "" : evaluating_aspects);
            formData.append("company", company === null ? "" : company);
            formData.append("url", url === null ? "" : url);
            formData.append("description", description === null || "undefined" ? "" : description);
            formData.append("userId", userId === null ? "" : userId);

            try {
                console.log("FormData entries:");
                for (let pair of formData.entries()) {
                    console.log(pair[0], pair[1]);
                }

                const response = await AdminEditInvestor(formData, postId);

                if (response?.data?.status === true ) {      
                    console.log("hello mohid");
                             
                    toast.success("Investor Post Updated Successfull");
                    resetState1();
                    resetState2();
                    resetState3();
                    setLoading(!loading);
                    navigate("/admin/postVerify")
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        },
    });

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
        // console.log("777 ::", initialValues?.state);
        // console.log("888 ::", Object.keys(stateCityMapping));
        // console.log("999 ::", "Cities found:", newCityOptions);

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

    //Preview setup
    const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
    const [selectedPreviewIndexTwo, setSelectedPreviewIndexTwo] = useState(0);
    const [selectedPreviewIndexThree, setSelectedPreviewIndexThree] = useState(0);

    //part one
    const [imageURLs1, setImageURLs1] = useState([]); // Existing image URLs
    const [originalImageURLs, setOriginalImageURLs] = useState([]); // Track original state

    const [proofURLs2, setProofURLs2] = useState([]); // Existing proof URLs
    const [originalProofURLs, setOriginalProofURLs] = useState([]); // Track original proof state

    const [docURLs3, setDocURLs3] = useState([]); // Existing document URLs
    const [originalDocURLs, setOriginalDocURLs] = useState([]); // Track original document state

    //to initilize images and documents for edit
    useEffect(() => {
        if (singlePost) {
            // Ensure data is valid before setting state
            const images = ["image1", "image2", "image3", "image4"]
                .map((key) => singlePost[key])
                .filter((file) => file && typeof file === "string"); // Ensure it's a URL
            const proofs = ["proof1", "proof2", "proof3", "proof4"]
                .map((key) => singlePost[key])
                .filter((file) => file && typeof file === "string"); // Ensure it's a URL
            const documents = ["doc1", "doc2", "doc3", "doc4"]
                .map((key) => singlePost[key])
                .filter((file) => file && typeof file === "string"); // Ensure it's a URL

            setImageURLs1(images);
            setOriginalImageURLs(images); // Store the original sta
            setProofURLs2(proofs);
            setOriginalProofURLs(proofs);
            setDocURLs3(documents);
            setOriginalDocURLs(documents);
        }
    }, [singlePost]);

    console.log("post urlsss::", imageURLs1, proofURLs2, docURLs3);

    //Part one
    const handleFileChange1 = (event) => {
        const files = Array.from(event.target.files);
        setImageURLs1((prevImages) => {
            let updatedImages = [...prevImages];

            // Find next available slot for new files
            let availableIndex = updatedImages.findIndex((img) => img === null);

            files.forEach((file) => {
                if (availableIndex !== -1) {
                    updatedImages[availableIndex] = file;
                    availableIndex = updatedImages.findIndex((img) => img === null);
                } else if (updatedImages.length < 4) {
                    updatedImages.push(file);
                }
            });

            return updatedImages.slice(0, 4);
        });
    };

    //Handle file deletion 1
    const handleDeleteImage = (index) => {
        setImageURLs1((prevImages) => {
            let updatedImages = [...prevImages];
            updatedImages[index] = null; // Mark as removed
            return updatedImages;
        });
    };

    // useEffect to update patchData after imageURLs1 updates
    useEffect(() => {
        preparePatchData();
    }, [imageURLs1]);

    // Function to prepare PATCH data
    const [patchData, setPatchData] = useState({});

    const preparePatchData = () => {
        const keys = ["image1", "image2", "image3", "image4"];
        let patchData = {};

        // Compare current state with original state to detect changes
        keys.forEach((key, index) => {
            const currentImage = imageURLs1[index];
            const originalImage = originalImageURLs[index];

            // Case 1: Image was removed (current is null, original was not null)
            if (currentImage === null && originalImage !== null) {
                patchData[key] = null;
            }
            // Case 2: Image was added or replaced (current is a File, original was not a File)
            else if (currentImage instanceof File && originalImage !== currentImage) {
                patchData[key] = currentImage;
            }
        });

        console.log("Current state:", imageURLs1);
        console.log("Original state:", originalImageURLs);
        console.log("Final patch data:", patchData);

        setPatchData(patchData);
    };

    //Part Two
    const handleFileChange2 = (event) => {
        const files = Array.from(event.target.files);
        const validFilesTypes = [
            "application/pdf",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/png",
            "image/gif",
        ];
        const validFilesProof = files.filter((file) => validFilesTypes.includes(file.type));
        if (validFilesProof.length > 4) {
            toast.error("You can only upload up to 4 Documents. Please delete an existing file before adding a new one.");
            return;
        }
        setProofURLs2((prevDoc) => {
            let updatedProofs = [...prevDoc];
            let availableIndex = updatedProofs.findIndex((img) => img === null);

            files.forEach((file) => {
                if (availableIndex !== -1) {
                    updatedProofs[availableIndex] = file;
                    availableIndex = updatedProofs.findIndex((img) => img === null);
                } else if (updatedProofs.length < 4) {
                    updatedProofs.push(file);
                }
            });
            return updatedProofs.slice(0, 4);
        });
    };

    const handleDeleteProof = (index) => {
        setProofURLs2((prevDoc) => {
            let updatedProofs = [...prevDoc];

            // Remove the item and shift the rest left
            updatedProofs.splice(index, 1);

            // Maintain array length of 4 by adding null at the end
            while (updatedProofs.length < 4) {
                updatedProofs.push(null);
            }

            return updatedProofs;
        });
    };

    useEffect(() => {
        preparePatchDataTwo();
    }, [proofURLs2, setOriginalProofURLs]);

    const [patchDataProof, setPatchDataProof] = useState({});

    const preparePatchDataTwo = () => {
        const keys = ["proof1", "proof2", "proof3", "proof4"];
        const patchDataProof = {};

        keys.forEach((key, index) => {
            const currentProof = proofURLs2[index];
            const originalProof = originalProofURLs[index];

            if (currentProof === null && originalProof !== null) {
                patchDataProof[key] = null;
            } else if (currentProof instanceof File && originalProof !== currentProof) {
                patchDataProof[key] = currentProof;
            }
        });

        console.log("Proof: Current state:", proofURLs2);
        console.log("Proof: Original state:", originalProofURLs);
        console.log("Proof: Final patch data:", patchDataProof);

        setPatchDataProof(patchDataProof);
    };

    //Part three
    const handleFileChange3 = (event) => {
        const files = Array.from(event.target.files);
        const validFilesTypes = [
            "application/pdf",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/png",
            "image/gif",
        ];
        const validFilesDoc = files.filter((file) => validFilesTypes.includes(file.type));
        if (validFilesDoc.length > 4) {
            toast.error("You can only upload up to 4 Documents. Please delete an existing file before adding a new one.");
            return;
        }
        setDocURLs3((prevDoc) => {
            let updatedDocs = [...prevDoc];
            let availableIndex = updatedDocs.findIndex((img) => img === null);

            files.forEach((file) => {
                if (availableIndex !== -1) {
                    updatedDocs[availableIndex] = file;
                    availableIndex = updatedDocs.findIndex((img) => img === null);
                } else if (updatedDocs.length < 4) {
                    updatedDocs.push(file);
                }
            });
            return updatedDocs.slice(0, 4);
        });
    };

    const handleDeleteDoc = (index) => {
        setDocURLs3((prevDoc) => {
            let updatedDocs = [...prevDoc];

            // Remove the item and shift the rest left
            updatedDocs.splice(index, 1);

            // Maintain array length of 4 by adding null at the end
            while (updatedDocs.length < 4) {
                updatedDocs.push(null);
            }

            return updatedDocs;
        });
    };

    useEffect(() => {
        preparePatchDataThree();
    }, [docURLs3, originalDocURLs]);

    const [patchDataDoc, setPatchDataDoc] = useState({});

    const preparePatchDataThree = () => {
        const keys = ["doc1", "doc2", "doc3", "doc4"];
        const patchDataDoc = {};

        keys.forEach((key, index) => {
            const currentDoc = docURLs3[index];
            const originalDoc = originalDocURLs[index];

            if (currentDoc === null && originalDoc !== null) {
                patchDataDoc[key] = null;
            } else if (currentDoc instanceof File && originalDoc !== currentDoc) {
                patchDataDoc[key] = currentDoc;
            }
        });

        console.log("Document: Current state:", docURLs3);
        console.log("Document: Original state:", originalDocURLs);
        console.log("Document: Final patch data:", patchDataDoc);

        setPatchDataDoc(patchDataDoc);
    };

    const handleThumbnailClick3 = (index) => {
        setSelectedPreviewIndexThree(index);
    };

    //Handle Preference
    const preferences = ["Buying a business", "Investing in a business", "Lending to a business", "Buying business assets"];

    // Handle checkbox changes
    const handleCheckboxChange = (preference) => {
        const currentPreferences = formik.values.preference || [];
        const newPreferences = currentPreferences.includes(preference)
            ? currentPreferences.filter((p) => p !== preference)
            : [...currentPreferences, preference];

        formik.setFieldValue("preference", newPreferences);
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
                            <h2 className="flex justify-center w-full font-bold text-2xl my-10">Edit Investor Post</h2>
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
                                                <div className="relative z-0 w-full group mb-5">
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
                                                                name="preference"
                                                                value={preference}
                                                                checked={(formik.values.preference || []).includes(
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
                                                {formik.touched.preference && formik.errors.preference && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.preference}</p>
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
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* image section start */}

                                    <div>
                                        {/* box1 */}
                                        <div className="lg:flex justify-center">
                                            <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10">
                                                <label className="font-medium text-gray-700 flex justify-center pb-5">
                                                    Upload Business Image
                                                </label>

                                                <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                    {imageURLs1.length > 0 ? (
                                                        <img
                                                            src={
                                                                imageURLs1[selectedPreviewIndex] instanceof File
                                                                    ? URL.createObjectURL(imageURLs1[selectedPreviewIndex])
                                                                    : imageURLs1[selectedPreviewIndex]
                                                            }
                                                            alt="Selected Business"
                                                            className="h-full w-full object-contain rounded-2xl"
                                                        />
                                                    ) : (
                                                        <>
                                                            <img
                                                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                                                alt="Upload"
                                                                className="w-24 h-24 mt-4"
                                                            />
                                                            <p className="text-blue-700 mt-2">Select Image of Business</p>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 mt-4">
                                                    <label htmlFor="file-upload" className="cursor-pointer">
                                                        <HiOutlinePlusSm className="w-16 h-16 bg-amber-200 rounded-md" />
                                                    </label>
                                                    <input
                                                        id="file-upload"
                                                        type="file"
                                                        className="hidden"
                                                        multiple
                                                        accept="image/jpeg,image/png,image/gif"
                                                        onChange={handleFileChange1}
                                                    />

                                                    <div className="flex flex-wrap gap-2">
                                                        {imageURLs1.map(
                                                            (img, index) =>
                                                                img && (
                                                                    <div
                                                                        key={index}
                                                                        className={`relative w-16 h-16 group cursor-pointer ${
                                                                            selectedPreviewIndex === index
                                                                                ? "ring-2 ring-amber-500"
                                                                                : ""
                                                                        }`}
                                                                        onClick={() => setSelectedPreviewIndex(index)}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                img instanceof File
                                                                                    ? URL.createObjectURL(img)
                                                                                    : img
                                                                            }
                                                                            alt={`Image ${index + 1}`}
                                                                            className="w-full h-full object-cover rounded-md"
                                                                        />
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleDeleteImage(index);
                                                                            }}
                                                                            className="absolute -top-2 -right-2 bg-white rounded-full"
                                                                        >
                                                                            <XCircle className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                                        </button>
                                                                    </div>
                                                                )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* </div> */}

                                            {/* Box 2 */}
                                            <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10" key={2}>
                                                <div>
                                                    <label
                                                        htmlFor="custom-file-upload1"
                                                        className="font-medium text-gray-700 flex justify-center pb-5"
                                                    >
                                                        Upload Proof
                                                    </label>

                                                    {!proofURLs2.length || proofURLs2.every((file) => file === null) ? (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            <p className="text-red-600 text-xs">{formik.errors.proof2}</p>
                                                            <img
                                                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                                                alt="Upload"
                                                                className="w-24 h-24 mt-4"
                                                            />
                                                            <p className="text-blue-700 mt-2">Select files for Proof</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            {proofURLs2.length > 0
                                                                ? (() => {
                                                                      let selectedFile =
                                                                          selectedPreviewIndexTwo < proofURLs2.length
                                                                              ? proofURLs2[selectedPreviewIndexTwo]
                                                                              : null;

                                                                      if (typeof selectedFile === "string") {
                                                                          // If the file is a URL (pre-uploaded documents)
                                                                          const fileExtension = selectedFile
                                                                              .split(".")
                                                                              .pop()
                                                                              .toLowerCase();
                                                                          if (
                                                                              ["jpg", "jpeg", "png", "gif"].includes(
                                                                                  fileExtension
                                                                              )
                                                                          ) {
                                                                              return (
                                                                                  <img
                                                                                      src={selectedFile}
                                                                                      alt="Selected Document"
                                                                                      className="h-full w-full object-contain rounded-2xl"
                                                                                  />
                                                                              );
                                                                          } else if (["pdf"].includes(fileExtension)) {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                      alt="PDF"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          } else if (
                                                                              ["doc", "docx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <p className="text-blue-500 text-lg font-bold">
                                                                                      WORD
                                                                                  </p>
                                                                              );
                                                                          } else if (
                                                                              ["xls", "xlsx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                      alt="Excel"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          }
                                                                      } else if (selectedFile instanceof File) {
                                                                          // If the file is from fileObjects3 (newly uploaded)
                                                                          const fileType = selectedFile.type;
                                                                          if (fileType.startsWith("image/")) {
                                                                              return (
                                                                                  <img
                                                                                      src={URL.createObjectURL(
                                                                                          selectedFile
                                                                                      )}
                                                                                      alt="Selected Document"
                                                                                      className="h-full w-full object-contain rounded-2xl"
                                                                                  />
                                                                              );
                                                                          } else if (fileType === "application/pdf") {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                      alt="PDF"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/msword" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                          ) {
                                                                              return (
                                                                                  <p className="text-blue-500 text-lg font-bold">
                                                                                      WORD
                                                                                  </p>
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/vnd.ms-excel" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                                          ) {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                      alt="Excel"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          }
                                                                      }
                                                                      return (
                                                                          <p className="text-red-500">
                                                                              Unsupported file type
                                                                          </p>
                                                                      );
                                                                  })()
                                                                : null}
                                                        </div>
                                                    )}

                                                    {/* file input */}
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <label htmlFor="custom-file-upload3" className="cursor-pointer">
                                                            <HiOutlinePlusSm className="w-16 h-16 bg-amber-200 rounded-md" />
                                                        </label>
                                                        <input
                                                            id="custom-file-upload3"
                                                            type="file"
                                                            name="proof3"
                                                            className="hidden"
                                                            multiple
                                                            onChange={handleFileChange2}
                                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                                                        />
                                                        {/* Thumbnails */}
                                                        <div className="flex flex-wrap gap-2 mt-4">
                                                            {proofURLs2.filter((file) => file !== null).length > 0 &&
                                                                proofURLs2
                                                                    .filter((file) => file !== null)
                                                                    .map((file, index) => {
                                                                        let fileType = "";
                                                                        let fileURL = "";

                                                                        if (typeof file === "string") {
                                                                            fileURL = file;
                                                                            fileType = file.split(".").pop().toLowerCase();
                                                                        } else if (file instanceof File) {
                                                                            fileURL = URL.createObjectURL(file);
                                                                            fileType = file.type;
                                                                        }

                                                                        const isImage =
                                                                            ["jpg", "jpeg", "png", "gif"].includes(
                                                                                fileType
                                                                            ) || fileType.startsWith("image/");
                                                                        const isPDF =
                                                                            fileType === "pdf" ||
                                                                            fileType === "application/pdf";
                                                                        const isWord =
                                                                            ["doc", "docx"].includes(fileType) ||
                                                                            fileType === "application/msword" ||
                                                                            fileType ===
                                                                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                                                                        const isExcel =
                                                                            ["xls", "xlsx"].includes(fileType) ||
                                                                            fileType === "application/vnd.ms-excel" ||
                                                                            fileType ===
                                                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                className={`relative w-16 h-16 group cursor-pointer ${
                                                                                    selectedPreviewIndexTwo === index
                                                                                        ? "ring-2 ring-amber-500"
                                                                                        : ""
                                                                                }`}
                                                                                onClick={() =>
                                                                                    setSelectedPreviewIndexTwo(index)
                                                                                }
                                                                            >
                                                                                {isImage ? (
                                                                                    <img
                                                                                        src={fileURL}
                                                                                        alt={`File ${index + 1}`}
                                                                                        className="w-full h-full object-cover rounded-md"
                                                                                        onLoad={() =>
                                                                                            typeof file !== "string" &&
                                                                                            URL.revokeObjectURL(fileURL)
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <div className="w-full h-full flex items-center justify-center rounded-md">
                                                                                        {isPDF ? (
                                                                                            <img
                                                                                                src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                                alt="PDF"
                                                                                                className="w-16 h-16"
                                                                                            />
                                                                                        ) : isWord ? (
                                                                                            <p className="text-blue-500 text-xs font-bold">
                                                                                                WORD
                                                                                            </p>
                                                                                        ) : isExcel ? (
                                                                                            <img
                                                                                                src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                                alt="Excel"
                                                                                                className="w-16 h-16"
                                                                                            />
                                                                                        ) : (
                                                                                            <p className="text-red-500">
                                                                                                Unsupported file type
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )}

                                                                                {/* Delete Button */}
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={(event) =>
                                                                                        handleDeleteProof(index, event)
                                                                                    }
                                                                                    className="absolute -top-2 -right-2 bg-white rounded-full"
                                                                                >
                                                                                    <XCircle className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* col2  */}
                                        <div className="lg:flex justify-center">
                                            {/* box3 */}
                                            <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10">
                                                <div>
                                                    <label
                                                        htmlFor="custom-file-upload1"
                                                        className="font-medium text-gray-700 flex justify-center pb-5"
                                                    >
                                                        Upload Documents
                                                    </label>

                                                    {/* Upload Area */}

                                                    {!docURLs3.length || docURLs3.every((file) => file === null) ? (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            <p className="text-red-600 text-xs">No files selected</p>
                                                            <img
                                                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                                                alt="Upload"
                                                                className="w-24 h-24 mt-4"
                                                            />
                                                            <p className="text-blue-700 mt-2">Select files for Document</p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                                                            {docURLs3.length > 0
                                                                ? (() => {
                                                                      let selectedFile =
                                                                          selectedPreviewIndexThree < docURLs3.length
                                                                              ? docURLs3[selectedPreviewIndexThree]
                                                                              : null;

                                                                      if (typeof selectedFile === "string") {
                                                                          // If the file is a URL (pre-uploaded documents)
                                                                          const fileExtension = selectedFile
                                                                              .split(".")
                                                                              .pop()
                                                                              .toLowerCase();
                                                                          if (
                                                                              ["jpg", "jpeg", "png", "gif"].includes(
                                                                                  fileExtension
                                                                              )
                                                                          ) {
                                                                              return (
                                                                                  <img
                                                                                      src={selectedFile}
                                                                                      alt="Selected Document"
                                                                                      className="h-full w-full object-contain rounded-2xl"
                                                                                  />
                                                                              );
                                                                          } else if (["pdf"].includes(fileExtension)) {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                      alt="PDF"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          } else if (
                                                                              ["doc", "docx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <p className="text-blue-500 text-lg font-bold">
                                                                                      WORD
                                                                                  </p>
                                                                              );
                                                                          } else if (
                                                                              ["xls", "xlsx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                      alt="Excel"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          }
                                                                      } else if (selectedFile instanceof File) {
                                                                          // If the file is from fileObjects2 (newly uploaded)
                                                                          const fileType = selectedFile.type;
                                                                          if (fileType.startsWith("image/")) {
                                                                              return (
                                                                                  <img
                                                                                      src={URL.createObjectURL(
                                                                                          selectedFile
                                                                                      )}
                                                                                      alt="Selected Document"
                                                                                      className="h-full w-full object-contain rounded-2xl"
                                                                                  />
                                                                              );
                                                                          } else if (fileType === "application/pdf") {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                      alt="PDF"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/msword" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                          ) {
                                                                              return (
                                                                                  <p className="text-blue-500 text-lg font-bold">
                                                                                      WORD
                                                                                  </p>
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/vnd.ms-excel" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                                          ) {
                                                                              return (
                                                                                  <img
                                                                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                      alt="Excel"
                                                                                      className="w-16 h-16"
                                                                                  />
                                                                              );
                                                                          }
                                                                      }
                                                                      return (
                                                                          <p className="text-red-500">
                                                                              Unsupported file type
                                                                          </p>
                                                                      );
                                                                  })()
                                                                : null}
                                                        </div>
                                                    )}

                                                    {/* File Input */}
                                                    <div className="flex items-center gap-4 mt-4">
                                                        <label htmlFor="custom-file-upload2" className="cursor-pointer">
                                                            <HiOutlinePlusSm className="w-16 h-16 bg-amber-200 rounded-md" />
                                                        </label>
                                                        <input
                                                            id="custom-file-upload2"
                                                            type="file"
                                                            name="doc1"
                                                            className="hidden"
                                                            multiple
                                                            onChange={handleFileChange3}
                                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                                                        />
                                                        {/* Thumbnails */}
                                                        <div className="flex flex-wrap gap-2 mt-4">
                                                            {docURLs3.filter((file) => file !== null).length > 0 &&
                                                                docURLs3
                                                                    .filter((file) => file !== null)
                                                                    .map((file, index) => {
                                                                        let fileType = "";
                                                                        let fileURL = "";

                                                                        if (typeof file === "string") {
                                                                            fileURL = file;
                                                                            fileType = file.split(".").pop().toLowerCase();
                                                                        } else if (file instanceof File) {
                                                                            fileURL = URL.createObjectURL(file);
                                                                            fileType = file.type;
                                                                        }

                                                                        const isImage =
                                                                            ["jpg", "jpeg", "png", "gif"].includes(
                                                                                fileType
                                                                            ) || fileType.startsWith("image/");
                                                                        const isPDF =
                                                                            fileType === "pdf" ||
                                                                            fileType === "application/pdf";
                                                                        const isWord =
                                                                            ["doc", "docx"].includes(fileType) ||
                                                                            fileType === "application/msword" ||
                                                                            fileType ===
                                                                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                                                                        const isExcel =
                                                                            ["xls", "xlsx"].includes(fileType) ||
                                                                            fileType === "application/vnd.ms-excel" ||
                                                                            fileType ===
                                                                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                className={`relative w-16 h-16 group cursor-pointer ${
                                                                                    selectedPreviewIndexThree === index
                                                                                        ? "ring-2 ring-amber-500"
                                                                                        : ""
                                                                                }`}
                                                                                onClick={() =>
                                                                                    setSelectedPreviewIndexThree(index)
                                                                                }
                                                                            >
                                                                                {isImage ? (
                                                                                    <img
                                                                                        src={fileURL}
                                                                                        alt={`File ${index + 1}`}
                                                                                        className="w-full h-full object-cover rounded-md"
                                                                                        onLoad={() =>
                                                                                            typeof file !== "string" &&
                                                                                            URL.revokeObjectURL(fileURL)
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    <div className="w-full h-full flex items-center justify-center rounded-md">
                                                                                        {isPDF ? (
                                                                                            <img
                                                                                                src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                                alt="PDF"
                                                                                                className="w-16 h-16"
                                                                                            />
                                                                                        ) : isWord ? (
                                                                                            <p className="text-blue-500 text-xs font-bold">
                                                                                                WORD
                                                                                            </p>
                                                                                        ) : isExcel ? (
                                                                                            <img
                                                                                                src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                                alt="Excel"
                                                                                                className="w-16 h-16"
                                                                                            />
                                                                                        ) : (
                                                                                            <p className="text-red-500">
                                                                                                Unsupported file type
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )}

                                                                                {/* Delete Button */}
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={(event) =>
                                                                                        handleDeleteDoc(index, event)
                                                                                    }
                                                                                    className="absolute -top-2 -right-2 bg-white rounded-full"
                                                                                >
                                                                                    <XCircle className="w-5 h-5 text-red-500 hover:text-red-700" />
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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

export default InvestorViewPost;
