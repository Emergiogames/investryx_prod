import React, { useState } from "react";
import { Formik, Field, Form, useFormikContext } from "formik";
import UserList from "./UserList";
import { AdminNotification } from "../../services/admin/apiMethods";
import { toast } from "sonner";

const AdminPushNotification = () => {
  const [activeTab, setActiveTab] = useState("addPost"); // State to manage active tab
  const [image, setImage] = useState(null); // State to store the image file
  const [preview, setPreview] = useState(null); // State to store the preview URL
  const [showUserIdInput, setShowUserIdInput] = useState(false); // Manage visibility of UserID input

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const submit = (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("userId", values.userId);
    formData.append("url", values.url);
    if (image) {
      formData.append("image", image);
    }
    console.log("submit data notification", formData);

    AdminNotification(formData)
      .then((response) => {
        if (response.data.status === true) {
          toast.success("Notification sent successfully!");
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        toast.error("Failed to send notification.");
        setSubmitting(false); // Stop submitting
      });
  };

  const handleUserIdChange = (e, setFieldValue) => {
    const selectedValue = e.target.value;
    setShowUserIdInput(selectedValue === "enter");
    if (selectedValue !== "enter") {
      setFieldValue("userId", selectedValue); // Update userId in Formik
    } else {
      setFieldValue("userId", ""); // Reset userId when entering manually
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
      {/* Tab Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          className={`px-6 py-2 text-white rounded-lg ${
            activeTab === "addPost" ? "bg-indigo-600" : "bg-gray-400"
          }`}
          onClick={() => setActiveTab("addPost")}
        >
          Add Post
        </button>
        <button
          className={`px-6 py-2 text-white rounded-lg ${
            activeTab === "viewUsers" ? "bg-indigo-600" : "bg-gray-400"
          }`}
          onClick={() => setActiveTab("viewUsers")}
        >
          View Users
        </button>
      </div>

      {/* Content Based on Active Tab */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-8 w-[40rem]">
        {activeTab === "addPost" && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Push Notification
            </h2>
            <Formik
              initialValues={{
                title: "",
                description: "",
                userId: "all",
                url: "",
              }}
              onSubmit={submit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Title Field */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Notification Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter notification title"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  {/* Description Field */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Notification Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      rows="4"
                      placeholder="Enter notification description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  {/* UserId Field */}
                  <div>
                    <label
                      htmlFor="userIdOption"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      User ID
                    </label>
                    <Field
                      as="select"
                      name="userIdOption"
                      id="userIdOption"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                      onChange={(e) => handleUserIdChange(e, setFieldValue)}
                    >
                      <option value="all">All Users</option>
                      <option value="enter">Enter User ID</option>
                    </Field>

                    {/* Conditionally Rendered User ID Input */}
                    {showUserIdInput && (
                      <div className="mt-4">
                        <label
                          htmlFor="userId"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Enter User ID
                        </label>
                        <Field
                          name="userId"
                          id="userId"
                          type="text"
                          placeholder="Enter User ID"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* URL Field */}
                  <div>
                    <label
                      htmlFor="url"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Notification Link (Optional)
                    </label>
                    <Field
                      type="url"
                      name="url"
                      id="url"
                      placeholder="Enter a URL (e.g., https://example.com)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>

                  {/* Image Upload Field */}
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Upload Image (Optional)
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full text-gray-700"
                    />
                    {preview && (
                      <div className="mt-4">
                        <div className="relative">
                          <img
                            src={preview}
                            alt="Uploaded Preview"
                            className="w-32 h-32 object-cover rounded-lg shadow"
                            onClick={() => window.open(preview, "_blank")}
                          />
                          <button
                            type="button"
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            onClick={handleRemoveImage}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Click the image to view it larger.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                      {isSubmitting ? "Sending..." : "Send Notification"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        )}
        {activeTab === "viewUsers" && <UserList />}
      </div>
    </div>
  );
};

export default AdminPushNotification;
