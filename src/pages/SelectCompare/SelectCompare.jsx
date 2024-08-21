import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SelectCompare = () => {

    const [bike_list, setBikeList] = useState([])
    const [selectedBike1, setSelectedBike1] = useState('')
    const [selectedBike2, setSelectedBike2] = useState('')

    const axios = useAxios()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/bike/all-bike-name')
                setBikeList(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const onSubmit = () => {
        if (!selectedBike1) return toast.error('Please Select First Bike')
        if (!selectedBike2) return toast.error('Please Select Second Bike')
        navigate(`/compare/${selectedBike1.value}/${selectedBike2.value}`)
    }

    return (
        <div className='max-w-[1280px] mx-auto p-3 md:p-4'>
            <p className='text-center capitalize font-bold text-lg md:text-2xl '>Select Compare</p>
            <div className='flex items-center gap-2 md:gap-4  mt-3 md:mt-5'>
                <Select
                    onChange={(e) => setSelectedBike1(e)}
                    value={selectedBike1}
                    options={bike_list.map(b => ({ value: b.id, label: b.name }))}
                    placeholder="First Bike"
                    className="basic-single bg-white text-black w-full "
                    classNamePrefix="select"
                />
                <p className='font-bold md:text-xl text-red-500'>VS</p>
                <Select
                    onChange={(e) => setSelectedBike2(e)}
                    value={selectedBike2}
                    options={bike_list.map(b => ({ value: b.id, label: b.name }))}
                    placeholder="Second Bike"
                    className="basic-single bg-white text-black w-full "
                    classNamePrefix="select"
                />
            </div>
            <div className='flex justify-center mt-7'>
                <button
                    onClick={onSubmit}
                    className="btn btn-error text-white btn-sm md:btn-md">Compare</button>
            </div>
        </div>
    );
};

export default SelectCompare;