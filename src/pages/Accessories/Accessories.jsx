import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import { set } from 'firebase/database';
import getMediaFile from '../../utilities/getMediaFile';

const Accessories = () => {
    const { type, name } = useParams();
    const navigate = useNavigate();
    const axios = useAxios()
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                setCategory([])
                setLoading(true)
                const { data } = await axios.get(`/${name}/category/${type}`)
                setCategory(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error)
                navigate('/')
            }
        }
        fetchDatas()
    }, [type, name]);

    const onClick = (b) => {
        navigate(`/filter/${name}`, {
            state: [{
                key: 'category',
                value: b._id
            },
            {
                key: 'type',
                value: type
            }
            ]
        })
    }


    return (
        <div className='max-w-[1280px] mx-auto p-3 md:p-4'>
            <p className='text-center capitalize font-bold text-lg md:text-2xl'>Choose {type} {name} Category</p>

            <div className='bg-white border border-gray-100 mt-3 md:mt-4'>

                {loading && <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
                    {new Array(8).fill(1).map((b, i) => <div
                        className='w-full h-20 bg-gray-200 animate-pulse rounded-md'
                        key={i}></div>)}
                </div>}
                <div className='px-3 md:px-4 py-7 md:py-10'>

                    <div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                            {category.map((b, i) => (
                                <div
                                    onClick={() => onClick(b)}
                                    key={i} className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                                    <img
                                        className='w-20 h-20 block mx-auto'
                                        src={getMediaFile(b.img)}
                                    />
                                    <p className='text-lg md:text-xl text-center font-medium mt-2 flex justify-center gap-2'>{b.name}
                                        <span className=' text-gray-600 text-base '>({b.total})</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Accessories;