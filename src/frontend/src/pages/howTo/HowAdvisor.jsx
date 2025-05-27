import React from 'react'
import TimeLine from '../../components/accessories/q&a-howto/TimeLine'
import HomePlans from '../../components/accessories/homePageAddOn/plans/HomePlans';


function HowAdvisor() {
  
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

  const features = [
    {
      title: 'Deal Origination',
      text:
        'Win mandates from business owners ready to work with advisors. INVESTRYX supports you in closing the transaction by generating matching leads.',
      icon: (
        /* example inline SVG  — swap out as needed */
        <svg viewBox="0 0 96 96" className="w-16 h-16 stroke-slate-500" fill="none">
          <rect x="16" y="8" width="56" height="80" rx="4" strokeWidth="2" />
          <path d="M28 28h32M28 40h32M28 52h32" strokeWidth="2" />
          <path d="M28 72l8 8 20-20" strokeWidth="2" className="stroke-sky-700" />
        </svg>
      ),
    },
    {
      title: 'Lead Generation',
      text:
        'Confidentially send deal teasers to thousands of qualified investors/buyers in seconds and generate interest to close your deals in a fast and cost-effective manner.',
      icon: (
        <svg viewBox="0 0 96 96" className="w-16 h-16 stroke-slate-500" fill="none">
          <rect x="28" y="8" width="40" height="80" rx="6" strokeWidth="2" />
          <circle cx="48" cy="40" r="12" strokeWidth="2" className="stroke-rose-500" />
          <circle cx="48" cy="40" r="4" fill="currentColor" className="fill-rose-500" />
        </svg>
      ),
    },
    {
      title: 'Pre-qualified Network',
      text:
        'We care about quality as much as you do. By creating a trusted network of members, providing relevant data, and easy-to-use NDAs, we’re cutting down the tire kickers.',
      icon: (
        <svg viewBox="0 0 96 96" className="w-16 h-16" fill="none">
          <rect x="20" y="16" width="40" height="56" rx="4" className="fill-amber-200 stroke-amber-400" strokeWidth="2" />
          <circle cx="40" cy="28" r="6" className="fill-amber-400" />
          <path d="M18 64l14 14 28-28" strokeWidth="4" className="stroke-emerald-600" />
        </svg>
      ),
    },
    {
      title: 'Client Confidentiality',
      text:
        'Profiles and teasers are shared on a no-name basis and introductions are mutually opt-in. SSL encryption protects confidential information.',
      icon: (
        <svg viewBox="0 0 96 96" className="w-16 h-16 fill-emerald-200 stroke-emerald-500" strokeWidth="2">
          <path d="M48 12l28 12v22c0 18-12 34-28 38-16-4-28-20-28-38V24l28-12z" />
          <path d="M32 48l12 12 20-20" strokeWidth="4" className="stroke-white" />
        </svg>
      ),
    },
    {
      title: 'Profile Tracking and Analytics',
      text:
        'Optimize your deal distribution strategy via our Insights report with full stats on views, connects, and inquiries generated for each deal.',
      icon: (
        <svg viewBox="0 0 96 96" className="w-16 h-16" fill="none">
          <rect x="16" y="24" width="56" height="56" rx="4" className="fill-sky-100 stroke-sky-400" strokeWidth="2" />
          <path d="M40 48v16M56 40v24" strokeWidth="4" className="stroke-rose-600" />
          <path d="M16 56h56" strokeWidth="2" className="stroke-sky-400" />
        </svg>
      ),
    },
    {
      title: 'Business Valuation Tool',
      text:
        'Access comparable data of public companies, current businesses for sale, and recently sold businesses to generate valuation estimates for your clients.',
      icon: (
        <svg viewBox="0 0 96 96" className="w-16 h-16" fill="none">
          <rect x="24" y="24" width="48" height="32" className="fill-sky-100 stroke-sky-400" strokeWidth="2" />
          <path d="M24 56l12 8 12-12 12 16 12-8" strokeWidth="2" className="stroke-rose-600" />
          <path d="M24 72h48M24 80h48" strokeWidth="2" className="stroke-slate-400" />
        </svg>
      ),
    },
  ];
  return (
    <>
    <div className='container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44'>
        <h1 className='text-3xl font-semibold'>Advisors and Business Brokers </h1>
        <p className='text-gray-500'>Premier Platform for Dealmakers - Financial advisors, Investment bankers, M&A consultants, Accountants and Business Brokers. Engage directly with business owners, investors, buyers and strategic acquirers matching your requirements.</p>
        {/* <iframe className='w-full h-80 md:min-h-[50rem]' src="https://www.youtube.com/embed/8sMzF5A86oI?si=5Vdr1KqAWbGtT7hW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
    </div>
  {/* <TimeLine timeline = {timelineData}/> */}
   <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid gap-y-12 gap-x-16 md:grid-cols-2">
        {features.map(({ title, text, icon }) => (
          <div key={title} className="flex">
            <div className="shrink-0">{icon}</div>
            <div className="ml-6">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
            <HomePlans />    
            </>
  )
}

export default HowAdvisor