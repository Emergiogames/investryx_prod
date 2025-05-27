import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmModal from "./ConfirmModal";
import Loader_swirel from "../accessories/Loader/Loader_swirel";
import { editProfile, deleteProfile } from "../../services/user/apiMethods";



function ViewSubProfile({ setIsSubProfileOpen, firstProfile }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  document.body.style.overflow = "hidden";

  useEffect(() => {
    if (firstProfile) {
      setProfileData(firstProfile);
    }
  }, [firstProfile]);

  const handleDelete = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Call delete API
    console.log("Delete API triggered");
    setIsDeleteModalOpen(false);
    setIsSubProfileOpen(false);
    // Prevent navigation
    window.history.pushState(null, '', window.location.href);
  };

  const handleUpdateConfirm = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsEditMode(true);
    setIsUpdateModalOpen(false);
    // Prevent unwanted navigation
    window.history.pushState(null, '', window.location.href);
  };

  const formik = useFormik({
    initialValues: profileData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      number: Yup.string().matches(/^\+?\d{10,15}$/, "Invalid phone number"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      industry: Yup.string().required("Industry is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true); 
      try {
        await editProfile(values.id, values); 
        console.log("Updated values:", values);
        setIsSubProfileOpen(false);  
        window.history.pushState(null, '', window.location.href); 
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false); 
      }
    }
  });

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  // delete profile
  // const handleDeleteProfile = (firstProfile.id) => {
  //   async() => {
  //     try{
  //       await deleteProfile(id)
  //     }
  //   }
  // }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
      onClick={() => setIsSubProfileOpen(false)}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-lg p-6 shadow-lg min-h-[50rem]"
        onClick={handleModalContentClick}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSubProfileOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">View Business Profile</h2>
        
        {loading ? (
  <Loader_swirel />
) : (
  profileData && (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center lg:px-40"
    >
      {/* Profile Image */}
      <div className="relative w-24 h-24 mb-4">
        <img
          src={profileData.image}
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-gray-200 shadow-md object-cover"
        />
      </div>

      {/* Profile Details */}
      <div className="text-left w-full space-y-2">
        {/* Name Field */}
        <label className="block">
          <span className="text-sm text-gray-600">Name</span>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            disabled={!isEditMode}
            className="mt-1 block w-full border rounded-md p-2 text-gray-700 disabled:bg-gray-100"
          />
        </label>
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}

        {/* Other Fields */}
        {[
          { label: "Number", name: "number", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Industry", name: "industry", type: "text" },
          { label: "Web URL", name: "web_url", type: "url" },
          { label: "State", name: "state", type: "text" },
          { label: "City", name: "city", type: "text" },
        ].map((field) => (
          <label key={field.name} className="block">
            <span className="text-sm text-gray-600">{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              disabled={!isEditMode}
              className="mt-1 block w-full border rounded-md p-2 text-gray-700 disabled:bg-gray-100"
            />
          </label>
        ))}

        {/* About Field */}
        <label className="block">
          <span className="text-sm text-gray-600">About</span>
          <textarea
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            disabled={!isEditMode}
            rows={4}
            className="mt-1 block w-full border rounded-md p-2 text-gray-700 disabled:bg-gray-100"
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </button>
        {!isEditMode ? (
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirm Changes
          </button>
        )}
      </div>
    </form>
  )
)}

      </div>
       

      {/* Modals */}
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Confirm Delete"
          message="Are you sure you want to delete this profile?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isUpdateModalOpen && (
        <ConfirmModal
          title="Confirm Update"
          message="Are you sure you want to update this profile?"
          onConfirm={handleUpdateConfirm}
          onCancel={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ViewSubProfile;