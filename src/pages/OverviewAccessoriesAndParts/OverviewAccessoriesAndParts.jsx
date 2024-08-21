import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PriceFormet from '../../components/PriceFormet/PriceFormet';
import { TbEngine } from 'react-icons/tb';
import { MdOutlineElectricBolt, MdOutlineElectricMeter, MdOutlineElectricMoped } from 'react-icons/md';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { GiTyre } from 'react-icons/gi';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import getMediaFile from '../../utilities/getMediaFile';
import useGetReview from '../../Hooks/useGetReview';
import AddReviewModal from '../../Modal/AddReviewModal/AddReviewModal';
import Rating from 'react-rating';
import { FaRegStar, FaShoppingCart, FaStar } from 'react-icons/fa';
import BikeOverviewSklaton from '../../components/BikeOverviewSklaton/BikeOverviewSklaton';

const OverviewAccessoriesAndParts = () => {
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
                const { data } = await axios.get(`/${type}/${id}`)
                setLoading(false)
                setData(data)
            } catch (error) {
                console.log(error)
                navigate('/');
            }
        }
        fetchData();
    }, [id])



    const getValue = (key) => {
        const split = key.split('.');
        let value = 'N/A';
        split.forEach((s, i) => {
            value = i === 0 ? (data[s] || 'N/A') : (value[s] || 'N/A')
        })
        return value || 'N/A';
    }

    const capitalizeType = (type) => type === 'accessories' ? 'Accessories' : 'Parts'

    if (loading) return <BikeOverviewSklaton />



    return (
        <div className='max-w-[1280px] mx-auto '>
            <div className='bg-white border border-gray-100 md:py-5 '>

                <div className='flex flex-col md:flex-row p-3 md:p-4 gap-3 md:gap-6'>
                    <div className='md:w-[40%] w-full'>
                        <img
                            className='w-full'
                            src={getMediaFile(data?.img)} alt="" />
                    </div>
                    <div className='md:w-[60%] w-full'>
                        <h2 className='font-medium text-2xl md:text-3xl'>{getValue('name')}</h2>
                        <h3 className='font-bold text-xl md:text-2xl mt-1 md:mt-2 text-red-600'>Price: <PriceFormet>{getValue('price')}</PriceFormet> BDT</h3>
                        <p className='text-gray-500 text-sm md:text-base mt-1 md:mt-2'>Brand: <span className='text-black capitalize'>{getValue('brand')}</span></p>
                        {/* <div>
                            <p className="whitespace-pre-wrap break-all  text-sm md:text-base">{getValue('description')}</p>
                        </div> */}
                        <Link to='/contact-us'>
                            <button
                                className="btn btn-error text-white mt-6">Buy Now</button>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center w-full overflow-x-auto mt-5'>
                    <p
                        onClick={() => setActiveTab('Description')}
                        className={`font-semibold text-center hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Description')}`}>Description</p>
                    <p
                        onClick={() => setActiveTab('Reviews')}
                        className={`font-semibold text-center hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Reviews')}`}>Reviews</p>
                </div>


                <div className='px-3 md:px-4 py-5 md:py-7'>


                    {getActiveTab('Description') && <div>
                        <p className="whitespace-pre-wrap break-all  text-sm md:text-base">{getValue('description')}</p>
                    </div>}

                    {getActiveTab('Reviews') && <div>
                        <AddReviewModal id={data?._id} model={
                            capitalizeType(type)
                        }></AddReviewModal>
                        <button
                            onClick={() => document.getElementById('review-modal').showModal()}
                            className="btn btn-sm btn-primary">ADD A REVIEW</button>
                        <div className='grid gap-5 mt-5'>
                            {reviews.map((r, i) => <div key={i} className='border-b pb-4'>
                                <Rating
                                    className='text-yellow-600 md:text-lg'
                                    emptySymbol={<FaRegStar />}
                                    fullSymbol={<FaStar />}
                                    initialRating={r.rating}
                                    readonly
                                />
                                <p className='text-xs md:text-sm my-2'>by | <span className='text-red-700 font-medium'>{r?.user?.name}</span></p>
                                <p className='text-base md:text-lg  text-gray-600'>{r?.review}</p>
                            </div>)}
                        </div>
                    </div>}


                </div>
            </div>
        </div >
    );
};

export default OverviewAccessoriesAndParts;