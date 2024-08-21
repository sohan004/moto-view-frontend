import React, { useEffect } from 'react';
import { RouterProvider, useLocation } from 'react-router-dom';
import route from './route';
import Modal from './Modal/Modal';
import { useSelector } from 'react-redux';
import useAutoLogin from './Hooks/useAutoLogin';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';


export const BACKEND_URL = import.meta.env.MODE === 'development' ? 'https://api.motoviewhub.com/api' : 'https://api.motoviewhub.com/api'

const App = () => {

  useAutoLogin();

  return (
    <div id='rootApp' className='bg-[#FAFAFA] h-[100vh] text-gray-800 overflow-x-hidden overflow-y-auto '>

      <Helmet>
        <title>Moto View Hub</title>
        <meta name="description" content={`Welcome to Moto View Hub, your premier destination for all things biking and automotive. We offer a comprehensive range of products, including bikes, car parts, bike accessories, and automotive accessories. Whether you're looking for a new bike, high-quality car components, or essential parts and accessories to enhance your vehicle, we have you covered. At Moto View Hub, we pride ourselves on providing top-notch products from trusted brands, ensuring both quality and variety. Explore our collection and find everything you need to elevate your biking and driving experience with convenience and confidence.`} />
        <link rel="canonical" href={`http://motoviewhub.com`} />
      </Helmet>

      <RouterProvider router={route()}></RouterProvider>

      <Modal />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  );
};

export default App;