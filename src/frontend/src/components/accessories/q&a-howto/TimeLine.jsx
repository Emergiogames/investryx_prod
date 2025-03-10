import React from "react";

const TimeLine = () => {
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

  return (
    <section className="flex min-h-screen justify-center p-4 md:pt-20">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <ul className="relative ml-24 sm:ml-24 md:ml-32">
          {timelineData.map((item, index) => (
            <li key={index} className="relative flex items-baseline gap-3 md:gap-6 pb-5 w-full">
              <p className="text-xs sm:text-sm md:text-lg font-semibold text-gray-600 absolute -left-[6.5rem] sm:-left-28 md:-left-56 top-0 w-24 sm:w-28 md:w-full break-words">
                {item.date}
              </p>
              <div className="before:absolute before:left-[5.5px] before:h-full before:w-[5px] before:bg-yellow-300 before:opacity-25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="bi bi-circle-fill fill-yellow-400"
                  viewBox="0 0 16 16"
                >
                  <circle cx="8" cy="8" r="8" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-sm sm:text-base md:text-xl font-semibold">
                  {item.title}
                </h1>
                <p className="mt-2 text-gray-600 text-xs md:text-sm">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TimeLine;