//todo app simple

// import { useState } from "react";

// const Todo = () => {
//   const [todos, setTodos] = useState([]);
//   const [task, setTask] = useState("");

//   // Add a new task
//   const addTodo = () => {
//     if (task.trim() === "") return;
//     setTodos([...todos, task]);
//     setTask("");
//   };

//   // Remove a task
//   const removeTodo = (index) => {
//     setTodos(todos.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-4">To-Do App</h1>
//       <div className="flex space-x-2 mb-4">
//         <input
//           type="text"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           className="border px-4 py-2 rounded-lg"
//           placeholder="Enter a task..."
//         />
//         <button
//           onClick={addTodo}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//         >
//           Add
//         </button>
//       </div>

//       <ul className="w-96 bg-white p-4 rounded-lg shadow-md">
//         {todos.map((todo, index) => (
//           <li
//             key={index}
//             className="flex justify-between items-center border-b py-2"
//           >
//             {todo}
//             <button
//               onClick={() => removeTodo(index)}
//               className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Todo;


//counter app using use reducer

// import { useReducer, useState } from "react"

// export default function App(){

//   // const [value, setValue] = useState("")
// const counterReducer = (state, action) => {
//    switch(action.type){
//     case "increase":
//     return {count: state.count + 1}
//     case "decrease":
//       return {count: state.count -1};
//       case "reset":
//         return {count: 0}
//    }
// }

//   const [state,dispatch] = useReducer(counterReducer, {count: 0})
//   return(
//     <>
//     <div className=" flex gap-x-4 m-5">
//        <button onClick={()=> dispatch({type:"increase"}) } className="bg-blue-500 px-4 py-2 rounded-sm">+</button>
//        <div>
//         {state.count}
//        </div>
//        <button onClick={() => dispatch({type:"decrease"})} className="bg-blue-500 px-4 py-2 rounded-sm">-</button>
//        <button onClick={() => dispatch({type: "reset"})} className="bg-blue-500 px-4 py-2 rounded-sm">reset</button>
         
//        </div>
//     </>
//   )
// }

//simple server

// const express = require("express")
// const app = express()
// const PORT = 5000
// app.use(express.json())

// app.get("/", (req,res) => {
//   res.send("hello world")
// })

// app.listen(PORT, ()=> {
//   console.log(`express server running at + ${PORT}`)
// })


// // api call fetch

// import { useState } from "react"

// export default function Fetch(){

//   const [data,setData] = useState([])
//   const [error, setError] = useState(null)

//   // const getData =()=> {
//   //   fetch("https://jsonplaceholder.typicode.com/psts/")
//   //   .then((response) => {
//   //     if(!response.ok){
//   //       throw new Error("network response not ok")
//   //     }
//   //     return response.json()
//   //   })
//   //   .then((data) => {
//   //     setData(data)
//   //     // setLoading(false)
//   //   })
//   //   .catch((error) => {
//   //     setError(error)
//   //     // setLoading(false)
//   //   })
//   // }
//   const getData = async () => {
//     try {
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
//       if (!response.ok) {
//         throw new Error("Network response not ok");
//       }
//       const data = await response.json();
//       setData(data);
//       setError(null);
//     } catch (error) {
//       setError(error);
//     }
//   };
  

//   return(
// <>
// <div>
// <button onClick={()=> getData()} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">fetch data</button>
// {data.map((item) => (
//   <ul key={item.id} className="bg-slate-200 flex flex-col my-4 w-1/2 rounded-lg shadow-md">
//     <li>{item.id}</li>
//     <li>{item.title}</li>
//     <li>{item.body}</li>
//   </ul>
// ))}
// </div>
// </>
//   )
// }



//table

// import { useState } from "react";

// const Table = ({ data }) => {
//   const [sortField, setSortField] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");

