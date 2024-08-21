import React from 'react';
import getMediaFile from '../../utilities/getMediaFile';
import PriceFormet from '../PriceFormet/PriceFormet';
import { useNavigate } from 'react-router-dom';


const BikeCard = ({ data, path }) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => {
                navigate(path)
            }} className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
            <img src={getMediaFile(data?.img)}
                className='md:w-[80%] h-[110px] md:h-[170px] object-scale-down w-[90%]  mx-auto '
                alt="" />
            <p className='font-bold group-hover:underline text-xs  md:text-base mt-2'>{data?.name}</p>
            <p className='mt-1 text-sm md:text-base flex items-center gap-1'>Price:
                <PriceFormet>{data?.price}</PriceFormet>
                BDT</p>
        </div>
    );
};

export default BikeCard;