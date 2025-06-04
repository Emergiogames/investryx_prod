import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/adminSidebar'


function Admin() {
  
  return (
    <div className='flex'>
      <AdminSidebar />
       <div className="flex-1 transition-all duration-300 md:ml-60">
      <Outlet />
      </div>
    </div>
  )
}

export default Admin