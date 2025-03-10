import React, { useEffect } from 'react'
import AdminProfile from '../../../components/admin/adminProfile'
import GraphList from '../../../components/admin/GraphList'

function AdminDashboard() {

  return (
    <div className='w-full flex flex-col justify-self-center items-center'>
      <div className='w-11/12 lg:mr-10'>
        <AdminProfile />
        <img src="/images/dashboard_img.png" alt="" />
      </div>
      <div className='w-10/12 lg:mr-10'>
        {/* <GraphList /> */}
      </div>
    </div>
  )
}

export default AdminDashboard