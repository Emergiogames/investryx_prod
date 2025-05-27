import React from "react";
import TimeLine from "../../components/accessories/q&a-howto/TimeLine";
import HomePlans from "../../components/accessories/homePageAddOn/plans/HomePlans";

function HowInv() {
    const timelineData = [
        {
            title: "REGISTER AND CONNECT WITH BUSINESSES",
            description:
                "Explain your requirements and background in a clear manner. Shortlist businesses which match your requirements and express your interest to connect with them.",
            date: "Today",
        },
        {
            title: "PROFILE ACTIVATION & INTRODUCTIONS",
            description:
                "INVESTRYX reviews your profile and activates it. You will be introduced to the businesses you have connected with and can connect with further businesses based on our recommendations.",
            date: "Tomorrow",
        },
        {
            title: "INITIAL DISCUSSIONS",
            description:
                "You can contact businesses directly to have initial discussions. Use our proprietary rating system to evaluate these businesses and their valuations.",
            date: "By Last Week of January",
        },
        {
            title: "RECEIVE DOCUMENTS",
            description:
                "You may have to sign a NDA to receive further information such as Information Memorandum, Financials and Valuation from the Business",
            date: "By 2nd Week of February",
        },
        {
            title: "DUE DILIGENCE & CLOSURE",
            description:
                "If the business and investment terms are suitable, issue a Term Sheet. Appoint due diligence advisors for cross-checking information. After due diligence is completed, make the investment.",
            date: "By April",
        },
    ];
    return (
        <>
            <div className="container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44">
                <h1 className="text-3xl font-semibold">How To Invest in a Business </h1>
                <p className="text-gray-500">
                   Whether it is for <b>financial returns, strategic value or pure passion</b> , investing in businesses has always been an exciting pursuit. Private lenders and Private Equity firms invest in businesses purely for the financial return. But on the other hand, a strategic investor would invest mainly because of the expected synergies between his company and the investee company.
                </p>
                <p className="text-gray-500">
                    We understand that analysing business opportunities is different for each investor and the best way to go about this is to <b>directly connect with the business owner to understand his business </b>, products/services, background and investment plans.
                </p>
                <p className="font-semibold">
                    INVESTRYX provides a secure platform to connect with various pre-qualified business investment opportunities
                </p>
                {/* <iframe
                    className="w-full h-80 md:min-h-[50rem]"
                    src="https://www.youtube.com/embed/8sMzF5A86oI?si=5Vdr1KqAWbGtT7hW"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe> */}
            </div>
            <TimeLine timeline={timelineData} />
            <HomePlans />
        </>
    );
}

export default HowInv;
