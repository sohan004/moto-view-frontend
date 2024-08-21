import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from "../../components/Loader/Loader";

const ContactPage = () => {

    const [contact, setContact] = useState([]);
    const axios = useAxios();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`/contact`)
                setContact(data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    if (loading) return <Loader />

    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contact.map((c, i) => <div key={i}>
                    <div className='border bg-white group p-6 rounded cursor-pointer' >
                        <p className='font-bold  text-lg md:text-2xl'>{c.name}</p>
                        <p className='mt-4 flex items-center md:text-xl gap-2'><FaPhoneAlt className="text-red-500 md:text-xl" /> {c.phone}</p>
                        <p className='mt-3 flex items-center gap-2 md:text-xl '><FaMapMarkerAlt className="text-red-500 md:text-xl" /> {c.location}</p>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default ContactPage;