import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function ConfirmDelete({isOpen, onClose}) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')));
        
    const navigate = useNavigate();
    const [confirmText, setConfirmText] = useState('');
    
    function deleteAccount() {
        if (confirmText === 'DELETE') {
            // First remove the user from storage
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userImages = JSON.parse(localStorage.getItem('userImages')) || [];
            
            users = users.filter(u => u.token !== user.token);
            userImages = userImages.filter(img => img.token !== user.token);
            
            // Update storage
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userImages', JSON.stringify(userImages));
            
            // Clear all auth-related data
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('mode');
            
            // Reset user context
            setUser(null);
            
            // Navigate to landing page
            navigate('/', { replace: true });
        }
    }
    

    return (
        <div className='h-44 w-96 bg-slate-700 px-5 py-4 rounded-md shadow absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out'>
            <div className='text-white text-2xl font-bold'>Are You Sure ? Type : <span className='text-red-500'>DELETE</span></div>
            <div className='flex justify-center items-center mt-5'>
                <input type="text" className='w-full h-10 px-2 rounded-md bg-transparent border border-white/20 text-white outline-none' placeholder='Type DELETE' onChange={(e) => setConfirmText(e.target.value)}/>
            </div>
            <div className='flex justify-center items-center mt-5'>
                <button type='submit' className='w-full h-10 px-2 rounded-md bg-red-500 text-white outline-none hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer' onClick={() => deleteAccount()}>Delete Account</button>
            </div>
        </div>
    )
}

export default ConfirmDelete
