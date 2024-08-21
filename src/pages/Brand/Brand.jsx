import React, { useEffect, useState } from 'react';
import { FaEdit, FaRegImage } from 'react-icons/fa';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import useAxios from '../../Hooks/useAxios';
import { set } from 'firebase/database';
import getMediaFile from '../../utilities/getMediaFile';
import Loader from '../../components/Loader/Loader';
import { MdDelete } from 'react-icons/md';

const Brand = () => {
    const [file, setFile] = useState(null);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [origin, setOrigin] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(true);
    const axios = useAxios();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/brand');
                setBrands(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchBrands();
    }, []);


    const onSubmit = async () => {
        try {
            if (!file || !name || !description || !origin) {
                return setErr('All fields are required')
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify({ name, description, origin }));
            setLoading(true);
            setErr('');
            const { data } = await axios.post('/brand', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false);
            setBrands(prev => [...prev, data]);
            setName('')
            setFile(null)
            setDescription('')
            setOrigin('')
        } catch (error) {
            setErr(error?.response?.data?.message || 'Something went wrong')
            console.log(error);
            setLoading(false);
        }
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`/brand/${id}`);
            setBrands(prev => prev.filter(b => b._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <Loader />

    return (
        <div>
            <button
                onClick={() => {
                    document.getElementById('brand-modal').showModal();
                }}
                className="btn btn-success text-white btn-sm">create brand</button>

            <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5'>
                {brands.map((b, i) => (
                    <div key={i} className='border bg-white hover:border-red-400 p-3 cursor-pointer shadow'>
                        <img
                            className='w-20 h-20 block mx-auto'
                            src={getMediaFile(b.img)}
                        />
                        <p className='text-lg md:text-xl text-center font-medium mt-2 flex justify-center gap-2'>{b.name}
                        </p>
                        <div>
                            <p className='text-sm text-center font-light'>{b.origin}</p>
                        </div>
                        <div className='mt-3 border-t flex justify-center gap-5  text-red-500 md:text-2xl text-xl pt-2'>
                            {/* <FaEdit /> */}
                            <MdDelete
                                onClick={() => onDelete(b._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <dialog id="brand-modal" className="modal">
                <div className="modal-box bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('brand-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5'>
                        <div>
                            <p className='font-medium mb-1'>select brand image*</p>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file" className="file-input bg-white  file-input-bordered w-full " />
                        </div>
                        <div>
                            <input
                                placeholder='Brand name*'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='Brand origin*'
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                type="text"
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <textarea
                                placeholder='Brand description*'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={onSubmit}
                                className="btn btn-sm btn-success text-white">
                                <ButtonLoader load={loading}>create new brand</ButtonLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Brand;