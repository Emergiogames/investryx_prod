import React from "react";

function Banner({ props }) {
  const posts = props?.data || [];
//   console.log("banner data last :", posts);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div>
            <div className="text-4xl font-medium">Best Rated Posts Yet</div>
            <div className="text-sm text-slate-500">
              This will present the structured information in a readable way in
              both console or React UI. Let me know if you need further
              assistance or if there is a specific format you want to use!
            </div>
          </div>
          <div className="w-full h-96">
            <img src="https://dummyimage.com/640x16:9" alt="image" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Banner;
