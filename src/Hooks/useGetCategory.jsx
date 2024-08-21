import React, { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useGetCategory = (tab) => {
    const axios = useAxios();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get(`/category?type=${tab}`);
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBrands();
    }, [tab]);

    return categories;
};

export default useGetCategory;