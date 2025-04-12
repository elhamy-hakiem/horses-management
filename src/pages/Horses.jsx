import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchHorses } from '../services/api'
import HorseCard from '../components/HorseCard'
import ReactPaginate from 'react-paginate'
import Loader from '../components/Loader' // Importing the loader component
import Header from '../components/Header'

const HorsesPage = () => {
  const [horses, setHorses] = useState([])
  const [loading, setLoading] = useState(true) // Loading state to track when data is being fetched
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search') || '' // Search term
  const breedFilter = searchParams.get('breed') || '' // Breed filter
  const currentPage = parseInt(searchParams.get('page') || '1') // Current page number
  const horsesPerPage = 8 // Number of horses per page

  // Load horses data from the API
  useEffect(() => {
    const loadHorses = async () => {
      try {
        setLoading(true) // Start loading
        const data = await fetchHorses()
        setHorses(data.data)
        setLoading(false) // Stop loading after fetching data
      } catch (error) {
        setLoading(false) // Stop loading even if there's an error
      }
    }
    loadHorses() // Call the function to load horses data
  }, [])

  // Memoize filtered horses to avoid unnecessary re-calculation
  const filteredHorses = useMemo(() => {
    return horses.filter((horse) => {
      const matchName = horse.name.toLowerCase().includes(search.toLowerCase())
      const matchBreed = breedFilter
        ? horse.breed.toLowerCase().includes(breedFilter.toLowerCase())
        : true
      return matchName && matchBreed
    })
  }, [search, breedFilter, horses]) // Only recompute when search, breedFilter, or horses change

  const indexOfLastHorse = currentPage * horsesPerPage
  const indexOfFirstHorse = indexOfLastHorse - horsesPerPage
  const currentHorses = filteredHorses.slice(indexOfFirstHorse, indexOfLastHorse) // Get the horses for the current page
  const totalPages = Math.ceil(filteredHorses.length / horsesPerPage) // Calculate the total number of pages

  // Use useCallback to prevent re-creating the update functions on each render
  const updateSearch = useCallback(
    (value) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        params.set('search', value)
        params.set('page', '1') // Reset to the first page when search term changes
        return params
      })
    },
    [setSearchParams]
  )

  const updateBreed = useCallback(
    (value) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        params.set('breed', value)
        params.set('page', '1') // Reset to the first page when breed filter changes
        return params
      })
    },
    [setSearchParams]
  )

  const updatePage = useCallback(
    (page) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        params.set('page', page.toString())
        return params
      })
    },
    [setSearchParams]
  )

  const handlePageChange = ({ selected }) => {
    updatePage(selected + 1) // Update page when pagination is clicked (selected starts from 0)
  }

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className='absolute inset-0 bg-white dark:bg-black flex justify-center items-center z-50'>
          <Loader />
        </div>
      )}
      {/* Header outside of main container */}
      <Header />

      <div className='min-h-screen bg-white dark:bg-black text-black dark:text-white  dark:p-4 px-4'>
        {/* Search & Filter Bar */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-4 mt-6 mb-4 px-4'>
          <input
            type='text'
            placeholder='Search by horse name...'
            className='w-full md:w-1/3 p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-600 dark:shadow-lg'
            value={search}
            onChange={(e) => updateSearch(e.target.value)} // Update search term
          />
          <input
            type='text'
            placeholder='Filter by breed...'
            className='w-full md:w-1/3 p-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-600 dark:shadow-lg'
            value={breedFilter}
            onChange={(e) => updateBreed(e.target.value)} // Update breed filter
          />
        </div>
        {/* Horse Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {currentHorses.map((horse) => (
            <HorseCard key={horse.id} horse={horse} /> // Render each horse card
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-8'>
            <ReactPaginate
              pageCount={totalPages} // Total number of pages
              pageRangeDisplayed={2} // Number of page numbers to display
              marginPagesDisplayed={1} // Number of page numbers to display at the margins
              onPageChange={handlePageChange} // Handle page change
              containerClassName='flex space-x-2'
              pageClassName='px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 cursor-pointer'
              activeClassName='bg-black text-white dark:bg-white dark:text-black'
              previousLabel='←'
              nextLabel='→'
              previousClassName='px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600'
              nextClassName='px-3 py-1 rounded-md bg-gray-300 dark:bg-gray-600'
              breakLabel='...'
              forcePage={currentPage - 1} // Force page to be 1-indexed
            />
          </div>
        )}
      </div>
    </>
  )
}

export default HorsesPage
