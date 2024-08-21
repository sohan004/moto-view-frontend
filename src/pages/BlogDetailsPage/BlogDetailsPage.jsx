import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import getMediaFile from '../../utilities/getMediaFile';
import moment from 'moment';
import BlogSkleton from '../../components/BlogSkleton/BlogSkleton';

const BlogDetailsPage = () => {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const axios = useAxios()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/blog/${id}`)
                setBlog(data)
                setLoading(false)
                const { data: blogs } = await axios.get(`/blog/random`)
                setBlogs(blogs)
            } catch (error) {
                console.log(error);

            }
        }
        fetchData()
    }, [id])


    if (loading) return <BlogSkleton />

    return (
        <div className='max-w-[1280px] mx-auto p-3 md:p-4 flex flex-col md:flex-row gap-5'>
            <div className='w-full md:w-[70%]'>
                <img src={getMediaFile(blog?.img)} className='w-full' alt="" />
                <h1 className='text-xl md:text-2xl font-bold mt-4'>{blog?.title}</h1>
                <p className='mt-2 md:text-xl'>{moment(blog?.createdAt).format('D MMMM, YYYY')}</p>

                <p className="whitespace-pre-wrap break-all  md:text-lg mt-5">{blog?.content}</p>
            </div>
            <div className='w-full md:w-[30%]'>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-6 ">
                    {blogs.filter(b => b?.id !== id).map((b, i) => (
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
            </div>
        </div>
    );
};

export default BlogDetailsPage;