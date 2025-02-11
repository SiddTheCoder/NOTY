import React from 'react'
import ModeContextProvider from './context/ModeContext/ModeContext'
import { UserContextProvider } from './context/UserContext/UserContext'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { useAuth } from './hooks/useAuth'
import Profile from './pages/Profile'

// Create a new component to use the auth hook
function AppContent() {
  useAuth() // Now this is inside the context providers

  // Protected route component
  const ProtectedRoute = ({ children , allowGuest = false }) => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser || allowGuest) {
      return children
    }
    
    return <Navigate to="/" />
  }

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route 
        path='/home' 
        element={
          <ProtectedRoute allowGuest={true}>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route path='/signup' element={<Signup />} />
      <Route 
        path='/profile' 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ModeContextProvider>
          <AppContent />
        </ModeContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
