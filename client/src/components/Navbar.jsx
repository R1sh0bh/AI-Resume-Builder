import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../app/features/authSlice';

const Navbar = () => {
    const {user} = useSelector(state => state.auth); 

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const logoutuser = () => {
        navigate('/');
        dispatch(logout())
    };


    return (
        <nav className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-300/40 dark:border-zinc-700 py-3">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                
                {/* Left side */}
                <div className="flex items-center gap-6">
                    <Link 
                        to="/" 
                        className="text-zinc-800 dark:text-zinc-200 font-medium hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                    >
                        Home
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                        Hi, <span className="font-semibold">{user?.name}</span>
                    </p>

                    <button
                        onClick={logoutuser}
                        className="px-4 py-2 text-sm rounded-full bg-indigo-500 text-white hover:opacity-90 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
