import React, { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { editBusinessPost } from "../../services/user/apiMethods";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";
import { FaFileDownload } from "react-icons/fa";

import {
    // initialValues,
    validationSchema,
} from "../../utils/validation/postValidation";
import Loader from "../loader/loader";

function EditBusPost() {
    const location = useLocation();
    const singlePost = location.state?.singlePost || {};
    console.log("single post dataaa", singlePost);
    const initialValues = singlePost;
    const postId = singlePost?.id;

    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    const userId = user.id || "";
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
        navigate("/user-profile");
    };
    //cleanup functions for blobs
    const resetState1 = () => {
        formik.resetForm();
        // setFileObjects1([]);
        // setImageURLs1([]);
    };
    const resetState2 = () => {
        formik.resetForm();
        // setFileObjects2([]);
        // setDocumentURLs2([]);
    };
    const resetState3 = () => {
        formik.resetForm();
        // setFileObjects3([]);
        // setProofURLs3([]);
    };

    const formik = useFormik({
        initialValues: { ...initialValues },
        validationSchema: validationSchema,
        onSubmit: async () => {
            setLoading(loading);
            const {
                name,
                industry,
                establish_yr,
                single_desc,
                description,
                address_1,
                address_2,
                state,
                pin,
                city,
                employees,
                entity,
                avg_monthly,
                latest_yearly,
                ebitda,
                // rate,
                type_sale,
                url,
                top_selling,
                features,
                facility,
                reason,
                income_source,
                asking_price,
            } = formik.values;

            const formData = new FormData();

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
            formData.append("establish_yr", establish_yr === null ? "" : establish_yr);
            formData.append("single_desc", single_desc === null ? "" : single_desc);
            formData.append("description", description === null ? "" : description);
            formData.append("address_1", address_1 === null ? "" : address_1);
            formData.append("address_2", address_2 === null ? "" : address_2);
            formData.append("state", state === null ? "" : state);
            formData.append("pin", pin === null ? "" : pin);
            formData.append("city", city === null ? "" : city);
            formData.append("employees", employees === null ? "" : employees);
            formData.append("entity", entity === null ? "" : entity);
            formData.append("avg_monthly", avg_monthly === null ? "" : avg_monthly);
            formData.append("latest_yearly", latest_yearly === null ? "" : latest_yearly);
            formData.append("ebitda", ebitda === null ? "" : ebitda);
            // formData.append("rate", rate === null || undefined ? "" : rate);
            formData.append("type_sale", type_sale === null ? "" : type_sale);
            formData.append("url", url === null ? "" : url);
            formData.append("top_selling", top_selling === null ? "" : top_selling);
            formData.append("features", features === null ? "" : features);
            formData.append("facility", facility === null ? "" : facility);
            formData.append("reason", reason === null ? "" : reason);
            formData.append("income_source", income_source === null ? "" : income_source);
            formData.append("userId", userId === null ? "" : userId);
            formData.append("asking_price", asking_price === null ? "" : asking_price);

            try {
                const response = await editBusinessPost(formData, postId);
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

    // useEffect(() => {
    //     if (singlePost.state) {
    //         setSelectedState({ value: singlePost.state, label: singlePost.state });
    //         setCityOptions(stateCityMapping[singlePost.state] || []);
    //     }
    //     if (singlePost.city) {
    //         setSelectedCity({ value: singlePost.city, label: singlePost.city });
    //     }
    // }, [singlePost]);

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
                            <h2 className="flex justify-center w-full font-bold text-2xl my-10">Edit Business Post</h2>
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
                                                    htmlFor="income_source"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Business Name
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

                                            {/* single line business 2*/}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="single_desc"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Describe the business in a single line
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.single_desc}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="single_desc"
                                                    id="single_desc"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.single_desc && formik.errors.single_desc && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.single_desc}</p>
                                                )}
                                            </div>

                                            {/* industry  3*/}

                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="industry"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Select Business' Industry
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
                                                        value={formik.values.otherIndustry || ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        name="otherIndustry"
                                                        id="otherIndustry"
                                                        className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    />
                                                )}

                                                {formik.touched.industry && formik.errors.industry && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.industry}</p>
                                                )}
                                                {formik.touched.otherIndustry && formik.errors.otherIndustry && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.otherIndustry}
                                                    </p>
                                                )}
                                            </div>

                                            {/* establish 4 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="establish_yr"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Establish Year
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.establish_yr}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="establish_yr"
                                                    id="establish_yr"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.establish_yr && formik.errors.establish_yr && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.establish_yr}
                                                    </p>
                                                )}
                                            </div>
                                            {/* address_One */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="address_1"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Address One
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.address_1}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="address_1"
                                                    id="address_1"
                                                    className="block py-4 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    style={{ lineHeight: "2rem" }}
                                                />
                                                {formik.touched.address_1 && formik.errors.address_1 && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.address_1}</p>
                                                )}
                                            </div>
                                            {/* address_Two */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="address_2"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Address two
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.address_2}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="address_2"
                                                    id="address_2"
                                                    className="block py-4 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    style={{ lineHeight: "2rem" }}
                                                />
                                                {formik.touched.address_2 && formik.errors.address_2 && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.address_2}</p>
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

                                            {/* pin 7 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="pin"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Pin
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.pin}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="pin"
                                                    id="pin"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.pin && formik.errors.pin && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.pin}</p>
                                                )}
                                            </div>

                                            {/* No for employees */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="employees"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    How many permanent employees does the business have?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.employees}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="employees"
                                                    id="employees"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.employees && formik.errors.employees && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.employees}</p>
                                                )}
                                            </div>

                                            {/* Legal Entity type */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="entity"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Business Legal Entity Type
                                                </label>

                                                <select
                                                    value={formik.values.entity}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="entity"
                                                    id="entity"
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

                                                {formik.values.entity === "Others" && (
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Industry"
                                                        value={formik.values.entity || ""}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        name="entity"
                                                        id="entity"
                                                        className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    />
                                                )}

                                                {formik.touched.entity && formik.errors.entity && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.entity}</p>
                                                )}
                                            </div>
                                            {/* Monthly revenue */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="avg_monthly"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    At present, what is your average monthly sales?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.avg_monthly}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="avg_monthly"
                                                    id="avg_monthly"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.avg_monthly && formik.errors.avg_monthly && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.avg_monthly}</p>
                                                )}
                                            </div>
                                            {/* Monthly revenue */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="latest_yearly"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    What was your latest reported yearly sales?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.latest_yearly}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="latest_yearly"
                                                    id="latest_yearly"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.latest_yearly && formik.errors.latest_yearly && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.latest_yearly}
                                                    </p>
                                                )}
                                            </div>
                                            {/* Income Source 14 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="ebitda"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    What is the EBITDA / Operating Profit Margin Percentage?
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.ebitda}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="ebitda"
                                                    id="ebitda"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.ebitda && formik.errors.ebitda && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.ebitda}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* row one col one end */}

                                        <div className=" lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10">
                                            {/* type sale 16 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="type_sale"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Preferred Type of Selling
                                                </label>
                                                <select
                                                    value={formik.values.type_sale}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name="type_sale"
                                                    id="type_sale"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                >
                                                    <option value="" disabled>
                                                        Select an option
                                                    </option>
                                                    <option value="Investment">Investment</option>
                                                    <option value="Selling">Selling</option>
                                                </select>
                                                {formik.touched.type_sale && formik.errors.type_sale && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.type_sale}</p>
                                                )}
                                            </div>
                                            {/* asking price */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="asking_price"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Asking Price of Business
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formik.values.asking_price}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="asking_price"
                                                    id="asking_price"
                                                    className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                />
                                                {formik.touched.asking_price && formik.errors.asking_price && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.asking_price}
                                                    </p>
                                                )}
                                            </div>

                                            {/* url 17 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="url"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Business Website URL
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

                                            {/* top_selling 18 */}

                                            {/* features 19 */}

                                            {/* facility 20 */}

                                            {/*reason 21 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="reason"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Reason for sale
                                                </label>
                                                <textarea
                                                    value={formik.values.reason}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="reason"
                                                    id="reason"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.reason && formik.errors.reason && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.reason}</p>
                                                )}
                                            </div>

                                            {/* Description of business */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="description"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Detailed Description of the Business
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

                                            {/* Income Source 25 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="top_selling"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1 "
                                                >
                                                    What are the business's top-selling products and services, who uses
                                                    them, and how?
                                                </label>
                                                <textarea
                                                    value={formik.values.top_selling}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="top_selling"
                                                    id="top_selling"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.top_selling && formik.errors.top_selling && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.top_selling}</p>
                                                )}
                                            </div>

                                            {/* Income Source 24 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="features"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Mention highlights of the business including number of clients, revenue
                                                    model, promoter experience, business relationships, awards, etc
                                                </label>
                                                <textarea
                                                    value={formik.values.features}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="features"
                                                    id="features"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.features && formik.errors.features && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.features}</p>
                                                )}
                                            </div>

                                            {/*income source 26 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="facility"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    Describe your facility such as built-up area, number of floors,
                                                    rental/lease details
                                                </label>
                                                <textarea
                                                    value={formik.values.facility}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="facility"
                                                    id="facility"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.facility && formik.errors.facility && (
                                                    <p className="text-red-600 text-xs mt-1">{formik.errors.facility}</p>
                                                )}
                                            </div>

                                            {/*income source 27 */}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="income_source"
                                                    className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                                                >
                                                    How is the business funded presently? Mention all debts/loans
                                                    outstanding and the total number of shareholders/owners of the business
                                                    with percentage ownership.
                                                </label>
                                                <textarea
                                                    value={formik.values.income_source}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    autoComplete="off"
                                                    name="income_source"
                                                    id="income_source"
                                                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                    rows={4}
                                                />
                                                {formik.touched.income_source && formik.errors.income_source && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        {formik.errors.income_source}
                                                    </p>
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

                                                <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52 relative">
                                                    {imageURLs1.length > 0 ? (
                                                        <>
                                                            <img
                                                                src={
                                                                    imageURLs1[selectedPreviewIndex] instanceof File
                                                                        ? URL.createObjectURL(
                                                                              imageURLs1[selectedPreviewIndex]
                                                                          )
                                                                        : imageURLs1[selectedPreviewIndex]
                                                                }
                                                                alt="Selected Business"
                                                                className="h-full w-full object-contain rounded-2xl"
                                                            />

                                                            {/* Download Button */}
                                                            <a
                                                                href={
                                                                    imageURLs1[selectedPreviewIndex] instanceof File
                                                                        ? URL.createObjectURL(
                                                                              imageURLs1[selectedPreviewIndex]
                                                                          )
                                                                        : imageURLs1[selectedPreviewIndex]
                                                                }
                                                                download={`business_image_${selectedPreviewIndex + 1}.jpg`}
                                                                className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                            >
                                                                <FaFileDownload />
                                                            </a>
                                                        </>
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

                                                                          // Display different file types
                                                                          if (
                                                                              ["jpg", "jpeg", "png", "gif"].includes(
                                                                                  fileExtension
                                                                              )
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative w-full h-full">
                                                                                      <img
                                                                                          src={selectedFile}
                                                                                          alt="Selected Document"
                                                                                          className="h-full w-full object-contain rounded-2xl"
                                                                                      />
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the image
                                                                                          download={`proof_image_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.jpg`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (["pdf"].includes(fileExtension)) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                          alt="PDF"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the PDF
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.pdf`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              ["doc", "docx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <p className="text-blue-500 text-lg font-bold">
                                                                                          WORD
                                                                                      </p>
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the document
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.docx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              ["xls", "xlsx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                          alt="Excel"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the Excel file
                                                                                          download={`proof_spreadsheet_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.xlsx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      } else if (selectedFile instanceof File) {
                                                                          // If the file is from fileObjects3 (newly uploaded)
                                                                          const fileType = selectedFile.type;

                                                                          if (fileType.startsWith("image/")) {
                                                                              return (
                                                                                  <div className="relative w-full h-full">
                                                                                      <img
                                                                                          src={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )}
                                                                                          alt="Selected Document"
                                                                                          className="h-full w-full object-contain rounded-2xl"
                                                                                      />
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the file
                                                                                          download={`proof_image_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.jpg`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (fileType === "application/pdf") {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                          alt="PDF"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the PDF
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.pdf`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          Download
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/msword" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <p className="text-blue-500 text-lg font-bold">
                                                                                          WORD
                                                                                      </p>
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the Word file
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.docx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/vnd.ms-excel" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                          alt="Excel"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the Excel file
                                                                                          download={`proof_spreadsheet_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.xlsx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
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
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src={selectedFile}
                                                                                          alt="Selected Document"
                                                                                          className="h-full w-full object-contain rounded-2xl"
                                                                                      />
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the image
                                                                                          download={`proof_image_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.jpg`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (["pdf"].includes(fileExtension)) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                          alt="PDF"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the PDF
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.pdf`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              ["doc", "docx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <p className="text-blue-500 text-lg font-bold">
                                                                                          WORD
                                                                                      </p>
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the document
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexTwo + 1
                                                                                          }.docx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              ["xls", "xlsx"].includes(fileExtension)
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                          alt="Excel"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={selectedFile} // The URL of the Excel file
                                                                                          download={`proof_spreadsheet_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.xlsx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      } else if (selectedFile instanceof File) {
                                                                          // If the file is from fileObjects2 (newly uploaded)
                                                                          const fileType = selectedFile.type;
                                                                          if (fileType.startsWith("image/")) {
                                                                              return (
                                                                                  <div className="relative w-full h-full">
                                                                                      <img
                                                                                          src={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )}
                                                                                          alt="Selected Document"
                                                                                          className="h-full w-full object-contain rounded-2xl"
                                                                                      />
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the file
                                                                                          download={`proof_image_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.jpg`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (fileType === "application/pdf") {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                                                                          alt="PDF"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the PDF
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.pdf`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/msword" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <p className="text-blue-500 text-lg font-bold">
                                                                                          WORD
                                                                                      </p>
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the Word file
                                                                                          download={`proof_document_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.docx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
                                                                              );
                                                                          } else if (
                                                                              fileType === "application/vnd.ms-excel" ||
                                                                              fileType ===
                                                                                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                                          ) {
                                                                              return (
                                                                                  <div className="relative flex justify-center items-center w-full h-full">
                                                                                      <img
                                                                                          src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                                                                          alt="Excel"
                                                                                          className="w-16 h-16"
                                                                                      />
                                                                                      <a
                                                                                          href={URL.createObjectURL(
                                                                                              selectedFile
                                                                                          )} // The object URL of the Excel file
                                                                                          download={`proof_spreadsheet_${
                                                                                              selectedPreviewIndexThree + 1
                                                                                          }.xlsx`}
                                                                                          className="absolute bottom-2 right-2 bg-yellow-300 text-white px-3 py-1 text-sm rounded-lg hover:bg-yellow-400"
                                                                                      >
                                                                                          <FaFileDownload />
                                                                                      </a>
                                                                                  </div>
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

export default EditBusPost;
