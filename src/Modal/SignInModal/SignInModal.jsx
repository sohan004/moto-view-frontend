import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import img from '../../assets/account/download (2).png'
import useAxios from '../../Hooks/useAxios';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import { setUser } from '../../features/authUser/authUserSlice';
import Swal from 'sweetalert2';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const SignInModal = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const dispatch = useDispatch()
    const axios = useAxios()

    const openSignUpModal = () => {
        document.getElementById('sign-in-modal').close();
        document.getElementById('sign-up-modal').showModal();
    }

    const onGoogleLogin = async ({credential}) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post('/auth/google-login', { credential })
            setLoading(false)
            localStorage.setItem('token', data.token)
            dispatch(setUser(data.info))
            document.getElementById('sign-in-modal').close()
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
            if (!email || !password) {
                setError('Please fill all the fields')
                return
            }
            setError('')
            setLoading(true)
            const { data } = await axios.post('/auth/login', { email, password })
            setLoading(false)
            localStorage.setItem('token', data.token)
            dispatch(setUser(data.info))
            document.getElementById('sign-in-modal').close()
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

    const clickForgotPassword = async () => {
      try {
        if(!email) return setError('Please enter email')
            setError('')
        setLoading(true)
        const {data} = await axios.post('/auth/forgot-password', {email})
        document.getElementById('sign-in-modal').close()
        setLoading(false)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Reset Link Send to your email",
        });
      } catch (error) {
        setError(error?.response?.data?.message || 'Something went wrong')
        console.log(error)
        setLoading(false)
      }

    }

    return (
        <dialog id="sign-in-modal" className="modal">
            <div className="modal-box bg-white relative select-none">
                <span
                    onClick={() => document.getElementById('sign-in-modal').close()}
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
                    {error && <p className="text-red-500 text-center mt-3 mb-3">{error}</p>}
                    <div className="relative">
                        <input type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="email"
                            name='email'
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
                            name='password'
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
                    <div className='flex justify-end mt-1'>
                        <p
                            onClick={clickForgotPassword}
                        className='text-xs md:text-sm underline text-red-600 cursor-pointer'>forgot password</p>
                    </div>
                </div>
                <div className="text-center mt-9">
                    <button
                        onClick={onSubmit}
                        className="bg-red-500 rounded-md text-white font-medium p-3 w-[200px] md:w-[300px] flex justify-center mx-auto">
                        <ButtonLoader load={loading}>Login</ButtonLoader>
                    </button>
                </div>
                <p className="text-center font-light my-5">You have no Account Please <span
                    onClick={openSignUpModal}
                    className="font-medium underline text-red-700 cursor-pointer">Registration</span></p>
            </div>
        </dialog>
    );
};

export default SignInModal;