import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { AdminLogout } from '../../utils/context/reducers/adminAuthSlice'
import { GetDashboardDetails } from '../../services/admin/apiMethods'

function AdminProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [dashboardData, setDashboardData] = useState(null)

  const handleLogout = () => {
    dispatch(AdminLogout())
    toast.info("Logout successful")
    navigate("/admin/login")
  }

  useEffect(() => {
    GetDashboardDetails()
      .then((response) => {
        setDashboardData(response.data)
      })
      .catch((error) => {
        console.error("Error fetching dashboard details", error)
      })
  }, [])

  return (
    <div className='w-full px-4 py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>Admin Dashboard</h2>
        <button 
          onClick={handleLogout}
          className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition'
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <StatCard title="Users" count={dashboardData?.users_count || 0} color="blue" />
        <StatCard title="Posts" count={dashboardData?.posts_count || 0} color="yellow" />
        <StatCard title="Reports" count={dashboardData?.reports_count || 0} color="red" />
        <StatCard title="Subscribers" count={dashboardData?.subscribe_count || 0} color="green" />
      </div>
    </div>
  )
}

const StatCard = ({ title, count, color }) => {
  const borderColors = {
    blue: 'border-blue-500',
    yellow: 'border-yellow-400',
    red: 'border-red-500',
    green: 'border-green-500',
  }

  return (
    <div className='bg-white rounded-lg shadow p-4 flex flex-col items-center'>
      <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4 ${borderColors[color]}`}>
        <span className='text-lg font-bold'>{count}</span>
      </div>
      <p className='mt-2 text-sm font-medium text-gray-700'>{title}</p>
    </div>
  )
}

export default AdminProfile
