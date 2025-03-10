import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { preference } from "../../services/user/apiMethods";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import Geolocator from "../../utils/geolocator/geolocator";

// Parameter mapping configuration
const commonParameterMapping = {
  question0: {
    parameter: "profile",
    profileMap: {
      "Investment opportunities": "investor",
      "Selling a business": "business",
      "Finding franchises": "franchise",
      "Offering advisory services": "advisor"
    }
  },
  question1: {
    parameter: "industry",
    multiSelect: true
  },
  question2: {
    parameter: ["interested_state", "interested_city"],
    locationBased: true
  },
  question3: {
    parameter: "frequency"
  }
};

const profileParameterMapping = {
  business: {
    question4: {
      parameter: "business_stage"
    },
    question5: {
      parameter: "business_goal"
    },
    question6: {
      parameter: "business_duration"
    }
  },
  investor: {
    question7: {
      parameter: "investment_interest"
    },
    question8: {
      parameter: "investment_horizon"
    },
    question9: {
      parameter: "risk_tolerance"
    },
    question10: {
      parameter: "investment_experience"
    }
  },
  franchise: {
    question11: {
      parameter: "buy_start"
    },
    question12: {
      parameter: "franchise_type",
      multiSelect: true
    },
    question13: {
      parameter: "budget",
      multiSelect: true
    },
    question15: {
      parameter: "franchise_brands"
    }
  },
  advisor: {
    question16: {
      parameter: "expertise",
      multiSelect: true
    },
    question17: {
      parameter: "client_type"
    },
    question18: {
      parameter: "advisor_experience"
    },
    question19: {
      parameter: "advisory_duration"
    }
  }
};

