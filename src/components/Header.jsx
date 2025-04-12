import React, { useContext } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import horseLogo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
const Header = () => {
  const { toggleTheme, isDarkMode } = useThemeContext()
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className='flex flex-wrap justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 dark:text-white shadow-md'>
      {/* Left side: Logo and Title */}
      <Link to='/horses' className='hover:text-gray-200'>
        <div className='flex items-center gap-3'>
          <img src={horseLogo} alt='Logo' className='w-10 h-10 rounded-full object-cover' />
          <h1 className='text-2xl font-bold'>Horse Management</h1>
        </div>
      </Link>

      {/* Right side: Buttons */}
      <div className='flex flex-wrap items-center gap-3 mt-4 md:mt-0'>
        <button
          onClick={toggleTheme}
          className='flex items-center bg-black text-white px-4 py-2 rounded-full transition-all hover:opacity-90 text-sm md:text-base'
        >
          <span className='mr-2'>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          <span>{isDarkMode ? '🌞' : '🌙'}</span>
        </button>

        <button
          onClick={handleLogout}
          className='flex items-center bg-black text-white px-4 py-2 rounded-full transition-all hover:opacity-90 text-sm md:text-base'
        >
          <span className='mr-2'>Log Out</span>
          <span>🚪</span>
        </button>
      </div>
    </header>
  )
}

export default Header
