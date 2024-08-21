import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPlusCircle } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { MdDashboard, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import img from '../../assets/account/download.jpeg'
import getMediaFile from '../../utilities/getMediaFile';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';
import { setUser } from '../../features/authUser/authUserSlice';
import Loader from '../../components/Loader/Loader';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const Profile = () => {
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const axios = useAxios();
    const dispatch = useDispatch()
    const user = useSelector(state => state?.auth?.user)

    useEffect(() => {
        setName(user?.name || '')
        setAddress(user?.address || '')
        setPhone(user?.phone || '')
    }, [user])

    const onSubmit = async (file) => {
        try {

            const formData = new FormData();
            if (file?.size) {
                if (!file?.type?.includes('image')) return toast.error('Invalid file type')
                formData.append('file', file)
            }
            formData.append('data', JSON.stringify({ name, address, phone }))
            setLoading(true)
            const { data } = await axios.put('/auth/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setLoading(false)
            dispatch(setUser(data.info))
            document.getElementById('profile-edit-modal').close()
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    const clickForgotPassword = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/auth/forgot-password', { email: user?.email })
            document.getElementById('sign-in-modal').close()
            setLoading(false)
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Reset Link Send to your email",
            });
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
            setLoading(false)
        }
    }


    return (
        <div className='max-w-[1280px] mx-auto p-3 md:p-4'>
            <div className="  bg-gray-100 flex items-center justify-center p-4 md:p-8">
                <div className="bg-white shadow-lg  rounded-lg p-6 md:p-12 relative max-w-4xl w-full">
                    <div className='absolute right-4 top-4 flex items-center gap-10'>
                        {user?.role === 'admin' && <NavLink
                            to='/dashboard/brand'
                            className=' flex items-center gap-1 text-red-600 underline  font-medium cursor-pointer'>Admin Dashboard
                            <MdDashboard />
                        </NavLink>}
                        <p
                            onClick={() => document.getElementById('profile-edit-modal').showModal()}
                            className=' flex items-center gap-1 text-red-600 underline  font-medium cursor-pointer'>Edit <MdEdit /></p>
                    </div>
                    <div className="flex mt-8 flex-col md:flex-row items-center md:items-start md:space-x-8">
                        <div className='w-24 h-24 border-2 shadow-lg md:w-36 md:h-36 rounded-full relative'>
                            <img
                                className="w-full h-full absolute rounded-full"
                                src={!user?.avatar?.includes('https') ? getMediaFile(user?.avatar) : user?.avatar}
                                alt="User Profile"
                            />
                            <FaPlusCircle className='absolute right-0 -bottom-2 md:-bottom-0 md:right-2 text-3xl text-red-500 bg-white rounded-full border-2' />
                            <label htmlFor="change-profile" className='absolute top-0 left-0 w-full h-full z-50 cursor-pointer'></label>
                            <input
                                onChange={(e) => onSubmit(e.target.files[0])}
                                type="file" id="change-profile" className='hidden' />
                        </div>
                        <div className="text-center md:text-left mt-4 md:mt-0">
                            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-center md:justify-start text-sm md:text-base">
                                    <FaEnvelope className="text-red-600 mr-2" />
                                    <span className="text-gray-600">{user?.email}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start text-sm md:text-base">
                                    <FaMapMarkerAlt className="text-red-600 mr-2" />
                                    <span className="text-gray-600">{user?.address || 'Not available'}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start text-sm md:text-base">
                                    <FaPhone className="text-red-600 mr-2" />
                                    <span className="text-gray-600">{user?.phone || 'Not available'}</span>
                                </div>
                            </div>
                            {loading ? <Loader /> : <p
                                onClick={clickForgotPassword}
                                className='text-xs mt-7  md:text-sm underline text-red-600 cursor-pointer'>Change Password</p>}
                        </div>
                    </div>
                </div>
            </div>



            <dialog id="profile-edit-modal" className="modal">
                <div className="modal-box bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('profile-edit-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5 mt-5'>
                        <div>
                            <input
                                placeholder='name*'
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='address*'
                                type="text"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='phone*'
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={onSubmit}
                                className="btn btn-sm btn-success text-white">
                                <ButtonLoader load={loading}>Save Changes</ButtonLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Profile;