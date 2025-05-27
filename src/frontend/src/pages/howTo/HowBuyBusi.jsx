import React from 'react'
import TimeLine from '../../components/accessories/q&a-howto/TimeLine'
import HomePlans from '../../components/accessories/homePageAddOn/plans/HomePlans'


function HowBuyBusi() {
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
        "If the business is suitable to your requirements, issue a Letter of Intent. Appoint due diligence advisors for cross-checking information. After due diligence is completed, make the purchase to own the business.",
      date: "By April",
    },
  ];
  return (
    <>
    <div className='container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44'>
        <h1 className='text-3xl font-semibold'>Buy A Business </h1>
        <p className='text-gray-700'>Whether you are buying a business to <b>run it yourself</b> or acquiring one for a <b>strategic advantage</b> , the process and due diligence conducted is similar. There are many reasons why buying an existing business is better than starting one: reduced risk, immediate cash flows, established vendor and customer relationships, avoiding time consuming and tedious startup work, and so on.</p>
        <p className='text-gray-700'>We understand that Buyers need a lot of information before they decide to make the purchase. It is important for the buyer to know if the business is legitimate, valuation is reasonable, industry is attractive and if there are any other better opportunities. The best way to answer these questions is by <b>talking to as many businesses</b> as possible as you will be in a better position to evaluate them.</p>
        <p className='font-semibold'>INVESTRYX provides a platform to compare and evaluate various pre-qualified businesses across industries and geographies</p>
        <iframe className='w-full h-80 md:min-h-[50rem]' src="https://www.youtube.com/embed/8sMzF5A86oI?si=5Vdr1KqAWbGtT7hW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  <TimeLine timeline = {timelineData}/>
            <HomePlans />    </>
  )
}

export default HowBuyBusi