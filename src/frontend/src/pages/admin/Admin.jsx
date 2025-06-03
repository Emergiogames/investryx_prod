import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/admin/adminSidebar'


function Admin() {
  
  return (
    <div className='flex'>
      <AdminSidebar />
      <Outlet />
    </div>
  )
}

export default Admin