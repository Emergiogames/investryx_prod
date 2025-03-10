import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useSelector } from "react-redux";

function Subscription() {
    const navigate = useNavigate();
    const [planOwn, setPlanOwn] = useState([]);
    const [currProfile, setCurrProfile] = useState("business");
    const [dataReady, setDataReady] = useState(false);
    const arr = ["business", "investor", "franchise", "advisor"];

    // Refs for animation
    const plansContainerRef = useRef(null);

    // Get all plans from state
    const allPlans = useSelector((state) => state.auth.plans);

    useEffect(() => {
        if (allPlans) {
            const filteredPlans = allPlans.filter((plan) => plan.type === currProfile);
            setPlanOwn(filteredPlans);
            setDataReady(true);
        }
    }, [allPlans, currProfile]);

    const profileHandler = (type) => {
        if (type === currProfile) return; // Do nothing if the profile is already selected

        // Animate the current plans out
        gsap.to(plansContainerRef.current, {
            opacity: 0,
            x: -100, // Slide out to the left
            duration: 0.4,
            onComplete: () => {
                setDataReady(false); // Temporarily unset dataReady
                setCurrProfile(type); // Update profile after animation
            },
        });
    };

    useEffect(() => {
        if (dataReady) {
            // Animate plans container when new data is ready
            gsap.fromTo(
                plansContainerRef.current,
                {
                    opacity: 0,
                    x: 100, // Slide from right
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.2,
                    ease: "power1.inOut",
                }
            );
        }
    }, [dataReady]);

    const handleBuy = (plan) => {
        navigate(`/buy-subscription?id=${plan.id}`, {
            state: { plan },
        });
    };

    return (
        <>
            <div>
                <div className="mt-16">
                    <section className="px-8 py-6 xl:mx-32">
                        <div className="container mx-auto text-center">
                            <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
                                Pricing
                            </h2>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-8 font-normal !text-gray-500">
                                Check out our affordable pricing options for best opportunities.
                            </p>
                            <div className="flex flex-row justify-center rounded-lg">
                                {arr.map((type, index) => (
                                    <div key={index} className="rounded-lg" onClick={() => profileHandler(type)}>
                                        <div className="m-2 md:gap-x-5 md:p-4 hover:cursor-pointer">
                                            <div
                                                className={`p-4 px-4 transition-all duration-300 rounded-lg ${
                                                    currProfile === type
                                                        ? "bg-yellow-400"
                                                        : "bg-yellow-300 hover:bg-yellow-400"
                                                }`}
                                            >
                                                <button className="text-sm md:text-base">
                                                    <span className="block md:hidden">{type} </span>
                                                    <span className="hidden md:block">{type} Plans</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Plans Container */}
                        <div ref={plansContainerRef} className="mt-24">
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {planOwn.length > 0 ? (
                                    planOwn.slice(0, 3).map((plan) => (
                                        <div
                                            key={plan.id}
                                            className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100"
                                        >
                                            <div className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6 h-[22rem]">
                                                <div>
                                                    <p className="antialiased text-4xl text-violet-900 font-semibold text-inherit py-6">
                                                        {plan.name}
                                                    </p>
                                                    <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 capitalize">
                                                        Plan duration : {plan.time_period} months
                                                    </h5>
                                                    <h3 className="antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-2">
                                                    ₹{plan.rate}
                                                    </h3>
                                                    {plan.recommend && (
                                                        <div className="w-44 h-44 absolute right-0 top-0">
                                                            <img src="/images/plans/featured_pop.png" alt="Popular" />
                                                        </div>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleBuy(plan)}
                                                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-2xl py-2 px-4 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:ring focus:ring-blue-200  block w-full  h-16 mt-14 mb-5  "
                                                    type="button"
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                            <div className="p-6 border-t border-blue-gray-50">
                                                <ul className="flex flex-col gap-3">
                                                    {Object.entries(plan.description).map(([key, value]) => (
                                                        <li key={key} className="flex items-center gap-3 text-gray-700">
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
                                                            <p className="block antialiased font-sans text-sm leading-normal font-normal text-inherit">
                                                                {key}: {value}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No plans available</div>
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
