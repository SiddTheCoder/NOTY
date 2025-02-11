import React, {useRef, useState} from 'react';
import {Home as HomeIcon, Plus as PlusIcon} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GuestImg from '../assets/images/guestImg.png';
import { useUser } from '../context/UserContext/UserContext';
import ConfirmDelete from '../components/ConfirmDelete';

function Profile() {
    const DEFAULT_BIO = 'Hey Grinders ! Lets Have Some Notes Here .';
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const inputFiles = useRef(null);
    const userBioRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [bioText, setBioText] = useState(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const user = users.find(user => user.token === loggedInUser.token);
        return user ? user.bio : DEFAULT_BIO;
    });

    const [image, setImage] = useState(() => {
        const userImages = JSON.parse(localStorage.getItem('userImages')) || [];
        const userImage = userImages.find(image => image.token === user.token);
        return userImage ? userImage.image : GuestImg;
    });

    const handleDoubleClick = () => {
        setIsEditing(true)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || [];
        const user = users.find(user => user.token === loggedInUser.token);
        user.bio = bioText;
        localStorage.setItem('users', JSON.stringify(users));
    };

    const handleBlur = () => {
        if (bioText.trim() === '') setBioText(DEFAULT_BIO);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (bioText.trim() === '') setBioText(DEFAULT_BIO);
            setIsEditing(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    let width = img.width;
                    let height = img.height;
                    const maxSize = 1024;
                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    let quality = 0.8;
                    let compressedDataURL = canvas.toDataURL('image/jpeg', quality);

                    while (compressedDataURL.length > 200 * 1024 && quality > 0.2) {
                        quality -= 0.1; 
                        compressedDataURL = canvas.toDataURL('image/jpeg', quality);
                    }

                    setImage(compressedDataURL);
                    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

                    setTimeout(() => {
                        setUser({...user, image: compressedDataURL});
                        let userImages = JSON.parse(localStorage.getItem('userImages')) || [];
                        userImages = userImages.filter(img => img.token !== loggedInUser.token);
                        userImages.push({ token: loggedInUser.token, image: compressedDataURL });

                        localStorage.setItem('userImages', JSON.stringify(userImages));
                    }, 1000);
                };
            };
            reader.readAsDataURL(file);
        }
    };


    // const handleDeleteAccount = () => {
    
    // // First remove the user from storage
    // let users = JSON.parse(localStorage.getItem('users')) || [];
    // let userImages = JSON.parse(localStorage.getItem('userImages')) || [];
    
    // users = users.filter(u => u.token !== user.token);
    // userImages = userImages.filter(img => img.token !== user.token);
    
    // // Update storage
    // localStorage.setItem('users', JSON.stringify(users));
    // localStorage.setItem('userImages', JSON.stringify(userImages));
    
    // // Clear all auth-related data
    // localStorage.removeItem('loggedInUser');
    // localStorage.removeItem('mode');
    
    // // Reset user context
    // setUser(null);
    
    // // Navigate to landing page
    // navigate('/', { replace: true });
    // };
    
    return (
        <>
            <header className='w-full h-10 px-20 mt-4 text-white flex justify-between items-center'>
                <div className='flex justify-start items-center w-full' onClick={() => navigate('/')}>
                    <HomeIcon className='w-8 h-8 cursor-pointer hover:text-yellow-400 bg-transparent hover:border hover:border-yellow-400 rounded-sm ' title='Home'/>
                </div>
            </header>
            <div className='w-full h-auto mt-1 mb-3'>
                <div className='border-b border-white/20 w-1/2 mx-auto'></div>
            </div>

            <main className='w-full h-[calc(100vh-100px)] flex justify-center items-center'>
                <div className='w-[95%] h-full bg-slate-900 text-white rounded-md flex justify-between'>
                    <div className="left-side rounded-md w-full md:w-1/2 mt-5">
                        <div 
                            className={`w-96 h-96 rounded-full mx-auto border relative
                            shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_1px_#08f,0_0_5px_#08f,0_0_3px_#08f] ${isEditing ? 'animate-none' : ''}`}
                        >
                            <img src={image} alt="Guest" className='w-full h-full object-cover rounded-full'/>
                            <div className='absolute bottom-0 right-5 bg-white/20 backdrop-blur-sm rounded-full p-2'>
                                <input type="file" name="image" id="image" className='hidden' accept='image/*' ref={inputFiles} onChange={handleImageChange}/>
                                <label htmlFor="image" className='cursor-pointer'>
                                    <PlusIcon className='w-6 h-6 cursor-pointer z-10' title='Add Image'/>
                                </label>
                            </div>
                        </div>
                        <div className='text-center text-2xl font-bold mt-5'> {user?.username || 'Guest'}</div>
                        <div className='text-center text-sm text-gray-400 mt-2'>{user?.email || 'Guest'}</div>
                        
                        {isEditing ? (
                            <input
                                type="text"
                                value={bioText}
                                onChange={(e) => setBioText(e.target.value)}
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className='w-full text-center text-sm text-yellow-400 mt-2 bg-transparent outline-none'
                            />
                        ) : (
                            <div 
                                ref={userBioRef} 
                                onDoubleClick={handleDoubleClick}
                                id='userBio' 
                                className='text-center text-sm text-gray-400 mt-2'
                            >
                                {user?.bio || DEFAULT_BIO}
                            </div>
                        )}
                        <div className='text-red-500 text-center text-sm mt-5 cursor-pointer hover:text-red-400 transition-all duration-300 ease-in-out relative' onClick={() => setIsConfirmDelete(true)}>
                            Delete Account</div>
                            {isConfirmDelete && <ConfirmDelete isOpen={isConfirmDelete} onClose={() => setIsConfirmDelete(false)}/>}

                    </div>

                    <div className='w-2 h-full flex flex-col justify-center items-center'>
                        <div className='border-l border-white/20 h-[calc(100vh-150px)]'></div>
                    </div>

                    <div className='md:flex hidden right-side px-5 py-10 rounded-md w-1/2'>
                       <div className='text-xl font-bold'>⭐Starred Todos</div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Profile;
