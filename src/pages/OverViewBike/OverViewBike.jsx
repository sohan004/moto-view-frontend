import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import PriceFormet from '../../components/PriceFormet/PriceFormet';
import { TbEngine } from 'react-icons/tb';
import { MdOutlineElectricBolt, MdOutlineElectricMeter, MdOutlineElectricMoped } from 'react-icons/md';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { GiTyre } from 'react-icons/gi';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import { brakeFields, chassisAndSuspensionFields, dimensionsFields, electricalsFields, featuresFields, mileageAndTopSpeedFields, transmissionFields, wheelAndTyreFields } from '../AddBike/constant/constant';
import getMediaFile from '../../utilities/getMediaFile';
import useGetReview from '../../Hooks/useGetReview';
import AddReviewModal from '../../Modal/AddReviewModal/AddReviewModal';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';
import BikeOverviewSklaton from '../../components/BikeOverviewSklaton/BikeOverviewSklaton';
import { Helmet } from 'react-helmet';

const OverViewBike = () => {
    const { id } = useParams();
    const { data: bike } = useLoaderData();
    const href = window.location.href;
    const [activeTab, setActiveTab] = useState('Specification');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const axios = useAxios();
    const [reviews, setReviews] = useGetReview(bike?._id)




    const getActiveTab = (tab) => {
        return activeTab === tab ? 'border-red-500 ' : '';
    }

    const engineFelids = [
        {
            name: 'engine_type',
            type: 'text',
            placeholder: 'Engine Type'
        },
        {
            name: 'displacement',
            type: 'number',
            placeholder: 'Displacement (cc)',
            holder: 'CC'
        },
        {
            name: 'maximum_power',
            type: 'number',
            placeholder: 'Maximum Power (BHP)',
            required: true,
        },
        {
            name: 'maximum_torque',
            type: 'number',
            placeholder: 'Maximum Torque (Nm)',
            required: true,
        },
        {
            name: 'bore',
            type: 'number',
            placeholder: 'Bore (mm)',
            holder: 'mm',
        },
        {
            name: 'stroke',
            type: 'number',
            placeholder: 'Stroke (mm)',
            holder: 'mm',
        },
        {
            name: 'compression_ratio',
            type: 'number',
            placeholder: 'Compression Ratio'
        },
        {
            name: 'valves',
            type: 'number',
            placeholder: 'Number of Valves'
        },
        {
            name: 'fuel_supply',
            type: 'text',
            placeholder: 'Fuel Supply'
        },
        {
            name: 'no_of_cylinders',
            type: 'number',
            placeholder: 'Number of Cylinders'
        },
        {
            name: 'engine_cooling',
            type: 'text',
            placeholder: 'Engine Cooling'
        },
        {
            name: 'starting_method',
            type: 'text',
            placeholder: 'Starting Method'
        }
    ];

    const specification = [
        {
            name: 'Engine',
            field: engineFelids
        },
        {
            name: 'Transmission',
            field: transmissionFields
        },
        {
            name: 'Mileage And Top Speed',
            field: mileageAndTopSpeedFields
        },
        {
            name: 'Chassis And Suspension',
            field: chassisAndSuspensionFields
        },
        {
            name: 'Break',
            field: brakeFields
        },
        {
            name: 'Wheel And Tyre',
            field: wheelAndTyreFields
        },
        {
            name: 'Dimensions',
            field: dimensionsFields
        },
        {
            name: 'Electricals',
            field: electricalsFields
        },
        {
            name: 'Features',
            field: featuresFields
        },
    ]


    const getValue = (key) => {
        const split = key.split('.');
        let value = 'N/A';
        split.forEach((s, i) => {
            value = i === 0 ? (bike[s] || 'N/A') : (value[s] || 'N/A')
        })
        return value || 'N/A';
    }


    return (
        <div className='max-w-[1280px] mx-auto '>
            <Helmet>
                <title>{bike.name} - Moto View Hub</title>
                <meta name="description" content={bike.description} />
                <link rel="canonical" href={href} />
            </Helmet>

            <div className='bg-white border border-gray-100 md:py-5 '>

                <div className='flex flex-col md:flex-row p-3 md:p-4 gap-3 md:gap-6'>
                    <div className='md:w-[40%] w-full'>
                        <img
                            className='w-full'
                            src={getMediaFile(bike?.img)} alt="" />
                    </div>
                    <div className='md:w-[60%] w-full'>
                        <h2 className='font-medium text-2xl md:text-3xl'>{getValue('name')}</h2>
                        <h3 className='font-bold text-xl md:text-2xl mt-1 md:mt-2 text-red-600'>Price: <PriceFormet>{getValue('price')}</PriceFormet> BDT</h3>
                        <p className='text-gray-500 text-sm md:text-base mt-1 md:mt-2'>Brand: <span className='text-black capitalize'>{getValue('brand')}</span></p>
                        <div className='grid grid-cols-3 gap-5 md:gap-7 mt-5 md:mt-7 '>
                            <div className='flex justify-start'>
                                <div className='flex flex-col items-center text-gray-500'>
                                    <TbEngine
                                        className='text-2xl'
                                    />
                                    <p className='text-xs md:text-sm mt-1'>Engine</p>
                                    <p className='text-black text-xs md:text-sm font-medium'>{getValue('specification.engine.displacement')} CC</p>
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <div className='flex flex-col items-center text-gray-500'>
                                    <MdOutlineElectricBolt
                                        className='text-2xl'
                                    />
                                    <p className='text-xs md:text-sm mt-1'>Power</p>
                                    <p className='text-black text-xs md:text-sm font-medium'>{getValue('specification.engine.maximum_power')}</p>
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <div className='flex flex-col items-center text-gray-500'>
                                    <MdOutlineElectricMoped
                                        className='text-2xl'
                                    />
                                    <p className='text-xs md:text-sm mt-1'>Torque</p>
                                    <p className='text-black text-xs md:text-sm font-medium'>{getValue('specification.engine.maximum_torque')}</p>
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <div className='flex flex-col items-center text-gray-500'>
                                    <IoSpeedometerOutline
                                        className='text-2xl'
                                    />
                                    <p className='text-xs md:text-sm mt-1'>Mileage</p>
                                    <p className='text-black text-xs md:text-sm font-medium'>{getValue('specification.mileage_and_top_speed.mileage')} KMPL</p>
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <div className='flex flex-col items-center text-gray-500'>
                                    <MdOutlineElectricMeter
                                        className='text-2xl'
                                    />
                                    <p className='text-xs md:text-sm mt-1'>Brakes</p>
                                    <p className='text-black text-xs md:text-sm font-medium'>{getValue('specification.break.braking_system')}</p>
                                </div>
                            </div>
                            <div className='flex justify-start'>
                                <div className='flex flex-col items-center text-gray-500'>
                                    <GiTyre
                                        className='text-2xl'
                                    />
                                    <p className='text-xs md:text-sm mt-1'>Tyre Type</p>
                                    <p className='text-black text-xs md:text-sm font-medium'>{getValue('specification.wheel_and_tyre.tyre_type')}</p>
                                </div>
                            </div>
                        </div>
                        <Link to='/contact-us'>
                            <button
                                className="btn btn-error text-white mt-6">Buy Now</button>
                        </Link>
                    </div>
                </div>

                <div className='flex items-center w-full overflow-x-auto mt-5'>
                    <p
                        onClick={() => setActiveTab('Specification')}
                        className={`font-semibold text-center hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Specification')}`}>Specification</p>
                    <p
                        onClick={() => setActiveTab('Color')}
                        className={`font-semibold text-center hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Color')}`}>Color</p>
                    <p
                        onClick={() => setActiveTab('Description')}
                        className={`font-semibold text-center hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Description')}`}>Description</p>
                    <p
                        onClick={() => setActiveTab('Reviews')}
                        className={`font-semibold text-center hover:border-red-500 border-b-2 py-2 px-3 flex-1 text-xs cursor-pointer md:text-sm ${getActiveTab('Reviews')}`}>Reviews</p>
                </div>


                <div className='px-3 md:px-4 py-5 md:py-7'>

                    {getActiveTab('Specification') && <div>
                        <div className='grid gap-7'>
                            {specification.map((spec, i) => <div key={i}>
                                <h3 className='font-semibold bg-gray-200  md:text-lg mb-4 p-2'>{spec.name}</h3>
                                <div className='grid grid-cols-1  gap-5 md:gap-7'>
                                    {spec.field.map((field, i) => (
                                        <div className='flex items-center gap-2' key={i}>
                                            <p className='text-gray-500 text-sm md:text-base capitalize w-2/4'>{field.name.split('_').join(' ')}</p>
                                            <p className='text-black text-sm md:text-base font-semibold w-2/4'>{getValue(`specification.${spec.name.split(' ').join('_').toLocaleLowerCase()}.${field.name}`)} {field?.holder}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>)}
                        </div>
                    </div>}


                    {getActiveTab('Color') && <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 ">
                            {bike?.color && bike.color.map((c, i) => (
                                <div key={i} className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
                                    <img src={getMediaFile(c.img)}
                                        className='md:w-[80%] h-[110px] md:h-[170px] object-scale-down w-[90%]  mx-auto '
                                        alt="" />
                                    <p className='font-bold text-center  text-sm  md:text-base mt-2'>{c.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>}

                    {getActiveTab('Description') && <div>
                        <p className="whitespace-pre-wrap break-all  text-sm md:text-base">{getValue('description')}</p>
                    </div>}

                    {getActiveTab('Reviews') && <div>
                        <AddReviewModal id={bike?._id} model="Bike"></AddReviewModal>
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

export default OverViewBike;