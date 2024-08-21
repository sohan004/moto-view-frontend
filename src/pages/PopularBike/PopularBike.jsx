import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import CardSkleton from '../../components/CardSkleton/CardSkleton';
import BikeCard from '../../components/BikeCard/BikeCard';

const PopularBike = () => {
    const [loading, setLoading] = useState(true)
    const axios = useAxios()
    const [bikeData, setBikeData] = useState([])
    const [showLoadMore, setShowLoadMore] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/bike/most-popular?skip=${bikeData.length}`)
            if (data.length < 8) setShowLoadMore(false)
            setBikeData(prev => [...prev, ...data])
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4   ">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 ">
                {bikeData.map((bike, index) => <BikeCard key={index} data={bike} path={`/overview/bike/${bike.id}`} />)}
            </div>
            {loading && <CardSkleton loading={loading} />}
            {(showLoadMore && !loading) && <div className='flex justify-center  mt-4'>
                <button
                    onClick={fetchData}
                    className="btn btn-error text-white">Load More</button>
            </div>}
        </div>
    );
};

export default PopularBike;