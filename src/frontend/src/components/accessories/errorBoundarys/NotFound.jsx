// NotFound.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
  <div className="w-full max-w-3xl p-16 bg-slate-300 text-yellow-800 rounded-3xl shadow-lg shadow-yellow-500/50 border border-yellow-300">
  
  <span className='cursor-pointer' onClick={() => window.location.href = '/'
  }>X</span>
    <img src="/images/white_emergio_inv.svg" alt="investryx_logo" className="mx-auto mb-8 w-60" />
    <h2 className="text-3xl font-bold text-center">404 - Page Not Found</h2>
    <p className="text-center mt-4 text-lg">The page you are looking for does not exist.</p>
  </div>
</div>



  );
};

export default NotFound;
