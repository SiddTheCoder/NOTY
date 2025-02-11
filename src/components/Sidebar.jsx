import React, { useState, useRef, useEffect } from 'react'
import { Home as HomeIcon, User as UserIcon, LogIn as LogInIcon , PanelRightOpen as PanelRightOpenIcon , PanelLeftOpen as PanelLeftOpenIcon , Settings as SettingsIcon , LogOut as LogOutIcon} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useMode } from '../context/ModeContext/ModeContext';

function Sidebar() {
    const [sideIcon, setSideIcon] = useState(true)
    const sidebarRef = useRef(null)
    const navigate = useNavigate()
    const {mode} = useMode()

    const handleOpen = () => {
        setSideIcon(!sideIcon)
    }
    const handleLogout = () => {
        if(mode === 'User'){
            localStorage.removeItem('loggedInUser')
            navigate('/')
        }
        else{
            navigate('/login')
        }
    }
    const handleSettings = () => {
        console.log('Settings')
    }


    return (
        <div className={`${sideIcon ? 'w-[65px] transition-all duration-300' : 'min-w-[200px] max-w-auto transition-all duration-300'} ml-5 mt-1 px-3 py-4 h-full bg-slate-900 text-white rounded-md`} ref={sidebarRef}
        >
            <div className='flex flex-col justify-between items-start gap-5'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex justify-between items-center w-max-content cursor-pointer hover:bg-slate-800 rounded-md px-2 py-1 transition-all duration-300'
                    onClick={handleOpen}
                    >
                        {sideIcon ? <PanelLeftOpenIcon /> : <PanelRightOpenIcon />}
                    </div>
                </div>
                <div className='border-b border-white/20 w-full'></div>
                <div 
                    className='flex flex-col justify-between items-center relative w-full h-full'
                >
                    <div className='flex justify-between items-center gap-1  w-full cursor-pointer hover:bg-slate-800 rounded-md px-2 py-1 transition-all duration-300'><HomeIcon />{!sideIcon ? 'Home' : ''}</div>
                    <div className='flex flex-col gap-5 items-center justify-between w-full absolute top-95 left-0 right-0'>
                    <div 
                    className='flex justify-between items-center gap-1  w-full cursor-pointer hover:bg-slate-800 rounded-md px-2 py-1 transition-all duration-300'
                    onClick={mode === 'User' ? () => navigate('/profile') : () => navigate('/login')}
                    ><UserIcon />{!sideIcon ? 'Profile' : ''}
                    </div>
                    <div 
                    className='flex justify-between items-center gap-1 -ml-1  w-full cursor-pointer hover:bg-slate-800 rounded-md px-2 py-1 transition-all duration-300'
                    onClick={mode === 'User' ? handleLogout : () => navigate('/login')}
                    ><LogOutIcon />{!sideIcon ? mode === 'User' ? 'Logout' : 'Login' : ''}
                    </div>
                    <div className='flex justify-between items-center gap-1  w-full cursor-pointer hover:bg-slate-800 rounded-md px-2 py-1 transition-all duration-300'
                    onClick={handleSettings}
                    ><SettingsIcon />{!sideIcon ? 'Settings' : ''}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
