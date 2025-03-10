import React from "react";

function SavedPageLoader() {
  return (
    <div className="w-96 lg:px-4 py-7 sm: p-0   h-max rounded-md border-none shadow-md bg-white border animate-pulse">
      <div className="flex justify-between items-center">
        {/* top*/}
        <div className="flex ml-4">
          {/* <div className="flex items-center justify-center bg-gray-300 rounded-full w-12 h-12 overflow-hidden"></div> */}
          <div className=" mb-1 ml-4">
            <div className="h-6 bg-gray-200 rounded w-24 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
      {/* center  */}
      <div className="lg:p-0 sm:p-0 my-3">
        <div className="relative w-full bg-slate-300 h-36"></div>
      </div>
      {/* bottom  */}
      <div className="text-black block pb-2 pl-2">
        <div className="text-sm h-4 bg-gray-200 rounded w-48 mb-1"></div>
        <div className="font-semibold h-6 bg-gray-200 rounded w-32 "></div>
      </div>
    </div>
  );
}

export default SavedPageLoader;
