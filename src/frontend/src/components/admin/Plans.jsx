import React, { useEffect, useState, useRef } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  getAdminPlans,
  postAdminPlan,
  deleteAdminPlan,
  updatAdminPlan
} from "../../services/admin/apiMethods";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function Plans() {
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [postStates, setPostStates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [postIdToBlock, setPostIdToBlock] = useState(null);
  const [blockStatus, setBlockStatus] = useState("");
  const [newPlan, setNewPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchAttempted = useRef(false); // Ref to track if the fetch has been attempted

  const fetchPlans = () => {
    setLoading(true);
    getAdminPlans()
      .then((response) => {
        const data = response.data;
        if (data?.length > 0) {
          setPlans(data);
          console.log("plan data :::", data);
        } else {
          throw new Error("No data received");
        }
      })
      .catch((error) => {
        toast.error("Error fetching plans");
        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Only fetch plans if it hasn't been attempted before and plans is still null
    if (!fetchAttempted.current && !plans) {
      fetchPlans();
      fetchAttempted.current = true; // Mark fetch as attempted

      // Set interval to retry only if plans remain null
      const intervalId = setInterval(() => {
        if (!plans) {
          fetchPlans();
        }
      }, 9000); // Retry every 9 seconds if no data

      return () => clearInterval(intervalId); // Clean up interval on unmount
    }
  }, [plans]); // Dependency includes `plans` only for initial fetch check

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Search by name, id, or type (like InvestorList)
  const filteredPosts = (plans || []).filter(
    (post) =>
      (post.name && post.name.toLowerCase().includes(searchTerm.toLowerCase()))
    //  ||
    //   (post.id && post.id.toString().includes(searchTerm)) ||
    //   (post.type && post.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const confirmBlockPost = (postId, status) => {
    setPostIdToBlock(postId);
    setBlockStatus(status);
    setModalMessage(`Are you sure you want to ${status} this post?`);
    setModalOpen(true);
  };

  //handle view plan
  const handleViewPlan = (post) => {
    console.log("selected plan222 :::", post);

    setSelectedPlan(post);
  };

  //close view model
  const closeModal = () => {
    setSelectedPlan(null); // Close view modal
  };

  //handle new plan
  const handleNewPlan = () => {
    setNewPlan(true);
  };

  //close new plan
  const closeNewPlan = () => {
    setNewPlan(false);
  };

  //add new plan api call
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    rate: Yup.number().required("Required").positive("Must be positive"),
    time_period: Yup.number().required("Required").positive("Must be positive"),
    post_number: Yup.number().required("Required").positive("Must be positive"),
    type: Yup.string().required("Required"),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      postAdminPlan(values)
        .then((response) => {
          if (response.data.status === true) {
            toast.success("plan added successfully");
          }
          closeNewPlan();
        })
        .catch((error) => {
          toast.error("failed to upload plan");
          console.error(error);
        });
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //delete current plan
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const handleDeletePlan = (planId) => {
    // if (!window.confirm("Are you sure you want to delete this plan?")) return;
    deleteAdminPlan(planId)
      .then((response) => {
        if (response.data?.status === true) {
          toast.success("Plan deleted successfully");
          fetchPlans(); // <-- Refresh the plan list after deletion
          setSelectedPlan(null); // Optionally close modal if open
        } else {
          toast.error("Failed to delete plan");
        }
      })
      .catch(() => {
        toast.error("Failed to delete plan");
      });
  };

  // handle update plan
  const handleUpdatePlan = (plan) => {
    setSelectedPlan(plan);
    setIsUpdate(true);
  };

  // update plan submit
  const handleUpdateSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await updatAdminPlan(values.id, values)
        .then((response) => {
          if (response.data.status === true) {
            toast.success("Plan updated successfully");
            fetchPlans();
          }
          setIsUpdate(false);
          setSelectedPlan(null);
        })
        .catch((error) => {
          toast.error("Failed to update plan");
          console.error(error);
        });
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-9/12">
      {!selectedPlan && !newPlan ? (
        <div>
          <div className="flex justify-center items-center font-serif text-xl mt-6">
            Plans Management
          </div>
          <div className="flex justify-start items-center w-full mr-24 lg:ml-6">
            <div className="mt-6 flex justify-center items-center lg:w-full px-4 rounded-md">
              <div className="flex justify-center border w-full p-4 bg-gray-200 rounded-md">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-4/4 p-2 bg-white">
                  <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="w-full  relative flex justify-between">
                      <div className="relative h-9">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="table-search-posts"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search for posts"
                        />
                      </div>
                      <button
                        onClick={handleNewPlan}
                        className="font-mono text-2xl bg-yellow-200 p-6 m-6 px-4 border border-gray-300 hover:bg-yellow-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl"
                      >
                        Add New Post
                      </button>
                    </div>
                  </div>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Cost(INR)
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Plan Id
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Plan type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPosts.map((post, index) => (
                        <tr
                          onClick={() => handleViewPlan(post)}
                          key={post.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-yellow-100 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 text-center">
                            {indexOfFirstPost + index + 1}
                          </td>
                          <td className="px-6 py-4">{post.name}</td>
                          <td className="px-6 py-4">{post.rate}</td>
                          <td className="px-6 py-4 text-center">{post.id}</td>
                          <td className="px-6 py-4 text-center">{post.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center py-4">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Page {currentPage} of{" "}
                      {Math.ceil(filteredPosts.length / postsPerPage)}
                    </span>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredPosts.length / postsPerPage)
                      }
                      className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* View/Update Plan Modal */}
      {selectedPlan && (isUpdate ? (
        <Formik
          initialValues={{
            id: selectedPlan.id,
            name: selectedPlan.name || "",
            rate: selectedPlan.rate || "",
            description: Array.isArray(selectedPlan.description)
              ? selectedPlan.description
              : (selectedPlan.description?.plan?.features
                  ? [
                      ...(selectedPlan.description.plan.features.support ? [selectedPlan.description.plan.features.support] : []),
                      ...(selectedPlan.description.plan.features.validity ? [selectedPlan.description.plan.features.validity] : []),
                      ...(selectedPlan.description.plan.features.proposal_limit ? [selectedPlan.description.plan.features.proposal_limit] : []),
                    ]
                  : []),
            time_period: selectedPlan.time_period || "",
            post_number: selectedPlan.post_number || "",
            feature: selectedPlan.feature || false,
            recommend: selectedPlan.recommend || false,
            type: selectedPlan.type || "business",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdateSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-9">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Update Plan</h2>
                <div
                  className="text-red-500 font-bold cursor-pointer"
                  onClick={() => {
                    setSelectedPlan(null);
                    setIsUpdate(false);
                  }}
                >
                  X
                </div>
              </div>
              {/* Plan Name */}
              <div className="mb-4">
                <label className="block text-gray-700">Plan Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  placeholder="Plan Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Rate */}
              <div className="mb-4">
                <label className="block text-gray-700">Rate</label>
                <Field
                  type="number"
                  name="rate"
                  className="w-full p-2 border rounded"
                  placeholder="Rate"
                />
                <ErrorMessage
                  name="rate"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Description Points */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description Points
                </label>
                <FieldArray name="description">
                  {({ push, remove }) => (
                    <>
                      {values.description &&
                        values.description.map((_, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <Field
                              name={`description.${index}`}
                              placeholder={`Point ${index + 1}`}
                              className="flex-1 p-2 border rounded"
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="ml-2 text-red-500"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Add Point
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>
              {/* Time Period */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Time Period (in months)
                </label>
                <Field
                  type="number"
                  name="time_period"
                  className="w-full p-2 border rounded"
                  placeholder="Time Period"
                />
                <ErrorMessage
                  name="time_period"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Post Numbers */}
              <div className="mb-4">
                <label className="block text-gray-700">Post Numbers</label>
                <Field
                  type="number"
                  name="post_number"
                  className="w-full p-2 border rounded"
                  placeholder="Post Numbers"
                />
                <ErrorMessage
                  name="post_number"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Feature */}
              <div className="mb-4">
                <label className="block text-gray-700">Feature</label>
                <Field type="checkbox" name="feature" className="mr-2" />
                <span>Enable feature</span>
              </div>
              {/* Recommend */}
              <div className="mb-4">
                <label className="block text-gray-700">Recommend</label>
                <Field type="checkbox" name="recommend" className="mr-2" />
                <span>Recommend this plan</span>
              </div>
              {/* Type */}
              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="w-full p-2 border rounded"
                >
                  <option value="business">Business</option>
                  <option value="investor">Investor</option>
                  <option value="franchise">Franchise</option>
                  <option value="advisor">Advisor</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Plan"}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-10 relative max-w-4xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Basic Plan Information */}
            <div>
              <h2 className="text-xl font-bold mb-4">{selectedPlan.name}</h2>
              <p>ID: {selectedPlan.id}</p>
              <p>Rate: {selectedPlan.rate}</p>
              <p>Time Period: {selectedPlan.time_period} year(s)</p>
              <p>Post Number: {selectedPlan.post_number}</p>
              <p>Type: {selectedPlan.type}</p>
              <p>Feature: {selectedPlan.feature ? "Yes" : "No"}</p>
              <p>Recommend: {selectedPlan.recommend ? "Yes" : "No"}</p>
            </div>

            {/* Plan Description */}
            {selectedPlan.description && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Plan Description</h3>
                {Array.isArray(selectedPlan.description) && selectedPlan.description.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {selectedPlan.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No description</p>
                )}

                {/* Plan Features */}
                {selectedPlan.description.plan?.features && (
                  <div className="ml-4 mt-2">
                    <h4 className="text-md font-semibold">Features</h4>
                    <p>
                      <strong>Support:</strong>{" "}
                      {selectedPlan.description.plan.features.support}
                    </p>
                    <p>
                      <strong>Validity:</strong>{" "}
                      {selectedPlan.description.plan.features.validity}
                    </p>
                    <p>
                      <strong>Proposal Limit:</strong>{" "}
                      {selectedPlan.description.plan.features.proposal_limit}
                    </p>
                    {/* Profile Activation */}
                    {selectedPlan.description.plan.features.profile_activation && (
                      <div className="ml-4 mt-2">
                        <h4 className="text-md font-semibold">
                          Profile Activation
                        </h4>
                        <p>
                          <strong>Speed:</strong>{" "}
                          {selectedPlan.description.plan.features.profile_activation.speed}
                        </p>
                        <p>
                          <strong>Promotion:</strong>{" "}
                          {selectedPlan.description.plan.features.profile_activation.promotion}
                        </p>
                        <p>
                          <strong>Visibility:</strong>{" "}
                          {selectedPlan.description.plan.features.profile_activation.visibility}
                        </p>
                      </div>
                    )}
                    <p>
                      <strong>Confidentiality Option:</strong>{" "}
                      {selectedPlan.description.plan.features.confidentiality_option}
                    </p>
                    <p>
                      <strong>Targeted Proposal Distribution:</strong>{" "}
                      {selectedPlan.description.plan.features.targeted_proposal_distribution}
                    </p>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end gap-x-4">
              <div className=" mt-6">
                <button
                  onClick={() => handleDeletePlan(selectedPlan.id)}
                  className="bg-red-500 text-2xl hover:bg-red-600 text-white px-6 py-3 rounded-md"
                >
                  Delete
                </button>
              </div>

              {/* Update Button */}
              <div className="mt-6">
                <button
                  onClick={() => handleUpdatePlan(selectedPlan)}
                  className="bg-blue-500 text-2xl hover:bg-blue-600 text-white px-6 py-3 rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {newPlan && (
        <Formik
          initialValues={{
            name: "",
            rate: "",
            description: [],
            time_period: "",
            post_number: "",
            feature: false,
            recommend: false,
            type: "business",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg mt-9">
              <div className="flex justify-between">
              <h2 className="text-xl font-semibold mb-4">Add New Plan</h2>
              <div className="text-red-500 font-bold cursor-pointer" onClick={closeNewPlan}>X</div>
              </div>

              {/* Plan Name */}
              <div className="mb-4">
                <label className="block text-gray-700">Plan Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  placeholder="Plan Name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Rate */}
              <div className="mb-4">
                <label className="block text-gray-700">Rate</label>
                <Field
                  type="number"
                  name="rate"
                  className="w-full p-2 border rounded"
                  placeholder="Rate"
                />
                <ErrorMessage
                  name="rate"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Description Points */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Description Points
                </label>
                <FieldArray name="description">
                  {({ push, remove }) => (
                    <>
                      {values.description.map((_, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <Field
                            name={`description.${index}`}
                            placeholder={`Point ${index + 1}`}
                            className="flex-1 p-2 border rounded"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="ml-2 text-red-500"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push("")}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Add Point
                      </button>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* Time Period */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Time Period (in months)
                </label>
                <Field
                  type="number"
                  name="time_period"
                  className="w-full p-2 border rounded"
                  placeholder="Time Period"
                />
                <ErrorMessage
                  name="time_period"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Post Numbers */}
              <div className="mb-4">
                <label className="block text-gray-700">Post Numbers</label>
                <Field
                  type="number"
                  name="post_number"
                  className="w-full p-2 border rounded"
                  placeholder="Post Numbers"
                />
                <ErrorMessage
                  name="post_number"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Feature */}
              <div className="mb-4">
                <label className="block text-gray-700">Feature</label>
                <Field type="checkbox" name="feature" className="mr-2" />
                <span>Enable feature</span>
              </div>

              {/* Recommend */}
              <div className="mb-4">
                <label className="block text-gray-700">Recommend</label>
                <Field type="checkbox" name="recommend" className="mr-2" />
                <span>Recommend this plan</span>
              </div>

              {/* Type */}
              <div className="mb-4">
                <label className="block text-gray-700">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="w-full p-2 border rounded"
                >
                  <option value="business">Business</option>
                  <option value="investor">Investor</option>
                  <option value="franchise">Franchise</option>
                  <option value="advisor">Advisor</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add Plan"}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default Plans;
