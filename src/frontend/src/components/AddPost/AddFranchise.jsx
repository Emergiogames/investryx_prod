import React, { useCallback, useState } from "react";
import {  toast } from 'react-toastify';
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";
import { addFranchisePost } from "../../services/user/apiMethods";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";

import {
  initialFranchiseValues,
  validationFranchiseSchema,
} from "../../utils/validation/postFranchiseValidation";
import Loader from "../loader/loader";


function AddFranchise() {
  const selectedUser = (state) => state.auth.user || "";
  const user = useSelector(selectedUser);
  const userId = user.id || "";

  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [selectedFiles2, setSelectedFiles2] = useState([]);
  const [selectedFiles3, setSelectedFiles3] = useState([]);

  const location = useLocation()
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
    initialValues: { ...initialFranchiseValues },
    validationSchema: validationFranchiseSchema,
    onSubmit: async () => {
      setLoading(true); // Prevent multiple submissions
      const {
        name,
        industry,
        url,
        offering,
        initial,
        proj_ROI,
        locations_available,
        total_outlets,
        yr_period,
        min_space,
        max_space,
        brand_fee,
        staff,
        avg_monthly_sales,
        ebitda,
        supports,
        services,
        description,
        range_starting,
        range_ending,
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
      formData.append("url", url);
      formData.append("offering", offering);
      formData.append("initial", initial);
      formData.append("proj_ROI", proj_ROI);
      formData.append("locations_available", locations_available);
      formData.append("total_outlets", total_outlets);
      formData.append("yr_period", yr_period);
      formData.append("min_space", min_space);
      formData.append("max_space", max_space);
      formData.append("brand_fee", brand_fee);
      formData.append("staff", staff);
      formData.append("avg_monthly_sales", avg_monthly_sales);
      formData.append("ebitda", ebitda);
      formData.append("supports", supports);
      formData.append("services", services);
      formData.append("description", description);
      formData.append("range_starting", range_starting);
      formData.append("range_ending", range_ending);
      formData.append("yr_period", yr_period);
      

      try {
        const response = await addFranchisePost(formData);
        if (response.data.status === true) {
          toast.success("Post Added Successfull");
          resetState1();
          resetState2();
          resetState3();
          handleCancelClick();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false); // Always reset loading
      }
    },
  });

  const handleCancelClick = () => {
    resetState1();
    resetState2();
    resetState3();
    // closeAddPost();
    navigate("/user-profile");
  };

  // // Select state and city
  // const [selectedState, setSelectedState] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);
  // const [cityOptions, setCityOptions] = useState([]);

  // // Handle state change
  // const handleStateChange = (selected) => {
  //   setSelectedState(selected);
  //   setCityOptions(stateCityMapping[selected?.value] || []);
  //   setSelectedCity(null);
  //   formik.setFieldValue("state", selected?.value || "");
  //   formik.setFieldValue("city", "");
  // };

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
                Add Franchise Post
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
                          Franchise Name
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

                      {/* industry  3*/}

                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="industry"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Select Franchise' Industry
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

                      {/* url 17 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="url"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Franchise Website URL
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

                      {/* Legal Entity type */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="offering"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          I am offering
                        </label>

                        <select
                          value={formik.values.offering}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          name="offering"
                          id="offering"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          <option value="" disabled>
                            select offer
                          </option>
                          <option value="Franchise Opportunity">Franchise Opportunity</option>
                          <option value="Dealership Opportunity">Dealership Opportunity</option>
                          <option value="Reseller Opportunity">Reseller Opportunity</option>
                          <option value="Reseller Opportunity">Distributor Opportunity</option>
                          <option value="Reseller Opportunity">Sale Partner Opportunity</option>
                        </select>

                        {formik.values.offering === "Others" && (
                          <input
                            type="text"
                            placeholder="Enter Industry"
                            value={formik.values.offering || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="offering"
                            id="offering"
                            className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        )}

                        {formik.touched.offering && formik.errors.offering && (
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.offering}
                          </p>
                        )}
                      </div>
                      {/* Monthly revenue */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="initial"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Initial Investment
                        </label>
                        <input
                          type="text"
                          value={formik.values.initial}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="initial"
                          id="initial"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.initial && formik.errors.initial && (
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.initial}
                          </p>
                        )}
                      </div>
                      {/* Monthly revenue */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="proj_ROI"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Projected ROI
                        </label>
                        <input
                          type="text"
                          value={formik.values.proj_ROI}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="proj_ROI"
                          id="proj_ROI"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.proj_ROI && formik.errors.proj_ROI && (
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.proj_ROI}
                          </p>
                        )}
                      </div>
                      {/* Income Source 14 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="locations_available"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Location available for franchise
                        </label>
                        <input
                          type="text"
                          value={formik.values.locations_available}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="locations_available"
                          id="locations_available"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.locations_available &&
                          formik.errors.locations_available && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.locations_available}
                            </p>
                          )}
                      </div>

                      {/* current outlet num */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="total_outlets"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Current number of outlets
                        </label>
                        <input
                          type="text"
                          value={formik.values.total_outlets}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="total_outlets"
                          id="total_outlets"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.total_outlets &&
                          formik.errors.total_outlets && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.total_outlets}
                            </p>
                          )}
                      </div>

                      {/* franchis terms */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="yr_period"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Franchise terms in Year period
                        </label>
                        <input
                          type="text"
                          value={formik.values.yr_period}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="yr_period"
                          id="yr_period"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.yr_period &&
                          formik.errors.yr_period && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.yr_period}
                            </p>
                          )}
                      </div>

                      {/*reason 21 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="description"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          About your brand
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

                      {/* space min */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="min_space"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Minimum space requried
                        </label>
                        <input
                          type="text"
                          value={formik.values.min_space}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="min_space"
                          id="min_space"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.min_space &&
                          formik.errors.min_space && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.min_space}
                            </p>
                          )}
                      </div>
                      {/* space max */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="max_space"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Maximum space required
                        </label>
                        <input
                          type="text"
                          value={formik.values.max_space}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="max_space"
                          id="max_space"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.max_space &&
                          formik.errors.max_space && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.max_space}
                            </p>
                          )}
                      </div>
                    </div>

                    {/* row one col one end */}

                    <div className=" lg:w-1/3 p-10 bg-amber-100 rounded-2xl m-10">
                      {/* total investment needed */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="range_starting"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Total Investment Needed , INR - Minumum
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
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="range_ending"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Total Investment Needed , INR - Maximum
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
                      {/* brand fee */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="brand_fee"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Brand Fee
                        </label>
                        <input
                          type="text"
                          value={formik.values.brand_fee}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="brand_fee"
                          id="brand_fee"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.brand_fee &&
                          formik.errors.brand_fee && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.brand_fee}
                            </p>
                          )}
                      </div>

                      {/* staff requried */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="staff"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Average number of staff requried
                        </label>
                        <input
                          type="text"
                          value={formik.values.staff}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="staff"
                          id="staff"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.staff && formik.errors.staff && (
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.staff}
                          </p>
                        )}
                      </div>

                      {/* avg monthly sales*/}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="avg_monthly_sales"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Average monthly Sales per Franchise
                        </label>
                        <input
                          type="text"
                          value={formik.values.avg_monthly_sales}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="avg_monthly_sales"
                          id="avg_monthly_sales"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.avg_monthly_sales &&
                          formik.errors.avg_monthly_sales && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.avg_monthly_sales}
                            </p>
                          )}
                      </div>

                      {/* avg ebitda*/}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="ebitda"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Average EBITDA per franchise
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

                      {/* When did brand start operating*/}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="yr_period"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          When did your brand start operations?
                        </label>
                        <input
                          type="text"
                          value={formik.values.yr_period}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="yr_period"
                          id="yr_period"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.yr_period &&
                          formik.errors.yr_period && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.yr_period}
                            </p>
                          )}
                      </div>

                      {/*reason 21 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="supports"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          What kind of support can the franchise expect from
                          you?
                        </label>
                        <textarea
                          value={formik.values.supports}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="supports"
                          id="supports"
                          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          rows={4}
                        />
                        {formik.touched.supports && formik.errors.supports && (
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.supports}
                          </p>
                        )}
                      </div>

                      {/* Description of franchise */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="services"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Mention all products/services your brand provides
                        </label>
                        <textarea
                          value={formik.values.services}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="services"
                          id="services"
                          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          rows={4}
                        />
                        {formik.touched.services &&
                          formik.errors.services && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.services}
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
                            Upload Franchise Image
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
                                Select Image of Franchise
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col justify-center items-center bg-white rounded-2xl h-52">
                              <img
                                src={URL.createObjectURL(
                                  selectedFiles1[selectedPreviewIndex]
                                )}
                                alt="Selected Franchise"
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
                      {/* <button
                        type="submit"
                        className="flex items-center bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-4"
                      >
                        <HiOutlineClipboardCopy className="w-9 h-9 mr-2" />
                        <span className="text-xl">Save Draft</span>
                      </button> */}
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-yellow-400 mx-4 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <HiCheck className="w-9 h-9 mr-2" />
                        <span className="text-xl">{loading ? "Submitting..." : "Submit"}</span>
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

export default AddFranchise;
