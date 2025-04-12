import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getHorseById } from '../services/api' // Import the function to fetch horse details
import Loader from '../components/Loader' // Import the Loader component
import Header from '../components/Header' // Import Header component
import defaultImage from '../assets/noImage.jpg' // Default image when URL fails
import { toast } from 'react-toastify'

const HorseDetailsPage = () => {
  const { id } = useParams() // Extract horse ID from the URL params
  const [horse, setHorse] = useState(null) // State to store horse details
  const [loading, setLoading] = useState(true) // State to track loading state
  const [newHorseImage, setNewHorseImage] = useState(null) // State for new horse image preview
  const navigate = useNavigate() // Initialize navigate for redirection

  // Fetch horse details when component mounts or when the ID changes
  useEffect(() => {
    const fetchHorseDetails = async () => {
      try {
        const data = await getHorseById(id) // Fetch horse details using the ID
        if (data.horse) {
          setHorse(data.horse) // Set the fetched horse details in state
        } else {
          toast.error('Horse not found, redirecting to Horses list...') // Show error message
          navigate('/horses') // Redirect immediately to Horses page
        }
        setLoading(false) // Stop loading once data is fetched
      } catch (error) {
        setLoading(false) // Stop loading on error
      }
    }
    fetchHorseDetails()
  }, [id, navigate])

  // Handle image upload and preview
  const handleHorseImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check if the file is an image
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (validImageTypes.includes(file.type)) {
        setNewHorseImage(URL.createObjectURL(file)) // Set preview URL for new image
      } else {
        toast.error('Please upload a valid image file (jpeg, png, or jpg).') // Show error if file is not a valid image
      }
    }
  }

  // Show Loader component while loading data
  if (loading) {
    return (
      <div className='absolute inset-0 dark:bg-black bg-white flex justify-center items-center z-50'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      {/* Global Header component */}
      <Header />
      <div className='min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white dark:p-4 px-4 flex justify-center items-center'>
        {/* Card container for horse details */}
        <div className='w-full lg:w-3/4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6'>
          {/* Card Header */}
          <div className='text-center mb-6'>
            <h1 className='text-3xl font-bold dark:text-white'>Horse Details For {horse.name}</h1>
          </div>

          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Left Side: Horse Image and Upload */}
            <div className='w-full lg:w-1/3'>
              <img
                src={newHorseImage || horse.image || defaultImage}
                alt={horse.name}
                className='w-full h-64 object-fill rounded-lg shadow-lg'
                onError={(e) => {
                  e.target.src = defaultImage
                }}
              />
              {/* Image Upload Input */}
              <label className='block mt-4 cursor-pointer bg-gray-600 dark:bg-gray-400 hover:bg-gray-700 dark:hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'>
                Choose File
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleHorseImageChange}
                  className='hidden' // Hide the default file input
                />
              </label>
              {newHorseImage && (
                <div className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  Preview of the new image:
                  <img
                    src={newHorseImage}
                    alt='New Horse Image Preview'
                    className='mt-2 w-24 h-24 object-cover rounded-lg shadow-md'
                  />
                </div>
              )}
            </div>

            {/* Right Side: Horse Details */}
            <div className='w-full lg:w-2/3'>
              <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6'>
                <h2 className='text-2xl font-bold mb-4 dark:text-white'>{horse.name}</h2>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Horse Number:</span> {horse.horse_number}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Mother:</span> {horse.mother_name}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Father:</span> {horse.father_name}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Breed:</span> {horse.breed}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Date of Birth:</span> {horse.date_of_birth}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Country of Origin:</span>{' '}
                  {horse.country_origin || 'N/A'}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <span className='font-bold'>Paternity Certificate:</span>{' '}
                  <a
                    href={horse.paternity_certificate}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline hover:text-blue-500'
                  >
                    View Certificate
                  </a>
                </p>
                <div className='text-sm text-gray-600 dark:text-gray-300 mt-2'>
                  <p className='font-bold'>Services:</p>
                  {horse.services.length ? (
                    horse.services.map((service) => (
                      <span key={service.id} className='block'>
                        {service.name || 'No service name'} - {service.price} USD
                      </span>
                    ))
                  ) : (
                    <span>No services available</span>
                  )}
                </div>
                <p className='text-sm text-gray-600 dark:text-gray-300 mt-2'>
                  <span className='font-bold'>Place:</span>{' '}
                  {horse.place ? horse.place.number : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HorseDetailsPage
