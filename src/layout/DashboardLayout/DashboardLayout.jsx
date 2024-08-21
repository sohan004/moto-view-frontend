import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { MdBrandingWatermark, MdDashboard, MdMotionPhotosPaused, MdNoteAlt, MdOutlineCategory } from 'react-icons/md';
import { IoCartSharp, IoAddCircleSharp, IoNotificationsSharp, IoHome } from 'react-icons/io5';
import { RiMotorbikeFill, RiShoppingBag2Fill } from 'react-icons/ri';
import { FaUser, FaCarSide, FaAlignLeft, FaBoxes, FaCogs, FaPhoneAlt } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { PiSubtractSquareFill, PiSubtractFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { IoMdAddCircle } from 'react-icons/io';

const DashboardLayout = () => {
    const [showLeftSideBar, setShowLeftSideBar] = useState(true)
    const dispatch = useDispatch()

    const menuData = [
        {
            name: 'Dashboard',
            icon: MdDashboard,
            path: '/dashboard/home'
        },
        {
            name: 'Brand',
            icon: MdBrandingWatermark,
            path: '/dashboard/brand'
        },
        {
            name: 'Category',
            icon: MdOutlineCategory,
            path: '/dashboard/category'
        },
        {
            name: 'Add Bike',
            icon: IoMdAddCircle,
            path: '/dashboard/add-bike'
        },
        {
            name: 'Bikes',
            icon: RiMotorbikeFill,
            path: '/dashboard/bikes'
        },
        {
            name: 'Add Car',
            icon: IoMdAddCircle,
            path: '/dashboard/add-car'
        },
        {
            name: 'Cars',
            icon: FaCarSide,
            path: '/dashboard/cars'
        },
        {
            name: 'Accessories',
            icon: FaCogs,
            path: '/dashboard/accessories'
        },
        {
            name: 'Parts',
            icon: FaBoxes,
            path: '/dashboard/parts'
        },
        {
            name: 'Blogs',
            icon: MdNoteAlt,
            path: '/dashboard/blogs'
        },
        {
            name: 'Contact',
            icon: FaPhoneAlt,
            path: '/dashboard/contact'
        },
        {
            name: 'Used Bike',
            icon: MdMotionPhotosPaused,
            path: '/dashboard/used'
        },
    ]



    const clickSideBar = () => {
        const width = window.innerWidth
        if (width < 768) setShowLeftSideBar(true)
    }

    return (
        <div>
            <div className='w-full flex items-start '>

                <div onClick={() => setShowLeftSideBar(prev => !prev)} className={`fixed top-0 block md:hidden left-0 w-full h-full bg-black opacity-50 z-[50] backdrop-blur-md ${showLeftSideBar ? 'hidden' : 'block'}`}></div>

                <div
                    onClick={clickSideBar}
                    id="sidebar" className={`h-screen bg-[#1C2434] fixed md:sticky top-0 duration-500 w-[280px] overflow-y-auto  overflow-hidden  z-50 md:z-10 ${showLeftSideBar ? 'md:ml-0 -ml-[280px]' : 'ml-[0] md:-ml-[280px]'}  p-5 md:p-4`}>
                    <div className="  grid grid-cols-1 gap-5">
                        {menuData.map((item, index) => <NavLink

                            to={item.path} key={index} className={({ isActive }) => `flex items-center  p-3 rounded-md cursor-pointer gap-3 text-sm font-medium text-gray-200 ${isActive ? 'bg-slate-600' : ''}`}><item.icon className="text-2xl" /> {item.name}</NavLink>)}
                    </div>
                </div>

                {/* main page */}
                <div className="flex-1 relative">
                    <div className="flex flex-col h-screen absolute top-0 left-0 w-full ">
                        <div className=" bg-white border-b p-4 flex items-center justify-between shadow relative">
                            <FaAlignLeft onClick={() => setShowLeftSideBar(!showLeftSideBar)} className=" text-xl cursor-pointer" />
                            <div className="flex items-center gap-4 ">
                                <Link to='/' className=' text-gray-800 font-medium text-xs md:text-sm flex items-center gap-2'>
                                    <IoHome size={20} />
                                    Back To Home
                                </Link>
                            </div>
                        </div>
                        <div className="p-2 md:p-7 flex-1 overflow-y-auto bg-[#F1F5F9] ">
                            <div>
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;