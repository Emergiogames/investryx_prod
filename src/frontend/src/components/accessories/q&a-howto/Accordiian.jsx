import React, { useState } from 'react'

function Accordiian({ no, title, answer }) {
    const [accordionOpen, setAccordionOpen] = useState(false)

    return (
        <>
            <div className="py-6 border-b-2 ">
                <button
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    className="flex justify-between w-full"
                >
                    <span className='font-bvpro font-normal text-left text-md sm:text-2xl'><span>{no}</span>{title}</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            className={`transform origin-center transition duration-200 ease-out ${accordionOpen ? "rotate-180" : ""
                                }`}
                            stroke="#ffcc00"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    <div className="overflow-hidden">{answer}</div>
                </div>
            </div>
        </>
    )
}

export default Accordiian