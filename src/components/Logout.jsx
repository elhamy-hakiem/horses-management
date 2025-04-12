import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext' // Import AuthContext to access logout function

const Logout = () => {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    // Perform logout action (clear token and show toast)
    logout()

    // Redirect to login page after logout
    navigate('/login')
  }, [logout, navigate])

  return (
    <div className='flex justify-center items-center h-screen'>
      <p className='text-lg font-semibold'>Logging out...</p>
    </div>
  )
}

export default Logout
