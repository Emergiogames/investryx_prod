

//implimentation three by claude

// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { preference } from "../../services/user/apiMethods";
// import { useNavigate } from "react-router-dom";
// import { HiChevronLeft } from "react-icons/hi";
// import Geolocator from "../../utils/geolocator/geolocator";

// const PreferencesForm = () => {
//   const [questionData, setQuestionData] = useState(null);//full dat
//   const [loading, setLoading] = useState(true);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({});
//   const [questionList, setQuestionList] = useState([]);//first comon que(only)
//   const [userProfile, setUserProfile] = useState(null);//desicion to which profile 
//   const [location, setLocation] = useState(null);
//   const navigate = useNavigate();

//   // Fetch questionnaire data full and set first question
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const response = await fetch("/texts/preferences.json");
//         if (!response.ok) throw new Error("Failed to fetch questionnaire");
//         const data = await response.json();
//         setQuestionData(data);
//         setLoading(false);

//         // Initially only show the first common question
//         setQuestionList([data.common_questions[0]]);
//       } catch (error) {
//         console.error("Error fetching options:", error);
//         setLoading(false);
//       }
//     };
//     fetchOptions();
//   }, []);

//   // Update question list when profile is selected
//   useEffect(() => {
//     if (!questionData || !userProfile) return;

//     const profileQuestions = questionData.profile_specific[userProfile.toLowerCase()] || [];
//     const remainingCommonQuestions = questionData.common_questions.slice(1);
    
//     const orderedQuestions = [
//       questionData.common_questions[0], // First question always stays
//       ...profileQuestions,
//       ...remainingCommonQuestions
//     ];
    
//     setQuestionList(orderedQuestions);
//   }, [userProfile, questionData]);

//   // Fetch location
//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const locationData = await Geolocator();
//         setLocation(locationData);
//       } catch (error) {
//         console.error("Failed to get location data:", error);
//         toast.error("Failed to get location data");
//       }
//     };
//     fetchLocation();
//   }, []);

//   const handleFormDataChange = (questionKey, value, isMultiSelect = false) => {
//     if (isMultiSelect) {
//       setFormData(prev => ({
//         ...prev,
//         [questionKey]: prev[questionKey]?.includes(value)
//           ? prev[questionKey].filter(item => item !== value)
//           : [...(prev[questionKey] || []), value]
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [questionKey]: value
//       }));

//       // Set user profile based on first question's answer
//       if (currentStep === 0) {
//         const profileMap = {
//           "Investment opportunities": "investor",
//           "Selling a business": "business",
//           "Finding franchises": "franchise",
//           "Offering advisory services": "advisor"
//         };
//         setUserProfile(profileMap[value]);
//       }
//     }
//   };

//   const handleNext = () => setCurrentStep(prev => prev + 1);
//   const handlePrevious = () => setCurrentStep(prev => prev - 1);
//   const handleClose = () => navigate("/");

//   const handleSubmit = async () => {
//     try {
//       const submissionData = { ...formData, location, profile: userProfile };
//       const response = await preference(submissionData);

//       if (response?.data?.status) {
//         toast.success("Registration Successful");
//         navigate("/");
//       } else {
//         toast.error(response?.message || "Failed Registration");
//         navigate("/signup");
//       }
//     } catch (error) {
//       console.error("Error submitting preferences:", error);
//       toast.error("Failed to submit preferences");
//     }
//   };

//   const renderQuestion = () => {
//     if (!questionList[currentStep]) return null;

//     const currentQuestionObj = questionList[currentStep];
//     const questionKeys = Object.keys(currentQuestionObj);
//     const questionKey = questionKeys.find(key => key.startsWith('question'));
//     const optionsKey = questionKeys.find(key => key.startsWith('options'));
    
//     const questionText = currentQuestionObj[questionKey];
//     const options = currentQuestionObj[optionsKey];

//     const isMultiSelect = questionKey === 'question1' || questionKey === 'question16'; // Industries and Areas of expertise

