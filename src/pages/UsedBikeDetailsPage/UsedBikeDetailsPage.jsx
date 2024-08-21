import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PriceFormet from '../../components/PriceFormet/PriceFormet';
import { TbEngine } from 'react-icons/tb';
import { MdEmail, MdOutlineElectricBolt, MdOutlineElectricMeter, MdOutlineElectricMoped } from 'react-icons/md';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { GiTyre } from 'react-icons/gi';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import getMediaFile from '../../utilities/getMediaFile';
import useGetReview from '../../Hooks/useGetReview';
import AddReviewModal from '../../Modal/AddReviewModal/AddReviewModal';
import Rating from 'react-rating';
import { FaPhone, FaRegStar, FaShoppingCart, FaStar, FaUser } from 'react-icons/fa';
import BikeOverviewSklaton from '../../components/BikeOverviewSklaton/BikeOverviewSklaton';
import { FaLocationDot } from 'react-icons/fa6';

const UsedBikeDetailsPage = () => {
    const { id, type } = useParams();
    const [activeTab, setActiveTab] = useState('Description');
    const [data, setData] = useState({})
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const axios = useAxios();
    const [reviews, setReviews] = useGetReview(data?._id)



    const getActiveTab = (tab) => {
        return activeTab === tab ? 'border-red-500 ' : '';
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data: { data } } = await axios.get(`/used/${id}`)
                setLoading(false)
                setData(data)
            } catch (error) {
                console.log(error)
                // navigate('/');
            }
        }
        fetchData();
    }, [id])






    if (loading) return <BikeOverviewSklaton />



    return (
        <div className='max-w-[1280px] mx-auto '>
            <div className='bg-white border border-gray-100 md:py-5 '>

                <div className='flex flex-col md:flex-row p-3 md:p-4 gap-3 md:gap-6'>
                    <div className='md:w-[40%] w-full'>
                        <img
                            className='w-full'
                            src={getMediaFile(data?.product_img)} alt="" />
                    </div>
                    <div className='md:w-[60%] w-full'>
                        <h2 className='font-medium text-2xl md:text-3xl'>{data?.product_name}</h2>
                        <h3 className='font-bold text-xl md:text-2xl mt-1 md:mt-2 text-red-600'>Price: <PriceFormet>{data?.product_price}</PriceFormet> BDT</h3>

                        <div className='mt-8 border rounded border-red-300'>
                            <p className='flex p-4 border-red-300 border-b items-center gap-3'>
                                <FaUser className='text-red-600' />
                                {data?.name}
                            </p>

                            <p className='flex p-4 border-red-300 border-b items-center gap-3'>
                                <MdEmail className='text-red-600' />
                                {data?.email}
                            </p>

                            <p className='flex p-4 border-red-300 border-b items-center gap-3'>
                                <FaPhone className='text-red-600' />
                                {data?.phone}
                            </p>

                            <p className='flex p-4  items-center gap-3'>
                                <FaLocationDot className='text-red-600' />
                                {data?.address}
                            </p>

                        </div>

                    </div>
                </div>

                <div className='flex items-center w-full overflow-x-auto mt-5'>
                    <p
                        onClick={() => setActiveTab('Description')}
                        className={`font-semibold text-left hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Description')}`}>Description</p>

                </div>


                <div className='px-3 md:px-4 py-5 md:py-7'>


                    {getActiveTab('Description') && <div>
                        <p className="whitespace-pre-wrap break-all  text-sm md:text-base">{data?.product_description}</p>
                    </div>}




                </div>
            </div>
        </div >
    );
};

export default UsedBikeDetailsPage;