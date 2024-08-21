import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';
import getMediaFile from '../../utilities/getMediaFile';
import moment from 'moment';
import Loader from '../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import CardSkleton from '../CardSkleton/CardSkleton';

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const axios = useAxios()
    const navigate = useNavigate()


    const fetchData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/blog?skip=${blogs.length}`)
            setBlogs(data)
            if (data.length < 8) setShowLoadMore(false)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData()
        }, 0)
        return () => clearTimeout(timeout)
    }, [])


    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4 mt-8 md:mt-16  bg-gray-100 shadow-md border border-gray-100">
            <h1 className="font-extrabold text-red-600 sh text-2xl md:text-4xl text-center">Blogs</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mt-4 md:mt-6">
                {blogs.map((b, i) => (
                    <div
                        onClick={() => navigate(`/blog/${b.id}`)}
                        key={i} className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
                        <img src={getMediaFile(b.img)}
                            className='w-full  md:h-[220px] h-[120px] rounded-md object-cover'
                            alt="" />
                        <p className='font-bold group-hover:underline text-xs md:text-base mt-2'>{b.title}</p>
                        <p className='mt-2'>{moment(b.createdAt).format('D MMMM, YYYY')}</p>
                    </div>
                ))}
            </div>

           
            {loading && <CardSkleton />}

            <div className='flex justify-end mt-4'>
                <Link to='/blogs' className='font-medium cursor-pointer text-red-500 flex items-center gap-2'>Show More
                    <FaArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default Blogs;