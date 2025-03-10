import React from 'react'
import { Link } from 'react-router-dom'

function PreVerificationAdv() {
  return (
    <div>
        <div className='w-screen h-screen'>
            <div className='flex flex-col gap-y-7 mt-24 justify-between items-center'>
              <div>Advisor Profile</div>
            <div className='text-2xl'>Digilocker Verification</div>
            <div>
            <Link to="/add-profile-adv">
              <button className="p-8 mx-4 text-2xl font-bold rounded-lg shadow-lg bg-yellow-300 hover:bg-yellow-400">
                Next
              </button>
            </Link>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PreVerificationAdv