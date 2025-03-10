import React from 'react';
import Accordiian from '../../components/accessories/q&a-howto/Accordiian';

function QandA() {
  const faqData = [
    {
      no: 1,
      title: "How do I create an account on Investryx?",
      answer:
        "To create an account, click on the 'Sign Up' button on the homepage. Fill in your details, verify your email, and you're ready to start investing.",
    },
    {
      no: 2,
      title: "How do I deposit funds into my Investryx account?",
      answer:
        "Navigate to the 'Wallet' section, select 'Deposit,' and choose your preferred payment method. Follow the instructions to complete the transaction.",
    },
    {
      no: 3,
      title: "What investment options are available on Investryx?",
      answer:
        "Investryx offers a variety of options, including stocks, ETFs, mutual funds, and fixed-income securities. Explore the 'Invest' section to see all available options.",
    },
    {
      no: 4,
      title: "How do I withdraw my earnings?",
      answer:
        "Go to the 'Wallet' section, select 'Withdraw,' and enter the amount you wish to withdraw. Choose your preferred withdrawal method and confirm the transaction.",
    },
    {
      no: 5,
      title: "Is my personal and financial information secure?",
      answer:
        "Yes, Investryx uses advanced encryption and security protocols to ensure your data is protected. We comply with all regulatory standards to safeguard your information.",
    },
  ];

  return (
    <>
      <div className='lg:ml-[10%] p-8 flex'>
        <div className='py-4 px-1 md:w-3/4 space-y-10 mx-auto md:px-20'>
          <h1 className='text-3xl font-semibold'>Help Center</h1>
          <p className='text-xl font-medium'>We’re here to assist you with everything on Investryx.</p>
          <div>
            <p className='text-lg font-normal md:w-3/4 mx-auto'>
              Whether you're new to investing or an experienced trader, our Help Center provides answers to all your questions.
            </p>
          </div>
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search Help Articles"
                className="w-full h-14 pl-4 pr-12 text-lg rounded-full border-none bg-[#FFFCF4] shadow-[0_2px_8px_rgba(0,0,0,0.08)] placeholder:text-gray-500 focus:outline-none"
                aria-label="Search help articles"
              />
              <i
                className="fas fa-search absolute right-8 top-1/2 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <img className='md:block hidden' src="/images/Hand with key and question.png" alt="Help Center" />
      </div>
      {/* FAQ Section */}
      <div className="faq-section px-4 sm:px-12 lg:px-28 py-4 sm:py-6">
        <div className="flex flex-col items-center justify-between gap-8">
          {/* FAQ Content */}
          <div className="faq-contents w-full lg:w-3/5">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl lg:text-[2rem] text-center lg:text-left font-semibold mb-4">
              Frequently Asked Questions
            </h1>
            {/* Subheading */}
            <h2 className="text-lg sm:text-xl lg:text-[1.75rem] font-medium mb-6 text-center lg:text-left">
              Find answers to common questions about using Investryx.
            </h2>
            {/* Accordions */}
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <Accordiian key={index} no={faq.no} title={faq.title} answer={faq.answer} />
              ))}
            </div>
          </div>
          <button className='bg-[#FFCC00] p-4 w-52 rounded-full font-semibold mt-4 '>View More</button>
        </div>
      </div>
    </>
  );
}

export default QandA;