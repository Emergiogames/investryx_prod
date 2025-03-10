import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";
import { HiChevronLeft, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { XCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { editAdvisorPost } from "../../services/user/apiMethods";
import { HiOutlinePlusSm, HiX } from "react-icons/hi";
import Select from "react-select";

import {
  initialAdvisorValues,
  validationAdvisorSchema,
} from "../../utils/validation/postAdvisorValidation";
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
const states = Object.keys(stateCityMapping)?.map((key) => ({
  label: key.charAt(0).toUpperCase() + key.slice(1),
  value: key,
}));

const customStyles = {
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Prevent overlap
  }),
};

function AddAdvisor() {
  const location = useLocation();
  const singlePost = location.state?.singlePost || {};
  console.log("single post data of advisor", singlePost);
  const initialValues = singlePost;
  const postId = singlePost?.id;

  const selectedUser = (state) => state.auth.user || "";
  const user = useSelector(selectedUser);
  const userId = user.id || "";
  const [otherIndustry, setOtherIndustry] = useState("");
  const [InOtherIndustry, setInOtherIndustry] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate("/user-profile");
  };
  //cleanup functions for blobs
  // const resetState1 = () => {
  //   formik.resetForm();
  //   setSelectedFiles1([]);
  // };

  const formik = useFormik({
    // initialValues: {
    //     ...initialAdvisorValues,
    //     interested_industry: [],
    //     interested_in: [],
    // },
    initialValues: { ...initialValues },
    validationSchema: validationAdvisorSchema,
    onSubmit: async (values) => {
      // Set loading to true at start of submission
      setLoading(true);

      const {
        name,
        designation,
        image1,
        interested_industry,
        interested_in,
        state,
        city,
        about_company,
        yr_experience,
      } = values;

      // Prepare the industries, handling 'Others' separately
      const industries = interested_industry
        ?.map((industry) => (industry === "Others" ? otherIndustry : industry))
        .filter(Boolean);

      const inIndustries = interested_in
        ?.map((industry) =>
          industry === "Others" ? InOtherIndustry : industry
        )
        .filter(Boolean);

      const formData = new FormData();

      formData.append("name", name === null ? "" : name);
      formData.append("designation", designation === null ? "" : designation);
      formData.append(
        "interested_industry",
        industries === null || "undefined" ? "[]" : JSON.stringify(industries)
      );
      formData.append(
        "interested_in",
        inIndustries === null || "undefined"
          ? "[]"
          : JSON.stringify(inIndustries)
      );
      formData.append("state", state === null ? "" : state);
      formData.append("city", city === null ? "" : city);
      formData.append(
        "about_company",
        about_company === null ? "" : about_company
      );
      formData.append(
        "yr_experience",
        yr_experience === null ? "" : yr_experience
      );
      formData.append("image1", image1 === null ? "" : image1);

      try {
        const response = await editAdvisorPost(formData, postId);
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

  const industryOptions = [
    "Education",
    "IT",
    "HealthCare",
    "Fashion",
    "Food",
    "Automobile",
    "Banking",
    "Others",
  ];

  const industryInOptions = [
    "Education",
    "IT",
    "HealthCare",
    "Fashion",
    "Food",
    "Automobile",
    "Banking",
    "Others",
  ];

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

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    setPreviewImage(singlePost?.image1);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      formik.setFieldValue("image1", file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    formik.setFieldValue("image1", null);
  };

  const handleIndustryChange = (e) => {
    const { value, checked } = e.target;
    let updatedIndustries;

    if (checked) {
      updatedIndustries = [...formik.values.interested_industry, value];
    } else {
      updatedIndustries = formik.values.interested_industry.filter(
        (industry) => industry !== value
      );
    }

    formik.setFieldValue("interested_industry", updatedIndustries);
  };

  const handleInIndustryChange = (e) => {
    const { value, checked } = e.target;
    let updatedInIndustries;

    if (checked) {
      updatedInIndustries = [...formik.values.interested_in, value];
    } else {
      updatedInIndustries = formik.values.interested_in.filter(
        (industry) => industry !== value
      );
    }

    formik.setFieldValue("interested_in", updatedInIndustries);
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
                  enctype="multipart/form-data"
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
                            onClick={() =>
                              document.getElementById("imageUpload").click()
                            } // Trigger file input
                            className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 text-white hover:bg-red-600"
                          >
                            Edit
                          </button>
                        </>
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
                          <p className="text-red-600 text-xs mt-1">
                            {formik.errors.name}
                          </p>
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
                        {formik.touched.designation &&
                          formik.errors.designation && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.designation}
                            </p>
                          )}
                      </div>

                      {/* industry  3*/}

                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="interested_industry"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Select your Industrial Expertise
                        </label>

                        {industryOptions?.map((industry) => (
                          <div
                            key={industry}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="checkbox"
                              id={`industry-${industry}`}
                              name="interested_industry"
                              value={industry}
                              checked={formik.values.interested_industry?.includes(
                                industry
                              )}
                              onChange={handleIndustryChange}
                              className="mr-2"
                            />
                            <label htmlFor={`industry-${industry}`}>
                              {industry}
                            </label>
                          </div>
                        ))}

                        {formik.values.interested_industry?.includes(
                          "Others"
                        ) && (
                          <input
                            type="text"
                            placeholder="Enter Other Industry"
                            value={otherIndustry}
                            onChange={(e) => setOtherIndustry(e.target.value)}
                            className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        )}

                        {formik.touched.interested_industry &&
                          formik.errors.interested_industry && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.interested_industry}
                            </p>
                          )}
                      </div>

                      {/* establish 4 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="yr_experience"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Years Of Experience
                        </label>
                        <input
                          type="text"
                          value={formik.values.yr_experience}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="yr_experience"
                          id="yr_experience"
                          className="block py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {formik.touched.yr_experience &&
                          formik.errors.yr_experience && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.yr_experience}
                            </p>
                          )}
                      </div>

                      {/* area of intrest 4 */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="interested_in"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Select your Industrial Expertise
                        </label>

                        {industryInOptions?.map((industry) => (
                          <div
                            key={industry}
                            className="flex items-center mb-2"
                          >
                            <input
                              type="checkbox"
                              id={`in-industry-${industry}`}
                              name="interested_in"
                              value={industry}
                              checked={formik.values.interested_in?.includes(
                                industry
                              )}
                              onChange={handleInIndustryChange}
                              className="mr-2"
                            />
                            <label htmlFor={`industry-${industry}`}>
                              {industry}
                            </label>
                          </div>
                        ))}

                        {formik.values.interested_in?.includes("Others") && (
                          <input
                            type="text"
                            placeholder="Enter Other Industry"
                            value={InOtherIndustry}
                            onChange={(e) => setInOtherIndustry(e.target.value)}
                            className="block mt-3 py-2 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        )}

                        {formik.touched.interested_in &&
                          formik.errors.interested_in && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.interested_in}
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

                      {/* Description of advisor */}
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="about_company"
                          className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          About
                        </label>
                        <textarea
                          value={formik.values.about_company}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          autoComplete="off"
                          name="about_company"
                          id="about_company"
                          className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-amber-50 border-2 border-gray-300 rounded-md resize-y dark:text-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          rows={4}
                        />
                        {formik.touched.about_company &&
                          formik.errors.about_company && (
                            <p className="text-red-600 text-xs mt-1">
                              {formik.errors.about_company}
                            </p>
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

export default AddAdvisor;
