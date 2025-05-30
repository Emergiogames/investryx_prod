import React, { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addAdvisorPost } from "../../services/user/apiMethods";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";
import { initialAdvisorValues, validationAdvisorSchema } from "../../utils/validation/postAdvisorValidation";
import Loader from "../loader/loader";

function AddAdvisor() {
    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    const userId = user.id || "";
    const [otherIndustry, setOtherIndustry] = useState("");
    const [InOtherIndustry, setInOtherIndustry] = useState("");
    const [stateCityMapping, setStateCityMapping] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
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

    const handleClose = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(-1); // Default browser back
        }
    };
    //cleanup functions for blobs
    // const resetState1 = () => {
    //   formik.resetForm();
    //   setSelectedFiles1([]);
    // };

    const formik = useFormik({
        initialValues: {
            ...initialAdvisorValues,
            industry: [],
            interest: [],
        },
        validationSchema: validationAdvisorSchema,
        onSubmit: async (values) => {
            // Set loading to true at start of submission
            setLoading(true);

            const { name, designation, number, email, logo, industry, interest, state, city, company, experience } = values;

            // Prepare the industries, handling 'Others' separately
            const industries = industry
                .map((industry) => (industry === "Others" ? otherIndustry : industry))
                .filter(Boolean);

            const inIndustries = interest
                .map((industry) => (industry === "Others" ? InOtherIndustry : industry))
                .filter(Boolean);

            const formData = new FormData();

            formData.append("name", name);
            formData.append("designation", designation);
            formData.append("number", number);
            formData.append("email", email);
            formData.append("industry", JSON.stringify(industries));
            formData.append("interest", JSON.stringify(inIndustries));
            formData.append("state", state);
            formData.append("city", city);
            formData.append("company", company);
            formData.append("experience", experience);
            formData.append("logo", logo ? logo : "");

            try {
                const response = await addAdvisorPost(formData);
                if (response.data.status === true) {
                    toast.success("Post Added Successfully");

                    // Reset form and states
                    formik.resetForm();
                    setOtherIndustry("");
                    setInOtherIndustry("");
                    setLoading(false);

                    // Navigate back to profile
                    navigate("/user-profile");
                } else {
                    toast.error(response.data.message);
                    setLoading(false);
                }
            } catch (error) {
                toast.error(error.message);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            formik.setFieldValue("logo", file);
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        formik.setFieldValue("logo", null);
    };

    const handleIndustryChange = (e) => {
        const { value, checked } = e.target;
        let updatedIndustries;

        if (checked) {
            updatedIndustries = [...formik.values.industry, value];
        } else {
            updatedIndustries = formik.values.industry.filter((industry) => industry !== value);
        }

        formik.setFieldValue("industry", updatedIndustries);
    };

    const handleInIndustryChange = (e) => {
        const { value, checked } = e.target;
        let updatedInIndustries;

        if (checked) {
            updatedInIndustries = [...formik.values.interest, value];
        } else {
            updatedInIndustries = formik.values.interest.filter((industry) => industry !== value);
        }

        formik.setFieldValue("interest", updatedInIndustries);
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
                            <h2 className="flex justify-center w-full font-bold text-2xl my-10 mr-24">Add Advisor Post</h2>
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
                                    <div className=" flex flex-col items-center ">
                                        <div className="lg:w-1/3  m-5 flex justify-center">
                                            <div className="w-36 h-36 bg-amber-100 rounded-2xl flex justify-center items-center relative">
                                                {previewImage ? (
                                                    <>
                                                        <img
                                                            src={previewImage}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover rounded-2xl"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={removeImage}
                                                            className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                                        >
                                                            <HiX className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <label className="flex justify-center items-center w-full h-full cursor-pointer">
                                                        <HiOutlinePlusSm className="w-16 h-16 bg-amber-100 rounded-md" />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="hidden"
                                                            id="image-upload"
                                                        />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                       
                                        <div className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10 ">
                                            {/* profile box */}

                                            {/* name 1*/}
                                            <div className="relative z-0 w-full mb-5 group">
                                                <label
                                                    htmlFor="income_source"
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

                                            {/* PhoneNumber */}
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

                                                {industryOptions.map((industry) => (
                                                    <div key={industry} className="flex items-center mb-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`industry-${industry}`}
                                                            name="industry"
                                                            value={industry}
                                                            checked={formik.values.industry.includes(industry)}
                                                            onChange={handleIndustryChange}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`industry-${industry}`}>{industry}</label>
                                                    </div>
                                                ))}

                                                {formik.values.industry.includes("Others") && (
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

                                                {industryInOptions.map((industry) => (
                                                    <div key={industry} className="flex items-center mb-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`in-industry-${industry}`}
                                                            name="interest"
                                                            value={industry}
                                                            checked={formik.values.interest.includes(industry)}
                                                            onChange={handleInIndustryChange}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`industry-${industry}`}>{industry}</label>
                                                    </div>
                                                ))}

                                                {formik.values.interest.includes("Others") && (
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
                                                <div className="relative z-0 w-full group mb-4">
                                                    <label className="block text-lg font-medium text-gray-700 mb-1">
                                                        Select City
                                                    </label>
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

export default AddAdvisor;
