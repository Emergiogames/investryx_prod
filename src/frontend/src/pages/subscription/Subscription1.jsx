import React, { useEffect, useState } from "react";
import { getPlans } from "../../services/user/apiMethods";
import { useNavigate } from "react-router-dom";

function Subscription() {
  const navigate = useNavigate();

  const [planOwn, setPlanOwn] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(false); // Add an error state

  useEffect(() => {
    const getPlanData = async () => {
      try {
        setLoading(true);
        // const type = {
        //   "type" : "business"
        // }
        const type = "business";
        const response = await getPlans(type);
        if (response.status === 200 && response.data.length > 0) {
          setPlanOwn(response.data);
          console.log("Plans fetched", response.data);
        } else {
          setError(true); // Set error if no data is returned
          console.error("No plans found or error occurred while fetching data");
        }
      } catch (error) {
        setError(true); // Handle API call failure
        console.error(error.message);
      } finally {
        setLoading(false); // Stop loading when the API call finishes
      }
    };
    getPlanData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div className="w-24 h-24 bg-red-700">Error loading plans</div>; // Show error message
  }

  // handle buy operation
  const handleBuy = (plan) => {
    navigate(`/buy-subscription?id=${plan.id}`, {
      state: { plan },
    });
  };

  return loading ? (
    <>loading...</>
  ) : (
    <>
      <div>
        <div className="mt-16">
          <section className="px-8 py-6 mx-32">
            <div className="container mx-auto text-center">
              <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
                Pricing
              </h2>
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                Check out our affordable pricing options for best opportunities.
              </p>
            </div>

            {/* block one */}
            <div className="mt-24">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {planOwn.length > 0 ? (
                  planOwn.map((plan) => (
                    <div
                      key={plan.id} // Add a key to avoid warnings
                      className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100"
                    >
                      <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
                        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 capitalize">
                          {plan.name}
                        </h5>
                        <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal !text-gray-500">
                          Plan duration : {plan.time_period} months
                        </p>
                        <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                          ${plan.rate}
                          <span className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span>
                        </h3>
                      </div>
                      <div className="p-6 border-t border-blue-gray-50">
                        <ul className="flex flex-col gap-3">
                          {Object.entries(plan.description).map(
                            ([key, value]) => (
                              <li className="flex items-center gap-3 text-gray-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                  className="h-4 w-4 text-blue-gray-900"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  ></path>
                                </svg>

                                <p
                                  key={key} // Add a key to the description map
                                  className="block antialiased font-sans text-sm leading-normal font-normal text-inherit"
                                >
                                  {key}: {value}
                                </p>
                              </li>
                            )
                          )}
                          {/* Repeat for other features */}
                        </ul>
                        <button
                          onClick={() => handleBuy(plan)}
                          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg border border-green-500 text-green-500 hover:opacity-75 focus:ring focus:ring-green-200 active:opacity-[0.85] block w-full mt-6"
                          type="button"
                        >
                          buy now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No plans available</div> // If the API response has no plans
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Subscription;