//   const handleSort = (field) => {
//     const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
//     setSortField(field);
//     setSortOrder(order);
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (!sortField) return 0;
//     return sortOrder === "asc"
//       ? a[sortField] > b[sortField]
//         ? 1
//         : -1
//       : a[sortField] < b[sortField]
//       ? 1
//       : -1;
//   });

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-blue-500 text-white">
//             <th
//               className="p-3 cursor-pointer"
//               onClick={() => handleSort("id")}
//             >
//               ID {sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
//             </th>
//             <th
//               className="p-3 cursor-pointer"
//               onClick={() => handleSort("name")}
//             >
//               Name {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
//             </th>
//             <th
//               className="p-3 cursor-pointer"
//               onClick={() => handleSort("age")}
//             >
//               Age {sortField === "age" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((row) => (
//             <tr key={row.id} className="border-b text-center">
//               <td className="p-3">{row.id}</td>
//               <td className="p-3">{row.name}</td>
//               <td className="p-3">{row.age}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default function App() {
//   const sampleData = [
//     { id: 1, name: "Alice", age: 25 },
//     { id: 2, name: "Bob", age: 30 },
//     { id: 3, name: "Charlie", age: 22 },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Sortable Table</h1>
//       <Table data={sampleData} />
//     </div>
//   );
// }



