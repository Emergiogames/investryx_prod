import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../../constants/baseUrls';
BASE_URL

export default function AdminViewPost() {
    const location = useLocation()
    const postData = location.state?.postData
    console.log("post data 33333 :", postData);
    

  const { postId } = useParams(); // Retrieve post ID from URL params
  const [formData, setFormData] = useState({
    id: '',
    entity_type: '',
    name: '',
    description: '',
    industry: '',
    url: '',
    city: '',
    state: '',
    establish_yr: '',
    ebitda: '',
    listed_on: '',
    type_sale: '',
    address_1: '',
    address_2: '',
    pin: '',
    employees: '',
    avg_monthly: '',
    latest_yearly: '',
    entity: '',
    features: '',
    facility: '',
    top_selling: '',
    income_source: '',
    reason: '',
    designation: '',
    logo: '',
    image1: '',
    doc1: '',
    proof1: '',
    user: ''
  });

  // Fetch the post details when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(`/admin_viewpost?post=${postId}`);
        setFormData(postData); // Populate the form with the response data
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchData();
  }, [postId]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission (for updating the post)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/admin_updatepost?post=${postId}`, formData);
      console.log('Updated successfully:', response.data);
      alert('Post updated successfully!');
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="w-1/2 flex justify-center items-center  mt-3">
      <div className=" w-2/3 shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-6">Edit Post Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Entity Type */}
          <label className="block mb-2">Entity Type</label>
          <input
            type="text"
            name="entity_type"
            value={formData.entity_type}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          {/* Name */}
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          {/* Description */}
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          {/* Industry */}
          <label className="block mb-2">Industry</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          {/* Address */}
          <label className="block mb-2">Address Line 1</label>
          <input
            type="text"
            name="address_1"
            value={formData.address_1}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />
          <label className="block mb-2">Address Line 2</label>
          <input
            type="text"
            name="address_2"
            value={formData.address_2}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          {/* Other Fields */}
          <label className="block mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          <label className="block mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="mb-4 p-2 border w-full"
          />

          {/* Logo (Read-only) */}
          <label className="block mb-2">Logo</label>
          <img src={BASE_URL + formData.doc1} alt="Logo" className="mb-4 w-32 h-32" />

          <label className="block mb-2">Logo</label>
          <img src={BASE_URL + formData.image1} alt="Logo" className="mb-4 w-32 h-32" />


          {/* Submit Button */}
          {/* <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button> */}
        </form>
      </div>
    </div>
  );
}
