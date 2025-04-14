import React, { useState } from 'react'
import noImage from '../assets/defaultImage.png' // Assuming this is the default image
import { Link } from 'react-router-dom' // Import Link from React Router

const HorseCard = ({ horse }) => {
  const [imgSrc, setImgSrc] = useState(horse.image) // Set initial image source

  // Handle image error (when image fails to load)
  const handleError = () => {
    setImgSrc(noImage) // Fallback to no image if the original fails
  }

  // Calculate age based on the date_of_birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const today = new Date()

    // Calculate the difference in time
    const timeDiff = today - birthDate

    // Convert time difference to days
    const days = timeDiff / (1000 * 3600 * 24)

    // Calculate years, months, and days
    const years = Math.floor(days / 365)
    const months = Math.floor((days % 365) / 30)
    const remainingDays = Math.floor((days % 365) % 30)

    // Return the appropriate format based on age
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`
    } else {
      return `${remainingDays} day${remainingDays > 1 ? 's' : ''}`
    }
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
      {/* Horse Image with Link to Horse Details */}
      <Link to={`/horses/${horse.id}`}>
        {/* Horse Image */}
        <img
          src={imgSrc} // Use state for image source
          alt={horse.name}
          className='w-full h-80 object-contain object-center rounded-lg'
          onError={handleError} // Trigger onError to use fallback image if original fails
        />
      </Link>
      {/* Horse Details */}
      <div className='p-4'>
        {/* Horse Name */}
        {/* Horse Name with Link to Horse Details */}
        <Link
          to={`/horses/${horse.id}`}
          className='text-xl font-bold mb-2 text-gray-800 dark:text-white'
        >
          {horse.name}
        </Link>

        {/* Horse Age */}
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Age: {calculateAge(horse.date_of_birth)}
        </p>

        {/* Horse Breed */}
        <p className='text-sm text-gray-600 dark:text-gray-300'>Breed: {horse.breed}</p>
      </div>
    </div>
  )
}

export default HorseCard
