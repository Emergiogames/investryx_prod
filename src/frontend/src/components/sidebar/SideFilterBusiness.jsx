import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getFilterResult } from "../../services/user/apiMethods";
import { useDispatch } from "react-redux";
import { filter } from "../../utils/context/reducers/authSlice";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function SideFilterBusiness({ onFilterUpdate, currentPage, clear }) {
    let clearPosts = clear;
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    // console.log("888888", onFilterUpdate, currentPage);

    // useEffect(() => {
    //     if (onFilterUpdate) {
    //         dispatch({ type: "auth/filter", payload: { filter: false } });
    //     }
    // }, [onFilterUpdate]);
    useEffect(() => {
        dispatch({ type: "auth/filter", payload: { filter: false } });
    }, []);

    const [countryid, setCountryId] = useState(0);
    const [stateid, setStateId] = useState(0);

    const industryOptions = [
        { value: "agriculture", label: "Agriculture" },
        { value: "automotive", label: "Automotive" },
        { value: "banking_finance", label: "Banking & Finance" },
        { value: "biotechnology", label: "Biotechnology" },
        { value: "building", label: "Building" },
        { value: "business_services", label: "Business Services" },
        { value: "chemicals", label: "Chemicals" },
        { value: "construction", label: "Construction" },
        { value: "consulting", label: "Consulting" },
        { value: "consumer_products", label: "Consumer Products" },
        { value: "defense", label: "Defense" },
        { value: "education", label: "Education" },
        { value: "energy_utilities", label: "Energy & Utilities" },
        { value: "entertainment", label: "Entertainment" },
        { value: "environmental", label: "Environmental" },
        { value: "fashion", label: "Fashion" },
        { value: "food_beverages", label: "Food & Beverages" },
        { value: "government", label: "Government" },
        { value: "healthcare", label: "Healthcare" },
        { value: "hospitality", label: "Hospitality" },
        { value: "insurance", label: "Insurance" },
        { value: "internet", label: "Internet" },
        { value: "it_services", label: "IT Services" },
        { value: "legal", label: "Legal" },
        { value: "logistics", label: "Logistics & Transportation" },
        { value: "manufacturing", label: "Manufacturing" },
        { value: "media", label: "Media & Publishing" },
        { value: "mining", label: "Mining & Metals" },
        { value: "non_profit", label: "Non-Profit" },
        { value: "pharmaceuticals", label: "Pharmaceuticals" },
        { value: "real_estate", label: "Real Estate" },
        { value: "retail", label: "Retail" },
        { value: "sports", label: "Sports & Recreation" },
        { value: "telecommunications", label: "Telecommunications" },
        { value: "tourism", label: "Tourism" },
        { value: "transportation", label: "Transportation" },
        { value: "travel", label: "Travel" },
        { value: "utilities", label: "Utilities" },
        { value: "wholesale", label: "Wholesale" },
        { value: "others", label: "Others" },
    ];
    const preferenceOptions = [
        { value: "growth", label: "Growth Potential" },
        { value: "stability", label: "Stability" },
        { value: "food_beverage", label: "Popular Food & Beverage" },
        { value: "technology", label: "Technology" },
        { value: "manufacturing", label: "Manufacturing" },
        { value: "retail", label: "Retail Stores" },
        { value: "personal_services", label: "Personal Services" },
        { value: "business_services", label: "Business Services" },
        { value: "hospitality", label: "Hotels & Resorts" },
        { value: "healthcare", label: "Healthcare" },
        { value: "entertainment", label: "Entertainment & Recreation" },
        { value: "investors_buyers", label: "Investors & Buyers" },
        { value: "franchise", label: "Franchise" },
        { value: "other", label: "Other" },
    ];

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

    // Fetch filtered results
    const fetchFilteredResults = async (filterParams) => {
        console.log("filetparamm", filterParams);

        try {
            const filterData = {
                ...filterParams,
                entity_type: currentPage,
            };
            const result = await getFilterResult(filterData);
            dispatch({ type: "auth/filter", payload: { filter: true } });
            if (result.status === 200) {
                // Call the parent's callback with filtered data
                onFilterUpdate(result.data?.data || []);
            }
        } catch (error) {
            console.error("Error fetching filtered results", error);
        }
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedFetchResults = debounce(fetchFilteredResults, 500);

    const updateFilters = (newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        debouncedFetchResults(updatedFilters);
    };

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
        // clearPosts();
        onFilterUpdate([]);
        dispatch({ type: "auth/filter", payload: { filter: false } });
    };

    //show clear button logic
    const hasActiveFilters = (filters) => {
        return Object.entries(filters).some(([key, value]) => {
            // Check if value is not null or not 0 (for ebitda)
            return value !== null && value !== 0;
        });
    };

    //AddPost directly(change in profile accordengly)
    const AddPost = (currentPage) => {
        navigate("/add-post");
    };

    // Location change handlers
    const handleCountryChange = (selectedOption) => {
        setCountryId(selectedOption.id);
        updateFilters({
            country: selectedOption.name.toLowerCase(),
            state: null,
            city: null,
        });
    };

    const handleStateChange = (selectedOption) => {
        setStateId(selectedOption.id);
        updateFilters({
            state: selectedOption.name.toLowerCase(),
            city: null,
        });
    };
    const handleCityChange = (selectedOption) => {
        updateFilters({
            city: selectedOption.name.toLowerCase(),
        });
    };

    // Render Location Dropdowns
    const renderLocationDropdowns = () => (
        <div className="flex flex-col gap-y-3">
            <CountrySelect value={filters.country} onChange={handleCountryChange} placeHolder="Select Country" />
            {/* {filters.country && ( */}
            <StateSelect
                countryid={countryid}
                value={filters.state}
                onChange={handleStateChange}
                placeHolder="Select State"
            />
            {/* )} */}
            {/* {filters.state && ( */}
            <CitySelect countryid={countryid} stateid={stateid} onChange={handleCityChange} placeHolder="Select City" />
            {/* )} */}
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
                className="w-1/2 p-2 border rounded"
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
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-[15rem] block justify-end relative">
            <div className="sm:w-0 md:w-4/12 max-w-72 block justify-end sm:p-0 md:p-2">
                <aside
                    id="logo-sidebar"
                    className={`pl-2 ml-0 border hover:shadow-md sticky top-0 z-40 w-64 h-full transition-transform ${
                        isSidebarOpen ? "" : "-translate-x-full sm:translate-x-0"
                    }`}
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-black">
                        {/* First five options remain the same */}

                        <ul className="">
                            <li>
                                {currentPage && (
                                    <button
                                        onClick={() => AddPost(currentPage)}
                                        className={`bg-yellow-300 hover:bg-yellow-400 font-bold p-4 px-4 rounded-xl ${
                                            currentPage === "business" ? "text-lg" : "text-xl"
                                        }`}
                                    >
                                        {currentPage === "business"
                                            ? `Add Investment Offer`
                                            : currentPage === "investor"
                                            ? "Sell your business "
                                            : currentPage === "franchise"
                                            ? `Franchis your Brand`
                                            : currentPage === "advisor"
                                            ? "Add Advisor Profile"
                                            : null}
                                    </button>
                                )}
                            </li>

                            <ul className="space-y-0 font-medium mt-8">
                                <li>
                                    <Link
                                        to={"/"}
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
                                                fill-rule="evenodd"
                                                d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span className="ms-3 text-lg">Filter</span>
                                    </Link>
                                </li>
                            </ul>

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
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default SideFilterBusiness;
