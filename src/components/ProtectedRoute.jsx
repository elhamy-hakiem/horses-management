import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext' // Importing AuthContext to check authentication status

// Protected route component to check if the user is authenticated
function ProtectedRoute({ children }) {
  // Using AuthContext to get the authentication status
  const { isAuth } = useContext(AuthContext)

  return isAuth ? children : <Navigate to='/login' /> // Redirect to login if not authenticated
}

export default ProtectedRoute
