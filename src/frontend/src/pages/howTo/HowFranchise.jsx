import React from "react";
import TimeLine from "../../components/accessories/q&a-howto/TimeLine";
import HomePlans from "../../components/accessories/homePageAddOn/plans/HomePlans";

function HowFranchise() {
    const timelineData = [
        {
            title: "REGISTRATION ON INVESTRYX",
            description:
                "Explain your franchise in a clear and compelling manner. Choose the service level you want from INVESTRYX.",
            date: "Today",
        },
        {
            title: "PROFILE ACTIVATION & RECOMMENDATION",
            description:
                "INVESTRYX reviews your franchise details and activates your profile. INVESTRYX also sends you a list of recommended buyers for your franchise",
            date: "Tomorrow",
        },
        {
            title: "BUYER INTRODUCTIONS",
            description:
                "Interested acquirers start connecting with you. You can send proposals to acquirers to accelerate the process. To protect confidentiality, you can ask them to sign a NDA",
            date: "By Last Week of January",
        },
        {
            title: "SHARING DOCUMENTS",
            description:
                "It is important to share a professionally-written Information Memorandum and Financial Projection with the buyers. This helps the buyer evaluate the opportunity quickly and arrive at a decision.",
            date: "By 2nd Week of February",
        },
        {
            title: "DUE DILIGENCE & CLOSURE",
            description:
                "Post agreement, the buyer will conduct a due diligence to cross-check all information shared earlier. If no discrepancies are found, the deal is complete and you receive the required amount.",
            date: "By April",
        },
    ];
    return (
        <>
            <div className="container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44">
                <h1 className="text-3xl font-semibold">How To Franchise Your Business </h1>
                <p className="text-gray-500">
                    Finding good and reliable franchise partners to grow your business can be a painful, yet important task
                    for your business. SMERGERS makes this easy by bringing business enthusiasts and investors from
                    different parts of the world under one roof.
                </p>

                <p className="font-semibold">
                    INVESTRYX helps you to connect with targeted buyers who can take your franchise to the next level.
                </p>
            </div>
            <TimeLine timeline={timelineData} />
            <HomePlans />
        </>
    );
}

export default HowFranchise;
