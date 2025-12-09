import { Mail, User2Icon, Lock } from 'lucide-react';
import React from 'react';
import api from '../configs/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const query = new URLSearchParams(window.location.search);
    const urlstate = query.get("state");
    const dispatch = useDispatch()
    const [state, setState] = React.useState(urlstate || "login");

    const [formData, setData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await api.post(`/api/users/${state}`, formData)
            dispatch(login(data)) 
            localStorage.setItem('token', data.token)
            toast.success(data.message)
        } catch (error) {
            toast(error?.response?.data?.message || error.message)
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-900'>
            <form
                onSubmit={handleSubmit}
                className="w-full sm:w-[380px] text-center border border-gray-700 rounded-2xl px-8 py-10 bg-gray-800 shadow-lg"
            >
                <h1 className="text-white text-3xl font-semibold">
                    {state === "login" ? "Login" : "Register"}
                </h1>
                <p className="text-gray-400 text-sm mt-2 pb-6">
                    Please {state === "login" ? "sign in" : "sign up"} to continue
                </p>

                {state !== "login" && (
                    <div className="flex items-center w-full mt-4 bg-gray-700 border border-gray-600 h-12 rounded-full overflow-hidden pl-4 gap-2">
                        <User2Icon size={16} className="text-gray-300" />
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-full h-full"
                            name="name"
                            value={formData.name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-gray-700 border border-gray-600 h-12 rounded-full overflow-hidden pl-4 gap-2">
                    <Mail size={16} className="text-gray-300" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-full h-full"
                        name="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className="flex items-center w-full mt-4 bg-gray-700 border border-gray-600 h-12 rounded-full overflow-hidden pl-4 gap-2">
                    <Lock size={16} className="text-gray-300" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-full h-full"
                        name="password"
                        value={formData.password}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                <div className="mt-4 text-left">
                    <a className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors" href="#">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="mt-5 w-full h-12 rounded-full text-white bg-indigo-500 hover:bg-indigo-400 transition-colors font-medium"
                >
                    {state === "login" ? "Login" : "Create Account"}
                </button>

                <p className="text-gray-400 text-sm mt-4">
                    {state === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button
                        type="button"
                        className="text-indigo-400 hover:text-indigo-300 font-medium"
                        onClick={() => setState(prev => prev === "login" ? "register" : "login")}
                    >
                        {state === "login" ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
