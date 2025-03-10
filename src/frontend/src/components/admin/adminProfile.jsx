import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AdminLogout } from '../../utils/context/reducers/adminAuthSlice'
// import { getDashboardDetails } from '../../services/admin/apiMethods'
// import ProfileChart from './ProfileChart'

function AdminProfile() {
  // const selectedAdmin = (state) => state.adminAuth.admin
  // const admin = useSelector(selectedAdmin)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(AdminLogout());
    // localStorage.removeItem("email");
    toast.info("Logout succussfull");
    navigate("/admin/login")
  }

  // const [isDashboardData, setDashboardDatas] = useState(null)

  // useEffect(() => {
  //   getDashboardDetails()
  //     .then((response) => {
  //       const dashboardDatas = response.data
  //       setDashboardDatas(dashboardDatas)
  //       // console.log("dashboardDatas",dashboardDatas);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching dashboard data:", error)
  //     })
  // },[])

  return (
    <>
      <div className='lg:w-full px-4 py-2 mr-2'>
        <div className='flex w-full justify-center mb-6'>
          <div className='flex bg-white w-full rounded-md shadow-md'>
            <div className='lg:flex lg:p-8 lg:ml-0 justify-center gap-8'>
              <div className="flex lg:ml-0 ml-10 justify-center">
                <img
                  className=" h-40 w-40 rounded-full"
                  src="https://suhail101.pythonanywhere.com/media/profile/images/IMG-20240704-WA0000.jpg"
                  alt=""
                />
              </div>
              <div className='block lg:ml-8 ml-8 lg:py-0 py-2 lg:mt-0 text-center'>
                <div className='font-semibold text-3xl pb-2'>Shaheen S</div>
                <div className='pb-0'>shaheen@gmail.com</div>
                <p></p>
              </div>
              <div className='flex flex-col lg:ml-6'>
                <div className='flex lg:ml-0 justify-between items-center'>
                  <div className='flex items-center px-2'>
                    <button 
                    className='lg:bg-black lg:text-white lg:h-10 lg:w-28 py-2 px-4 rounded  '>EditProfile</button>
                  </div>
                  <div className='flex items-center px-4'>
                    <button 
                    onClick={handleLogout}
                    className=' lg:bg-black lg:text-white lg:h-10 lg:w-28 py-2 px-4 rounded ml-0 '>Logout</button>
                  </div>
                </div>
                <div className='flex justify-between lg:mt-8 mt-2 cursor-pointer'>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-blue-500">
                      <p className="font-medium text-lg">4</p>
                    </div>
                    <p className="text-sm mt-2">Users</p>
                  </div>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-yellow-300">
                      <p className="font-medium text-lg">12</p>
                    </div>
                    <p className="text-sm mt-2">Posts</p>
                  </div>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full border-4 border-red-500">
                      <p className="font-medium text-lg">0</p>
                    </div>
                    <p className="text-sm mt-2">Reports</p>
                  </div>
                </div>
              </div>

              {/* <div className='flex justify-center'>
                {isDashboardData && <ProfileChart isDashboardData={isDashboardData} />}
              </div> */}

            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default AdminProfile
