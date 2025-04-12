import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' // Importing ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Importing the Toast styles
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import LoginPage from './pages/Login'
import Logout from './components/Logout' // Import Logout component
import HorsesPage from './pages/Horses'
import HorseDetailsPage from './pages/HorseDetails'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const { isAuth } = useContext(AuthContext)
  return (
    <>
      {/* Wrap the entire app with AuthProvider */}
      <Routes>
        {/* Redirect to /login if the user visits the root */}
        <Route path='/' element={<Navigate to='/login' />} />

        {/* Public Route - Redirect if already authenticated */}
        <Route path='/login' element={isAuth ? <Navigate to='/horses' /> : <LoginPage />} />

        {/* Logout Route */}
        <Route path='/logout' element={isAuth ? <Logout /> : <Navigate to='/login' />} />

        {/* Protected Routes */}
        <Route
          path='/horses'
          element={
            <ProtectedRoute>
              {/* ProtectedRoute ensures that only authenticated users can access this route */}
              <HorsesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/horses/:id'
          element={
            <ProtectedRoute>
              {/* ProtectedRoute ensures that only authenticated users can access this route */}
              <HorseDetailsPage />
            </ProtectedRoute>
          }
        />
        {/* If a non-existing route is accessed, redirect to login page */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
      {/* Toast Notifications */}
      <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  )
}

export default App
