import React, { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import { getPostVerify } from "../../services/admin/apiMethods";
import { BASE_URL } from "../../constants/baseUrls";
import { useNavigate } from "react-router-dom";
import { PostBlockUnblock } from "../../services/admin/apiMethods";

const BusinessList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const [loading, setLoading] = useState(false);
  const [postStates, setPostStates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [postIdToBlock, setPostIdToBlock] = useState(null);
  const [blockStatus, setBlockStatus] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await getPostVerify();
      const postData = response?.data || [];
      console.log("Pending verifyPost:", postData);
      setPostStates(postData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = Array.isArray(postStates)
  ? postStates.filter((post) =>
      post.entity_type.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const confirmBlockPost = (postId, status, action) => {
    console.log('postIdz', postId, status, action);
    
    setAction(action);
    setPostIdToBlock(postId);
    setBlockStatus(status);
    setModalMessage(`Are you sure you want to ${status} this post?`);
    setModalOpen(true);
  };

  const handlePostBlock = async (actionType) => {
    try {
      // Create the proper parameters object
      const params = {
        postId: postIdToBlock
      };
      
      const response = await PostBlockUnblock(params, actionType);
      const data = response.data;
      
      // Show appropriate toast based on action type
      if (actionType === 'approve') {
        toast.success(data.message || 'Post approved successfully');
      } else {
        toast.error(data.message || 'Post blocked successfully');
      }
      
      setPostStates(data.posts);
      // navigate('/admin/postVerify')
    } catch (error) {
      console.error('Error updating post status:', error);
      toast.error('Failed to update post status.');
    } finally {
      setModalOpen(false);
      fetchPosts()
    }
  };

  // Rest of your component remains exactly the same...
  return (
    <>
      <div className="w-9/12">
        {/* Existing JSX remains unchanged */}
        <div className=" flex justify-center items-center font-serif text-xl mt-6 ">
          Post Approval Management
        </div>
        <div className="flex justify-start items-center w-full mr-24 lg:ml-6">
          <div className="mt-6 flex justify-center items-center lg:w-full px-4 rounded-md">
            <div className="flex justify-center border w-full p-4 bg-gray-200 rounded-md">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-4/4 p-2 bg-white">
                {/* Search section remains unchanged */}
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
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
                </div>
                
                {/* Table section remains unchanged */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  {/* Table header and body remain unchanged */}
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Profile Img
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Industry
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        City
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        State
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        Activity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((post, index) => (
                      <tr
                        key={post.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-yellow-100 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 text-center">
                          {indexOfFirstPost + index + 1}
                        </td>
                        <td className="px-6 py-4 text-center" onClick={() => navigate(`/admin/admin_viewpost?post=${post.id}`, { state: { postData: post } })}>
                          <img
                            src={BASE_URL + post.image1}
                            alt={post.title}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">{post.title}</td>
                        <td className="px-6 py-4 text-center">{post.entity_type}</td>
                        <td className="px-6 py-4 text-center">
                          {post.city}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {new Date(post.listed_on).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {post.asking_price ? "Blocked" : "Unblocked"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {!post.verified ? "Blocked" : "Unblocked"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {!post.verified ? (
                            <button
                              type="button"
                              onClick={() => confirmBlockPost(post.id, "unblock", "approve")}
                              className="bg-white text-green-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => confirmBlockPost(post.id, "block", "block")}
                              className="bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination section remains unchanged */}
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
          <ConfirmationModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={() => handlePostBlock(action)}
            message={modalMessage}
          />
        </div>
      </div>
    </>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessList;