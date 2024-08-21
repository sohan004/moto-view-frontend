import React, { useEffect, useState } from 'react';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import { FaCarSide, FaCogs, FaRegNewspaper, FaSearch } from 'react-icons/fa';
import { IoMdHome } from 'react-icons/io';
import { MdCompare, MdDashboard, MdLogout, MdMotionPhotosPaused, MdOutlineSell } from 'react-icons/md';
import { RiMotorbikeFill } from 'react-icons/ri';
import { SiWpengine } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import userImg from '../../assets/account/download.jpeg'
import { setUser } from '../../features/authUser/authUserSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import getMediaFile from '../../utilities/getMediaFile';
import { TiContacts } from 'react-icons/ti';
import logo from '../../assets/logo/WhatsApp_Image_2024-07-11_at_23.34.54_89559706-removebg-preview.png'

const Nav = () => {

    const [showSideNav, setShowSideNav] = useState(false)
    const [selectTab, setSelectTab] = useState('bike')
    const [search, setSearch] = useState('')
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const navLink = [
        {
            name: 'Home',
            link: '/',
            icon: <IoMdHome
                size={20}
            />
        },
        {
            name: 'Bikes',
            link: '/filter/bike',
            icon: <RiMotorbikeFill
                size={20}
            />
        },
        {
            name: 'Cars',
            link: '/filter/car',
            icon: <FaCarSide
                size={20}
            />
        },
        {
            name: 'Accessories',
            link: 'category/bike/accessories',
            icon: <FaCogs
                size={20}
            />
        },
        {
            name: 'Parts',
            link: '/category/bike/parts',
            icon: <SiWpengine
                size={20}
            />
        },
        {
            name: 'Used',
            link: '/used',
            icon: <MdMotionPhotosPaused
                size={20}
            />
        },
        {
            name: 'Sell',
            link: '/sell',
            icon: <MdOutlineSell
                size={20}
            />
        },
        {
            name: 'Compare',
            link: '/compare',
            icon: <MdCompare
                size={20}
            />
        },
        {
            name: 'Blogs',
            link: '/blogs',
            icon: <FaRegNewspaper
                size={20}
            />
        },
        {
            name: 'Contact',
            link: '/contact-us',
            icon: <TiContacts
                size={20}
            />
        }
    ]

    const signOut = () => {
        localStorage.removeItem('token')
        dispatch(setUser(null))
    }

    const onEnterSearch = (e) => {
        e.preventDefault()
        navigate(`/search/${selectTab}/${search}`)
        // input blur
        e.target[0].blur()
    }

    const clickSideBar = () => {
        const width = window.innerWidth
        if (width < 768) setShowSideNav(false)
    }


    const signUp = user ?
        <div className='flex items-center gap-2 md:gap-4 flex-col md:flex-row'>
            <div
                onClick={() => navigate('/profile')}
                className='flex  flex-col md:flex-row items-center gap-1 cursor-pointer'>
                <img className='w-9 h-9 border shadow-md  rounded-full' src={!user?.avatar?.includes('https') ? getMediaFile(user?.avatar) : user?.avatar} alt="" />
                <p className='text-sm font-medium'>{user?.name}</p>
            </div>
            <p
                onClick={signOut}
                className='flex items-center gap-1 text-red-500 cursor-pointer'>
                <span className=' font-bold '>Logout</span>
                <MdLogout
                    size={20}
                />
            </p>
        </div>
        : <div>
            <p
                onClick={() => document.getElementById('sign-in-modal').showModal()}
                className='font-medium hover:underline flex text-sm cursor-pointer  items-center gap-1'>
                <CiUser
                    size={30}
                />
                <span className=''>Login / Register</span>
            </p>
        </div>


    return (
        <div>
            <div className='border-b md:pb-2'>
                <div className='flex max-w-[1280px] mx-auto  items-center justify-between p-3 md:p-4 gap-3 md:gap-7'>

                    <Link to='/'>
                        <img
                            className='w-28 hidden md:block '
                            src={logo} alt="" />
                    </Link>

                    <label className=" swap swap-rotate md:hidden text-gray-500">
                        <input
                            checked={showSideNav}
                            onClick={() => setShowSideNav(!showSideNav)}
                            type="checkbox" />
                        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>

                    <div className='flex-1 overflow-y-auto border flex items-center  overflow-hidden rounded-full shadow ps-2 md:ps-4'>
                        <FaSearch
                            className='text-gray-500 md:text-xl '
                        />
                        <form className='flex-1' onSubmit={onEnterSearch}>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder='Search for Bikes or Cars or accessories...'
                                className='outline-none flex-1 w-full border-none bg-transparent px-2 md:px-4'
                                type="text" name="" id="" />
                        </form>
                        <div className='bg-red-500 px-1 md:px-3'>
                            <select
                                value={selectTab}
                                onChange={(e) => setSelectTab(e.target.value)}
                                className='outline-none text-white py-2 bg-transparent  w-16 '>
                                <option className='text-black p-2' value="bike">Bike</option>
                                <option className='text-black p-2' value="car">Car</option>
                                <option className='text-black p-2' value="accessories">Accessories</option>
                                <option className='text-black p-2' value="parts">Parts</option>
                            </select>
                        </div>
                    </div>

                    <div className='hidden md:block'>
                        {signUp}
                    </div>
                </div>
            </div>

            <div className='hidden md:flex max-w-[1280px] mx-auto  items-center justify-between px-3 py-2 md:px-4 gap-3  font-medium uppercase  text-xs lg:text-sm overflow-x-auto'>
                {navLink.map((link, index) => <NavLink
                    to={link.link}
                    key={index}
                    className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-red-600' : 'text-gray-600'} cursor-pointer `}>
                    {link.icon}
                    <span>{link.name}</span>
                </NavLink>)}

            </div>





            {showSideNav && <div
                onClick={() => setShowSideNav(false)}
                className=' fixed md:hidden block z-40 top-0 left-0  w-full h-full bg-black bg-opacity-30'>
            </div>}

            <div
                onClick={clickSideBar}
                className={`fixed top-0 z-[9999]  h-full w-[65%] md:hidden flex flex-col items-start p-3 md:p-4 duration-500 transition-all bg-white ${showSideNav ? 'left-0' : '-left-[100%]'}`}>
               <Link className='w-32 mx-auto max-w-full' to='/'>
               <img
                    className='w-full'
                    src={logo} alt="" />
               </Link>

                <div className="flex-1">
                    <div className='flex flex-col items-start  mx-auto  mt-7 justify-between ps-2 gap-8 font-medium uppercase  text-xs lg:text-sm'>
                        {navLink.map((link, index) => <NavLink
                            to={link.link}
                            key={index}
                            className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'text-red-600' : 'text-gray-600'} cursor-pointer `}>
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>)}
                    </div>
                </div>

                <div className='flex justify-center w-full'>
                    {signUp}
                </div>
            </div>
        </div>
    );
};

export default Nav;