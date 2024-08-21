import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Loader from "../../components/Loader/Loader";
import { countries } from "../AddBike/constant/constant";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import Select from 'react-select'
import { MdDelete } from "react-icons/md";
import { FaBorderStyle, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactDashboardPage = () => {

    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [err, setErr] = useState('')
    const [country, setCountry] = useState([{
        value: 'BD',
        label: 'Bangladesh'
    }])
    const axios = useAxios()
    const [contacts, setContacts] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/contact/all`)
            setContacts(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchData()
        }, 0)
        return () => clearTimeout(timeout)
    }, [])


    const onSubmit = async () => {
        try {
            if (!name || !phone || !location || !country.length) return setErr('all fields are required')
            setErr('')
            setLoading(true)
            const { data } = await axios.post(`/contact`, {
                name,
                phone,
                location,
                country: country.map(c => c.value)
            })
            setLoading(false)
            setContacts([data, ...contacts])
            document.getElementById('brand-modal').close()
            fetchData()
        } catch (error) {
            setErr('something went wrong')
            console.log(error);
        }
    }


    const onDelete = async (id) => {
        try {
            await axios.delete(`/contact/${id}`)
            setContacts(contacts.filter(c => c._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button
                onClick={() => {
                    document.getElementById('brand-modal').showModal();
                }}
                className="btn btn-success text-white btn-sm">create new contact</button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mt-4 md:mt-6">
                {contacts.map((c, i) => <div key={i}>
                    <div className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
                        <p className='font-bold  md:text-lg mt-2'>{c.name}</p>
                        <p className='mt-2 flex items-center gap-2'><FaPhoneAlt className="text-red-500 md:text-xl" /> {c.phone}</p>
                        <p className='mt-3 flex items-center gap-2'><FaMapMarkerAlt className="text-red-500 md:text-xl" /> {c.location}</p>
                        <div className='mt-3 border-t flex justify-center gap-5  text-red-500 md:text-2xl text-xl pt-2'>
                            {/* <FaEdit /> */}
                            <MdDelete
                                onClick={() => onDelete(c._id)}
                            />
                        </div>
                    </div>
                </div>)}
            </div>

            {loading && <Loader />}

            <dialog id="brand-modal" className="modal">
                <div className="modal-box bg-white  relative select-none ">
                    <span
                        onClick={() => document.getElementById('brand-modal').close()}
                        className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    {err && <p className='text-red-500 text-sm mb-3 text-center'>{err}</p>}
                    <div className='grid gap-5 mt-7'>
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
                            <input
                                placeholder='contact name*'
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='contact phone number*'
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div>
                            <input
                                placeholder='contact Location*'
                                type="text"
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
                                className=" outline-none bg-white p-2 w-full rounded-md shadow border" />
                        </div>
                        <div className='flex justify-center'>
                            <button
                                onClick={onSubmit}
                                className="btn btn-sm btn-success text-white">
                                <ButtonLoader load={loading}>create new contact</ButtonLoader>
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ContactDashboardPage;