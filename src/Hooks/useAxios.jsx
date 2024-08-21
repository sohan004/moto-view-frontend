import axios from 'axios';
import { BACKEND_URL } from '../App';

const useAxios = () => {

    const token = localStorage.getItem('token') || ''
    const axiosSecure = axios.create({
        baseURL: BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return axiosSecure
};

export default useAxios;