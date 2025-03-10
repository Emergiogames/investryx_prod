import React, { useState, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFilterResult } from "../../services/user/apiMethods";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSelector } from "react-redux";

export const PostContext = createContext();

function ResponsiveSideNavBar({ onClick, isOpen }) {
    //profile selection by corresponding profile page for getting profile page
    const currentPage = useSelector((state) => state.auth.profile);
    console.log("filter profile type::", currentPage);

    // Location Dropdowns
    const countries = [
        { value: "india", label: "India" },
        { value: "usa", label: "USA" },
    ];

    const states = {
        india: [
            { value: "kerala", label: "Kerala" },
            { value: "karnataka", label: "Karnataka" },
        ],
        usa: [
            { value: "california", label: "California" },
            { value: "texas", label: "Texas" },
        ],
    };

    const cities = {
        kerala: [
            { value: "kochi", label: "Kochi" },
            { value: "trivandrum", label: "Trivandrum" },
        ],
        california: [
            { value: "los_angeles", label: "Los Angeles" },
            { value: "san_francisco", label: "San Francisco" },
        ],
    };

    // Industry Options
    const industryOptions = [
        { value: "building", label: "Building" },
        { value: "business_services", label: "Business Services" },
        { value: "education", label: "Education" },
        { value: "energy", label: "Energy" },
        { value: "finance", label: "Finance" },
        { value: "food_bev", label: "Food & Beverage" },
        { value: "healthcare", label: "Health Care" },
        { value: "logistics", label: "Logistics" },
        { value: "media", label: "Media" },
        { value: "retail", label: "Retail Shop" },
        { value: "technology", label: "Technology" },
        { value: "textiles", label: "Textiles" },
        { value: "travel", label: "Travel & Leisure" },
        { value: "others", label: "Others" },
    ];

    // Preference Options
    const preferenceOptions = [
        { value: "growth", label: "Growth Potential" },
        { value: "stability", label: "Stability" },
        { value: "innovation", label: "Innovation" },
        { value: "market_position", label: "Market Position" },
        { value: "profitability", label: "Profitability" },
    ];

    // State for all filter options
    const [filters, setFilters] = useState({
        country: null,
        state: null,
        city: null,
        industry: null,
        preference: null,
        ebitda: 0,
        range_starting: null,
        range_ending: null,
    });

    console.log("filterd datat::", filters);

    // Result data
    const [fiteredPosts, setfiteredPosts] = useState([]);
    console.log("%c filtered posts data", "color:yellow", fiteredPosts);

    // Fetch filtered results
    const fetchFilteredResults = async (filterParams) => {
        try {
            console.log("filterParams::", filterParams);
            console.log("currentPage::", currentPage);

            // Ensure filterParams includes required values
            const filterData = {
                ...filterParams,
                entity_type: currentPage, // Add currentPage as entity_type
            };

            // Call your API with the updated filter data
            const result = await getFilterResult(filterData);
            if (result.status === 200) {
                setfiteredPosts(result.data?.data);
            }
        } catch (error) {
            console.error("Error fetching filtered results", error);
        }
    };

    // Apply button result
    const generateFilter = (updatedFilters) => {
        // Ensure updatedFilters are properly merged with current filters
        const filterParams = { ...filters, ...updatedFilters };
        fetchFilteredResults(filterParams);
    };

    // Update filters without triggering API calls directly
    const updateFilters = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
    };

    // Clear the filter
    const clearFilter = () => {
        setFilters({
            country: null,
            state: null,
            city: null,
            industry: null,
            preference: null,
            ebitda: 0,
            range_starting: null,
            range_ending: null,
        });
        console.log("Filters cleared:", filters);
    };

    //show clear button logic
    const hasActiveFilters = (filters) => {
        return Object.entries(filters).some(([key, value]) => {
            // Check if value is not null or not 0 (for ebitda)
            return value !== null && value !== 0;
        });
    };

    //input data components
    // Location change handlers
    const handleCountryChange = (selectedOption) => {
        updateFilters({
            country: selectedOption,
            state: null,
            city: null,
        });
    };

    const handleStateChange = (selectedOption) => {
        updateFilters({
            state: selectedOption,
            city: null,
        });
    };

    // Render Location Dropdowns
    const renderLocationDropdowns = () => (
        <div className="flex flex-col gap-y-3">
            <Select
                options={countries}
                value={filters.country}
                onChange={handleCountryChange}
                placeholder="Select Country"
            />
            {filters.country && (
                <Select
                    options={states[filters.country.value]}
                    value={filters.state}
                    onChange={handleStateChange}
                    placeholder="Select State"
                />
            )}
            {filters.state && (
                <Select
                    options={cities[filters.state.value]}
                    value={filters.city}
                    onChange={(selectedOption) => updateFilters({ city: selectedOption })}
                    placeholder="Select City"
                />
            )}
        </div>
    );

    // Render Industry Dropdown
    const renderIndustryDropdown = () => (
        <Select
            options={industryOptions}
            value={filters.industry}
            onChange={(selectedOption) => updateFilters({ industry: selectedOption })}
            placeholder="Select Industry"
        />
    );

    // Render Preference Dropdown
    const renderPreferenceDropdown = () => (
        <Select
            options={preferenceOptions}
            value={filters.preference}
            onChange={(selectedOption) => updateFilters({ preference: selectedOption })}
            placeholder="Select Preference"
        />
    );

    // Render EBITDA Single Point Slider
    const renderEBITDAFilter = () => (
        <div className="space-y-3">
            <Slider min={-100} max={100} value={filters.ebitda} onChange={(value) => updateFilters({ ebitda: value })} />
            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    placeholder="EBITDA Value"
                    className="w-full p-2 border rounded"
                    value={filters.ebitda}
                    onChange={(e) => {
                        const value = Math.max(-100, Math.min(100, Number(e.target.value)));
                        updateFilters({ ebitda: value });
                    }}
                    min="-100"
                    max="100"
                />
            </div>
            <div className="text-sm text-gray-600">Current EBITDA Value: {filters.ebitda}%</div>
        </div>
    );

    // Render Investment Range
    const renderInvestmentRange = () => (
        <div className="flex space-x-2">
            <input
                type="number"
                placeholder="Min Investment"
                className=" p-2 border rounded"
                value={filters.range_starting || ""}
                onChange={(e) => updateFilters({ range_starting: e.target.value })}
            />
            <input
                type="number"
                placeholder="Max Investment"
                className="w-1/2 p-2 border rounded"
                value={filters.range_ending || ""}
                onChange={(e) => updateFilters({ range_ending: e.target.value })}
            />
        </div>
    );

    return (
        <div className="w-full relative">
            <div className="w-full md:hidden  justify-end">
                <aside
                    id="logo-sidebar"
                    className={`pl-2 ml-0 border hover:shadow-md sticky top-0 z-40 h-full transition-transform
        
        // isSidebarOpen
        //   ? "translate-x-0"
        //   : "-translate-x-full sm:translate-x-0"
      
       w-full md:hidden bg-white dark:bg-black `}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto">
                        <ul className="space-y-0 font-medium">
                            <li className="flex justify-between items-center gap-4">
                                {/* Link Section */}
                                <Link
                                    to="/"
                                    className="flex items-center p-2 pb-3 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 22"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ms-3 text-lg">Home</span>
                                </Link>

                                {/* Arrow Down Button Section */}
                                <button
                                    onClick={() => onClick((prevState) => !prevState)}
                                    className="px-2 py-1 bg-yellow-300 rounded-md hover:bg-yellow-400 transition-all flex items-center justify-center"
                                    title="Generate Filter with Current Filters"
                                >
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/60/60995.png"
                                        alt="Arrow Down"
                                        className="w-4 h-4"
                                    />
                                </button>
                            </li>

                            {/* Other list items */}
                        </ul>

                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <div className="text-lg font-semibold mb-2">Locations</div>
                                {renderLocationDropdowns()}
                            </li>
                            <li>
                                <div className="text-lg font-semibold mt-4 mb-2">Industries</div>
                                {renderIndustryDropdown()}
                            </li>
                            <li>
                                <div className="text-lg font-semibold mt-4 mb-2">Preferences</div>
                                {renderPreferenceDropdown()}
                            </li>
                            <li>
                                <div className="text-lg font-semibold mt-4 mb-2">EBITDA</div>
                                {renderEBITDAFilter()}
                            </li>
                            <li>
                                <div className="text-lg font-semibold mt-4 mb-2">Investment Range</div>
                                {renderInvestmentRange()}
                            </li>
                            <li>
                                <div className="">
                                    {filters && hasActiveFilters(filters) && (
                                        <button
                                            onClick={() => {
                                                clearFilter();
                                            }}
                                            className="bg-yellow-300 hover:bg-yellow-400 text-xl font-bold p-2 px-5 rounded-lg mt-3 mr-5"
                                        >
                                            Clear
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            generateFilter();
                                        }}
                                        className="bg-yellow-300 hover:bg-yellow-400
 text-xl font-bold
             p-2 px-5 rounded-lg
             mt-3"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default ResponsiveSideNavBar;
