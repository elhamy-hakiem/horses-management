import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getHorseById } from '../services/api'
import Loader from '../components/Loader'
import Header from '../components/Header'
import defaultImage from '../assets/defaultImage.png'
import { toast } from 'react-toastify'

const HorseDetailsPage = () => {
  const { id } = useParams()
  const [horse, setHorse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newHorseImage, setNewHorseImage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHorseDetails = async () => {
      try {
        const data = await getHorseById(id)
        if (data.horse) {
          setHorse(data.horse)
        } else {
          toast.error('Horse not found, redirecting to Horses list...')
          navigate('/horses')
        }
      } catch (error) {
        toast.error('Failed to fetch horse details')
      } finally {
        setLoading(false)
      }
    }

    fetchHorseDetails()
  }, [id, navigate])

  const handleHorseImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
      if (validImageTypes.includes(file.type)) {
        setNewHorseImage(URL.createObjectURL(file))
      } else {
        toast.error('Please upload a valid image file (jpeg, png, or jpg).')
      }
    }
  }

  if (loading) {
    return (
      <div className='absolute inset-0 dark:bg-black bg-white flex justify-center items-center z-50'>
        <Loader />
      </div>
    )
  }

  const getValue = (value) => value ?? 'N/A'

  return (
    <>
      <Header />
      <div className='min-h-screen px-6 py-8 bg-gray-100 dark:bg-black text-black dark:text-white'>
        <div className='max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6'>
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Left: Main Image & Upload */}
            <div>
              <img
                src={newHorseImage || horse.image || defaultImage}
                alt={horse.name}
                className='w-full max-h-90 object-cover object-center rounded-lg shadow-lg'
                onError={(e) => (e.target.src = defaultImage)}
              />
              <label className='block mt-4 cursor-pointer bg-gray-700 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 text-white dark:text-black font-semibold py-2 px-4 rounded text-center'>
                Choose Image
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleHorseImageChange}
                  className='hidden'
                />
              </label>
              {newHorseImage && (
                <div className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  Preview:
                  <img
                    src={newHorseImage}
                    alt='New Preview'
                    className='mt-2 w-24 h-24 object-cover rounded-lg shadow-md'
                  />
                </div>
              )}
            </div>

            {/* Right: Basic Info */}
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold flex items-center gap-2'>
                🐴 {getValue(horse.name)}
              </h1>

              <div className='space-y-2'>
                <p>
                  <strong>Horse Number:</strong> {getValue(horse.horse_number)}
                </p>
                <p>
                  <strong>Gender:</strong> {getValue(horse.gender?.name_en)}
                </p>
                <p>
                  <strong>Breed:</strong> {getValue(horse.breed)}
                </p>
                <p>
                  <strong>Country Origin:</strong> {getValue(horse.country_origin)}
                </p>
                <p>
                  <strong>Date Of Birth:</strong> {getValue(horse.date_of_birth)}
                </p>
                <p>
                  <strong>Paternity Certificate:</strong>
                  <a
                    href={horse.paternity_certificate || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='underline text-blue-500 ml-1'
                  >
                    View
                  </a>
                </p>
              </div>
              {/* Family Details */}
              <div>
                <h2 className='font-bold mb-2'>Family Details</h2>
                <ul className='list-disc list-inside space-y-1'>
                  <li>Father: {getValue(horse.father_name)}</li>
                  <li>Mother: {getValue(horse.mother_name)}</li>
                </ul>
              </div>

              {/* User Info */}
              <div>
                <h2 className='font-bold mb-2'>User</h2>
                <ul className='list-disc list-inside space-y-1'>
                  <li>
                    Name:{' '}
                    {horse.user
                      ? `${getValue(horse.user.first_name)} ${getValue(horse.user.last_name)}`
                      : 'N/A'}
                  </li>
                  <li>Email: {getValue(horse.user?.email)}</li>
                  <li>Phone: {getValue(horse.user?.phone)}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Lower Section */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-sm'>
            {/* First Row: Services, Return Policy, Injuries */}
            <div>
              <h2 className='font-bold mb-2'>Services</h2>
              {horse.services.length ? (
                horse.services.map((service, i) => (
                  <ul key={i} className='list-disc list-inside mb-2'>
                    <li>Name: {getValue(service.name)}</li>
                    <li>Price: {getValue(service.price)}</li>
                    <li>Payment: {getValue(service.payment?.status)}</li>
                  </ul>
                ))
              ) : (
                <p>No services</p>
              )}
            </div>

            <div>
              <h2 className='font-bold mb-2'>Return Policy</h2>
              <ul className='list-disc list-inside space-y-1'>
                <li>Training: {horse.training_horse ? 'Yes' : 'No'}</li>
                <li>
                  Place: {getValue(horse.place?.number)} - {getValue(horse.place?.category?.name)}
                </li>
                <li>Injuries Count: {horse.injuries.length || 'None'}</li>
              </ul>
            </div>

            <div>
              <h2 className='font-bold mb-2'>Injuries</h2>
              {horse.injuries?.length ? (
                <ul className='list-disc list-inside space-y-1'>
                  {horse.injuries.map((injury, i) => (
                    <li key={i}>{getValue(injury)}</li>
                  ))}
                </ul>
              ) : (
                <p>No injuries</p>
              )}
            </div>
          </div>

          {/* Second Row: Packages, Registers, Extra Info */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-sm'>
            <div>
              <h2 className='font-bold mb-2'>Packages</h2>
              {horse.packages?.length ? (
                horse.packages.map((pkg, i) => (
                  <ul key={i} className='list-disc list-inside mb-2'>
                    <li>Category: {getValue(pkg.service_category?.name_en)}</li>
                    <li>Period: {getValue(pkg.period)}</li>
                    <li>Price: {getValue(pkg.price)}</li>
                    <li>Payment: {getValue(pkg.payment?.status)}</li>
                  </ul>
                ))
              ) : (
                <p>No packages</p>
              )}
            </div>

            <div>
              <h2 className='font-bold mb-2'>Registers</h2>
              {horse.registers?.length ? (
                horse.registers.map((reg, i) => (
                  <ul key={i} className='list-disc list-inside mb-2'>
                    <li>{getValue(reg)}</li>
                  </ul>
                ))
              ) : (
                <p>No registers</p>
              )}
            </div>

            <div>
              <h2 className='font-bold mb-2'>More Info</h2>
              <ul className='list-disc list-inside space-y-1'>
                <li>Other Registers: {getValue(horse.other_registers)}</li>
                <li>Other Injuries: {getValue(horse.other_injuries)}</li>
                <li>Production Place: {getValue(horse.production_place)}</li>
                <li>Is Out: {horse.is_out ? 'Yes' : 'No'}</li>
                <li>Out Reason: {getValue(horse.out_reason)}</li>
                <li>Out Time: {getValue(horse.out_time)}</li>
                <li>Created At: {getValue(horse.created_at)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HorseDetailsPage