//     return (
//       <div className="w-full flex justify-center">
//         <div className="bg-amber-100 w-[100vh] h-auto min-h-[20rem] flex flex-col p-6 rounded-lg">
//           <label className="text-lg font-semibold mb-6">{questionText}</label>
          
//           {options ? (
//             <div className="space-y-3">
//               {options.map((option, idx) => (
//                 <div key={idx} className="flex items-center">
//                   <input
//                     type={isMultiSelect ? "checkbox" : "radio"}
//                     id={`${questionKey}_${idx}`}
//                     name={questionKey}
//                     value={option}
//                     checked={isMultiSelect 
//                       ? formData[questionKey]?.includes(option)
//                       : formData[questionKey] === option
//                     }
//                     onChange={() => handleFormDataChange(questionKey, option, isMultiSelect)}
//                     className="w-4 h-4 mr-3"
//                   />
//                   <label 
//                     htmlFor={`${questionKey}_${idx}`}
//                     className="text-gray-800 cursor-pointer"
//                   >
//                     {option}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <input
//               type="text"
//               value={formData[questionKey] || ""}
//               onChange={e => handleFormDataChange(questionKey, e.target.value)}
//               className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
//               placeholder="Type your answer here..."
//             />
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-amber-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-300" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-amber-50 min-h-screen">
//       <div className="w-full flex pl-11 py-8 mt-6">
//         <div className="text-yellow-300 font-audiowide text-5xl">I</div>
//         <div className="font-audiowide text-5xl">nvestryx</div>
//       </div>
      
//       <div className="w-full mb-12">
//         <button onClick={handleClose} className="px-2 py-2">
//           <div className="flex items-center">
//             <HiChevronLeft className="w-20 h-20 text-yellow-300" />
//             <span className="font-semibold text-3xl">BACK</span>
//           </div>
//         </button>
//         <div className="h-2 bg-yellow-100 rounded w-screen">
//           <div
//             className="h-full bg-yellow-300 rounded transition-all duration-300"
//             style={{ width: `${((currentStep + 1) / questionList.length) * 100}%` }}
//           />
//         </div>
//       </div>

//       {renderQuestion()}

//       <div className="flex justify-around mt-8 pb-8">
//         <button
//           onClick={handlePrevious}
//           disabled={currentStep === 0}
//           className={`p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg ${
//             currentStep === 0 ? 'opacity-0' : ''
//           }`}
//         >
//           BACK
//         </button>
        
//         {currentStep === questionList.length - 1 ? (
//           <button
//             onClick={handleSubmit}
//             className="p-4 px-8 bg-green-500 text-white hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
//           >
//             SUBMIT
//           </button>
//         ) : (
//           <button
//             onClick={handleNext}
//             disabled={!formData[`question${currentStep}`]}
//             className={`p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg ${
//               !formData[`question${currentStep}`] ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//           >
//             NEXT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreferencesForm;


// //implimetation two by gpt

// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { preference } from "../../services/user/apiMethods";
// import { useNavigate } from "react-router-dom";
// import { HiChevronLeft } from "react-icons/hi";
// import Geolocator from "../../utils/geolocator/geolocator";

// const PreferencesForm = () => {
//   const [Data, setData] = useState([]); //all data here
//   const [loading, setLoading] = useState(true);//loader
//   const [currentStep, setCurrentStep] = useState(0);//current que
//   const [formData, setFormData] = useState({});
//   const [questionList, setQuestionList] = useState([]);
//   const [selectedProfile, setSelectedProfile] = useState("business"); // Example: 'business'
//   const [location, setLocation] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const response = await fetch("/texts/preferences.json");
//         if (!response.ok) throw new Error("Failed to fetch questionnaire");
//         const data = await response.json();
//         console.log("dtatzz ::", data)
//         setData(data);
//         setLoading(false);

