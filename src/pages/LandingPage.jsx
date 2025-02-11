import React,{useEffect, useState} from 'react'
import { useMode } from '../context/ModeContext/ModeContext'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const {setMode} = useMode()
    const navigate = useNavigate()

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser')
        if (loggedInUser) {
            setMode('User')
            navigate('/home')
        }
    }, [navigate, setMode])

    const handleGuest = () => {
        setMode('Guest')
        navigate('/home')
    }

    const handleUser = () => {
        setMode('User')
        navigate('/login')
    }

    return (
        <>

        <h1 
            className='text-4xl font-bold text-center mt-20 text-gray-300'
        >The <span className='text-blue-500'>Best</span> Place to Make Your Day <span className='text-blue-500'>Notes</span></h1>
       
       <div className='flex justify-center items-center mt-10 gap-4 min-h-96 bg-slate-900 w-[85%] mx-auto rounded-lg'>
            <button 
                className='bg-blue-500 text-white text-2xl px-8 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300' 
                onClick={handleGuest}
            >Guest
            </button>
            <button 

                className='bg-blue-500 text-white text-2xl px-8 py-3 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300'
                onClick={handleUser}
            >User
            </button>
       </div>

       <div className='text-center text-gray-400 text-sm mt-4'>Note : We use Local Storage to store your notes</div>

        </>


    )
}

export default LandingPage
