import React, { useEffect, useState } from 'react';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import { set } from 'firebase/database';
import useAxios from '../../Hooks/useAxios';
import Loader from '../../components/Loader/Loader';
import getMediaFile from '../../utilities/getMediaFile';
import moment from 'moment';
import { MdDelete } from 'react-icons/md';
import Select from 'react-select';
import { countries } from '../AddBike/constant/constant';

const DashboardBlogs = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState('')
    const [country, setCountry] = useState([{
        value: 'BD',
        label: 'Bangladesh'
    }])
    const axios = useAxios()
    const [blogs, setBlogs] = useState([])
    const [showLoadMore, setShowLoadMore] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/blog/all?skip=${blogs.length}`)
            setBlogs(prev => [...prev, ...data])
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


    const onSubmit = async () => {
        try {
            if (!title || !content || !file || !country.length) {
                return setErr('all fields are required')
            }
            setLoading(true)
            setErr('')
            const formData = new FormData()
            formData.append('file', file)
            formData.append('data', JSON.stringify({
                country: country.map(c => c.value),
                title,
                content
            }))
            const { data } = await axios.post('/blog', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setBlogs([data, ...blogs])
            setTitle('')
            setContent('')
            setFile(null)
            document.getElementById('brand-modal').close()
            setLoading(false)
        } catch (error) {
            setErr('something went wrong')
            console.log(error);
        }
    }

    const onDelete = async (id) => {
        try {
            await axios.delete(`/blog/${id}`)
            setBlogs(blogs.filter(b => b._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button
                onClick={() => {
                    document.getElementById('brand-modal').showModal();
                }}
                className="btn btn-success text-white btn-sm">create blog</button>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mt-4 md:mt-6">
                {blogs.map((b, i) => (
                    <div key={i} className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
                        <img src={getMediaFile(b.img)}
                            className='w-full  md:h-[220px] h-[120px] rounded-md object-cover'
                            alt="" />
                        <p className='font-bold group-hover:underline text-xs md:text-base mt-2'>{b.title}</p>
                        <p className='mt-2'>{moment(b.createdAt).format('D MMMM, YYYY')}</p>
                        <div className='mt-3 border-t flex justify-center gap-5  text-red-500 md:text-2xl text-xl pt-2'>
                            {/* <FaEdit /> */}
                            <MdDelete
                                onClick={() => onDelete(b._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {(!loading && showLoadMore) && <div className='flex justify-center mt-5'>
                <button
                    onClick={fetchData}
                    className="btn btn-primary text-white">Load More</button>
            </div>}

            {loading && <Loader />}

            <dialog id="brand-modal" className="modal">
                <div className="modal-box bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('brand-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5'>
                        <div>
                            <p className='font-medium mb-1'>select blog image*</p>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file" className="file-input bg-white  file-input-bordered w-full " />
                        </div>
                        <div>
                            <Select
                                isMulti
                                name="colors"
                                onChange={(e) => setCountry(e)}
                                value={country}
                                options={countries}
                                placeholder="Select Country*"
                                className="basic-multi-select bg-white text-black w-full "
                                classNamePrefix="select"
                            />
                        </div>
                        <div>
                            <input
                                placeholder='blog title*'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <textarea
                                placeholder='blog content*'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={onSubmit}
                                className="btn btn-sm btn-success text-white">
                                <ButtonLoader load={loading}>create new blog</ButtonLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DashboardBlogs;