import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const axios = useAxios()
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.post(`/auth/forgot-password-token-verify/${id}`)
                setLoading(false)
            } catch (error) {
                window.location.href = '/'
            }
        }
        fetchData()
    }, [id])

    const onSubmit = async () => {
        try {
            if(!password || !confirmPassword) return toast.error('Please fill all the fields')
             if(password !== confirmPassword){
                 return toast.error('Password not match')
             }
            setLoading(true)
            const { data } = await axios.post(`/auth/change-password/${id}`, { password })
            setLoading(false)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Password Reset Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Something went wrong')
        }
    }
    

    if (loading) return <Loader />


    return (
        <div className='mt-5 md:mt-10'>
            <div className='max-w-[400px] mx-auto p-4 rounded-md border border-gray'>
                <div className="relative">
                    <input type={showPass ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="new password"
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
                <div className="relative mt-5">
                    <input type={showPass2 ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        placeholder="confirm new password"
                        className="outline-none border-b-2 w-full bg-transparent p-2 px-4 
                    border-red-400" />
                    <span className="absolute top-2/4 -translate-y-2/4 text-xl text-red-500 left-0">&#x2022;</span>
                    <div className="absolute right-2 top-2/4 -translate-y-2/4 cursor-pointer">
                        {!showPass2 ? <FaEyeSlash
                            onClick={() => setShowPass2(!showPass2)}
                            className="text-red-700" /> : <FaEye
                            onClick={() => setShowPass2(!showPass2)}
                            className="text-red-700" />}
                    </div>
                </div>
                <div className="text-center mt-9">
                    <button
                        onClick={onSubmit}
                        className="bg-red-500 rounded-md text-white font-medium p-3 w-[200px] md:w-[200px] flex justify-center mx-auto">
                        <ButtonLoader load={loading}>Change Password</ButtonLoader>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;