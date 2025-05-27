import React, { useEffect, useState } from "react";
import TimeLine from "../../components/accessories/q&a-howto/TimeLine";
import HomePlans from "../../components/accessories/homePageAddOn/plans/HomePlans";
import { useDispatch } from "react-redux";
import { getAllPlans } from "../../services/user/apiMethods";
import { setPlans } from "../../utils/context/reducers/authSlice";

function HowSellBus() {

    const timelineData = [
    {
      title: "REGISTRATION ON INVESTRYX",
      description:
        "Explain your business and reason for exit in a clear and compelling manner. Choose the service level you want from INVESTRYX.",
      date: "Today",
    },
    {
      title: "PROFILE ACTIVATION & RECOMMENDATION",
      description:
        "INVESTRYX reviews your business details and activates your profile. INVESTRYX also sends you a list of recommended buyers for your business",
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
    const [homePlans, setHomePlans] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllPlans();
                if (response.data.length > 0) {
                    setHomePlans(response.data);
                    console.log("Success:", response);
                    dispatch(setPlans({ plans: response.data })); //dispatching the plans
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44">
                <h1 className="text-3xl font-semibold">Business for Sale | Sell Your Business </h1>
                <p className="text-gray-700">
                    We understand that selling your business is a <b>tedious and time-consuming process</b> , but is also
                    one of the most important events of your career. Whether you plan to retire from your company, relocate
                    to a new location, move on to new opportunities, or you feel that the company needs a larger backing,
                    selling your business to an interested entrepreneur is the best option.
                </p>
                <p className="text-gray-700">
                    <b>Confidentiality </b>of your business and the <b>quality of buyers you speak with</b> are of prime
                    importance to us. On our platform, you can expand your reach by connecting with a large number of
                    registered buyers for private placements on a confidential basis.
                </p>
                <p className="font-semibold text-gray-700">
                    INVESTRYX helps you to connect with targeted buyers who can take your business to the next level.
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
            <HomePlans props={homePlans} />
        </>
    );
}

export default HowSellBus;
