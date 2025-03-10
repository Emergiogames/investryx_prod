import React from "react";
import { useLocation } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function BestDocsPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const { datas } = location.state || {}; 
  console.log('Logged Data:', datas);

  const handleClose = () => {
    navigate("/legal_privacy");
  };

  const renderBestPractice = (title, text) => {
    return (
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-700 whitespace-pre-line">{text}</p>
      </div>
    );
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="flex items-center p-4">
        <button onClick={handleClose} className="px-2 py-2 rounded">
          <HiChevronLeft className="w-10 h-10 text-yellow-400 dark:text-white" />
        </button>
        <span className="font-semibold">BACK</span>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">
            Privacy Policy - Investryx
          </h1>

          {/* Effective Date */}
          <div className="text-center mb-6 text-slate-600">
            <p>Effective Date: {datas?.effective_date}</p>
            <p>Last Updated: {datas?.last_updated}</p>
          </div>

          {/* Best Practices */}
          {renderBestPractice("For Business Owners", datas?.title_one && `${datas?.text_one}`)}
          {renderBestPractice("For Buyers and Investors", datas?.title_two && `${datas?.text_two}`)}

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Contact Information</h3>
            <div className="text-slate-700">
              <p>Company: {datas?.contact_information?.company_name}</p>
              <p>Email: {datas?.contact_information?.email}</p>
              <p>Website: {datas?.contact_information?.website}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestDocsPages;
