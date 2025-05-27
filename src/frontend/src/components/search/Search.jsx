import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getSearchResult } from "../../services/user/apiMethods";
import SearchedPosts from "./SearchedPosts";

function Search({ setIsSearchOpen }) {
  const [query, setQuery] = useState(""); // To track the input value
  const [serResult, setSerResult] = useState([]); // To store API results
  const [typingTimeout, setTypingTimeout] = useState(null); // Timeout for debounce
  const [recentSearches, setRecentSearches] = useState([]); // To store recent searches
  const searchContainerRef = useRef(null); // Ref for the search container

  // Load recent searches on component mount
  useEffect(() => {
    const savedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(savedSearches);

    // Add event listeners for Escape key and outside click
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false); // Close on Escape key
      }
    };

    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false); // Close on outside click
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when component mounts
    document.body.style.overflow = "hidden";

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [setIsSearchOpen]);

  // Function to fetch data
  const fetchData = async (searchQuery) => {
    try {
      const result = await getSearchResult(searchQuery); // Pass query to the API
      if (result.data) {
        setSerResult(result.data.data);
      }
      saveToRecentSearches(searchQuery); // Save the search to recent searches
    } catch (error) {
      console.error("Error fetching search result:", error);
    }
  };

  // Save query to recent searches in localStorage
  const saveToRecentSearches = (searchQuery) => {
    const savedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!savedSearches.includes(searchQuery)) {
      const updatedSearches = [searchQuery, ...savedSearches].slice(0, 20); // Keep only the last 20 searches
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches); // Update state for UI
    }
  };

  // Remove a specific search from recent searches
  const removeFromRecentSearches = (searchToRemove) => {
    const updatedSearches = recentSearches.filter(
      (search) => search !== searchToRemove
    );
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches); // Update state for UI
  };

  // Debounce logic
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to trigger search
    setTypingTimeout(
      setTimeout(() => {
        if (value.trim()) {
          fetchData(value.trim());
        }
      }, 1000) // 1-second debounce delay
    );
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center overflow-y-auto"
        style={{
          animation: "fadeIn 0.3s ease-out",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* Navbar-like Search Area */}
        <div className="w-full bg-slate-800 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-white hover:text-gray-300"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>

        {/* Search Input */}
        <div
          ref={searchContainerRef} // Attach the ref here
          className="w-full max-w-5xl mt-8 px-4"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search businesses, services, guides..."
              value={query} // Controlled input
              onChange={handleInputChange} // Handle input changes
              className="w-full p-4 pl-12 text-xl text-white bg-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>

          {/* Quick Search Suggestions */}
          <div className="mt-6 text-white">
            <p className="mb-2 text-sm text-gray-300">Quick searches:</p>
            <div className="flex space-x-2">
              {["Business Sales", "Restaurants", "Retail", "Services"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag); // Update input field
                      fetchData(tag); // Trigger search
                    }}
                    className="px-3 py-1 bg-slate-600 rounded-full text-sm hover:bg-slate-500 transition"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="mt-6 text-white">
            <p className="mb-2 text-sm text-gray-300">Recent Searches:</p>
            {recentSearches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-600 rounded-full px-3 py-1 text-sm text-white hover:bg-blue-500 transition"
                  >
                    <button
                      onClick={() => {
                        setQuery(search); // Update input field
                        fetchData(search); // Trigger search
                      }}
                      className="flex-grow text-left"
                    >
                      {search}
                    </button>
                    <button
                      onClick={() => removeFromRecentSearches(search)}
                      className="ml-2 text-white hover:text-red-400 transition"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No recent searches.</p>
            )}
          </div>

          {/* Search Results */}
          <div className="mt-8 text-white grid grid-cols-1 md:grid-cols-3 gap-4">
            {serResult && serResult.length > 0 ? (
              serResult.map((item, index) => (
                <div key={index}>
                  <SearchedPosts
                    props={item}
                    setIsSearchOpen={setIsSearchOpen}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
