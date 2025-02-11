import React, { useState, useEffect } from 'react';
import '../Style.css';
import { Trash, ArrowDownUp } from 'lucide-react';

function Core() {
    const [todo, setTodo] = useState('');
    const [tasks, setTasks] = useState([]);
    const [listOrder, setListOrder] = useState('asc');

     // Load tasks from localStorage on first render
     useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const userTasks = JSON.parse(localStorage.getItem(`tasks_${loggedInUser.token}`)) || [];
        setTasks(userTasks);
    }, []);

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        
        // Only update localStorage if tasks is NOT empty
        if (tasks.length > 0) {
            localStorage.setItem(`tasks_${loggedInUser.token}`, JSON.stringify(tasks));
        }
    }, [tasks]);

    function addTodo() {
        if (todo.trim() !== "") {
            const currentDate = new Date().toLocaleDateString('en-US', {
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            setTasks((prevTasks) => [...prevTasks, { id: Date.now(), text: todo, date: currentDate , completed: false }]);
            setTodo('');
        }
    }

    const toggleTaskStatus = (id) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => 
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };
    

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        //delete the task from the localStorage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const userTasks = JSON.parse(localStorage.getItem(`tasks_${loggedInUser.token}`)) || [];
        const updatedTasks = userTasks.filter((task) => task.id !== id);
        localStorage.setItem(`tasks_${loggedInUser.token}`, JSON.stringify(updatedTasks));
    };

    const handleListOrder = () => {
        setListOrder(listOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className='w-full h-full bg-slate-900 mt-1 ml-2 mr-3 rounded-md px-2 py-2'>
            <div className='w-full h-full flex gap-2'>
                {/* Left Side */}
                <div className='w-full h-full flex flex-col gap-2'>
                    {/* TODO DATA CREATER */}
                    <div className='w-full h-1/12 rounded-md flex'>
                        <form className='w-[100%] flex justify-center gap-2' onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}
                                placeholder='Add a new TODO' className='w-[45%] h-full p-2 rounded-md bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                            <button className='cursor-pointer hover:bg-blue-500 transition-all duration-300 w-[10%] h-full text-white outline-none px-2 py-1 rounded-md bg-slate-700' type='submit'>Add</button>
                        </form>
                    </div>

                    {/* Divider */}
                    <div className='w-full h-auto'>
                        <div className='border-b-2 border-b-orange-400 border-slate-700 w-[80%] mx-auto'></div>
                    </div>

                    {/* Filters */}
                    <div className='w-full h-auto rounded-md flex justify-end items-center gap-10'>
                        <div className='w-max-content h-full px-2 py-1 cursor-pointer hover:bg-slate-800 transition-all duration-300 rounded-md bg-slate-700 flex justify-center items-center mr-18'>
                            <h1 
                            onClick={handleListOrder}
                            className='text-white'
                            ><ArrowDownUp /></h1>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='w-full h-auto'>
                        <div className='border-b-2 border-b-slate-800 border-slate-700 w-[90%] mx-auto'></div>
                    </div>

                    {/* TODO DATA HOLDER */}
                        <div className='w-full h-full rounded-md flex flex-col gap-2 px-3 py-2 custom-scrollbar overflow-y-scroll'>
                            {[...tasks]
                                .sort((a, b) => listOrder === 'desc' ? b.id - a.id : a.id - b.id)
                                .map((task) => (
                                    <div key={task.id} className='w-full min-h-[60px] h-auto py-2 rounded-md flex justify-between px-10 items-center bg-slate-800 gap-2'>
                                        <div className='flex items-center gap-2 max-w-[70%] min-w-[70%]'>
                                            <input 
                                                type="checkbox" 
                                                checked={task.completed}
                                                onChange={() => toggleTaskStatus(task.id)}
                                            />
                                            <h1>{task.text}</h1>
                                        </div>
                                        <div className='flex justify-center items-center gap-3'>
                                            <h1 className='text-sm'>{task.date}</h1>
                                            <Trash className='w-6 h-6 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300 rounded-md text-red-500 cursor-pointer' onClick={() => deleteTask(task.id)} />
                                        </div>
                                    </div>
                                ))}
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Core;
