import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMode } from '../context/ModeContext/ModeContext'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Core from '../components/Core'
function Home() {
    const navigate = useNavigate()
    const { mode } = useMode()

  
    useEffect(() => {
      // Redirect to landing if no mode is set
      if (!mode) {
        navigate('/')
        return
      }
  
      // Prevent going back
      window.history.pushState(null, '', window.location.href)
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href)
      }
  
      window.addEventListener('popstate', handlePopState)
  
      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }, [mode, navigate])

    
    return (
        <>
          <div className='h-screen w-full flex flex-col'>
          <div className='w-full'>
          <Header />
          </div>
          <div className='w-full h-[calc(100vh-100px)] flex'>
            <Sidebar />
            <Core />
          </div>
          </div>
        </>
    )
}


export default Home