const PreferencesForm = () => {
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  // Fixed transformFormDataToApiParameters function
  const transformFormDataToApiParameters = (formData, userProfile, location) => {
    const apiParams = {};
    
    const addIfNotNull = (key, value) => {
      if (value !== null && value !== undefined && value !== '') {
        apiParams[key] = value;
      }
    };

     // Handle common parameters
     Object.entries(commonParameterMapping).forEach(([questionKey, mapping]) => {
      const value = formData[questionKey];
      
      if (mapping.locationBased && value) {
        // Safely handle location data which is now stored as an object
        addIfNotNull('interested_state', value.state);
        addIfNotNull('interested_city', value.city);
      } else if (mapping.multiSelect && Array.isArray(value)) {
        // Handle multi-select values
        addIfNotNull(mapping.parameter, value);
      } else if (mapping.parameter === "profile") {
        // Handle profile mapping
        const mappedValue = mapping.profileMap[value];
        addIfNotNull(mapping.parameter, mappedValue);
      } else if (Array.isArray(mapping.parameter)) {
        // Handle array of parameters
        mapping.parameter.forEach((param, index) => {
          const paramValue = Array.isArray(value) ? value[index] : value;
          addIfNotNull(param, paramValue);
        });
      } else {
        // Handle single parameter
        addIfNotNull(mapping.parameter, value);
      }
    });

    // Handle profile-specific parameters
    if (userProfile && profileParameterMapping[userProfile]) {
      Object.entries(profileParameterMapping[userProfile]).forEach(([questionKey, mapping]) => {
        const value = formData[questionKey];
        
        if (mapping.multiSelect && Array.isArray(value)) {
          // Handle multi-select values for profile-specific questions
          addIfNotNull(mapping.parameter, value);
        } else {
          // Handle single value
          addIfNotNull(mapping.parameter, value);
        }
      });
    }
    return apiParams;
  };

  // Fetch questionnaire data
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/texts/preferences.json");
        if (!response.ok) throw new Error("Failed to fetch questionnaire");
        const data = await response.json();
        setQuestionData(data);
        setLoading(false);
        setQuestionList([data.common_questions[0]]);
      } catch (error) {
        console.error("Error fetching options:", error);
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  // Update question list when profile is selected
  useEffect(() => {
    if (!questionData || !userProfile) return;

    const profileQuestions = questionData.profile_specific[userProfile.toLowerCase()] || [];
    const remainingCommonQuestions = questionData.common_questions.slice(1);
    
    const orderedQuestions = [
      questionData.common_questions[0],
      ...profileQuestions,
      ...remainingCommonQuestions 
    ];

    setQuestionList(orderedQuestions);
  }, [userProfile, questionData]);

  // Fetch location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await Geolocator();
        setLocation(locationData);
      } catch (error) {
        console.error("Failed to get location data:", error);
        toast.error("Failed to get location data");
      }
    };
    fetchLocation();
  }, []);

  const getCurrentQuestionKey = () => {
    const currentQuestionObj = questionList[currentStep];
    if (!currentQuestionObj) return null;
    return Object.keys(currentQuestionObj).find(key => key.startsWith('question'));
  };

  const handleFormDataChange = (questionKey, value, isMultiSelect = false, locationField = null) => {
    if (locationField) {
      // Handle location fields (state and city)
      setFormData(prev => ({
        ...prev,
        [questionKey]: {
          ...prev[questionKey],
          [locationField]: value
        }
      }));
    } else if (isMultiSelect) {
      setFormData(prev => ({
        ...prev,
        [questionKey]: prev[questionKey]?.includes(value)
          ? prev[questionKey].filter(item => item !== value)
          : [...(prev[questionKey] || []), value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [questionKey]: value
      }));

      // Set user profile based on first question's answer
      if (currentStep === 0) {
        const profileMap = commonParameterMapping.question0.profileMap;
        setUserProfile(profileMap[value]);
      }
    }
  };

  const isQuestionAnswered = () => {
    const questionKey = getCurrentQuestionKey();
    if (!questionKey) return false;

    const currentQuestionObj = questionList[currentStep];
    const optionsKey = Object.keys(currentQuestionObj).find(key => key.startsWith('options'));
    
    const mapping = commonParameterMapping[questionKey];
    
    // Special handling for location-based question
    if (mapping?.locationBased) {
      const locationData = formData[questionKey] || {};
      return locationData.state?.trim() && locationData.city?.trim();
    }

    // Check if current question is multi-select
    const isMultiSelect = 
      (mapping?.multiSelect) ||
      (userProfile && profileParameterMapping[userProfile][questionKey]?.multiSelect);

    if (isMultiSelect) {
      return formData[questionKey]?.length > 0;
    }

    if (!optionsKey) {
      return formData[questionKey]?.trim() !== '' && formData[questionKey] !== undefined;
    }

    return formData[questionKey] !== undefined;
  };

  const handleNext = () => {
    if (currentStep < questionList.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => navigate("/");

  const handleSubmit = async () => {
    try {
      const apiParams = transformFormDataToApiParameters(formData, userProfile, location);
      const response = await preference(apiParams);
      console.log("submit::", response.data);

      if (response?.status === 201) {
        toast.success("Your Preferences Saved Successfully");
        navigate("/");
      } else {
        toast.error(response?.message || "Failed Registration");
        navigate("/signup");
      }
    } catch (error) {
      console.error("Error submitting preferences:", error);
      toast.error("Failed to submit preferences");
    }
  };

  const renderQuestion = () => {
    const currentQuestionObj = questionList[currentStep];
    if (!currentQuestionObj) return null;

    const questionKey = getCurrentQuestionKey();
    const optionsKey = Object.keys(currentQuestionObj).find(key => key.startsWith('options'));
    
    const questionText = currentQuestionObj[questionKey];
    const options = currentQuestionObj[optionsKey];
    
    // Check if this is the location question
    const isLocationQuestion = commonParameterMapping[questionKey]?.locationBased;

    // Determine if this is a multi-select question
    const isMultiSelect = 
      (commonParameterMapping[questionKey]?.multiSelect) ||
      (userProfile && profileParameterMapping[userProfile][questionKey]?.multiSelect);

    return (
      <div className="w-full flex justify-center">
        <div className="bg-amber-100 w-[100vh] h-auto min-h-[20rem] flex flex-col p-6 rounded-lg">
          <label className="text-lg font-semibold mb-6">{questionText}</label>
          
          {isLocationQuestion ? (
            <div className="space-y-4">
              <input
                type="text"
                value={formData[questionKey]?.state || ""}   
                onChange={e => handleFormDataChange(questionKey, e.target.value, false, 'state')}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full"
                placeholder="Enter state..."
              />
              <input
                type="text"
                value={formData[questionKey]?.city || ""}
                onChange={e => handleFormDataChange(questionKey, e.target.value, false, 'city')}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full"
                placeholder="Enter city..."
              />
            </div>
          ) : options ? (
            <div className="space-y-3">
              {options.map((option, idx) => (
                <div key={idx} className="flex items-center">
                  <input
                    type={isMultiSelect ? "checkbox" : "radio"}
                    id={`${questionKey}_${idx}`}
                    name={questionKey}
                    value={option}
                    checked={isMultiSelect 
                      ? formData[questionKey]?.includes(option)
                      : formData[questionKey] === option
                    }
                    onChange={() => handleFormDataChange(questionKey, option, isMultiSelect)}
                    className="w-4 h-4 mr-3"
                  />
                  <label 
                    htmlFor={`${questionKey}_${idx}`}
                    className="text-gray-800 cursor-pointer hover:text-gray-600"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <input
              type="text"
              value={formData[questionKey] || ""}
              onChange={e => handleFormDataChange(questionKey, e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Type your answer here ..."
            />
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-300" />
      </div>
    );
  }

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="w-full flex pl-11 py-8">
        <div className="text-yellow-300 font-audiowide text-5xl">I</div>
        <div className="font-audiowide text-5xl">nvestryx</div>
      </div>
      
      <div className="w-full mb-12">
        {/* <button onClick={handleClose} className="px-2 py-2">
          <div className="flex items-center">
            <HiChevronLeft className="w-20 h-20 text-yellow-300" />
            <span className="font-semibold text-3xl">BACK</span>
          </div>
        </button> */}
        <div className="h-2 bg-yellow-100 rounded w-screen">
          <div
            className="h-full bg-yellow-300 rounded transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questionList.length) * 100}%` }}
          />
        </div>
      </div>

      {renderQuestion()}

      <div className="flex justify-around mt-8 pb-8">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg ${
            currentStep === 0 ? 'opacity-0' : ''
          }`}
        >
          BACK
        </button>
        
        {currentStep === questionList.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!isQuestionAnswered()}
            className={`p-4 px-8 bg-green-500 text-white hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg ${
              !isQuestionAnswered() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            SUBMIT
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isQuestionAnswered()}
            className={`p-4 px-8 bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg ${
              !isQuestionAnswered() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  );
};

export default PreferencesForm;