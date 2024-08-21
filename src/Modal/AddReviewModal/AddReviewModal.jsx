import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Rating from 'react-rating';
import { useSelector } from 'react-redux';
import useAxios from '../../Hooks/useAxios';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';

const AddReviewModal = ({ id, model }) => {
    const [review, setReview] = useState('')
    const [star, setStar] = useState(0)
    const user = useSelector(state => state.auth.user)
    const axios = useAxios()
    const [loading, setLoading] = useState(false)

    const submitReview = async () => {
        try {
            if (!id) return
            if (!user) return document.getElementById('sign-in-modal').showModal()
            if (!review || !star) return toast.error('Review is required!')
            setLoading(true)
            const { data } = await axios.post(`/review`, {
                id,
                model,
                review,
                rating: star
            })
            document.getElementById('review-modal').close()
            setLoading(false)
            toast.success('Review submitted successfully!')
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error('Something went wrong!')
        }
    }

    return (
        <dialog id="review-modal" className="modal">
            <div className="modal-box bg-white relative select-none">
                <span
                    onClick={() => document.getElementById('review-modal').close()}
                    className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                <textarea
                    className="w-full h-20 p-3 mt-5 border border-gray-300 rounded-md focus:outline-none"
                    placeholder="Write your review here..."
                    id="review"
                    name="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                ></textarea>
                <Rating
                    className='text-yellow-600 text-2xl'
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    onChange={(rate) => setStar(rate)}
                    initialRating={star}
                />
                <div className='flex justify-center mt-3'>
                    <button
                        onClick={submitReview}
                        className="btn btn-success btn-sm text-white ">
                            <ButtonLoader loading={loading} >
                                Submit Review
                            </ButtonLoader>
                        </button>
                </div>
            </div>
        </dialog>
    );
};

export default AddReviewModal;