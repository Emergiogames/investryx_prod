import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { preference } from "../../services/user/apiMethods";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import Geolocator from "../../utils/geolocator/geolocator";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

// Parameter mapping configuration
const commonParameterMapping = {
    question0: {
        parameter: "profile",
        profileMap: {
            "Investment opportunities": "investor",
            "Selling a business": "business",
            "Finding franchises": "franchise",
            "Offering advisory services": "advisor",
        },
    },
    question1: {
        parameter: "industry",
        multiSelect: true,
    },
    question2: {
        parameter: ["interested_state", "interested_city"],
        locationBased: true,
    },
    question3: {
        parameter: "frequency",
    },
};

const profileParameterMapping = {
    business: {
        question4: {
            parameter: "business_stage",
        },
        question5: {
            parameter: "business_goal",
        },
        question6: {
            parameter: "business_duration",
        },
    },
    investor: {
        question7: {
            parameter: "investment_interest",
        },
        question8: {
            parameter: "investment_horizon",
        },
        question9: {
            parameter: "risk_tolerance",
        },
        question10: {
            parameter: "investment_experience",
        },
    },
    franchise: {
        question11: {
            parameter: "buy_start",
        },
        question12: {
            parameter: "franchise_type",
            multiSelect: true,
        },
        question13: {
            parameter: "budget",
            multiSelect: true,
        },
        question15: {
            parameter: "franchise_brands",
        },
    },
    advisor: {
        question16: {
            parameter: "expertise",
            multiSelect: true,
        },
        question17: {
            parameter: "client_type",
        },
        question18: {
            parameter: "advisor_experience",
        },
        question19: {
            parameter: "advisory_duration",
        },
    },
};

