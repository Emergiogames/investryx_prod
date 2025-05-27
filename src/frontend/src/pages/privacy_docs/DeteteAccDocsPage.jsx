import React from "react";
import { useLocation } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function DeteteAccDocsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { datas } = location.state || {}; 
  console.log('Logged Data:', datas);

  const handleClose = () => {
    navigate("/legal_privacy");
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
            {datas?.title}
          </h1>

          {/* Effective Dates */}
          <div className="text-center mb-6 text-slate-600">
            <p>Effective Date: {datas?.effective_date}</p>
            <p>Last Updated: {datas?.last_updated}</p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">Introduction</h3>
            <p className="text-slate-700 whitespace-pre-line">{datas?.introduction}</p>
          </div>

          {/* Deletion Process Steps */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Deletion Process</h3>
            <ol className="list-decimal list-inside text-slate-700 space-y-2">
              {datas?.deletion_conditions?.deletion_process?.map((item, index) => (
                <li key={index}>
                  <strong>{item.step || item.requirement}:</strong> {item.description}
                </li>
              ))}
            </ol>
          </div>

          {/* Deactivation Period & Reactivation */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">Additional Conditions</h3>
            <p className="text-slate-700 mb-2">
              <strong>Deactivation Period:</strong> {datas?.deletion_conditions?.deactivation_period}
            </p>
            <p className="text-slate-700">
              <strong>Reactivation:</strong> {datas?.deletion_conditions?.reactivation}
            </p>
          </div>

          {/* Non-deletion Conditions */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">Non-Deletion Conditions</h3>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              {datas?.non_deletion_conditions?.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>

          {/* Deletion Request Process */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-3">Deletion Request Process</h3>
            <p className="text-slate-700 whitespace-pre-line">{datas?.deletion_request_process}</p>
          </div>

          {/* Contact Information */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Contact Information</h3>
            <div className="text-slate-700">
              <p>Company: {datas?.contact_information?.company_name}</p>
              {datas?.contact_information?.email && <p>Email: {datas?.contact_information?.email}</p>}
              {datas?.contact_information?.website && <p>Website: {datas?.contact_information?.website}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeteteAccDocsPage;