//         // Build the ordered question list
//         const profileQuestions = data.profile_specific[selectedProfile] || [];
//         const orderedQuestions = [
//           ...data.common_questions.slice(0, 1), // first common question
//           ...profileQuestions,                 // profile-specific questions
//           ...data.common_questions.slice(1)    // remaining common questions
//         ];
//         setQuestionList(orderedQuestions);
//       } catch (error) {
//         console.error("Error fetching options:", error);
//         setLoading(false);
//       }
//     };
//     fetchOptions();
//   }, [selectedProfile]);


//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const locationData = await Geolocator();
//         setLocation(locationData || null);
//       } catch (error) {
//         console.error("Failed to get location data:", error);
//         toast.error("Failed to get location data");
//       }
//     };
//     fetchLocation();
//   }, []);

//   const handleFormDataChange = (questionKey, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [questionKey]: value,
//     }));
//   };

//   const handleNext = () => setCurrentStep(prev => prev + 1);
//   const handlePrevious = () => setCurrentStep(prev => prev - 1);

//   const handleSubmit = async () => {
//     try {
//       const submissionData = { ...formData, location };
//       const prefResponse = await preference(submissionData);

//       if (prefResponse?.data?.status) {
//         toast.success("Registration Successful");
//         navigate("/");
//       } else {
//         toast.error(prefResponse.message || "Failed Registration");
//         navigate("/signup");
//       }
//     } catch (error) {
//       console.error("Error submitting preferences:", error);
//       toast.error("Failed to submit preferences");
//     }
//   };

//   const handleClose = () => navigate("/");

//   // Render current question based on step
//   const renderQuestion = () => {
//     const currentQuestion = questionList[currentStep];
//     if (!currentQuestion) return null;

//     const questionKey = `question${currentStep}`;
//     const questionText = currentQuestion[`question${currentStep}`];
//     const options = currentQuestion[`options${currentStep}`] || [];

//     if (options.length > 0) {
//       return (
//         <div className="w-full flex justify-center">
//           <div className="bg-amber-100 w-[100vh] h-[20rem] flex flex-col">
//             <label className="text-lg font-semibold mb-4">{questionText}</label>
//             {options.map((option, idx) => (
//               <div key={idx}>
//                 <input
//                   type="radio"
//                   id={`${questionKey}_${idx}`}
//                   name={questionKey}
//                   value={option}
//                   checked={formData[questionKey] === option}
//                   onChange={() => handleFormDataChange(questionKey, option)}
//                 />
//                 <label htmlFor={`${questionKey}_${idx}`} className="ml-2">
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="w-full flex justify-center">
//           <div className="bg-amber-100 w-[100vh] h-[20rem] flex flex-col">
//             <label className="text-lg font-semibold mb-4">{questionText}</label>
//             <input
//               type="text"
//               value={formData[questionKey] || ""}
//               onChange={e => handleFormDataChange(questionKey, e.target.value)}
//               className="p-2 border rounded"
//             />
//           </div>
//         </div>
//       );
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-amber-50 min-h-screen">
//       <div className="w-full flex pl-11 py-8 mt-6">
//         <div className="text-yellow-300 font-audiowide text-5xl">I</div>
//         <div className="font-audiowide text-5xl">nvestryx</div>
//       </div>
//       <div className="w-full mb-12">
//         <button onClick={handleClose} className="px-2 py-2">
//           <div className="flex items-center">
//             <HiChevronLeft className="w-20 h-20 text-yellow-300 dark:text-white" />
//             <span className="font-semibold text-3xl">BACK</span>
//           </div>
//           <div className="h-2 bg-yellow-100 rounded w-screen">
//             <div
//               className="h-full bg-yellow-300 rounded transition-all duration-300"
//               style={{ width: `${((currentStep + 1) / questionList.length) * 100}%` }}
//             />
//           </div>
//         </button>
//       </div>

//       {renderQuestion()}

//       <div className="flex justify-around mt-8 pb-8">
//         <button
//           onClick={handlePrevious}
//           disabled={currentStep === 0}
//           style={{ display: currentStep === 0 ? "none" : "block" }}
//           className="p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
//         >
//           BACK
//         </button>
//         {currentStep === questionList.length - 1 ? (
//           <button
//             onClick={handleSubmit}
//             className="p-4 px-8 bg-green-500 text-white hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
//           >
//             SUBMIT
//           </button>
//         ) : (
//           <button
//             onClick={handleNext}
//             className="p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
//           >
//             NEXT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreferencesForm;











