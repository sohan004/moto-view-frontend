import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import img from '../../assets/account/download (2).png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { set } from 'firebase/database';
import useAxios from '../../Hooks/useAxios';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { setUser } from '../../features/authUser/authUserSlice';
import Swal from 'sweetalert2';

const SignUpModal = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [showPass, setShowPass] = useState(false)
    const dispatch = useDispatch()
    const axios = useAxios()

    const openSignUpModal = () => {
        document.getElementById('sign-up-modal').close();
        document.getElementById('sign-in-modal').showModal();
    }

    const onGoogleLogin = async ({credential}) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post('/auth/google-signup', { credential })
            setLoading(false)
            localStorage.setItem('token', data.token)
            dispatch(setUser(data.info))
            document.getElementById('sign-up-modal').close()
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Login Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            setError(error?.response?.data?.message || 'Something went wrong')
            console.log(error)
            setLoading(false)
        }
    }

    const onSubmit = async () => {
        try {
            if (!email || !password || !phone || !name) {
                setError('Please fill all the fields')
                return
            }
            setError('')
            setLoading(true)
            const { data: { token } } = await axios.post('/auth/signup', { email, password, phone, name })
            setLoading(false)
            localStorage.setItem('otp-token', token)
            document.getElementById('sign-up-modal').close()
            document.getElementById('otp-modal').showModal()
        } catch (error) {
            setError(error?.response?.data?.message || 'Something went wrong')
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <dialog id="sign-up-modal" className="modal">
            <div className="modal-box bg-white  relative select-none">
                <span
                    onClick={() => document.getElementById('sign-up-modal').close()}
                    className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                <div className='flex justify-center'>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={onGoogleLogin}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>
                <p className='text-center mt-3 font-medium'>or</p>
                <div className=" px-2 md:px-7">
                    {error && <p className="text-red-500 text-center font-medium  mt-3">{error}</p>}
                    <div className="relative">
                        <input type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="name"
                            className="outline-none border-b-2 w-full bg-transparent p-2 px-4 
                    border-red-400" />
                        <span className="absolute top-2/4 -translate-y-2/4 text-xl text-red-500 left-0">&#x2022;</span>
                    </div>
                </div>
                <div className="mt-8 px-2 md:px-7">
                    <div className="relative">
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="email"
                            className="outline-none border-b-2 w-full bg-transparent p-2 px-4 
                    border-red-400" />
                        <span className="absolute top-2/4 -translate-y-2/4 text-xl text-red-500 left-0">&#x2022;</span>
                    </div>
                </div>
                <div className="mt-8 px-2 md:px-7">
                    <div className="relative">
                        <input type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="phone"
                            className="outline-none border-b-2 w-full bg-transparent p-2 px-4 
                    border-red-400" />
                        <span className="absolute top-2/4 -translate-y-2/4 text-xl text-red-500 left-0">&#x2022;</span>
                    </div>
                </div>
                <div className="mt-8 px-2 md:px-7">
                    <div className="relative">
                        <input type={showPass ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="password"
                            className="outline-none border-b-2 w-full bg-transparent p-2 px-4 
                    border-red-400" />
                        <span className="absolute top-2/4 -translate-y-2/4 text-xl text-red-500 left-0">&#x2022;</span>
                        <div className="absolute right-2 top-2/4 -translate-y-2/4 cursor-pointer">
                            {!showPass ? <FaEyeSlash
                                onClick={() => setShowPass(!showPass)}
                                className="text-red-700" /> : <FaEye
                                onClick={() => setShowPass(!showPass)}
                                className="text-red-700" />}
                        </div>
                    </div>
                </div>
                <div className="text-center mt-9">
                    <button
                        onClick={onSubmit}
                        className="bg-red-500 rounded-md text-white font-medium p-3 w-[200px] md:w-[300px] flex justify-center mx-auto">
                            <ButtonLoader load={loading}>Registration</ButtonLoader>
                        </button>
                </div>
                <p className="text-center font-light my-5">Already have Account Please <span
                    onClick={openSignUpModal}
                    className="font-medium underline text-red-700 cursor-pointer">Login</span></p>
            </div>
        </dialog>
    );
};

export default SignUpModal;