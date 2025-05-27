import React from 'react'
import TimeLine from '../../components/accessories/q&a-howto/TimeLine'
import { useNavigate } from 'react-router-dom';


function HowInv() {
   const navigate = useNavigate();

  const rows = [
  {
    label: 'Description',
    stock:
      'Acquirer buys ownership/equity in the target company, including all of its assets and liabilities',
    asset:
      'Acquirer purchases only selected assets of the target company and not liabilities to minimize the risk',
  },
  {
    label: 'Payment',
    stock: 'Made directly to shareholders of the target company',
    asset:
      'Made to the target company which in turn can be distributed to shareholders',
  },
  {
    label: 'Taxes for seller',
    stock: 'Shareholders of the target company pay capital gains tax only',
    asset:
      'Target company will have to pay corporate tax. Shareholders will also pay dividend distribution tax if money is distributed resulting in double taxation',
  },
  {
    label: 'Risks',
    stock:
      'Acquirer assumes all risks and liabilities (including off-balance sheet) of the target company',
    asset:
      'Acquirer chooses the assets and liabilities which he wants to assume',
  },
  {
    label: 'Taxes for buyer',
    stock:
      'Assets and liabilities are continued to be carried and depreciated in the same manner as before the transaction. No tax advantage',
    asset:
      'Buyers allocate the purchase price among the assets to reflect their fair market value resulting in a step-up of tax basis. Allows higher depreciation and amortization deductions resulting in future tax savings',
  },
  {
    label: 'Business Type',
    stock:
      'Only incorporated company acquisition can be structured either as a stock purchase or an asset purchase',
    asset:
      'Sole proprietorship, Partnership, Limited liability partnership (LLP) acquisition can be structured as an asset purchase only',
  },
  {
    label: 'Preferred by',
    stock: 'Sellers',
    asset: 'Buyers/Acquirers',
  },
];
  return (

    
    <>
    <div className='container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44'>
        {/* <h1 className='text-3xl font-semibold'>Business for Sale | Sell Your Business </h1>
        <p className='text-gray-500'>We understand that selling your business is a <b>tedious and time-consuming process</b> , but is also one of the most important events of your career. Whether you plan to retire from your company, relocate to a new location, move on to new opportunities, or you feel that the company needs a larger backing, selling your business to an interested entrepreneur is the best option.</p>
        <p className='text-gray-500'><b>Confidentiality </b>of your business and the <b>quality of buyers you speak with</b> are of prime importance to us. On our platform, you can expand your reach by connecting with a large number of registered buyers for private placements on a confidential basis.</p>
        <p className='font-semibold'>INVESTRYX helps you to connect with targeted buyers who can take your business to the next level.</p> */}
        {/* <iframe className='w-full h-80 md:min-h-[50rem]' src="https://www.youtube.com/embed/8sMzF5A86oI?si=5Vdr1KqAWbGtT7hW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

         <section className="max-w-6xl mx-auto px-4 py-16">
      {/* heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 border-b pb-4">
        How to Value a Business
      </h2>

      {/* 2-column grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT column – text content */}
        <div>
          {/* block 1 */}
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            What is Business Valuation?
          </h3>
          <p className="text-slate-700 leading-relaxed mb-8">
            At SMERGERS, we define Business Valuation as a technique used to
            capture the true value of the business. Common approaches to
            business valuation include Discounted Cash Flow (DCF), Trading
            Comparables, and Transaction Comparables method described below.
          </p>

          {/* block 2 */}
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            When do you need a Business Valuation?
          </h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            The following are some of the common reasons which necessitate
            valuing your business
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-700 mb-10">
            <li>Selling the business</li>
            <li>Fund raising from VC or IPO</li>
            <li>Issuing stock to employees</li>
            <li>Tax purposes</li>
            <li>Liquidation of the company</li>
            <li>Financial reporting related</li>
            <li>Litigation related</li>
          </ul>

          {/* CTA button */}
         
        </div>

        {/* RIGHT column – angled phone image */}
        <div className="flex flex-col justify-center items-center">
          <img
            src="/images/valuation.png" // place your png / svg here
            alt="Phone showing valuation chart"
            className="w-[320px] md:w-[380px] -rotate-25 drop-shadow-xl select-none"
          />
           <button onClick={() => navigate("/calculator")}  className="rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 mt-10 transition">
            Business Valuation Calculator
          </button>
          
        </div>
        
      </div>
    </section>
    </div>
    {/* <TimeLine /> */}
      <section className="max-w-6xl mx-auto px-4 py-4 space-y-12">

      {/* ─── Business Value block ─────────────────────────────── */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">
          What is a Business’ value?
        </h3>
        <p className="text-slate-700 leading-relaxed max-w-3xl">
          A company is held by two categories of owners, shareholders and debt holders.
          The value of a pure business which accrues to both categories of owners is
          called the <em>Enterprise Value</em>, whereas the value which accrues only to
          shareholders is the <em>Equity Value</em> (also called market cap for listed
          companies).&nbsp; Companies are compared using the enterprise value instead of
          equity value as debt and cash levels may vary significantly even between
          companies in the same industry. During an acquisition, depending on whether it
          is an asset purchase or a stock purchase, valuation of appropriate elements of
          the business needs to be carried out.
        </p>

        {/* legend bar */}
        <div className="flex justify-center mt-8">
          <div className="flex">
            <div className="bg-lime-600 text-white text-xs font-medium flex items-center
                            justify-center w-20 h-12 border border-white">
              Cash
            </div>
            <div className="bg-sky-700 text-white text-xs font-medium flex items-center
                            justify-center w-24 h-12 border border-white">
              Equity
            </div>
            <div className="bg-rose-700 text-white text-xs font-medium flex items-center
                            justify-center w-24 h-12 border border-white">
              Debt
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
          Enterprise Value = Equity Value + Debt Value − Cash
        </p>
      </div>

      {/* ─── Comparison table ─────────────────────────────────── */}
      <div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-6">
          What is the difference between an Asset purchase and Stock purchase?
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="py-3 px-4 font-medium text-slate-600 w-48">
                  Acquisition&nbsp;Type
                </th>
                <th className="py-3 px-4 font-semibold text-slate-900">
                  Stock Purchase
                </th>
                <th className="py-3 px-4 font-semibold text-slate-900">
                  Asset Purchase
                </th>
              </tr>
            </thead>

            <tbody className="[&>tr:nth-child(odd)]:bg-slate-50">
              {rows.map(({ label, stock, asset }) => (
                <tr key={label} className="border-b border-slate-200 last:border-0">
                  <td className="py-3 px-4 font-medium text-slate-900 align-top">
                    {label}
                  </td>
                  <td className="py-3 px-4 text-slate-700 align-top">{stock}</td>
                  <td className="py-3 px-4 text-slate-700 align-top">{asset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* final section */}
     <div className="p-6 max-w-5xl mx-auto text-gray-800 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">How to value my Business?</h2>
        <p>The three common approaches of valuing a company are described below:</p>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-xl font-semibold">Discounted Cash Flow (DCF)</h3>
            <p>
              It is widely believed that DCF is the best method to estimate the fair value of a company/business.
              As one would expect, the value of any company is the sum of the cash flows that it produces in the future,
              discounted to the present at an appropriate rate. The discount rate used is the appropriate Weighted Average
              Cost of Capital (WACC) that reflects the risk of the cash flows.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Trading Comparables (trading comps)</h3>
            <p>
              As per the Efficient Market Hypothesis at any given time, stock prices fully reflect all available information
              on a particular company and industry. Therefore trading comparables provide the best estimate for valuing a similar
              company. Average multiples such as P/E, EV/EBITDA, EV/Sales, P/B, etc. are calculated from all companies similar to
              the one being valued and the same used to calculate its enterprise value. Use our free online valuation tool (below)
              to quickly estimate your company’s worth.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Transaction Comparables (transaction comps)</h3>
            <p>
              Investment bankers widely use this method to value a company during an acquisition. Technically this method is similar
              to trading comps and uses multiples such as P/E, EV/EBITDA, EV/Sales, P/B, etc. But the comparables used are companies
              which have previously undergone a takeover, rather peers which trade on the stock market. Takeovers generally value the
              company higher because of a control premium paid by the acquirer.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to Price a Business for Sale</h2>
        <p>
          When pricing a business specifically for sale, the focus shifts to a blend of objective valuation and market positioning.
          The goal is to set a price that is attractive to potential buyers while maximizing the seller’s returns. Here's why this approach is unique:
        </p>

        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>
            <strong>Market Dynamics:</strong> Unlike internal valuations, sale pricing must account for current market demand, buyer sentiment, and
            industry trends. Objective valuation methods should be prioritized over emotional attachment when setting the asking price.
          </li>
          <li>
            <strong>Negotiation Strategy:</strong> The sale price often includes a negotiation buffer, anticipating offers below the asking price.
          </li>
          <li>
            <strong>Packaging for Appeal:</strong> Pricing for sale may consider how to present financials, growth potential, and operational efficiency
            to attract buyers.
          </li>
          <li>
            <strong>Emotional and Strategic Value:</strong> Sometimes, the business holds specific strategic value to a particular buyer,
            which can influence pricing.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Online Business Valuation Calculator</h2>
        <p>
          Our online valuation tool performs Trading Comparables method of valuation using data from thousands of listed firms in India
          and other emerging markets to provide a quick ball park valuation for your company within seconds. Private companies tend to
          have a lower valuation compared to public companies because of illiquidity and inherent riskiness with private companies.
        </p>
        <p className="mt-2">
          A discount factor of 20–30% is common to arrive at the valuation if the company being valued is small compared to an average listed firm
          in that space. Our customized valuation report provides details of all the comparable companies used along with multiples and their
          market cap. We also help you refine the valuation for your company by letting you choose comparable companies which best represent your
          business. For more detailed valuation report with all three methods — trading comparables, transaction comparables, and discounted cash
          flow valuation, contact us.
        </p>

        <div className="mt-6 flex gap-4">
          <button onClick={() => navigate("/calculator")} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg">
            Get Detailed Valuation
          </button>
        </div>
      </section>
    </div>
    </>
  )
}

export default HowInv