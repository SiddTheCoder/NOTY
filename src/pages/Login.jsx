import React, { useState } from 'react'
import { useUser } from '../context/UserContext/UserContext'
import { useNavigate } from 'react-router-dom'
import guestImg from '../assets/images/guestImg.png'
import { useRef } from 'react'


function Login() {
    const {user, setUser} = useUser()   
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const usernameRef = useRef(null)


    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('users'))
    // Get the user image from localStorage
    const userImages = JSON.parse(localStorage.getItem('userImages')) || [];

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
   
    const handleSubmit = (e) => {
        e.preventDefault()
        // Find the user in the users array
        const user = users.find(user => user.username === formData.username && user.password === formData.password)
        if(user){
            setError('')
            // Update the user state with the user details
            localStorage.setItem('loggedInUser', JSON.stringify(user))
            navigate('/Home')
            // Update the user state with the user details
            setUser(user)
        }else{
            setError('Invalid username or password')
        }
    }


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    return (
        <>

        
         <form 
         className='bg-slate-700 text-white px-10 py-10 rounded-md w-1/2 mx-auto my-20 flex flex-col gap-5 max-w-xl '
         onSubmit={handleSubmit}
         >
         <div className='text-2xl font-bold text-center text-blue-500'>Login Form</div>
            <input
             ref={usernameRef}
             required
             type="text" 
             name='username'
             placeholder='Username' 
             className='p-2 rounded-md bg-slate-800'
             value={formData.username}
             onChange={handleInputChange}
            />
            <input
             required
             type="password" 
             name='password'            
             placeholder='Password' 
             className='p-2 rounded-md bg-slate-800'
             value={formData.password}
             onChange={handleInputChange}
            />
            {error && <div className='text-red-500 text-center'>{error}</div>}
            <button 
             type='submit'
             className='p-2 rounded-md bg-blue-500'
            >Login</button>
            <div className='border-t border-white/20 mt-5'></div>
            {/* Already have an account */}
             <div className='flex flex-col justify-center items-center gap-2'>
                <span className='text-white-500 text-md'>{users && users.length > 0 ? 'Previously Logged in Accounts' : ''}</span>
                <div className='flex flex-col gap-2'>

                        {users && users.length > 0 ? (
                            <ul className='flex flex-wrap gap-2'>
                                {users.map(user => {
                                    const userImage = userImages.find(image => image.token === user.token);
                                    return (
                                        <li 
                                            className='flex gap-2 items-center text-white-500 cursor-pointer  hover:text-blue-300 transition-all duration-300 ease-in-out bg-slate-950 py-2   px-6 rounded-md' 
                                            key={user.username}
                                            onClick={() => {
                                                setUser(user)
                                                setFormData({
                                                    ...formData,
                                                    username: user.username
                                                });
                                            }}
                                         >

                                        <div className='w-6 h-6 rounded-full bg-white overflow-hidden'>
                                            <img src={userImage ? userImage.image : guestImg} alt="guest" className='w-full h-full object-cover' />
                                        </div>
                                        {user.username}</li>

                                    )
                                })}

                            </ul>

                        ) : (
                            <div className='text-white-500 text-md'>No previously logged in accounts</div>
                        )}
                </div>

                

             </div>

            <div className='border-t border-white/20 mt-5'></div>
            <div className='text-center'>Don't have an account? <span
             className='text-blue-500 cursor-pointer'
             onClick={() => navigate('/signup')}
             >Signup</span>
             </div>
         </form>



        </>

    )
}


export default Login
