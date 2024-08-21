import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';
import CardSkleton from '../CardSkleton/CardSkleton';
import BikeCard from '../BikeCard/BikeCard';
import { Link } from 'react-router-dom';

const NewRelease = () => {
    const [loading, setLoading] = useState(true)
    const axios = useAxios()
    const [bikeData, setBikeData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/bike/new-launch`)
                setBikeData(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        fetchData()
    }, [])



    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4 mt-8 md:mt-16  shadow-md  bg-gray-100">
            <h1 className="font-extrabold text-red-600 sh text-2xl md:text-4xl text-center mb-4 md:mb-6">New Launched Bike</h1>
            {loading && <CardSkleton/>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 ">
                {bikeData.map((bike, index) => <BikeCard key={index} data={bike} path={`/overview/bike/${bike.id}`} />)}
            </div>
            <div className='flex justify-end mt-4'>
            <Link  to='/new-launched' className='font-medium cursor-pointer text-red-500 flex items-center gap-2'>Show More
                    <FaArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default NewRelease;