import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useGetReview = (id) => {
    const axios = useAxios();
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if (id) {
            const fetchDatas = async () => {
                try {
                    const { data } = await axios.get(`/review/${id}`)
                    setReviews(data)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchDatas()
        }
    }, [id]);
    return [reviews, setReviews]
}


export default useGetReview;