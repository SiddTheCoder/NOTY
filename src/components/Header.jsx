import React, { useState } from 'react'
import guestImg from '../assets/images/guestImg.png'
import { useMode } from '../context/ModeContext/ModeContext'
import { useUser } from '../context/UserContext/UserContext'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
function Header({}) {
    const {mode} = useMode()
    const {user} = useUser()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userImage, setUserImage] = useState(() => {
        const userImages = JSON.parse(localStorage.getItem('userImages')) || [];
        const userImage = userImages.find(image => image.token === user.token);
        return userImage ? userImage.image : guestImg;
    })

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser')
        navigate('/')
    }

    const handleProfile = () => {
        navigate('/profile')
    }
    return (
        <header className='header flex justify-between items-center px-10 py-3 bg-slate-900 text-white max-w-screen-xl mx-auto mt-5 rounded-md relative'>

            <div className="left-side flex justify-between items-center gap-4">
                <div className="logo flex justify-between items-center gap-1">
                    <img src={logo} alt="logo" className='w-6 h-6' />
                    <p class="text-[24px] font-titillium tracking-wide bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text font-semibold">
                    NOTY</p>
                </div>

            </div>

            <div className="right-side">
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="menu-icon flex justify-between items-center gap-2">
                    <div className='w-8 scale-[1] h-8 bg-white rounded-full object-cover cursor-pointer overflow-hidden'>
                        <img src={userImage} alt="menu-icon" />
                    </div>
                    <span className='text-md cursor-pointer'>{mode === 'User' ? user?.username : 'Guest'}</span>
                </div>
                {/* menu icon */}
                {isMenuOpen && (
                <div className='flex flex-col justify-between items-start gap-2 absolute right-1 top-14 bg-slate-900 rounded-md px-5 py-3 h-auto'>
                    <button 
                        onClick={handleProfile}
                        className='bg-blue-400 text-white px-3 py-1 cursor-pointer rounded-md hover:bg-blue-500 transition-all duration-300'>
                        {mode === 'User' ? 'Profile' : ''}
                    </button>
                    <button 
                        onClick={mode === 'User' ? handleLogout : () => navigate('/login')}
                        className='bg-blue-400 text-white px-3 py-1 cursor-pointer rounded-md hover:bg-blue-500 transition-all duration-300'>
                        {mode === 'User' ? 'Logout' : 'Login'}
                    </button>
                </div>
                )}
            </div>
        </header>



    )
}


export default Header
