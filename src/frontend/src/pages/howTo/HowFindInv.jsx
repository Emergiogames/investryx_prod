import React from "react";
import TimeLine from "../../components/accessories/q&a-howto/TimeLine";
import HomePlans from "../../components/accessories/homePageAddOn/plans/HomePlans";

function HowFindInv() {

   const timelineData = [
    {
      title: "REGISTRATION ON INVESTRYX",
      description:
        "Explain your business and finance requirements in a clear and compelling manner. Choose the service level you want from INVESTRYX.",
      date: "Today",
    },
    {
      title: "PROFILE ACTIVATION & RECOMMENDATION",
      description:
        "INVESTRYX reviews your business details and activates your profile. INVESTRYX also sends you a list of recommended investors for your business",
      date: "Tomorrow",
    },
    {
      title: "INVESTOR INTRODUCTIONS",
      description:
        "Interested Investors start connecting with you. You can send proposals to investors to accelerate the process. To protect confidentiality, you can ask them to sign a NDA",
      date: "By Last Week of January",
    },
    {
      title: "SHARING DOCUMENTS",
      description:
        "It is important to share a professionally-written Information Memorandum and Financial Projection with the investor. This helps the buyer evaluate the opportunity quickly and arrive at a decision.",
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
                <h1 className="text-3xl font-semibold">Find Investors for your Business </h1>
                <p className="text-gray-700">
                   More than 60% of SMEs are unserved or underserved by the current financial ecosystem. Businesses can access finance through "equity financing" or "debt financing“ . Equity financing means you give a share of your company for money. Debt financing means that you will pay back the money with a predefined interest amount.
                </p>
                <p className="text-gray-700">
                    Apart from bank loans, one can raise funds from various other viable sources such as friends, family, private lenders, individual investors, angel investors, financial instuitions, PE firms and other companies seeking to make strategic investments.
                </p>
                <p className="font-semibold">
                    SMERGERS helps you to connect with the right investors who can fuel business growth.
                </p>
                <iframe
                    className="w-full h-80 md:min-h-[50rem]"
                    src="https://www.youtube.com/embed/8sMzF5A86oI?si=5Vdr1KqAWbGtT7hW"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </div>
            <TimeLine timeline = {timelineData}/>
            <HomePlans />
        </>
    );
}

export default HowFindInv;
