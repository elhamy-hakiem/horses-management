import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext' // Import the AuthProvider
import { ThemeProvider } from './context/ThemeContext' // Import the ThemeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    {/* Wrap the app with AuthProvider to provide the authentication context */}
    <Router>
      <ThemeProvider>
        {/* Wrap the app with Router to enable page navigation */}
        <App />
      </ThemeProvider>
    </Router>
  </AuthProvider>
  // </React.StrictMode>
)
