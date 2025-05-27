import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

function PrivacyDocs() {
  const navigate = useNavigate();
  const location = useLocation()


  const handleTerms = async () => {
    try {
      const response = await fetch("texts/privacy.json");
      const data = await response.json();
      const datas = data?.termsOfUse;

      navigate("/legal_terms_page", { state: { datas } }); // Pass termdata as state
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrivacy = async () => {
    try {
      const response = await fetch("texts/privacy.json");
      const data = await response.json();
      const datas = data?.privacyPolicies; // Accessing title correctly
      navigate("/legal_privacy_page", { state: { datas } }); // Pass titledata as state
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefund = async () => {
    try {
      const response = await fetch("texts/privacy.json");
      const data = await response.json();
      const datas = data?.refund; // Accessing title correctly
      navigate("/legal_refund_page", { state: { datas } }); // Pass titledata as state
    } catch (error) {
      console.error(error);
    }
  };

  const handleBest = async () => {
    try {
      const response = await fetch("texts/privacy.json");
      const data = await response.json();
      const datas = data?.bestPractice; // Accessing title correctly
      navigate("/legal_best_page", { state: { datas } }); // Pass titledata as state
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async() => {
    try {
       const response = await fetch("texts/privacy.json");
       const data = await response.json()
       const datas = data?.account_deletion;
       navigate("/legal_delete_page", { state: { datas }})
    } catch (error){
      console.error(error)
    }
  }

  
  const handleClose = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // Default browser back
    }
  };
  return (
    <div className="max-h-screen">
      <div>
        {/* Back button */}
        <div>
          <div className="flex items-center">
            <button onClick={handleClose} className="px-2 py-2 rounded">
              <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
            </button>
            <span className="font-semibold">BACK</span>
          </div>
          <div className="font-extrabold text-4xl text-center">
            Legal and privacy information
          </div>
        </div>
        <hr className="border-t-4 border-yellow-200 my-8 mx-10" />

        {/* Main container */}
        <div className="xl:flex justify-evenly items-center">
          {/* Left text container */}
          <div className="leading-loose text-3xl w-1/2 text-center">
            <ul>
              <li>
                <div onClick={handleTerms} className="cursor-pointer">
                  Terms Of Use
                </div>
              </li>
              <li>
                <div onClick={handlePrivacy} className="cursor-pointer">
                  Privacy & Policy{" "}
                </div>
              </li>
              <li>
                <div onClick={handleRefund} className="cursor-pointer">
                  Refund Policy{" "}
                </div>
              </li>
              <li>
                <div onClick={handleBest} className="cursor-pointer">
                  Best Practices{" "}
                </div>
              </li>
              <li>
                <div onClick={handleDelete} className="cursor-pointer">
                Guidelines for Deleting Accounts{" "}
                </div>
              </li>
            </ul>
          </div>
          {/* Right text container */}
          <div className="w-1/2">
            <img
              src="/images/Data security and financial data protection.png"
              alt="privacy_image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyDocs;
