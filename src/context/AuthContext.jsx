import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'

// Create the Auth context
export const AuthContext = createContext()

// AuthProvider component that wraps the app and provides auth state
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)

  // Load token from localStorage on first mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  // Save token in both state and localStorage
  const login = useCallback(
    (newToken) => {
      if (token !== newToken) {
        setToken(newToken)
        localStorage.setItem('token', newToken)
      }
    },
    [token]
  )

  // Clear token from both state and localStorage
  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    toast.success('You have logged out successfully!') // Show success message
  }, [])

  // Auth status: true if token exists
  const isAuth = token !== null

  const value = useMemo(() => ({ isAuth, token, login, logout }), [isAuth, token, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
