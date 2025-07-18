import React from "react";
import { useLocation } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function RefundDocsPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const { datas } = location.state || {}; 

  const handleClose = () => {
    navigate("/legal_privacy");
  };

  const renderSection = (title, content) => {
    if (Array.isArray(content)) {
      return (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
          <ul className="list-disc pl-6 space-y-2">
            {content.map((item, index) => (
              <li key={index} className="text-slate-700">{item}</li>
            ))}
          </ul>
        </div>
      );
    } else if (typeof content === 'object') {
      return (
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="mb-2">
              <h4 className="text-xl font-medium text-slate-700 capitalize">{key.replace(/_/g, ' ')}</h4>
              <p className="text-slate-600">{value}</p>
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-700">{content}</p>
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
            Refund Policy - {datas?.contact_information?.company_name}
          </h1>

          {/* Effective Date */}
          <div className="text-center mb-6 text-slate-600">
            <p>Effective Date: {datas?.effective_date}</p>
            <p>Last Updated: {datas?.last_updated}</p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {renderSection('Introduction', datas?.introduction)}
            
            {renderSection('Refund Conditions', datas?.refund_conditions?.service_stipulated_time?.map(condition => (
              `${condition.plan_type}: ${condition.stipulated_time} - ${condition.refund_condition}`
            )))}
            
            {renderSection('Transaction Charge Deduction', datas?.refund_conditions?.transaction_charge_deduction)}
            
            {renderSection('Profile Rejection', datas?.refund_conditions?.profile_rejection)}

            {renderSection('Non-refundable Conditions', datas?.non_refundable_conditions)}
            
            {renderSection('Refund Request Process', datas?.refund_request_process)}
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Contact Information</h3>
            <div className="text-slate-700">
              <p>Company: {datas?.contact_information?.company_name}</p>
              <p>Email: {datas?.contact_information?.email}</p>
              <p>Website: <a href={datas?.contact_information?.website} className="text-blue-500">{datas?.contact_information?.website}</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundDocsPages;
