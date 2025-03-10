import React from 'react'
import TimeLine from '../../components/accessories/q&a-howto/TimeLine'


function HowToPage() {
  return (
    <>
    <div className='container mx-auto p-4 space-y-5 sm:p-8 md:py-12 md:px-44'>
        <h1 className='text-3xl font-semibold'>Business for Sale | Sell Your Business </h1>
        <p className='text-gray-500'>We understand that selling your business is a <b>tedious and time-consuming process</b> , but is also one of the most important events of your career. Whether you plan to retire from your company, relocate to a new location, move on to new opportunities, or you feel that the company needs a larger backing, selling your business to an interested entrepreneur is the best option.</p>
        <p className='text-gray-500'><b>Confidentiality </b>of your business and the <b>quality of buyers you speak with</b> are of prime importance to us. On our platform, you can expand your reach by connecting with a large number of registered buyers for private placements on a confidential basis.</p>
        <p className='font-semibold'>INVESTRYX helps you to connect with targeted buyers who can take your business to the next level.</p>
        <iframe className='w-full h-80 md:min-h-[50rem]' src="https://www.youtube.com/embed/8sMzF5A86oI?si=5Vdr1KqAWbGtT7hW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <TimeLine />
    </>
  )
}

export default HowToPage