//navbar
// import { useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react"; // Icons for UI

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   return (
//     <nav className="bg-blue-500 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <a href="#" className="text-2xl font-bold">MyApp</a>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="hover:underline">Home</a>
//           <div className="relative">
//             <button 
//               className="flex items-center gap-1 hover:underline"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             >
//               Services <ChevronDown size={16} />
//             </button>
//             {dropdownOpen && (
//               <div className="absolute left-0 mt-2 w-40 bg-white text-black shadow-md rounded-lg">
//                 <a href="#" className="block px-4 py-2 hover:bg-gray-200">Web Development</a>
//                 <a href="#" className="block px-4 py-2 hover:bg-gray-200">Mobile Apps</a>
//                 <a href="#" className="block px-4 py-2 hover:bg-gray-200">SEO</a>
//               </div>
//             )}
//           </div>
//           <a href="#" className="hover:underline">Contact</a>
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden mt-4 space-y-2">
//           <a href="#" className="block py-2 border-b">Home</a>
//           <button 
//             className="w-full flex justify-between items-center py-2 border-b"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             Services <ChevronDown size={16} />
//           </button>
//           {dropdownOpen && (
//             <div className="pl-4 space-y-1">
//               <a href="#" className="block py-1">Web Development</a>
//               <a href="#" className="block py-1">Mobile Apps</a>
//               <a href="#" className="block py-1">SEO</a>
//             </div>
//           )}
//           <a href="#" className="block py-2 border-b">Contact</a>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default function App() {
//   return (
//     <div>
//       <Navbar />
//       <div className="p-8 text-center">
//         <h1 className="text-3xl font-bold">Welcome to MyApp</h1>
//       </div>
//     </div>
//   );
// }


//Pop Over 
// import { useState } from "react";

// function PopOver({ title, content }) {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="relative inline-block">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title}
//       </button>

//       {isOpen && (
//         <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg border rounded-lg p-3">
//           <p className="text-gray-700">{content}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-xl font-bold mb-4">Pop-Over Example</h1>
//       <PopOver title="Click Me" content="This is the pop-over content!" />
//     </div>
//   );
// }


//progress bar

// import { useState, useEffect } from "react";

// function ProgressBar({ duration = 90000 }) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => (prev < 100 ? prev + 10 : 100));
//     }, duration / 10);

//     return () => clearInterval(interval);
//   }, [duration]);

//   return (
//     <div className="w-full max-w-md mx-auto mt-10 p-4">
//       <div className="w-full bg-gray-300 rounded-lg h-6 overflow-hidden">
//         <div
//           className="bg-blue-500 h-full transition-all duration-500"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//       <p className="text-center mt-2 text-gray-700">{progress}% Completed</p>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-xl font-bold mb-4">Task Progress</h1>
//       <ProgressBar duration={5000} />
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// location setup

// import React, { useEffect, useState } from "react";
// import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";

// const LocationSelector = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   console.log('country222', selectedCountry);

  
//   useEffect(() => {
// const disableRightClick = (event) => { event.preventDefault()}
//     document.addEventListener("contextmenu", disableRightClick)
//     return() => {
//       document.rer
//     }
    
//   }, [])
  

//   return (
//     <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
//       {/* Select Country */}
//       <CountrySelect
//         onChange={(value) => {
//           setSelectedCountry(value);
//           setSelectedState(null);
//           setSelectedCity(null);
//         }}
//         placeHolder="Select Country"
//       />

//       {/* Select State */}
//       <StateSelect
//         countryid={selectedCountry?.id}
//         onChange={(value) => {
//           setSelectedState(value);
//           setSelectedCity(null);
//         }}
//         placeHolder="Select State"
//       />

//       {/* Select City */}
//       <CitySelect
//         countryid={selectedCountry?.id}
//         stateid={selectedState?.id}
//         onChange={setSelectedCity}
//         placeHolder="Select City"
//       />

//       <button className="bg-amber-400" >Export</button>

//       {/* Display Selected Values */}
//       {selectedCountry && selectedState && selectedCity && (
//         <div className="p-4 bg-gray-100 rounded-md">
//           <p><strong>Selected Country:</strong> {selectedCountry.name}</p>
//           <p><strong>Selected State:</strong> {selectedState.name}</p>
//           <p><strong>Selected City:</strong> {selectedCity.name}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;









// import React, { useState, useRef, useEffect } from "react";
// import { Camera, CreditCard, MessageSquare, CheckCircle2, ChevronLeft, Smartphone, Info, AlertCircle } from "lucide-react";
// import CardContent from "@mui/material/CardContent";
// import Card from "@mui/material/Card";
// import Alert from "@mui/material/Alert";
// import AlertDescription from "@mui/material/Alert";
// import {  toast } from 'react-toastify';


// // Color constants matching Flutter theme
// const theme = {
//     buttonColor: "#FFB800", // Primary yellow color
//     lightYellow: "#FFF8E7", // Light yellow for backgrounds
//     borderYellow: "#FFD466", // Lighter yellow for borders
//     hoverYellow: "#FFA600", // Darker yellow for hover states
// };

// // API Configuration
// const API_TOKEN =
//     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNjE1ODg2NywianRpIjoiNGE4MGMxMjMtMDM3Ny00MmYyLTk1NDItMTcyNTc2OTBhY2ExIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnNoYWhlZW5Ac3VyZXBhc3MuaW8iLCJuYmYiOjE3MzYxNTg4NjcsImV4cCI6MTczNzAyMjg2NywiZW1haWwiOiJzaGFoZWVuQHN1cmVwYXNzLmlvIiwidGVuYW50X2lkIjoibWFpbiIsInVzZXJfY2xhaW1zIjp7InNjb3BlcyI6WyJ1c2VyIl19fQ.9SBuyX1BE8gNyM73Jo5IxY2F9TJjBguLZmEzbtQDlc0";
// const API_BASE_URL = "https://sandbox.surepass.io/api/v1";

// const DigiLockerVerification = () => {
//     // State management
//     const [currentStep, setCurrentStep] = useState(0);
//     const [hasPrerequisites, setHasPrerequisites] = useState(false);
//     const [aadhaarNumber, setAadhaarNumber] = useState("");
//     const [otp, setOtp] = useState("");
//     const [selfieImage, setSelfieImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [clientId, setClientId] = useState(null);
//     const [profileImage, setProfileImage] = useState(null);
//     const [verificationData, setVerificationData] = useState(null);
//     const [isResendingOtp, setIsResendingOtp] = useState(false);

//     // Refs for camera handling
//     const videoRef = useRef(null);
//     const streamRef = useRef(null);

//     const steps = ["Start", "Aadhaar", "OTP", "Selfie"];

//     // Camera initialization effect
//     useEffect(() => {
//         if (currentStep === 3 && !selfieImage) {
//             startCamera();
//         } else {
//             stopCamera();
//         }
//         return () => {
//             stopCamera();
//         };
//     }, [currentStep, selfieImage]);

//     // Camera handling functions
//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 video: { 
//                     facingMode: "user",
//                     width: { ideal: 1280 },
//                     height: { ideal: 720 }
//                 }
//             });
//             streamRef.current = stream;
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.play().catch(err => {
//                     console.error("Error playing video:", err);
//                 });
//             }
//         } catch (err) {
//             console.error("Error accessing camera:", err);
//             alert("Unable to access camera. Please ensure camera permissions are granted.");
//         }
//     };

//     const stopCamera = () => {
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach(track => {
//                 track.stop();
//             });
//             streamRef.current = null;
//         }
//         if (videoRef.current) {
//             videoRef.current.srcObject = null;
//         }
//     };

//     // Helper functions
//     const formatAadhaar = (value) => {
//         const digits = value.replace(/\D/g, '');
//         const groups = digits.match(/.{1,4}/g) || [];
//         return groups.join(' ');
//     };

//     const handleAadhaarChange = (e) => {
//         const formatted = formatAadhaar(e.target.value);
//         if (formatted.length <= 14) {
//             setAadhaarNumber(formatted);
//         }
//     };

//     const handleOtpChange = (e) => {
//         const value = e.target.value.replace(/\D/g, "");
//         if (value.length <= 6) {
//             setOtp(value);
//         }
//     };

//     const takeSelfie = async () => {
//         if (!videoRef.current || !videoRef.current.videoWidth) {
//             console.error("Video stream not ready");
//             return;
//         }

//         try {
//             const canvas = document.createElement("canvas");
//             canvas.width = videoRef.current.videoWidth;
//             canvas.height = videoRef.current.videoHeight;
            
//             const ctx = canvas.getContext("2d");
//             // Flip the image horizontally to match the mirrored preview
//             ctx.scale(-1, 1);
//             ctx.translate(-canvas.width, 0);
//             ctx.drawImage(videoRef.current, 0, 0);

//             const imageBlob = await new Promise((resolve) => 
//                 canvas.toBlob(resolve, "image/jpeg", 0.8)
//             );
            
//             const imageUrl = URL.createObjectURL(imageBlob);
//             setSelfieImage(imageUrl);
//             stopCamera();
//         } catch (err) {
//             console.error("Error taking selfie:", err);
//             alert("Error taking selfie. Please try again.");
//         }
//     };

//     // API Calls
//     const generateOtp = async () => {
//         if (aadhaarNumber.replace(/\s/g, "").length !== 12) return;

//         setIsLoading(true);

//         try {
//             const response = await fetch(`${API_BASE_URL}/aadhaar-v2/generate-otp`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${API_TOKEN}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     id_number: aadhaarNumber.replace(/\s/g, ""),
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setClientId(data.data.client_id);
//                 if (!isResendingOtp) {
//                     setCurrentStep(2);
//                 }
//             }
//         } catch (err) {
//             console.error("Error generating OTP:", err);
//         } finally {
//             setIsLoading(false);
//             setIsResendingOtp(false);
//         }
//     };

//     const verifyOtp = async () => {
//         if (otp.length !== 6 || !clientId) return;

//         setIsLoading(true);

//         try {
//             const response = await fetch(`${API_BASE_URL}/aadhaar-v2/submit-otp`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${API_TOKEN}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     client_id: clientId,
//                     otp: otp,
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setVerificationData(data.data);
//                 setProfileImage(data.data.profile_image);
//                 setCurrentStep(3);
//             }
//         } catch (err) {
//             console.error("Error verifying OTP:", err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const performFaceMatch = async () => {
//         if (!selfieImage || !profileImage) return;

//         setIsLoading(true);

//         try {
//             const formData = new FormData();
//             const selfieBlob = await fetch(selfieImage).then((r) => r.blob());
//             formData.append("selfie", selfieBlob, "selfie.jpg");
//             formData.append("selfie_2_link", profileImage);

//             const response = await fetch(`${API_BASE_URL}/face/face-match`, {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${API_TOKEN}`,
//                 },
//                 body: formData,
//             });

//             const data = await response.json();

//             if (response.ok && data.data.match_status) {
//                 console.log("Face match successful");
//                 // Handle successful verification
//             } else {
//               toast.error("Face not found or error in face verificaiton. Please Re-verify")
//             }
//         } catch (err) {
//             console.error("Error in face match:", err);
//             setSelfieImage(null);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBack = () => {
//         if (currentStep > 0) {
//             setCurrentStep(currentStep - 1);
//         }
//     };

//     const handleNext = async () => {
//         if (isLoading) return;

//         setIsLoading(true);

//         try {
//             switch (currentStep) {
//                 case 0:
//                     setCurrentStep(currentStep + 1);
//                     break;

//                 case 1:
//                     await generateOtp();
//                     break;

//                 case 2:
//                     await verifyOtp();
//                     break;

//                 case 3:
//                     if (!selfieImage) {
//                         await takeSelfie();
//                     } else {
//                         await performFaceMatch();
//                     }
//                     break;

//                 default:
//                     console.log("Invalid step");
//                     break;
//             }
//         } catch (error) {
//             console.error("Error in handleNext:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const getButtonText = () => {
//         switch (currentStep) {
//             case 0:
//                 return "Start Verification";
//             case 1:
//                 return "Verify Aadhaar";
//             case 2:
//                 return "Verify OTP";
//             case 3:
//                 return selfieImage ? "Complete Verification" : "Take Selfie";
//             default:
//                 return "Continue";
//         }
//     };

//     const PrerequisitesStep = () => (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-900">Welcome to Aadhaar Verification</h2>

//             <div
//                 className="p-6 rounded-xl space-y-6"
//                 style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
//             >
//                 <h3 className="text-lg font-semibold text-gray-900">Before you begin, please ensure:</h3>

//                 {[
//                     {
//                         icon: <Smartphone className="w-5 h-5" />,
//                         title: "Mobile Number Access",
//                         desc: "You have access to the mobile number linked with your Aadhaar",
//                     },
//                     {
//                         icon: <CreditCard className="w-5 h-5" />,
//                         title: "Aadhaar Card",
//                         desc: "Your 12-digit Aadhaar number is readily available",
//                     },
//                     {
//                         icon: <Camera className="w-5 h-5" />,
//                         title: "Camera Ready",
//                         desc: "Your device camera is working for the selfie verification",
//                     },
//                 ].map((item, idx) => (
//                     <div key={idx} className="flex gap-4">
//                         <div className="p-2 rounded-lg" style={{ backgroundColor: theme.lightYellow }}>
//                             <div className="p-2 rounded-lg" style={{ backgroundColor: theme.buttonColor }}>
//                                 {item.icon}
//                             </div>
//                         </div>
//                         <div>
//                             <h4 className="font-medium text-gray-900">{item.title}</h4>
//                             <p className="text-gray-600 text-sm">{item.desc}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <label className="flex items-start gap-3 cursor-pointer">
//                 <input
//                     type="checkbox"
//                     checked={hasPrerequisites}
//                     onChange={(e) => setHasPrerequisites(e.target.checked)}
//                     className="mt-1 w-4 h-4"
//                     style={{ accentColor: theme.buttonColor }}
//                 />
//                 <span className="text-gray-700">I confirm that I have all the prerequisites ready</span>
//             </label>
//         </div>
//     );

//     const AadhaarStep = () => (
//         <Card>
//             <CardContent className="p-6 space-y-6">
//                 <div className="text-center">
//                     <div
//                         className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{ backgroundColor: theme.lightYellow }}
//                     >
//                         <CreditCard className="w-6 h-6" style={{ color: theme.buttonColor }} />
//                     </div>
//                     <h2 className="mt-4 text-xl font-semibold">Enter Aadhaar Details</h2>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
//                     <div className="mt-1 relative">
//                         <input
//                             type="text"
//                             value={aadhaarNumber}
//                             onChange={handleAadhaarChange}
//                             placeholder="XXXX XXXX XXXX"
//                             className="w-full px-4 py-2 border rounded-lg outline-none"
//                             style={{
//                                 borderColor: theme.borderYellow,
//                                 "--tw-ring-color": theme.buttonColor,
//                             }}
//                         />
//                     </div>
//                 </div>

//                 <Alert
//                     className="border rounded-xl"
//                     style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
//                 >
//                     <AlertCircle className="h-4 w-4" style={{ color: theme.buttonColor }} />
//                     <AlertDescription>
//                         <div className="ml-2">
//                             <p className="font-medium">Important:</p>
//                             <ul className="mt-2 space-y-1 text-sm">
//                                 <li>Enter the 12-digit Aadhaar number linked with your mobile</li>
//                                 <li>Double-check the number before proceeding</li>
//                                 <li>Your data is encrypted and secure</li>
//                             </ul>
//                         </div>
//                     </AlertDescription>
//                 </Alert>
//             </CardContent>
//         </Card>
//     );

//     const OtpStep = () => (
//         <Card>
//             <CardContent className="p-6 space-y-6">
//                 <div className="text-center">
//                     <div
//                         className="mx-auto w-12 h-12 rounded-full flex items-center justify-center"
//                         style={{ backgroundColor: theme.lightYellow }}
//                     >
//                         <MessageSquare className="w-6 h-6" style={{ color: theme.buttonColor }} />
//                     </div>
//                     <h2 className="mt-4 text-xl font-semibold">OTP Verification</h2>
//                     <p className="mt-2 text-gray-600">Enter the OTP sent to your Aadhaar-linked mobile</p>
//                 </div>

//                 <div>
//                     <input
//                         type="text"
//                         value={otp}
//                         onChange={handleOtpChange}
//                         placeholder="······"
//                         className="w-full px-4 py-2 text-center text-2xl tracking-widest border rounded-lg outline-none"
//                         maxLength={6}
//                         style={{
//                             borderColor: theme.borderYellow,
//                             "--tw-ring-color": theme.buttonColor,
//                         }}
//                     />
//                 </div>

//                 <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Did not receive OTP?</span>
//                     <button
//                         style={{ color: theme.buttonColor }}
//                         className="hover:opacity-80"
//                         onClick={() => {
//                             setIsResendingOtp(true);
//                             generateOtp();
//                         }}
//                     >
//                         Resend OTP
//                     </button>
//                 </div>

//                 <Alert
//                     className="border rounded-xl"
//                     style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
//                 >
//                     <Info className="w-4 h-4" style={{ color: theme.buttonColor }} />
//                     <AlertDescription>
//                         <div className="ml-2">
//                             <p className="font-medium">Important:</p>
//                             <ul className="mt-2 space-y-1 text-sm">
//                                 <li>OTP is valid for 10 minutes</li>
//                                 <li>Make sure to check your SMS inbox</li>
//                                 <li>Do not share OTP with anyone</li>
//                             </ul>
//                         </div>
//                     </AlertDescription>
//                 </Alert>
//             </CardContent>
//         </Card>
//     );
// // Updated SelfieStep component
// const SelfieStep = () => (
//   <Card>
//       <CardContent className="p-6 space-y-6">
//           <div className="mx-auto w-64 h-64 border-2 border-dashed rounded-xl overflow-hidden relative"
//               style={{
//                   borderColor: theme.buttonColor,
//                   backgroundColor: selfieImage ? "transparent" : theme.lightYellow,
//               }}>
//               {!selfieImage && (
//                   <div className="relative w-full h-full">
//                       <video 
//                           ref={videoRef}
//                           autoPlay 
//                           playsInline 
//                           className="w-full h-full object-cover rounded-xl"
//                           style={{ transform: 'scaleX(-1)' }} // Mirror effect
//                       />
//                       <button
//                           onClick={takeSelfie}
//                           className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white"
//                           style={{ backgroundColor: theme.buttonColor }}
//                       >
//                           Capture
//                       </button>
//                   </div>
//               )}
//               {selfieImage && (
//                   <img 
//                       src={selfieImage} 
//                       alt="Selfie" 
//                       className="w-full h-full object-cover rounded-xl"
//                       style={{ transform: 'scaleX(-1)' }} // Keep consistent with video
//                   />
//               )}
//           </div>

//           <Alert
//               className="border rounded-xl"
//               style={{ backgroundColor: theme.lightYellow, borderColor: theme.borderYellow }}
//           >
//               <Info className="w-4 h-4" style={{ color: theme.buttonColor }} />
//               <AlertDescription>
//                   <div className="ml-2">
//                       <p className="font-medium">Selfie Guidelines:</p>
//                       <ul className="mt-2 space-y-1 text-sm">
//                           <li>Ensure good lighting</li>
//                           <li>Look directly at the camera</li>
//                           <li>Keep a neutral expression</li>
//                           <li>Remove any face coverings</li>
//                       </ul>
//                   </div>
//               </AlertDescription>
//           </Alert>

//           {selfieImage && (
//               <button
//                   onClick={() => {
//                       setSelfieImage(null);
//                       startCamera();
//                   }}
//                   style={{ color: theme.buttonColor }}
//                   className="w-full hover:opacity-80"
//               >
//                   Retake Selfie
//               </button>
//           )}
//       </CardContent>
//   </Card>
// );

//     const stepComponents = [<PrerequisitesStep />, <AadhaarStep />, <OtpStep />, <SelfieStep />];

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-2xl mx-auto p-6">
//                 {/* Header */}
//                 <div className="flex items-center mb-6">
//                     <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full">
//                         <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <h1 className="text-xl font-semibold text-center flex-1">DigiLocker Verification</h1>
//                 </div>

//                 {/* Step Indicator */}
//                 <div className="mb-8 relative">
//                     <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
//                         <div
//                             className="h-full transition-all duration-300"
//                             style={{
//                                 width: `${(currentStep / (steps.length - 1)) * 100}%`,
//                                 backgroundColor: theme.buttonColor,
//                             }}
//                         />
//                     </div>

//                     <div className="relative flex justify-between">
//                         {steps.map((step, idx) => (
//                             <div key={idx} className="flex flex-col items-center">
//                                 <div
//                                     className={`
//                   w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300
//                   ${idx <= currentStep ? "text-white" : "bg-white text-gray-400 border-2 border-gray-200"}
//                 `}
//                                     style={{
//                                         backgroundColor: idx <= currentStep ? theme.buttonColor : "white",
//                                     }}
//                                 >
//                                     {idx < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <span>{idx + 1}</span>}
//                                 </div>
//                                 <span
//                                     className={`
//                   mt-2 text-sm font-medium
//                   ${idx === currentStep ? "text-yellow-600" : "text-gray-500"}
//                 `}
//                                     style={{
//                                         color: idx === currentStep ? theme.buttonColor : undefined,
//                                     }}
//                                 >
//                                     {step}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Current Step Content */}
//                 <div className="mb-8">{stepComponents[currentStep]}</div>

//                 {/* Action Button */}
//                 <button
//                     onClick={handleNext}
//                     disabled={isLoading || (currentStep === 0 && !hasPrerequisites)}
//                     className={`
//             w-full py-3 px-4 rounded-xl font-medium text-white transition-colors duration-300
//             ${isLoading || (currentStep === 0 && !hasPrerequisites) ? "bg-gray-400" : "hover:opacity-90"}
//           `}
//                     style={{
//                         backgroundColor:
//                             isLoading || (currentStep === 0 && !hasPrerequisites) ? undefined : theme.buttonColor,
//                     }}
//                 >
//                     {isLoading ? (
//                         <div className="flex items-center justify-center">
//                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         </div>
//                     ) : (
//                         getButtonText()
//                     )}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default DigiLockerVerification;