//implimentation one

// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { preference } from "../../services/user/apiMethods";
// import { useNavigate } from "react-router-dom";
// import { HiChevronLeft } from "react-icons/hi";
// import Select from "react-select";
// import Geolocator from "../../utils/geolocator/geolocator";

// const PreferencesForm = () => {
//   const [currentStep, setCurrentStep] = useState(0); //to set current post
//   const [Data, setData] = useState([]); //for getting pref data from json
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     question1: "",
//     question2: "",
//     question3: "",
//   });
//   const [location, setLocation] = useState(null);
//   const navigate = useNavigate();

//   const totalSteps = 3;

//   //Qusetionare full data fetching qusetion and ans from json
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const response = await fetch("/texts/preferences.json");
//         if (!response.ok) {
//           throw new Error("Failed to fetch questionnaire");
//         }
//         const data = await response.json();
//         setData(data);
//         setLoading(false); // set loading to false once data is fetched
//         console.log("Questionnaire data:", data);
//       } catch (error) {
//         console.error("Error fetching options:", error);
//         setLoading(false);
//       }
//     };
//     fetchOptions();
//   }, []);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       try {
//         const locationData = await Geolocator();
//         if (locationData) {
//           console.log("Location data:", locationData);
//           setLocation(locationData);
//         }
//       } catch (error) {
//         console.error("Failed to get location data:", error);
//         toast.error("Failed to get location data");
//       }
//     };
//     fetchLocation();
//   }, []);

//   const handleFormDataChange = (questionKey, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [questionKey]: value,
//     }));
//   };

//   //next and previous
//   const handleNext = () => {
//     if (currentStep < totalSteps - 1) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   //handle submit
//   const handleSubmit = async () => {
//     try {
//       if (!location) {
//         toast.error("Location data is not available");
//       }

//       const submissionData = {
//         ...formData,
//         location: location || null,
//       };

//       console.log("Form submitted", submissionData);
//       const prefResponse = await preference(submissionData);

//       if (prefResponse) {
//         if (prefResponse.data.status === true) {
//           toast.success("Registration Successful");
//           navigate("/");
//         } else {
//           toast.error(prefResponse.message || "Failed Registration");
//           navigate("/signup");
//         }
//       } else {
//         toast.error("Error occurred");
//       }
//     } catch (error) {
//       console.error("Error submitting preferences:", error);
//       toast.error("Failed to submit preferences");
//     }
//   };

//   //handle close
//   const handleClose = () => {
//     navigate("/");
//   };

//   //ques wise rendering
//   const renderQuestion = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <QuestionZero
//             props={Data.common_questions[0]}//multi radio
//             onChange={(value) => handleFormDataChange("question0", value)}
//             value={formData.question0}
//           />
//         );
//       case 1:
//         return (
//           <QuestionOne 
//           props={Data.common_questions[1]}//multi radio
//             onChange={(value) => handleFormDataChange("question1", value)}
//             value={formData.question1}
//           />
//         );
//       case 2:
//         return (
//           <QuestionTwo
//           props={Data.common_questions[2]} //input text
//             onChange={(value) => handleFormDataChange("question2", value)}
//             value={formData.question2}
//           />
//         );
//         case 3:
//         return (
//           <QuestionThree
//           props={Data.common_questions[3]} //single radio
//             onChange={(value) => handleFormDataChange("question3", value)}
//             value={formData.question3}
//           />
//         );
//         case 4:
//         return (
//           <QuestionFour
//           props={Data.common_questions[4]}
//             onChange={(value) => handleFormDataChange("question4", value)}
//             value={formData.question4}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Display a loading message while fetching data
//   }

