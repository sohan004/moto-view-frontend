import React, { useEffect, useState } from 'react';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import Loader from '../../components/Loader/Loader';
import useAxios from '../../Hooks/useAxios';
import getMediaFile from '../../utilities/getMediaFile';
import { MdDelete } from 'react-icons/md';
import useGetBrand from '../../Hooks/useGetBrand';
import Select from 'react-select';
import { countries } from '../AddBike/constant/constant';
import useGetCategory from '../../Hooks/useGetCategory';
import { FaEdit } from 'react-icons/fa';

const DashboardAccesories = () => {
    const allBrands = useGetBrand();
    const allCategories = useGetCategory('accessories');
    const [activeTab, setActiveTab] = useState('bike')
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [country, setCountry] = useState([{
        value: 'BD',
        label: 'Bangladesh'
    }])
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')
    const axios = useAxios();
    const [categories, setCategories] = useState([])
    const [showLoadMore, setShowLoadMore] = useState(true)

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/accessories?type=${activeTab}`);
                if (data.length < 10) {
                    setShowLoadMore(false)
                }
                setCategories(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchBrands();
    }, [activeTab]);

    const loadMore = async () => {
        try {
            const { data } = await axios.get(`/accessories?type=${activeTab}&skip=${categories.length}`);
            setCategories(prev => [...prev, ...data]);
            if (data.length < 10) {
                setShowLoadMore(false)
            }
        } catch (error) {
            console.log(error);
        }
    }



    const onSubmit = async () => {
        try {
            if (!file || !name || !price || !description || !country.length || !brand || !category) {
                return setErr('All fields are required')
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify({
                name,
                price,
                description,
                country: country.map(c => c.value),
                brand: brand.value,
                category: category.value,
                type: activeTab
            }));
            setLoading(true);
            setErr('');
            const { data } = await axios.post('/accessories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            setCategories(prev => [...prev, data]);
            setName('')
            setFile(null)
            setPrice('')
            setDescription('')
            setBrand('')
            setCategory('')
        } catch (error) {
            setErr(error?.response?.data?.message || 'Something went wrong')
            console.log(error);
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`/accessories/${id}`);
            setCategories(prev => prev.filter(b => b._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const getActiveTab = (tab) => {
        return activeTab === tab ? 'border-red-500' : ''
    }

    const changeStatus = async (id, currentStatus) => {
        try {
            await axios.put(`/accessories/change-status/${id}`, { status: !currentStatus });
            setCategories(prev => prev.map(b => {
                if (b._id === id) {
                    return { ...b, status: !currentStatus }
                }
                return b;
            }))
        } catch (error) {
            console.log(error);
        }
    }


    if (loading) return <Loader />

    return (
        <div>
            <div className='grid grid-cols-2  bg-white '>
                <p
                    onClick={() => setActiveTab('bike')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base capitalize ${getActiveTab('bike')}`}>bike accessories</p>
                <p
                    onClick={() => setActiveTab('car')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base capitalize ${getActiveTab('car')}`}>car accessories</p>
            </div>

            <div>
                <button
                    onClick={() => {
                        document.getElementById('accessories-modal').showModal();
                    }}
                    className="btn btn-success text-white mt-4 btn-sm">create new accessories</button>
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
                        <div className='mt-3 border-t flex justify-center gap-3 items-center  text-red-500 md:text-xl text-lg pt-2'>
                            <FaEdit />
                            <MdDelete
                                onClick={() => onDelete(b._id)}
                            />
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input
                                        onChange={() => changeStatus(b._id, b.status)}
                                        checked={b.status}
                                        type="checkbox" className="toggle toggle-primary" />
                                </label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showLoadMore && <div className='flex justify-center mt-4'>
                <button
                    onClick={loadMore}
                    className="btn btn-primary text-white">Load More</button>
            </div>}




            <dialog id="accessories-modal" className="modal">
                <div className="modal-box bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('accessories-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5'>
                        <div>
                            <p className='font-medium mb-1'>select accessories image*</p>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file" className="file-input bg-white  file-input-bordered w-full " />
                        </div>
                        <div>
                            <input
                                placeholder='accessories name*'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='accessories price*'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
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
                            <Select
                                name="brand"
                                onChange={(e) => setBrand(e)}
                                value={brand}
                                options={allBrands.map(b => ({ value: b.name, label: b.name }))}
                                placeholder="Select Brand*"
                                className="basic-single bg-white text-black w-full "
                                classNamePrefix="select"
                            />
                        </div>
                        <div>
                            <Select
                                name="brand"
                                onChange={(e) => setCategory(e)}
                                value={category}
                                options={allCategories.map(b => ({ value: b._id, label: b.name }))}
                                placeholder="Select Category*"
                                className="basic-single bg-white text-black w-full "
                                classNamePrefix="select"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder='accessories description*'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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

export default DashboardAccesories;