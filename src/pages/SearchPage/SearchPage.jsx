import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from "../../components/Loader/Loader";
import getMediaFile from "../../utilities/getMediaFile";
import PriceFormet from "../../components/PriceFormet/PriceFormet";
import BikeCard from "../../components/BikeCard/BikeCard";

const SearchPage = () => {
    const { type, search, brand } = useParams();
    const navigate = useNavigate();
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const location = useLocation();
    const [loadMore, setLoadMore] = useState(true);


    useEffect(() => {
        const timeOut = setTimeout(async () => {
            try {
                let query = Array.isArray(location?.state) ? location?.state : [];
                setLoadMore(true)
                setLoading(true)
                if (search) {
                    query.push({ key: 'search', value: search });
                }
                if (brand) {
                    query.push({ key: 'brand', value: brand });
                }
                const queryString = query.reduce((acc, q) => `${acc}${q.key}=${q.value}&`, '');
                const { data: fetchData } = await axios.get(`/filter/search/${type}?${queryString}`)
                if (fetchData.length < 12) setLoadMore(false)
                setData(fetchData)
                setLoading(false)
            } catch (error) {
                console.log(error)
                navigate('/');
                setLoading(false)
            }
        }, 0);
        return () => {
            clearTimeout(timeOut)
        }
    }, [type, search, brand, location?.state]);

    const loadMoreData = async () => {
        try {
            let query = Array.isArray(location?.state) ? location?.state : [];
            if (search) {
                query.push({ key: 'search', value: search });
            }
            if (brand) {
                query.push({ key: 'brand', value: brand });
            }
            query.push({ key: 'skip', value: data.length });
            const queryString = await query.reduce((acc, q) => `${acc}${q.key}=${q.value}&`, '');
            const { data: fetchData } = await axios.get(`/filter/search/${type}?${queryString}`)
            if (fetchData.length < 12) setLoadMore(false)
            setData(prev => [...prev, ...fetchData])
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <Loader /> 

    return (
        <div className="max-w-[1280px] mx-auto px-3 md:px-4">
            <p className=' capitalize font-bold  mt-2 md:mt-4 text-xs md:text-base'>Search Result <span className="text-red-500">{type}</span></p>
            {!data.length && <div className="text-center md:text-xl font-bold text-red-500 mt-5">No Search Found !!</div>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mt-2 ">
                {data.map((d, i) => <BikeCard key={i} data={d} path={`/overview/${type}/${d.id || d._id}`} />)}
            </div>
            {loadMore && <div className='flex justify-center mt-5'>
                <button
                    onClick={loadMoreData}
                    className="btn btn-error text-white">Load More</button>
            </div>}
        </div>
    );
};

export default SearchPage;