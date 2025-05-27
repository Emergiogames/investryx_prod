import React, {  useState,useEffect } from "react";
import { getNotification } from "../../services/user/apiMethods";

function Notification() {

  const [useNotification, setNotification] = useState([])
  if(useNotification){
    console.log('6666 : : :', useNotification);
    
  }
  
  
    useEffect(()=>{
    getNotification()
    .then((response) => {
      if (response.data?.status === true) {
        setNotification(response?.data);
      } else {
        console.error("Error: Status is false");
      }
    })
    .catch((error) => {
      console.error("Error fetching notification:", error);
    });

    }, [])

  const posts = [
    {
      id: 1,
      title: "Business for sale 2021",
      description:
        "Massa maecenas. At eu vitae pulvinar mi nunc felis neque arcu in.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Business for sale 2021",
      description:
        "Massa maecenas. At eu vitae pulvinar mi nunc felis neque arcu in.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Business for sale 2021",
      description:
        "Massa maecenas. At eu vitae pulvinar mi nunc felis neque arcu in.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Business for sale 2021",
      description:
        "Massa maecenas. At eu vitae pulvinar mi nunc felis neque arcu in.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Business for sale 2021",
      description:
        "Massa maecenas. At eu vitae pulvinar mi nunc felis neque arcu in.",
      image: "https://via.placeholder.com/150",
    },
  ];
  return (
    <>
      {/* <div>Notification</div>
    import React from 'react'; */}
      <div className="flex gap-8 p-8 mt-16">
        {/* Left Section */}
        <div className="w-1/4">
          {/* Profile Selection */}
          <div className="flex  flex-col justify-center items-center bg-white shadow-lg rounded-2xl p-6 mb-16 ">
            <div className="">
              <img
                src="https://via.placeholder.com/90"
                alt="Profile"
                className="rounded-full"
              />
            </div>
            <div className=" px-4 py-5 ">
              <div className="px-3 mx-4">
                <h3 className="font-bold pl-12">Choose profile from:</h3>
                <div className="flex mt-2">
                  <span className="border border-fuchsia-950 bg-yellow-400 text-fuchsia-950 px-4 py-1 rounded-s-full">
                    Business
                  </span>
                  <span
                    onClick={""}
                    className="border border-fuchsia-950 text-fuchsia-950 px-4 py-1"
                  >
                    Franchise
                  </span>
                  <span className="border border-fuchsia-950  bg-yellow-400 text-fuchsia-950 px-4 py-1 ">
                    Investment
                  </span>
                  <span className="border border-fuchsia-950 text-fuchsia-950 px-4 py-1 rounded-e-full">
                    Advisor
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-bold mb-4">Account Details</h3>
            <ul className="text-sm">
              <li className="mb-2">
                <strong>Email:</strong> example@example.com
              </li>
              <li className="mb-2">
                <strong>Account status:</strong> False
              </li>
              <li className="mb-2">
                <strong>Bio:</strong> temp
              </li>
              <li className="mb-2">
                <strong>Saved Post:</strong> temp
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="w-2/4">
          <h3 className="text-2xl font-bold mb-4 text-purple-800">
            Latest Notifications:
          </h3>
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-lg rounded-2xl p-6 flex"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-lg">{post.title}</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/4">
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
            <h3 className="font-bold mb-4">Connect with Top Winners</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span>Amazon Inc</span>
                <span className="text-green-500">1658.00 ↑</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Netflix Inc</span>
                <span className="text-red-500">1658.00 ↓</span>
              </li>
            </ul>
            <button className="bg-blue-500 text-white px-4 py-2 mt-6 rounded-full w-full">
              Details
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-bold mb-4">Feeling Lucky!</h3>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full w-full">
              Chat with...
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
