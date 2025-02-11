import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserToken from '../hooks/useUserToken'

function Signup() {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const submitButtonRef = useRef(null)

    // Generate a random token for the user
    const token = useUserToken(12)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        if(formData.password !== formData.confirmPassword){
            setError('Passwords do not match')
            setTimeout(() => {
                setError('')
                setFormData((preValue) => ({
                    ...preValue, 
                    password: '', 
                    confirmPassword: ''
                }))
            }, 2000)
            return
        }

        if(formData.username === '' || formData.password === '' || formData.confirmPassword === ''){
            setError('All fields are required')
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        
        // Fetch existing users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username is already taken
        const isUsernameTaken = users.some(user => user.username === formData.username);
        if (isUsernameTaken) {
            setError('Username already taken!');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
    
         // Create new user object with all the data
         const newUser = {
            ...formData,
            token: token
        }

         // If there is an existing user array, append the new user
         users = JSON.parse(localStorage.getItem('users')) || [];
         users.push(newUser);

        // Update localStorage
        localStorage.setItem('users', JSON.stringify(users))


        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const loadAnimation = () => {
        setIsLoading(true)
        submitButtonRef.current.classList.add('animate-pulse')
        submitButtonRef.current.textContent = 'Signing up...'
        setTimeout(() => {
            setIsLoading(false)
            submitButtonRef.current.classList.remove('animate-pulse')
            submitButtonRef.current.textContent = 'Signup'
        }, 1000)


    }

    const handleInputChange = (e) => {
        setFormData({   
            ...formData,
            [e.target.name] : e.target.value
        })
    }

  return (
    <form 
         className='bg-slate-700 text-white px-10 py-10 rounded-md w-1/2 mx-auto mt-40 flex flex-col gap-5 max-w-xl '
         onSubmit={handleSubmit}
         >
         <div className='text-2xl font-bold text-center text-blue-500'>Signup Form</div>
            <input 
             type="email" 
             name='email'
             placeholder='Email' 
             className='p-2 rounded-md bg-slate-800'
             value={formData.email}
             onChange={handleInputChange}
            />
            <input
             type="text" 
             name='username'
             placeholder='Username' 
             className='p-2 rounded-md bg-slate-800'
             value={formData.username}
             onChange={handleInputChange}
            />
            <input 
             type="password" 
             name='password'            
             placeholder='Password' 
             className='p-2 rounded-md bg-slate-800'
             value={formData.password}
             onChange={handleInputChange}
            />
            <input 
             type="password" 

             name='confirmPassword'            
             placeholder='Confirm Password' 
             className='p-2 rounded-md bg-slate-800'
             value={formData.confirmPassword}
             onChange={handleInputChange}
            />
            {error && <div className='text-red-500 text-center transition-all duration-300 ease-in-out'>{error}</div>}
            <button 
             type='submit'
             disabled={formData.username === '' || formData.password === '' || formData.confirmPassword === ''}
             onClick={loadAnimation}
             ref={submitButtonRef}
             className='p-2 rounded-md bg-blue-500 cursor-pointer'
            >Signup</button>
                <div className='text-center'>Already have an account? 
                    <span 
                     className='text-blue-500 cursor-pointer hover:text-blue-300 transition-all duration-300 ease-in-out'   
                     onClick={() => navigate('/login')}
                    >Login
                    </span>
                </div>
         </form>
  )
}

export default Signup