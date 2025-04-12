import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../services/api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import logoImage from '../assets/logo.jpg'
import backgroundImage from '../assets/background.jpg'

// Importing the spinner library
import { ClipLoader } from 'react-spinners'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, isAuth } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  // Redirecting if the user is already authenticated
  useEffect(() => {
    if (isAuth) {
      navigate('/horses')
    }
  }, [isAuth, navigate])

  // Validation schema for the form
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  // Formik setup for handling form submissions and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true)

      // Checking for form validation errors before submitting
      if (formik.errors.email || formik.errors.password) {
        return
      }

      try {
        const response = await apiLogin(values.email, values.password)

        if (response && response.status === true && response.data.token) {
          login(response.data.token) // Save token in context
          toast.success('Login successful!') // Show success message
          navigate('/horses') // Redirect to horses page
        } else {
          toast.error('Invalid credentials') // Show error message for invalid login
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <div
      className='flex justify-center items-center min-h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Adding a dark overlay to improve text visibility */}
      <div className='absolute inset-0 bg-black opacity-50'></div>

      <div className='bg-white bg-opacity-50 p-8 rounded-lg shadow-lg w-96 max-w-full relative'>
        {/* Logo */}
        <div className='flex justify-center mb-4'>
          <img src={logoImage} alt='Logo' className='w-20 h-20 rounded-full' />
        </div>
        <div className='text-center mb-4'>
          <h1 className='text-xl font-semibold'>Horses Management</h1>
        </div>

        {/* Form for login */}
        <form onSubmit={formik.handleSubmit}>
          {/* Email field */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-black-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
            {formik.touched.email && formik.errors.email && (
              <div className='text-red-500 text-sm'>{formik.errors.email}</div>
            )}
          </div>

          {/* Password field */}
          <div className='mb-4 relative'>
            <label htmlFor='password' className='block text-sm font-medium text-black-700'>
              Password
            </label>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10'
            />
            {/* Toggle show/hide password */}
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-2 top-9 text-sm text-gray-600 hover:text-black'
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {formik.touched.password && formik.errors.password && (
              <div className='text-red-500 text-sm'>{formik.errors.password}</div>
            )}
          </div>

          {/* Submit button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 bg-black text-white rounded-md ${loading ? 'opacity-50' : ''}`}
          >
            {/* Display the spinner when loading */}
            {loading ? <ClipLoader color='#fff' size={20} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
