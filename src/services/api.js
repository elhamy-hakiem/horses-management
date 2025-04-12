import axios from 'axios'
import { toast } from 'react-toastify' // Importing Toast

// Axios setup
const api = axios.create({
  baseURL: 'https://noonacademy_anCOzle.jeyad360.com/organization/v1/d/', // API base URL
  timeout: 10000, // Set timeout for requests (10 seconds)
})

// Add token to the header if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Set the token in the header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Fetch all horses
export const fetchHorses = async () => {
  try {
    const response = await api.get('horses') // Fetch horses from the API
    return response.data.data // Ensure you return the correct data (the horses array)
  } catch (error) {
    console.error('Error fetching horses:', error)
    toast.error('Failed to fetch horses!') // Toast error message
    throw error
  }
}

// Fetch horse details by ID
export const getHorseById = async (id) => {
  try {
    const response = await api.get(`horses/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching horse with ID ${id}:`, error)
    toast.error('Failed to fetch horse details!') // Toast error message
    throw error
  }
}

// Handle response errors globally
api.interceptors.response.use(
  (response) => response, // If the request is successful, simply return the response as it is.
  (error) => {
    // Check for timeout error
    if (error.code === 'ECONNABORTED') {
      toast.error('Your request took too long. Please try again later.')
    }
    // Check for network errors (e.g., no internet connection)
    else if (error.message === 'Network Error') {
      toast.error(
        'Unable to connect to the server. Please check your internet connection and try again.'
      )
    }
    // Handle authentication errors (e.g., invalid credentials)
    else if (error.response && error.response.data.status === false) {
      if (error.response.data.msg === 'Invalid credentials') {
        toast.error(error.response.data.msg)
      }
      if (error.response.data.data) {
        const errors = Object.values(error.response.data.data).flat()
        errors.forEach((errorMsg) => toast.error(errorMsg)) // Display all error messages from API
      }
    }
    // Check for server errors or unexpected issues
    else {
      toast.error('Something went wrong with the server. Please try again later.')
    }

    console.error('API Error:', error) // Log the error for debugging purposes
    return Promise.reject(error) // Reject the error to propagate it
  }
)

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('login', { email, password })
    return response.data // Return the response data if successful
  } catch (error) {
    console.error('Error logging in:', error)
    throw error // Propagate the error for global error handling
  }
}
