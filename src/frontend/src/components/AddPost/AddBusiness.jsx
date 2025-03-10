import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBusinessPost } from "../../services/user/apiMethods";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";

import {
  initialValues,
  validationSchema,
} from "../../utils/validation/postValidation";
import Loader from "../loader/loader";

const stateCityMapping = {
  karnataka: [
    { label: "Bagalkot", value: "bagalkot" },
    { label: "Bangalore Rural", value: "bangalore-rural" },
    { label: "Bangalore Urban", value: "bangalore-urban" },
    { label: "Belgaum", value: "belgaum" },
    { label: "Bellary", value: "bellary" },
    { label: "Bidar", value: "bidar" },
    { label: "Vijayapura", value: "vijayapura" },
    { label: "Chamarajanagar", value: "chamarajanagar" },
    { label: "Chikkaballapur", value: "chikkaballapur" },
    { label: "Chikkamagaluru", value: "chikkamagaluru" },
    { label: "Chitradurga", value: "chitradurga" },
    { label: "Dakshina Kannada", value: "dakshina-kannada" },
    { label: "Davanagere", value: "davanagere" },
    { label: "Dharwad", value: "dharwad" },
    { label: "Gadag", value: "gadag" },
    { label: "Hassan", value: "hassan" },
    { label: "Haveri", value: "haveri" },
    { label: "Kalaburagi", value: "kalaburagi" },
    { label: "Kodagu", value: "kodagu" },
    { label: "Kolar", value: "kolar" },
    { label: "Koppal", value: "koppal" },
    { label: "Mandya", value: "mandya" },
    { label: "Mysore", value: "mysore" },
    { label: "Raichur", value: "raichur" },
    { label: "Ramanagara", value: "ramanagara" },
    { label: "Shivamogga", value: "shivamogga" },
    { label: "Tumkur", value: "tumkur" },
    { label: "Udupi", value: "udupi" },
    { label: "Uttara Kannada", value: "uttara-kannada" },
    { label: "Vijayanagara", value: "vijayanagara" },
    { label: "Yadgir", value: "yadgir" },
  ],
  maharashtra: [
    { label: "Mumbai", value: "mumbai" },
    { label: "Pune", value: "pune" },
  ],
  tamilNaduDistricts: [
    { label: "Ariyalur", value: "ariyalur" },
    { label: "Chengalpattu", value: "chengalpattu" },
    { label: "Chennai", value: "chennai" },
    { label: "Coimbatore", value: "coimbatore" },
    { label: "Cuddalore", value: "cuddalore" },
    { label: "Dharmapuri", value: "dharmapuri" },
    { label: "Dindigul", value: "dindigul" },
    { label: "Erode", value: "erode" },
    { label: "Kallakurichi", value: "kallakurichi" },
    { label: "Kanchipuram", value: "kanchipuram" },
    { label: "Kanniyakumari", value: "kanniyakumari" },
    { label: "Karur", value: "karur" },
    { label: "Krishnagiri", value: "krishnagiri" },
    { label: "Madurai", value: "madurai" },
    { label: "Mayiladuthurai", value: "mayiladuthurai" },
    { label: "Nagapattinam", value: "nagapattinam" },
    { label: "Namakkal", value: "namakkal" },
    { label: "Nilgiris", value: "nilgiris" },
    { label: "Perambalur", value: "perambalur" },
    { label: "Pudukkottai", value: "pudukkottai" },
    { label: "Ramanathapuram", value: "ramanathapuram" },
    { label: "Ranipet", value: "ranipet" },
    { label: "Salem", value: "salem" },
    { label: "Sivaganga", value: "sivaganga" },
    { label: "Tenkasi", value: "tenkasi" },
    { label: "Thanjavur", value: "thanjavur" },
    { label: "Theni", value: "theni" },
    { label: "Thoothukudi", value: "thoothukudi" },
    { label: "Tiruchirappalli", value: "tiruchirappalli" },
    { label: "Tirunelveli", value: "tirunelveli" },
    { label: "Tirupathur", value: "tirupathur" },
    { label: "Tiruppur", value: "tiruppur" },
    { label: "Tiruvallur", value: "tiruvallur" },
    { label: "Tiruvannamalai", value: "tiruvannamalai" },
    { label: "Tiruvarur", value: "tiruvarur" },
    { label: "Vellore", value: "vellore" },
    { label: "Viluppuram", value: "viluppuram" },
    { label: "Virudhunagar", value: "virudhunagar" },
  ],
  kerala: [
    { label: "Alappuzha", value: "alappuzha" },
    { label: "Ernakulam", value: "ernakulam" },
    { label: "Idukki", value: "idukki" },
    { label: "Kannur", value: "kannur" },
    { label: "Kasaragod", value: "kasaragod" },
    { label: "Kollam", value: "kollam" },
    { label: "Kottayam", value: "kottayam" },
    { label: "Kozhikode", value: "kozhikode" },
    { label: "Malappuram", value: "malappuram" },
    { label: "Palakkad", value: "palakkad" },
    { label: "Pathanamthitta", value: "pathanamthitta" },
    { label: "Thiruvananthapuram", value: "thiruvananthapuram" },
    { label: "Thrissur", value: "thrissur" },
    { label: "Wayanad", value: "wayanad" },
  ],

  uttarpradesh: [
    { label: "Lucknow", value: "lucknow" },
    { label: "Kanpur", value: "kanpur" },
  ],
};
//to address overlapping issue with city and state dropdown
const states = Object.keys(stateCityMapping).map((key) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key,
}));

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Prevent overlap
  }),
};

