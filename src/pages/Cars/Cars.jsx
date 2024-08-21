import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import getMediaFile from '../../utilities/getMediaFile';
import PriceFormet from '../../components/PriceFormet/PriceFormet';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const Cars = () => {
    const axios = useAxios()
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [showLoadMore, setShowLoadMore] = useState(true)

    const getCars = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/car?name=${search}&skip=${0}`)
            setCars(data)
            if (data.length < 10) {
                setShowLoadMore(false)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/car?name=${search}&skip=${cars.length}`)
            setCars(prev => [...prev, ...data])
            if (data.length < 10) {
                setShowLoadMore(false)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getCars()
    }, [])

    const onDelete = async (id) => {
        try {
            await axios.delete(`/car/${id}`)
            setCars(prev => prev.filter(b => b._id !== id))
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete bike')
        }
    }



    if (loading) return <Loader />

    return (
        <div>
            <div className='flex gap-2 mb-4 w-full md:w-2/4'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Cars'
                    className='bg-white p-2 w-full rounded border border-gray-300 outline-none focus:border-gray-500'
                    type="text" />
                <button
                    onClick={() => {
                        getCars()
                    }}
                    className="btn btn-success text-white">Search</button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {cars.map((bike, index) => <div key={index} className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
                    <img src={getMediaFile(bike.img)}
                        className='md:w-[80%] w-[90%]  mx-auto '
                        alt="" />
                    <p className='font-bold group-hover:underline text-xs  md:text-base mt-2'>{bike?.name}</p>
                    <p className='mt-1 text-sm md:text-base'>Price: <PriceFormet>
                        {bike?.price}
                    </PriceFormet></p>
                    <p className='mt-1 text-sm md:text-base'>Brand: {bike?.brand}</p>
                    <div className='mt-3 border-t flex justify-center gap-5  text-red-500 md:text-2xl text-xl pt-2'>
                        {/* <FaEdit /> */}
                        <MdDelete
                            onClick={() => onDelete(bike._id)}
                        />
                    </div>
                </div>)}
            </div>
            {showLoadMore && <div className='flex justify-center mt-4'>
                <button
                    onClick={loadMore}
                    className="btn btn-primary text-white">Load More</button>
            </div>}
        </div>
    );
};

export default Cars;