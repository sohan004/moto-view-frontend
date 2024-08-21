import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import PriceFormet from '../../components/PriceFormet/PriceFormet';
import engine from '../../assets/wants/engine.png';
import useAxios from '../../Hooks/useAxios';
import getMediaFile from '../../utilities/getMediaFile';

const FilterPage = () => {
    const { name } = useParams();
    const axios = useAxios();
    const [activeTab, setActiveTab] = useState('brand');
    const [value, setValue] = useState([80000, 600000]);
    const [maxValue, setMaxValue] = useState(value[1]);
    const [brand, setBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const bikeDisplacement = [
        125,
        250,
        400,
        750,
        1000,
        1300,
        2500
    ]

    const carDisplacement = [
        1000,   // Small cars, e.g., city cars
        1500,   // Subcompact cars
        2000,   // Compact cars
        2500,   // Mid-size cars
        3000,   // Full-size cars
        4000,   // Performance and luxury cars
        6000    // High-performance sports cars and supercars
    ]

    const displacement = name === 'bike' ? bikeDisplacement : carDisplacement;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setBrand([])
                setCategory([])
                const query = await Array.isArray(location?.state) ? location?.state.map(s => `${s.key}=${s.value}&`).join('') : '';
                setLoading(true)
                const { data } = await axios.get(`/filter/${name}?${query}`)
                setLoading(false)
                setBrand(data?.totalBrand)
                setValue([data?.minPrice, data?.maxPrice + 50000])
                setMaxValue(data?.maxPrice + 100000)
                setCategory(data?.totalCategory)
            } catch (error) {
                console.log(error)
                setLoading(false)
                navigate('/');
            }
        }
        fetchData();
    }, [name]);

    const getActiveTab = (tab) => {
        return activeTab === tab ? 'border-red-500 ' : '';
    }



    const onClick = (type, data) => {
        let query = Array.isArray(location?.state) ? location?.state  : []
        if (type === 'brand') {
            navigate(`/${name}/${data.name}`, { state: query })
        }
        else if (type === 'budget') {
            query.push({ key: 'min', value: value[0] })
            query.push({ key: 'max', value: value[1] })
            navigate(`/search/${name}`, { state: query })
        }
        else if (type === 'cc') {
             query.push({ key: 'displacement', value: data.name })
            navigate(`/search/${name}`, { state: query })
        }
        else if (type === 'style') {
            query.push({ key: 'category', value: data._id })
            navigate(`/search/${name}`, { state: query })
        }
    }




    return (
        <div className='max-w-[1280px] mx-auto p-3 md:p-4'>
            {(name === 'bike' || name === 'car') && <p className='text-center capitalize font-bold text-lg md:text-2xl '>Choose {name + 's'} By</p>}
            <div className='bg-white border border-gray-100 mt-3 md:mt-4'>
                <div className='flex w-full justify-between items-center'>
                    <p
                        onClick={() => setActiveTab('brand')}
                        className={`font-semibold text-center w-full hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('brand')}`}>Brand</p>
                    <p
                        onClick={() => setActiveTab('budget')}
                        className={`font-semibold text-center w-full hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('budget')}`}>Budget</p>
                    {(name === 'bike' || name === 'car') && <p
                        onClick={() => setActiveTab('cc')}
                        className={`font-semibold text-center w-full hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('cc')}`}>CC</p>}
                    {(name === 'bike' || name === 'car') && <p
                        onClick={() => setActiveTab('style')}
                        className={`font-semibold text-center w-full hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('style')}`}>Body Style</p>}
                </div>

                <div className='px-3 md:px-4 py-7 md:py-10'>

                    {loading && <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {new Array(8).fill(1).map((b, i) => <div
                            className='w-full h-20 bg-gray-200 animate-pulse rounded-md'
                            key={i}></div>)}
                    </div>}

                    {getActiveTab('brand') && <div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {brand.map((b, i) => (
                                <div
                                    onClick={() => onClick('brand', b)}
                                    key={i} className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                                    <img
                                        className='w-20 h-20 block mx-auto'
                                        src={getMediaFile(b.img)}
                                        alt={b.name}
                                    />
                                    <p className='text-lg md:text-xl text-center font-medium mt-2 flex justify-center capitalize gap-2'>{b.name}
                                        <span className=' text-gray-600 text-base '>({b?.total})</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>}

                    {getActiveTab('budget') && <div>
                        <div className='flex items-center justify-center text-xl md:text-2xl font-medium gap-3'>
                            <p><PriceFormet>{value[0]}</PriceFormet> BDT</p>
                            <p>-</p>
                            <p><PriceFormet>{value[1]}</PriceFormet> BDT</p>
                        </div>
                        <RangeSlider id="range-slider-yellow" className='bg-slate-500 md:max-w-[70%] mx-auto mt-7' min={1} max={maxValue} value={value} onInput={setValue} />
                        <div className='text-center mt-10'>
                            <button
                                onClick={() => onClick('budget')}
                                className='btn bg-red-500 text-white border-none'><FaSearch /> Search</button>
                        </div>
                    </div>}

                    {getActiveTab('cc') && <div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {displacement.map((b, i) => (
                                <div
                                    onClick={() => onClick('cc', { name: b })}
                                    key={i} className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                                    <img
                                        className='w-20  block mx-auto'
                                        src={engine}
                                    />
                                    <p className='text-lg md:text-xl text-center font-medium mt-2 flex justify-center gap-2'>Under {b} cc
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>}

                    {getActiveTab('style') && <div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {category.map((b, i) => (
                                <div
                                    onClick={() => onClick('style', b)}
                                    key={i} className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                                    <img
                                        className='w-20 h-20 block mx-auto'
                                        src={getMediaFile(b.img)}
                                        alt={b.name}
                                    />
                                    <p className='text-lg md:text-xl text-center font-medium mt-2 flex justify-center gap-2'>{b.name}
                                        <span className=' text-gray-600 text-base '>({b?.total})</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>}


                </div>
            </div>
        </div>
    );
};

export default FilterPage;