const PreferencesForm = () => {
    const [questionData, setQuestionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [questionList, setQuestionList] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [location, setLocation] = useState(null);

    // State and city management
    const [allStatesCities, setAllStatesCities] = useState({});
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);
    const [currentStateSelection, setCurrentStateSelection] = useState("");
    const [currentCitySelection, setCurrentCitySelection] = useState("");
    const [selectAllStates, setSelectAllStates] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Selected States:", selectedStates);
        console.log("Selected Cities:", selectedCities);
    }, [selectedStates, selectedCities]);

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

    // Fetching State and cities data
    useEffect(() => {
        const fetchCityState = async () => {
            try {
                const response = await fetch("/texts/stateCityMapping.json");
                if (!response.ok) throw new Error("Failed to fetch City - States");
                const data = await response.json();
                setAllStatesCities(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching State-cities:", error);
                setLoading(false);
            }
        };
        fetchCityState();
    }, []);

    // Update available cities when state selection changes
    useEffect(() => {
        if (currentStateSelection && allStatesCities[currentStateSelection]) {
            setAvailableCities(allStatesCities[currentStateSelection]);
            setCurrentCitySelection(""); // Reset city selection when state changes
        } else {
            setAvailableCities([]);
        }
    }, [currentStateSelection, allStatesCities]);

    // Update question list when profile is selected
    useEffect(() => {
        if (!questionData || !userProfile) return;

        const profileQuestions = questionData.profile_specific[userProfile.toLowerCase()] || [];
        const remainingCommonQuestions = questionData.common_questions.slice(1);

        const orderedQuestions = [questionData.common_questions[0], ...profileQuestions, ...remainingCommonQuestions];

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
        return Object.keys(currentQuestionObj).find((key) => key.startsWith("question"));
    };

    const handleFormDataChange = (questionKey, value, isMultiSelect = false, locationField = null) => {
        if (locationField) {
            // Handle location fields (state and city)
            setFormData((prev) => ({
                ...prev,
                [questionKey]: {
                    ...prev[questionKey],
                    [locationField]: value,
                },
            }));
        } else if (isMultiSelect) {
            setFormData((prev) => ({
                ...prev,
                [questionKey]: prev[questionKey]?.includes(value)
                    ? prev[questionKey].filter((item) => item !== value)
                    : [...(prev[questionKey] || []), value],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [questionKey]: value,
            }));

            // Set user profile based on first question's answer
            if (currentStep === 0) {
                const profileMap = commonParameterMapping.question0.profileMap;
                setUserProfile(profileMap[value]);
            }
        }
    };

    // Handle select all states functionality
    const handleSelectAllStates = () => {
        if (selectAllStates) {
            // Deselect all states and cities
            setSelectedStates([]);
            setSelectedCities([]);
            setSelectAllStates(false);
        } else {
            // Select all states and their cities
            const allStates = Object.keys(allStatesCities);
            const allCities = [];
            
            allStates.forEach(state => {
                const stateCities = allStatesCities[state] || [];
                stateCities.forEach(city => {
                    allCities.push({
                        state: state,
                        city: city
                    });
                });
            });
            
            setSelectedStates(allStates);
            setSelectedCities(allCities);
            setSelectAllStates(true);
        }
    };

    // Add a selected state to the list and select all its cities
    const addState = () => {
        if (currentStateSelection && !selectedStates.includes(currentStateSelection)) {
            // Add the state
            const newSelectedStates = [...selectedStates, currentStateSelection];
            setSelectedStates(newSelectedStates);
            
            // Add all cities for this state
            const stateCities = allStatesCities[currentStateSelection] || [];
            const newCities = stateCities.map(city => ({
                state: currentStateSelection,
                city: city
            }));
            
            // Filter out any duplicates
            const uniqueNewCities = newCities.filter(newCity => 
                !selectedCities.some(existingCity => 
                    existingCity.state === newCity.state && existingCity.city === newCity.city
                )
            );
            
            setSelectedCities([...selectedCities, ...uniqueNewCities]);
            setCurrentStateSelection("");
        }
    };

    // Remove a state and all its cities from the list
    const removeState = (stateToRemove) => {
        setSelectedStates(selectedStates.filter((state) => state !== stateToRemove));
        setSelectedCities(selectedCities.filter((cityObj) => cityObj.state !== stateToRemove));
        
        // Update select all checkbox - only uncheck if we're removing states
        if (selectAllStates) {
            setSelectAllStates(false);
        }
    };

    // Add a selected city to the list
    const addCity = () => {
        if (
            currentCitySelection &&
            currentStateSelection &&
            !selectedCities.some((city) => city.city === currentCitySelection && city.state === currentStateSelection)
        ) {
            setSelectedCities([
                ...selectedCities,
                {
                    state: currentStateSelection,
                    city: currentCitySelection,
                },
            ]);
            setCurrentCitySelection("");
        }
    };

    // Remove a city from the list
    const removeCity = (cityToRemove) => {
        setSelectedCities(selectedCities.filter((city) => city.city !== cityToRemove));
        
        // Update select all checkbox when individual cities are removed
        if (selectAllStates) {
            setSelectAllStates(false);
        }
    };

    // Group cities by state for display
    const groupCitiesByState = () => {
        const grouped = {};
        selectedCities.forEach(cityObj => {
            if (!grouped[cityObj.state]) {
                grouped[cityObj.state] = [];
            }
            grouped[cityObj.state].push(cityObj.city);
        });
        return grouped;
    };

    //FOR CHECK QUE ANS OR NOT(FOR NEXT BUTTON)
    const isQuestionAnswered = () => {
        const questionKey = getCurrentQuestionKey();
        if (!questionKey) return false;

        const currentQuestionObj = questionList[currentStep];
        const optionsKey = Object.keys(currentQuestionObj).find((key) => key.startsWith("options"));

        const mapping = commonParameterMapping[questionKey];

        // Special handling for location-based question(city and state)
        if (mapping?.locationBased) {
            return selectedStates.length > 0 && selectedCities.length > 0;
        }

        // Check if current question is multi-select
        const isMultiSelect =
            mapping?.multiSelect || (userProfile && profileParameterMapping[userProfile][questionKey]?.multiSelect);

        if (isMultiSelect) {
            return formData[questionKey]?.length > 0;
        }

        if (!optionsKey) {
            return formData[questionKey]?.trim() !== "" && formData[questionKey] !== undefined;
        }

        return formData[questionKey] !== undefined;
    };

    const handleNext = () => {
        if (currentStep < questionList.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleClose = () => navigate("/");

    // Fixed transformFormDataToApiParameters function (ALL DATA WHIL API SUBMISSION)
    const transformFormDataToApiParameters = (formData, userProfile, location) => {
        const apiParams = {};

        const addIfNotNull = (key, value) => {
            if (value !== null && value !== undefined && value !== "") {
                apiParams[key] = value;
            }
        };

        // Handle common parameters
        Object.entries(commonParameterMapping).forEach(([questionKey, mapping]) => {
            const value = formData[questionKey];

            if (mapping.locationBased && questionKey === "question2") {
                // Handle location data from our state/city selection
                if (selectedStates.length > 0) {
                    addIfNotNull("interested_state", selectedStates);
                }
                if (selectedCities.length > 0) {
                    addIfNotNull(
                        "interested_city",
                        selectedCities.map((cityObj) => cityObj.city)
                    );
                }
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

    //FINAL API CALL
    const handleSubmit = async () => {
        try {
            const apiParams = transformFormDataToApiParameters(formData, userProfile, location);
            const response = await preference(apiParams);
            if (response?.status === 201) {
                toast.success("Your Preferences Saved Successfully");
                navigate("/");
            } else {
                toast.error(response?.message || "Failed Registration");
                navigate("/signup");
            }
        } catch (error) {
            console.error("Error submitting preferences:", error);
            toast.error(error?.message || "Failed to submit preferences");
        }
    };

    const renderQuestion = () => {
        const currentQuestionObj = questionList[currentStep];
        if (!currentQuestionObj) return null;

        const questionKey = getCurrentQuestionKey();
        const optionsKey = Object.keys(currentQuestionObj).find((key) => key.startsWith("options"));

        const questionText = currentQuestionObj[questionKey];
        const options = currentQuestionObj[optionsKey];

        // Check if this is the location question
        const isLocationQuestion = commonParameterMapping[questionKey]?.locationBased;

        // Determine if this is a multi-select question
        const isMultiSelect =
            commonParameterMapping[questionKey]?.multiSelect ||
            (userProfile && profileParameterMapping[userProfile][questionKey]?.multiSelect);

        const groupedCities = groupCitiesByState();

        return (
            <div className="w-full flex justify-center">
                <div className="bg-amber-100 w-[100vh] h-auto min-h-[20rem] flex flex-col p-6 rounded-lg">
                    <label className="text-lg font-semibold mb-6 text-black">{questionText}</label>

                    {isLocationQuestion ? (
                        <div className="space-y-4">
                            {/* Select All States Option */}
                            <div className="flex items-center space-x-2 p-3 bg-yellow-100 rounded-lg border-2 border-yellow-300">
                                <input
                                    type="checkbox"
                                    id="selectAllStates"
                                    checked={selectAllStates}
                                    onChange={handleSelectAllStates}
                                    className="w-5 h-5 text-yellow-600 focus:ring-yellow-500 rounded"
                                />
                                <label 
                                    htmlFor="selectAllStates" 
                                    className="text-black font-semibold cursor-pointer hover:text-gray-700"
                                >
                                    ✓ Select All States (with all cities)
                                </label>
                            </div>

                            {/* State Selection */}
                            <div className="flex items-center space-x-2">
                                <select
                                    value={currentStateSelection}
                                    onChange={(e) => setCurrentStateSelection(e.target.value)}
                                    className="p-2 border rounded-lg flex-grow bg-amber-50 text-black"
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(allStatesCities).map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={addState}
                                    disabled={!currentStateSelection}
                                    className="p-2 bg-yellow-500 text-black rounded-lg disabled:opacity-50 hover:bg-yellow-600 transition-colors"
                                >
                                    Add State
                                </button>
                            </div>

                            {/* Selected States List */}
                            {selectedStates.length > 0 && (
                                <div className="mt-2">
                                    <h4 className="font-medium mb-1 text-black">
                                        Selected States: ({selectedStates.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedStates.map((state) => (
                                            <div
                                                key={state}
                                                className="bg-yellow-200 px-3 py-1 rounded-full flex items-center text-black"
                                            >
                                                {state}
                                                <button 
                                                    onClick={() => removeState(state)} 
                                                    className="ml-2 text-black hover:text-red-600"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* City Selection */}
                            {currentStateSelection && (
                                <div className="flex items-center space-x-2 mt-4">
                                    <select
                                        value={currentCitySelection}
                                        onChange={(e) => setCurrentCitySelection(e.target.value)}
                                        className="p-2 border rounded-lg flex-grow bg-amber-50 text-black"
                                        disabled={!currentStateSelection}
                                    >
                                        <option value="">Select City (optional)</option>
                                        {availableCities.map((city) => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={addCity}
                                        disabled={!currentCitySelection}
                                        className="p-2 bg-yellow-500 text-black rounded-lg disabled:opacity-50 hover:bg-yellow-600 transition-colors"
                                    >
                                        Add City
                                    </button>
                                </div>
                            )}

                            {/* Selected Cities List - Grouped by State */}
                            {selectedCities.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="font-medium mb-2 text-black">
                                        Selected Cities: ({selectedCities.length} total)
                                    </h4>
                                    <div className="overflow-x-auto pb-2">
                                        <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
                                            {Object.entries(groupedCities).map(([state, cities]) => (
                                                <div 
                                                    key={state} 
                                                    className="bg-yellow-200 p-3 rounded-lg flex-shrink-0 w-64"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h5 className="font-medium text-black">
                                                            {state} ({cities.length})
                                                        </h5>
                                                        <button 
                                                            onClick={() => removeState(state)}
                                                            className="text-black hover:text-red-600"
                                                        >
                                                            × Remove All
                                                        </button>
                                                    </div>
                                                    <div className="max-h-40 overflow-y-auto">
                                                        {cities.map((city) => (
                                                            <div 
                                                                key={`${state}-${city}`} 
                                                                className="flex justify-between items-center py-1 px-2 bg-yellow-100 rounded mb-1"
                                                            >
                                                                <span className="text-black">{city}</span>
                                                                <button 
                                                                    onClick={() => removeCity(city)}
                                                                    className="text-black hover:text-red-600"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Summary when all states selected */}
                            {selectAllStates && (
                                <div className="mt-4 p-3 bg-green-100 rounded-lg border-2 border-green-300">
                                    <p className="text-green-800 font-medium">
                                        ✓ All States Selected: {selectedStates.length} states with {selectedCities.length} cities total
                                    </p>
                                    <p className="text-green-700 text-sm mt-1">
                                        You can still manage individual states and cities below. The "Select All" will automatically uncheck when you make changes.
                                    </p>
                                </div>
                            )}
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
                                        checked={
                                            isMultiSelect
                                                ? formData[questionKey]?.includes(option)
                                                : formData[questionKey] === option
                                        }
                                        onChange={() => handleFormDataChange(questionKey, option, isMultiSelect)}
                                        className="w-4 h-4 mr-3 text-yellow-600 focus:ring-yellow-500"
                                    />
                                    <label
                                        htmlFor={`${questionKey}_${idx}`}
                                        className="text-black cursor-pointer hover:text-gray-700"
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
                            onChange={(e) => handleFormDataChange(questionKey, e.target.value)}
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-amber-50 text-black"
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
                <div className="font-audiowide text-5xl text-black">nvestryx</div>
            </div>

            <div className="w-full mb-12">
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
                    className={`p-4 px-8 bg-yellow-300 hover:bg-yellow-400 text-black transition-colors duration-300 ease-in-out rounded-lg ${
                        currentStep === 0 ? "opacity-0" : ""
                    }`}
                >
                    BACK
                </button>

                {currentStep === questionList.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        disabled={!isQuestionAnswered()}
                        className={`p-4 px-8 bg-yellow-500 hover:bg-yellow-600 text-black transition-colors duration-300 ease-in-out rounded-lg ${
                            !isQuestionAnswered() ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        SUBMIT
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        disabled={!isQuestionAnswered()}
                        className={`p-4 px-8 bg-yellow-300 hover:bg-yellow-400 text-black transition-colors duration-300 ease-in-out rounded-lg ${
                            !isQuestionAnswered() ? "opacity-50 cursor-not-allowed" : ""
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