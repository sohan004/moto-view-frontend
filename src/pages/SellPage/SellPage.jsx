import { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import getMediaFile from "../../utilities/getMediaFile";
import Loader from "../../components/Loader/Loader";
import TableSkelaton from "../../components/TableSkelaton/TableSkelaton";
import { useSelector } from "react-redux";

const SellPage = () => {
    const [err, setErr] = useState('')
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null)
    const [product_name, setProduct_name] = useState('')
    const [product_price, setProduct_price] = useState('')
    const [product_description, setProduct_description] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [type, setType] = useState('bike')
    const axios = useAxios()
    const [myUsedBike, setMyUsedBike] = useState([])
    const [selected, setSelected] = useState({})
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/used/my?type=bike')
                setMyUsedBike(data?.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const modalScrollTop = () => {
        document.getElementById('used-modal-box').scrollTo(0, 0)
    }

    const onSubmit = async () => {
        try {
            if (!img || !img.type?.includes('image')) {
                modalScrollTop()
                return setErr('Please select a valid image')
            }
            if (!product_name || !product_price || !product_description || !name || !email || !phone || !address) {
                modalScrollTop()
                return setErr('All fields are required')
            }

            const formData = new FormData()
            formData.append('file', img)
            formData.append('data', JSON.stringify({
                product_name,
                product_price: +product_price,
                product_description,
                name,
                email,
                phone,
                address,
                type
            }))
            setErr('')
            setLoading(true)
            const { data: { data } } = await axios.post('/used', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setMyUsedBike([data, ...myUsedBike])
            setLoading(false)
            document.getElementById('sell-modal').close()
            toast.success('Your post has been uploaded successfully')
            setImg(null)
            setProduct_name('')
            setProduct_price('')
            setProduct_description('')
            setName('')
            setEmail('')
            setPhone('')
            setAddress('')
        } catch (error) {
            modalScrollTop()
            setLoading(false)
            console.log('something went wrong');
        }
    }

    const onDelete = async (id) => {
        try {
            setLoading(true)
            await axios.delete(`/used/${id}`)
            setLoading(false)
            document.getElementById('action-modal').close()
            setMyUsedBike(myUsedBike.filter(b => b?._id !== id))
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
            document.getElementById('action-modal').close()
            setMyUsedBike(myUsedBike.map(b => b?._id === id ? { ...b, status } : b))
            toast.success('Your post has been updated successfully')
        } catch (error) {
            console.log(error);
        }
    }

    const clickSellMyBike = () => {
        if (!user) {
            document.getElementById('sign-in-modal').showModal()
        }
        else {
            document.getElementById('sell-modal').showModal()
        }
    }


    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4 ">
            <div className="flex justify-between items-end border-b border-gray-200 pb-3">
                <p className="text-lg md:text-2xl font-bold text-gray-700 ">My Post</p>
                <button
                    onClick={clickSellMyBike}
                    className="btn btn-error btn-xs md:btn-sm text-white"> Sell My Bike</button>
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
                        {myUsedBike.map(product => <tr className="bg-white text-xs md:text-sm  border-b " key={product?._id}>
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
                            <td>
                                <button
                                    onClick={() => {
                                        setSelected(product)
                                        document.getElementById('action-modal').showModal()
                                    }}
                                    className="btn btn-xs text-xs p-1 py-0 md:btn-sm text-white btn-primary">Action</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                {loading && <TableSkelaton />}
            </div>


            <dialog id="action-modal" className="modal">
                <div className="modal-box bg-white  relative select-none max-w-[400px]">
                    <span
                        onClick={() => {
                            document.getElementById('action-modal').close()
                        }}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {loading ? <Loader /> : <div className="flex gap-4 justify-center items-center ">
                        {selected?.status === 'available' && <button
                            onClick={() => statusChange(selected?._id, 'sold out')}
                            className="btn btn-warning text-white btn-sm">Sold Out</button>}
                        {selected?.status === 'sold out' && <button
                            onClick={() => statusChange(selected?._id, 'available')}
                            className="btn btn-success text-white btn-sm">Restock</button>}
                        <button
                            onClick={() => onDelete(selected?._id)}
                            className="btn btn-error text-white btn-sm">Delete</button>
                    </div>}
                </div>
            </dialog>

            <dialog id="sell-modal" className="modal ">
                <div id="used-modal-box" className="modal-box scroll-smooth bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('sell-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5'>
                        <div className="">
                            <p className="text-xs md:text-sm pb-2 font-medium">select bike Image*</p>
                            <div className="h-[80px] w-[80px] md:h-[130px] md:w-[130px] bg-slate-200 relative cursor-pointer">
                                <FaRegImage className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-3xl lg:text-5xl text-gray-500" />
                                <label htmlFor="bike-image" className="absolute top-0 left-0 w-full h-full cursor-pointer z-50"></label>
                                {img && <img src={URL.createObjectURL(img)} alt="bike" className="w-full h-full z-40 absolute top-0 left-0" />}
                                <input
                                    onChange={(e) => setImg(e.target.files[0])}
                                    id="bike-image" type="file" className="hidden" />
                            </div>
                        </div>
                        <div>
                            <input
                                placeholder='Bike Name*'
                                type="text"
                                value={product_name}
                                onChange={(e) => setProduct_name(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='Bike Price*'
                                type="number"
                                value={product_price}
                                onChange={(e) => setProduct_price(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <textarea
                                placeholder='Bike Description*'
                                value={product_description}
                                onChange={(e) => setProduct_description(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='Seller Name*'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='Seller Email*'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='Seller Phone*'
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='Seller Address*'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={onSubmit}
                                className="btn btn-sm btn-success text-white">
                                <ButtonLoader load={loading}>Upload</ButtonLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default SellPage;