function AddBusiness() {
  const selectedUser = (state) => state.auth.user || "";
  const user = useSelector(selectedUser);
  const userId = user.id || "";

  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [selectedFiles3, setSelectedFiles3] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate("/user-profile");
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
        rate,
        type_sale,
        url,
        top_selling,
        features,
        facility,
        reason,
        income_source,
        asking_price
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
      formData.append("establish_yr", establish_yr);
      formData.append("single_desc", single_desc);
      formData.append("description", description);
      formData.append("address_1", address_1);
      formData.append("address_2", address_2);
      formData.append("state", state);
      formData.append("pin", pin);
      formData.append("city", city);
      formData.append("employees", employees);
      formData.append("entity", entity);
      formData.append("avg_monthly", avg_monthly);
      formData.append("latest_yearly", latest_yearly);
      formData.append("ebitda", ebitda);
      formData.append("rate", rate);
      formData.append("type_sale", type_sale);
      formData.append("url", url);
      formData.append("top_selling", top_selling);
      formData.append("features", features);
      formData.append("facility", facility);
      formData.append("reason", reason);
      formData.append("income_source", income_source);
      formData.append("userId", userId);
      formData.append("single_desc", single_desc);
      formData.append("asking_price", asking_price);


      try {
        const response = await addBusinessPost(formData);
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
    setSelectedState(selected);
    setCityOptions(stateCityMapping[selected?.value] || []);
    setSelectedCity(null);
    formik.setFieldValue("state", selected?.value || "");
    formik.setFieldValue("city", "");
  };

  //Handle file change one
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);

  const handleFileChange1 = useCallback(
    (event) => {
      const files = Array.from(event.target.files);
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

      const invalidFiles = files.filter(
        (file) => !validImageTypes.includes(file.type)
      );

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
      const invalidFiles = files.filter(
        (file) => !validFileTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        toast.error(
          "Please select only valid files (PDF, Excel, Word, Images, etc.)"
        );
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


      // Filter valid files
      const validFiles = files.filter((file) =>
        validFileTypes.includes(file.type)
      );

      // Check total files including existing ones
      if (validFiles.length + selectedFiles3.length > 4) {
        toast.error("Maximum 4 files allowed");
        return;
      }

      if (validFiles.length < files.length) {
        toast.error(
          "Some files are not supported. Please select valid file types."
        );
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
              <h2 className="flex justify-center w-full font-bold text-2xl my-10">
                Add Business Post
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.name}
                          </p>
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
                        {formik.touched.single_desc &&
                          formik.errors.single_desc && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.single_desc}
                            </p>
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.industry}
                          </p>
                        )}
                        {formik.touched.otherIndustry &&
                          formik.errors.otherIndustry && (
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
                        {formik.touched.establish_yr &&
                          formik.errors.establish_yr && (
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
                        {formik.touched.address_1 &&
                          formik.errors.address_1 && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.address_1}
                            </p>
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
                        {formik.touched.address_2 &&
                          formik.errors.address_2 && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.address_2}
                            </p>
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
                                (option) => option.value === formik.values.state
                              ) || selectedState
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
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.state}
                            </p>
                          )}
                        </div>

                        {/* City Dropdown */}
                        <div className="relative z-0 w-full group mb-4">
                          <label className="block text-lg font-medium text-gray-700 mb-1">
                            Select City
                          </label>
                          <Select
                            options={cityOptions}
                            value={
                              cityOptions.find(
                                (option) => option.value === formik.values.city
                              ) || selectedCity
                            }
                            onChange={(selected) => {
                              setSelectedCity(selected);
                              formik.setFieldValue(
                                "city",
                                selected?.value || ""
                              );
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
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.city}
                            </p>
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.pin}
                          </p>
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
                        {formik.touched.employees &&
                          formik.errors.employees && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.employees}
                            </p>
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.entity}
                          </p>
                        )}
                        {/* {formik.touched.entity &&
                          formik.errors.entity && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.entity}
                            </p>
                          )} */}
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
                        {formik.touched.avg_monthly &&
                          formik.errors.avg_monthly && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.avg_monthly}
                            </p>
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
                        {formik.touched.latest_yearly &&
                          formik.errors.latest_yearly && (
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
                          What is the EBITDA / Operating Profit Margin
                          Percentage?
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.ebitda}
                          </p>
                        )}
                      </div>
                      {/* <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="reason"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Reason for Sale
                        </label>
                        <input
                          type="text"
                          value={formik.values.reason}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="reason"
                          id="reason"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.reason && formik.errors.reason && (
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.reason}
                          </p>
                        )}
                      </div> */}
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
                        {formik.touched.type_sale &&
                          formik.errors.type_sale && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.type_sale}
                            </p>
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
                        {formik.touched.asking_price &&
                          formik.errors.asking_price && (
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.url}
                          </p>
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.reason}
                          </p>
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
                        {formik.touched.description &&
                          formik.errors.description && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.description}
                            </p>
                          )}
                      </div>

                      {/* Income Source 25 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="top_selling"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1 "
                        >
                          What are the business's top-selling products and
                          services, who uses them, and how?
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
                        {formik.touched.top_selling &&
                          formik.errors.top_selling && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.top_selling}
                            </p>
                          )}
                      </div>

                      {/* Income Source 24 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="features"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Mention highlights of the business including number of
                          clients, revenue model, promoter experience, business
                          relationships, awards, etc
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.features}
                          </p>
                        )}
                      </div>

                      {/*income source 26 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="facility"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Describe your facility such as built-up area, number
                          of floors, rental/lease details
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.facility}
                          </p>
                        )}
                      </div>

                      {/*income source 27 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="income_source"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          How is the business funded presently? Mention all
                          debts/loans outstanding and the total number of
                          shareholders/owners of the business with percentage
                          ownership.
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
                        {formik.touched.income_source &&
                          formik.errors.income_source && (
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
                      <div
                        className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10"
                        key={1}
                      >
                        <div>
                          <label
                            htmlFor="custom-file-upload1"
                            className="font-medium text-gray-700 flex justify-center pb-5"
                          >
                            Upload Business Image
                          </label>

                          {!selectedFiles1.length ? (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              <p className="text-red-600 text-xs">
                                {formik.errors.image1}
                              </p>
                              <img
                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                alt="Upload"
                                className="w-24 h-24 mt-4"
                              />
                              <p className="text-blue-700 mt-2">
                                Select Image of Business
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              <img
                                src={URL.createObjectURL(
                                  selectedFiles1[selectedPreviewIndex]
                                )}
                                alt="Selected Business"
                                className="h-full w-full object-contain rounded-2xl"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex-shrink-0">
                              <label
                                htmlFor="custom-file-upload1"
                                className="cursor-pointer"
                              >
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
                      <div
                        className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10"
                        key={2}
                      >
                        <div>
                          <label
                            htmlFor="custom-file-upload1"
                            className="font-medium text-gray-700 flex justify-center pb-5"
                          >
                            Upload Document
                          </label>

                          {!selectedFiles2.length ? (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              <p className="text-red-600 text-xs">
                                {formik.errors.doc1}
                              </p>
                              <img
                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                alt="Upload"
                                className="w-24 h-24 mt-4"
                              />
                              <p className="text-blue-700 mt-2">
                                Select Document
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              {selectedFiles2[
                                selectedPreviewIndexTwo
                              ]?.type.startsWith("image") ? (
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
                                  {selectedFiles2[selectedPreviewIndexTwo]
                                    ?.type === "application/pdf" && (
                                    <img
                                      src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                      alt="PDF"
                                      className="w-16 h-16"
                                    />
                                  )}
                                  {selectedFiles2[selectedPreviewIndexTwo]
                                    ?.type === "application/vnd.ms-excel" && (
                                    <img
                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                      alt="Excel"
                                      className="w-16 h-16"
                                    />
                                  )}
                                  {selectedFiles2[selectedPreviewIndexTwo]
                                    ?.type ===
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                    <img
                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                      alt="Excel"
                                      className="w-16 h-16"
                                    />
                                  )}
                                  <p className="text-xs mt-2">
                                    {
                                      selectedFiles2[selectedPreviewIndexTwo]
                                        ?.name
                                    }
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex-shrink-0">
                              <label
                                htmlFor="custom-file-upload2"
                                className="cursor-pointer"
                              >
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
                                  }`}doc1
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
                                      {file.type ===
                                        "application/vnd.ms-excel" && (
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
                      <div
                        className="lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10"
                        key={3}
                      >
                        <div>
                          <label
                            htmlFor="custom-file-upload1"
                            className="font-medium text-gray-700 flex justify-center pb-5"
                          >
                            Upload Document
                          </label>

                          {!selectedFiles3.length ? (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              <p className="text-red-600 text-xs">
                                {formik.errors.proof1}
                              </p>
                              <img
                                src="https://img.freepik.com/premium-vector/cloud-images-icon-vector-image-can-be-used-networking-data-sharing_120816-84093.jpg?w=740"
                                alt="Upload"
                                className="w-24 h-24 mt-4"
                              />
                              <p className="text-blue-700 mt-2">
                                Select Document
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              {selectedFiles3[
                                selectedPreviewIndexThree
                              ]?.type.startsWith("image") ? (
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
                                  {selectedFiles3[selectedPreviewIndexThree]
                                    ?.type === "application/pdf" && (
                                    <img
                                      src="https://img.icons8.com/?size=100&id=13417&format=png&color=000000"
                                      alt="PDF"
                                      className="w-16 h-16"
                                    />
                                  )}
                                  {selectedFiles3[selectedPreviewIndexThree]
                                    ?.type === "application/vnd.ms-excel" && (
                                    <img
                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                      alt="Excel"
                                      className="w-16 h-16"
                                    />
                                  )}
                                  {selectedFiles3[selectedPreviewIndexThree]
                                    ?.type ===
                                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                                    <img
                                      src="https://img.icons8.com/?size=100&id=BEMhRoRy403e&format=png&color=000000"
                                      alt="Excel"
                                      className="w-16 h-16"
                                    />
                                  )}
                                  <p className="text-xs mt-2">
                                    {
                                      selectedFiles3[selectedPreviewIndexThree]
                                        ?.name
                                    }
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex-shrink-0">
                              <label
                                htmlFor="custom-file-upload3"
                                className="cursor-pointer"
                              >
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
                                      {file.type ===
                                        "application/vnd.ms-excel" && (
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
                      <button
                        type="submit"
                        className="flex items-center bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-4"
                      >
                        <HiOutlineClipboardCopy className="w-9 h-9 mr-2" />
                        <span className="text-xl">Save Draft</span>
                      </button>
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

export default AddBusiness;
