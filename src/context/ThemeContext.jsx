import React, { createContext, useState, useEffect, useContext } from 'react'

// Create the Theme context
export const ThemeContext = createContext()

// ThemeProvider component that wraps the app and provides theme state
export const ThemeProvider = ({ children }) => {
  // State to manage the current theme (Dark or Light)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check localStorage for dark mode preference on first mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark') // Apply dark mode globally
    } else {
      document.documentElement.classList.remove('dark') // Apply light mode globally
    }
  }, [])

  // Function to toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      if (newMode) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark') // Apply dark mode globally
      } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark') // Apply light mode globally
      }
      return newMode
    })
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

// Custom hook to access theme context easily
export const useThemeContext = () => useContext(ThemeContext)
