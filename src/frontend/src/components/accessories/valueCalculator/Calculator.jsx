import React, { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function CalculatorForm() {
  const [formData, setFormData] = useState({
    name: "",
    currency: "",
    money: "",
    ebidta: "",
    country: "",
  });
  const [valuation, setValuation] = useState(null);

  const countryMultipliers = {
    USA: 10,
    India: 8,
    Canada: 9,
    Other: 7, // Default multiplier for other countries
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateValuation = () => {
    const { country, ebidta } = formData;
    if (country && ebidta) {
      const multiplier =
        countryMultipliers[country] || countryMultipliers["Other"];
      const calculatedValuation = ebidta * multiplier;
      setValuation(calculatedValuation.toFixed(2)); // Round to 2 decimal places
    } else {
      setValuation("Please fill in all fields correctly.");
    }
  };

  return (
    <>
      <section className="w-full flex justify-center items-center xl:flex h-screen">
        {/* calculator start */}
        <div className="w-full xl:w-1/2 bg-white p-0 sm:p-12">
          <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
            <h1 className="text-2xl font-bold mb-8">
              Business Valuation Calculator
            </h1>
            <form id="form" noValidate>
              {/* Country Input */}
              <div className="relative z-0 w-full mb-5">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full bg-transparent border-0 border-b-2 focus:border-black border-gray-200"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="India">India</option>
                  <option value="Canada">Canada</option>
                  <option value="Other">Other</option>
                </select>
                {/* <label htmlFor="country" className="absolute top-3 text-gray-500">
                  Select Country
                </label> */}
              </div>

              {/* Currency Radio */}
              <fieldset className="relative z-0 w-full p-px mb-5">
                <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">
                  Choose a Currency
                </legend>
                <div className="block pt-3 pb-2 space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="currency"
                      value="USD"
                      checked={formData.currency === "USD"}
                      onChange={handleChange}
                      className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                    />
                    USD $
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="currency"
                      value="INR"
                      checked={formData.currency === "INR"}
                      onChange={handleChange}
                      className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                    />
                    INR $
                  </label>
                </div>
              </fieldset>

              {/* Revenue Input */}
              <div className="relative z-0 w-full mb-5">
                <input
                  type="number"
                  name="money"
                  placeholder=" "
                  value={formData.money}
                  onChange={handleChange}
                  className="pt-3 pb-2 pl-5 block w-full px-0 bg-transparent border-0 border-b-2 focus:border-black border-gray-200"
                />
                <div className="absolute top-0 left-0 mt-3 ml-1 text-gray-400">
                  $
                </div>
                <label
                  htmlFor="money"
                  className={`absolute duration-300 top-3 left-5 text-gray-500 ${
                    formData.money && "scale-75 -translate-y-6"
                  }`}
                >
                  Annual Company Revenue
                </label>
              </div>

              {/* EBIDTA Input */}
              <div className="relative z-0 w-full mb-5">
                <input
                  type="number"
                  name="ebidta"
                  placeholder=" "
                  value={formData.ebidta}
                  onChange={handleChange}
                  className="pt-3 pb-2 pr-12 block w-full px-0 bg-transparent border-0 border-b-2 focus:border-black border-gray-200"
                />
                <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-400">
                  %
                </div>
                <label
                  htmlFor="ebidta"
                  className={`absolute duration-300 top-3 text-gray-500 ${
                    formData.ebidta && "scale-75 -translate-y-6"
                  }`}
                >
                  EBIDTA
                </label>
              </div>

              {/* Submit Button */}
              <button
                id="button"
                type="button"
                onClick={calculateValuation}
                className="w-full px-6 py-3 mt-3 text-lg rounded-lg shadow bg-yellow-300 hover:bg-yellow-400 focus:outline-none"
              >
                Calculate
              </button>
            </form>

            {/* Display Valuation */}
            {valuation && (
              <div className="mt-6 text-xl text-green-600">
                Business Valuation: {valuation} {formData.currency}
              </div>
            )}
          </div>
        </div>

        {/* Text Section */}
        <div className="none xl:w-1/2 flex flex-col justify-center">
          <iframe
            src="https://lottie.host/embed/48840921-a0bf-4ff0-a090-91810b5aa256/yeUrX8ZBLH.json"
            style={{ width: "100%", height: "500px" }}
            className="hidden xl:block" // This hides the iframe below xl size
          ></iframe>
        </div>
      </section>
    </>
  );
}
