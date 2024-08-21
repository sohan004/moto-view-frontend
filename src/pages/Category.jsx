import React, { useEffect, useState } from 'react';
import ButtonLoader from '../components/ButtonLoader/ButtonLoader';
import Loader from '../components/Loader/Loader';
import useAxios from '../Hooks/useAxios';
import getMediaFile from '../utilities/getMediaFile';
import { MdDelete } from 'react-icons/md';
import { set } from 'firebase/database';
import useGetBrand from '../Hooks/useGetBrand';

const Category = () => {
    const [activeTab, setActiveTab] = useState('bike')
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const axios = useAxios();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/category?type=${activeTab}`);
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchBrands();
    }, [activeTab]);



    const onSubmit = async () => {
        try {
            if (!file || !name) {
                return setErr('All fields are required')
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify({ name, type: activeTab }));
            setLoading(true);
            setErr('');
            const { data } = await axios.post('/category', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            setCategories(prev => [...prev, data]);
            setName('')
            setFile(null)
        } catch (error) {
            setErr(error?.response?.data?.message || 'Something went wrong')
            console.log(error);
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`/category/${id}`);
            setCategories(prev => prev.filter(b => b._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const getActiveTab = (tab) => {
        return activeTab === tab ? 'border-red-500' : ''
    }


    if (loading) return <Loader />

    return (
        <div>
            <div className='grid grid-cols-2 md:grid-cols-4 bg-white '>
                <p
                    onClick={() => setActiveTab('bike')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('bike')}`}>Bike</p>
                <p
                    onClick={() => setActiveTab('car')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('car')}`}>Car</p>
             
                <p
                    onClick={() => setActiveTab('accessories')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('accessories')}`}>Accessories</p>
             
                <p
                    onClick={() => setActiveTab('parts')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base ${getActiveTab('parts')}`}>Parts</p>
            </div>

            <div>
                <button
                    onClick={() => {
                        document.getElementById('category-modal').showModal();
                    }}
                    className="btn btn-success text-white mt-4 btn-sm">create new category</button>
            </div>


            <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5'>
                {categories.map((b, i) => (
                    <div key={i} className='border bg-white hover:border-red-400 p-3 cursor-pointer shadow'>
                        <img
                            className='w-20 h-20 block mx-auto'
                            src={getMediaFile(b.img)}
                        />
                        <p className='text-lg md:text-xl text-center font-medium flex justify-center gap-2'>{b.name}
                        </p>
                        <div className='mt-3 border-t flex justify-center gap-5  text-red-500 md:text-2xl text-xl pt-2'>
                            {/* <FaEdit /> */}
                            <MdDelete
                                onClick={() => onDelete(b._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>





            <dialog id="category-modal" className="modal">
                <div className="modal-box bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('category-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5'>
                        <div>
                            <p className='font-medium mb-1'>select category image*</p>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file" className="file-input bg-white  file-input-bordered w-full " />
                        </div>
                        <div>
                            <input
                                placeholder='category name*'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={onSubmit}
                                className="btn btn-sm btn-success text-white">
                                <ButtonLoader load={loading}>create new category</ButtonLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Category;