//   return (
//     <div className="bg-amber-50 min-h-screen">
//       <div className="w-full flex pl-11 py-8 mt-6">
//         <div className="text-yellow-300 font-audiowide text-5xl">I</div>
//         <div className="font-audiowide text-5xl">nvestryx</div>
//       </div>

//       <div className="w-full mb-12">
//         <button onClick={handleClose} className="px-2 py-2">
//           <div className="flex items-center">
//             <HiChevronLeft className="w-20 h-20 text-yellow-300 dark:text-white" />
//             <span className="font-semibold text-3xl">BACK</span>
//             {/* <div className="bg-amber-300 px-9 mx-9 "></div> */}
//           </div>
//           {/* Progress indicator */}
//           <div className="h-2 bg-yellow-100 rounded w-screen">
//             <div
//               className="h-full bg-yellow-300 rounded transition-all duration-300"
//               style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
//             />
//           </div>
//         </button>
//       </div>

//       {renderQuestion()}

//       <div className="flex justify-around mt-8 pb-8">
//         <button
//           onClick={handlePrevious}
//           disabled={currentStep === 0}
//           style={{ display: currentStep === 0 ? "none" : "block" }}
//           className={`p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg`}
//         >
//           BACK
//         </button>

//         {currentStep === totalSteps - 1 ? (
//           <button
//             onClick={handleSubmit}
//             className="p-4 px-8 bg-green-500 text-white hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
//           >
//             SUBMIT
//           </button>
//         ) : (
//           <button
//             onClick={handleNext}
//             className="p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg"
//           >
//             NEXT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };












// //questionairre funcitons

// const QuestionOne = ({ props, onChange, value }) => {
//   return (
//     <div className="w-full flex justify-center">
//       <div className="bg-amber-100 w-[100vh] h-[20rem] flex flex-col justify-center items-center gap-y-4 p-6 m-6 mb-20">
//         <div className="text-3xl font-semibold">
//           {/* What is your primary objective for using our platform? */}
//           {props.question}
//         </div>
//         <div className="flex flex-col gap-4">
//           {props.options.map((option) => (
//             <label key={option} className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 name="question1"
//                 value={option}
//                 checked={value === option}
//                 onChange={(e) => onChange(e.target.value)}
//                 className="form-radio"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuestionTwo = ({ props,onChange, value }) => {
//   const options = [
//     {
//       value: "Healthcare & Pharmaceuticals",
//       label: "Healthcare & Pharmaceuticals",
//     },
//     { value: "Finance & Banking", label: "Finance & Banking 2" },
//     { value: "Retail & E-commerce", label: "Retail & E-commerce" },
//     {
//       value: "Manufacturing & Industrial",
//       label: "Manufacturing & Industrial",
//     },
//     {
//       value: "Real Estate & Construction",
//       label: "Real Estate & Construction",
//     },
//   ];
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const handleChange = (selected) => {
//     setSelectedOptions(selected);
//   };
//   return (
//     <div className="w-full flex justify-center">
//       <div className="bg-amber-100 w-[100vh] h-[20rem] flex flex-col justify-center items-center gap-y-4 p-6 m-6 mb-20">
//         <div className="text-3xl font-semibold">
//           What industries are you most interested in or associated with?
//         </div>
//         <div style={{ width: 300, margin: "0 auto" }}>
//           <label>Select Options:</label>
//           <Select
//             isMulti
//             value={selectedOptions}
//             onChange={handleChange}
//             options={options}
//             placeholder="Select multiple options"
//           />
//           <div>{selectedOptions.map((opt) => opt.label).join(", ")}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuestionThree = ({ onChange, value }) => {
//   return (
//     <div className="w-full flex justify-center">
//       <div className="bg-amber-100 w-[100vh] h-[20rem] flex flex-col justify-center items-center gap-y-4 p-6 m-6 mb-20">
//         <div className="text-3xl font-semibold">
//           Enter detailed description:
//         </div>
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-[20rem] h-12 px-4 rounded-lg border-2 border-yellow-300 focus:outline-none focus:border-yellow-400"
//         />
//       </div>
//     </div>
//   );
// };

// export default PreferencesForm;