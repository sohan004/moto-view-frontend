import { useEffect, useState } from "react";
import TableSkelaton from "../../components/TableSkelaton/TableSkelaton";
import getMediaFile from "../../utilities/getMediaFile";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const DashboardUsedPage = () => {
    const [activeTab, setActiveTab] = useState('pending')
    const [bikeData, setBikeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showLoadMore, setShowLoadMore] = useState(true)
    const axios = useAxios()
    const [select, setSelect] = useState({})

    const fetchData = async (loadMore) => {
        try {
            setLoading(true)
            const { data: { data } } = await axios.get(`/used?type=bike&admin=true&status=${activeTab}&skip=${loadMore ? bikeData.length : 0}`)
            if (data.length < 8) setShowLoadMore(false)
            if (loadMore) setBikeData([...bikeData, ...data])
            else setBikeData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [activeTab])

    const onDelete = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`/used/${id}`)
            setLoading(false)
            document.getElementById('used-details-modal').close()
            setBikeData(bikeData.filter(b => b?._id !== id))
            toast.success('Your post has been deleted successfully')
        } catch (error) {
            console.log(error);
        }
    }

    const statusChange = async (id, status) => {
        try {
            setLoading(true)
            await axios.put(`/used/${id}`, { status })
            setLoading(false)
            document.getElementById('used-details-modal').close()
            setBikeData(bikeData.map(b => b?._id === id ? { ...b, status } : b))
            toast.success('Your post has been updated successfully')
        } catch (error) {
            console.log(error);
        }
    }

    const getActiveTab = (tab) => {
        return activeTab === tab ? 'border-red-500' : ''
    }
    return (
        <div>
            <div className='grid grid-cols-3  bg-white '>
                <p
                    onClick={() => setActiveTab('pending')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base capitalize ${getActiveTab('pending')}`}>pending</p>
                <p
                    onClick={() => setActiveTab('available')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base capitalize ${getActiveTab('available')}`}>available</p>
                <p
                    onClick={() => setActiveTab('sold out')}
                    className={`font-semibold text-center hover:border-red-500 border-b-2 py-3 text-sm cursor-pointer md:text-base capitalize ${getActiveTab('sold out')}`}>sold out</p>
            </div>

            <div className="overflow-x-auto">
                <table className=" mt-3 text-sm text-left  text-gray-500  w-full  bg-white shadow-md overflow-x-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className=" py-2">
                                img
                            </th>
                            <th scope="col" className=" py-2">
                                name
                            </th>
                            <th scope="col" className=" py-2">
                                Price
                            </th>
                            <th scope="col" className=" py-2">
                                status
                            </th>
                            <th scope="col" className=" py-2">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {bikeData.map(product => <tr className="bg-white text-xs md:text-sm  border-b " key={product?._id}>
                            <td >
                                <img className="w-10 h-10 md:w-20 md:h-20" src={getMediaFile(product?.product_img)} alt="" />
                            </td>
                            <td>
                                {product?.product_name?.slice(0, 10) + '...'}
                            </td>
                            <td>
                                {product?.product_price} BDT
                            </td>
                            <td className={`${product?.status === 'available' ? 'text-green-600' : (product?.status === 'pending' ? 'text-orange-400' : 'text-red-600')}`}>
                                {product?.status}
                            </td>
                            {(product?.status === 'pending') && <td>
                                <button
                                    onClick={() => {
                                        document.getElementById('used-details-modal').showModal()
                                        setSelect(product)
                                    }}
                                    className="btn btn-xs text-xs p-1 py-0 md:btn-sm text-white btn-primary">Details</button>
                            </td>}
                        </tr>)}
                    </tbody>
                </table>
                {loading && <TableSkelaton />}
                {(showLoadMore && !loading) && <div className='flex justify-center  mt-4'>
                    <button
                        onClick={() => fetchData(true)}
                        className="btn btn-error text-white">Load More</button>
                </div>}
            </div>



            <dialog id="used-details-modal" className="modal">
                <div className="modal-box bg-white  relative select-none max-w-[400px]">
                    <span
                        onClick={() => {
                            document.getElementById('used-details-modal').close()
                        }}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>

                    <div className="grid gap-2 mt-5">
                        <p className="font-medium "><span className="text-gray-500">Bike Name</span> : {select?.product_name}</p>
                        <p className="font-medium "><span className="text-gray-500">Bike Price</span> : {select?.product_price} BDT</p>
                        <p className="font-medium "><span className="text-gray-500">Bike Description</span> : {select?.product_description}</p>
                        <p className="font-medium "><span className="text-gray-500">Seller Name</span> : {select?.name}</p>
                        <p className="font-medium "><span className="text-gray-500">Seller Email</span> : {select?.email}</p>
                        <p className="font-medium "><span className="text-gray-500">Seller Phone</span> : {select?.phone}</p>
                        <p className="font-medium "><span className="text-gray-500">Seller Address</span> : {select?.address}</p>
                    </div>

                    {loading ? <Loader /> : <div className="flex gap-4 justify-center items-center ">
                        <button
                            onClick={() => statusChange(select?._id, 'available')}
                            className="btn btn-success btn-xs md:btn-sm text-white">Accept</button>
                        <button
                            onClick={() => onDelete(select?._id)}
                            className="btn btn-error btn-xs md:btn-sm text-white">Reject</button>
                    </div>}
                </div>
            </dialog>
        </div>
    );
};

export default DashboardUsedPage;