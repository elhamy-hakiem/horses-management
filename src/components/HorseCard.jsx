import React, { useState } from 'react'
import noImage from '../assets/noImage.jpg' // Assuming this is the default image
import { Link } from 'react-router-dom' // Import Link from React Router

const HorseCard = ({ horse }) => {
  const [imgSrc, setImgSrc] = useState(horse.image) // Set initial image source

  // Handle image error (when image fails to load)
  const handleError = () => {
    setImgSrc(noImage) // Fallback to no image if the original fails
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
      {/* Horse Image with Link to Horse Details */}
      <Link to={`/horses/${horse.id}`}>
        {/* Horse Image */}
        <img
          src={imgSrc} // Use state for image source
          alt={horse.name}
          className='w-full h-48 object-fill'
          onError={handleError} // Trigger onError to use fallback image if original fails
        />
      </Link>
      {/* Horse Details */}
      <div className='p-4'>
        {/* Horse Name */}
        {/* Horse Name with Link to Horse Details */}
        <Link
          to={`/horses/:${horse.id}`}
          className='text-xl font-bold mb-2 text-gray-800 dark:text-white'
        >
          {horse.name}
        </Link>

        {/* Horse Age */}
        <p className='text-sm text-gray-600 dark:text-gray-300'>Age: {horse.age}</p>

        {/* Horse Breed */}
        <p className='text-sm text-gray-600 dark:text-gray-300'>Breed: {horse.breed}</p>
      </div>
    </div>
  )
}

export default HorseCard
