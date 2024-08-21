import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/WhatsApp_Image_2024-07-11_at_23.34.54_89559706-removebg-preview.png'

const Footer = () => {
    return (
        <footer className={`px-4 divide-y mt-20  text-black bg-white `}>
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
            <div className="lg:w-1/3">
                <div className='flex items-center gap-1'>
                    <img src={logo} className='w-28 md:w-44 ' alt="" /> 
                </div>
            </div>
            <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4 text-gray-600">
                <div className="">
                    <ul className="space-y-2">
                        <li>
                         <Link className='font-medium underline' to='/'>Home</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/blogs'>Blogs</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/contact-us'>Contact</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/filter/bike'>Bikes</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/filter/car'>Cars</Link>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <ul className="space-y-2">
                        <li>
                         <Link className='font-medium underline' to='/most-popular'>Most Popular Bike</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/new-launched'>New Released Bike</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/used'>Used Bike</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/compare'>Compare Bike</Link>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <ul className="space-y-2">
                        <li>
                         <Link className='font-medium underline' to='/category/bike/accessories'>Bike Accessories</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/category/car/accessories'>Car Accessories</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/category/bike/parts'>Bike Parts</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/category/car/parts'>Car Parts</Link>
                        </li>
                    </ul>
                </div>
                <div className="">
                    <ul className="space-y-2">
                        <li>
                         <Link className='font-medium underline' to='/sell'>Sell Used Bike</Link>
                        </li>
                        <li>
                         <Link className='font-medium underline' to='/filter/car'>Latest Car</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        {/* <div className="py-6 text-sm text-center dark:text-gray-400">© 2023 SHIKHO NIO Co. All rights reserved.</div> */}
    </footer>
    );
};

export default Footer;