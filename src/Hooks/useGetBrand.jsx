import React, { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useGetBrand = () => {
    const axios = useAxios();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get('/brand');
                setBrands(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBrands();
    }, []);

    return brands;
};

export default useGetBrand;