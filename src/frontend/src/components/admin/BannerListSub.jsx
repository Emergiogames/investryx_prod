import React, { useState, useEffect } from "react";
import {  toast } from 'react-toastify';
import { adminBannerSubList, adminBannerSubPost, adminDeleteBannerSub } from "../../services/admin/apiMethods";
import { BASE_URL } from "../../constants/baseUrls";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const BannerListSub = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const [loading, setLoading] = useState(false);
    const [postStates, setPostStates] = useState([]); //all posts
    const [newBannerModel, setNewBannerModel] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    console.log("666666", postStates);

    const fetchAllPosts = async () => {
        setLoading(true);
        try {
            const [businessRes, investorRes, franchiseRes, advisorRes] = await Promise.all([
                adminBannerSubList("business"),
                adminBannerSubList("investor"),
                adminBannerSubList("franchise"),
                adminBannerSubList("advisor"),
            ]);

            setPostStates([...businessRes?.data, ...investorRes?.data, ...franchiseRes?.data, ...advisorRes?.data]);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to fetch posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredPosts = postStates?.filter((post) => post?.type.toString().includes(searchTerm));

    console.log('777', searchTerm);
    console.log('771', filteredPosts);
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleViewBanner = (post) => {
        console.log("banner view :::", post);
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    const handleNewBannerModal = () => {
        setNewBannerModel(true);
    };

    const closeNewBannerModal = () => {
        setNewBannerModel(false);
    };

    const handleBannerSubmit = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("img", values.img);
        formData.append("validity_date", values.validity_date);
        formData.append("type", values.type);

        adminBannerSubPost(formData)
            .then((response) => {
                console.log("new banner response:", response);
                toast.success("Banner uploaded successfully!");
                resetForm();
                closeNewBannerModal();
                fetchAllPosts();
            })
            .catch((error) => {
                toast.error("Failed to upload banner.");
                console.error(error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const validationSchema = Yup.object({
        img: Yup.mixed()
            .required("Image is required")
            .test("fileSize", "File size should be less than 5MB", (value) => value && value.size <= 5 * 1024 * 1024)
            .test(
                "fileType",
                "Only images are allowed (jpeg, jpg, png)",
                (value) => value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
            ),
        validity_date: Yup.date().required("Valid date is required"),
        type: Yup.string().required("Please select a category"),
    });

    const handleDeleteBanner = (img) => {
        adminDeleteBannerSub(img)
            .then((response) => {
                console.log(response, "delete success");
                toast.success("Banner deleted successfully!");
                fetchAllPosts();
                closeModal();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to delete banner.");
            });
    };

    return (
        <div className="w-9/12">
            {!selectedPost && !newBannerModel ? (
                <>
                    <div className="flex justify-center items-center font-serif text-xl mt-6">Profile-wise Banner List</div>
                    <div className="flex justify-start items-center w-full mr-24 lg:ml-6">
                        <div className="mt-6 flex justify-center items-center lg:w-full px-4 rounded-md">
                            <div className="flex justify-center border w-full p-4 bg-gray-200 rounded-md">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-4/4 p-2 bg-white">
                                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
                                            placeholder="Search for posts"
                                        />
                                        <button
                                            onClick={handleNewBannerModal}
                                            className="font-mono text-2xl bg-yellow-200 p-6 m-6 px-4 border border-gray-300 hover:bg-yellow-300 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl"
                                        >
                                            Add New Banner
                                        </button>
                                    </div>
                                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Sl.No
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Image
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Profile Type
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    ImageId
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPosts.map((post, index) => (
                                                <tr
                                                    onClick={() => handleViewBanner(post)}
                                                    key={post.id}
                                                    className="bg-white border-b dark:bg-gray-800 hover:bg-yellow-100 dark:hover:bg-gray-600"
                                                >
                                                    <td className="px-6 py-4 text-center">
                                                        {indexOfFirstPost + index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <img
                                                            src={BASE_URL + post.img}
                                                            alt={post.title}
                                                            className="w-80 object-cover rounded-lg"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">{post.type}</td>
                                                    <td className="px-6 py-4">{post.id}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-between py-4">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-white border rounded-lg"
                                        >
                                            Previous
                                        </button>
                                        <span className="text-sm">
                                            Page {currentPage} of {Math.ceil(filteredPosts.length / postsPerPage)}
                                        </span>
                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
                                            className="px-4 py-2 bg-white border rounded-lg"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white rounded-lg p-8 z-10 relative max-w-4xl w-full">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                            ✕
                        </button>
                        <img src={BASE_URL + selectedPost.img} alt="Banner" className="w-full h-96 object-contain mb-6" />
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleDeleteBanner(selectedPost.id)}
                                className="bg-red-500 text-2xl hover:bg-red-600 text-white px-6 py-3 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {newBannerModel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
                    <div className="fixed inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-sm"></div>
                    <div className="bg-white rounded-lg p-8 z-10 relative max-w-3xl w-full">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeNewBannerModal}
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Add New Banner</h2>

                        <Formik
                            initialValues={{ img: null, type: "", validity_date: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleBannerSubmit}
                        >
                            {({ setFieldValue, values, isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label htmlFor="img" className="block text-sm font-medium text-gray-700">
                                            Upload Image
                                        </label>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className=" w-80 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                                                {values.img ? (
                                                    <img
                                                        src={URL.createObjectURL(values.img)}
                                                        alt="Selected"
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col justify-center items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="grey"
                                                            className="h-44 w-44"
                                                        >
                                                            <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                                                        </svg>
                                                        <span className="text-gray-400">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <Field name="img">
                                                {({ field }) => (
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => {
                                                            setFieldValue("img", event.currentTarget.files[0]);
                                                        }}
                                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <ErrorMessage name="img" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    {/* //validity */}
                                    <div className="mb-4">
                                        <label htmlFor="validity_date" className="block text-sm font-medium text-gray-700">
                                            Validity Up To
                                        </label>
                                        <Field
                                            type="date"
                                            name="validity_date"
                                            className="block w-full mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                                        />
                                        <ErrorMessage
                                            name="validity_date"
                                            component="div"
                                            className="text-red-500 text-sm"
                                        />
                                    </div>
                                    {/* Type */}
                                    <div className="mb-4">
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                            Profile Type
                                        </label>
                                        <Field
                                            as="select"
                                            name="type"
                                            className="block w-full mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                                        >
                                            <option value="" disabled>
                                                Select a profile type
                                            </option>
                                            <option value="business">Business</option>
                                            <option value="investor">Investor</option>
                                            <option value="franchise">Franchise</option>
                                            <option value="advisor">Advisor</option>
                                        </Field>
                                        <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="flex justify-end mt-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white px-6 py-2 rounded-md"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Uploading..." : "Upload"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerListSub;
