import React, { useState } from 'react';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import OTPInput from 'otp-input-react';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const OtpModel = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [OTP, setOTP] = useState('')
    const axios = useAxios()


    const onSubmit = async () => {
        try {
            if (!OTP) {
                setError('Please fill all the fields')
                return
            }
            setError('')
            setLoading(true)
            const { data } = await axios.post('/auth/otp-verify', { otp: OTP, token: localStorage.getItem('otp-token') || '' })
            setLoading(false)
            document.getElementById('otp-modal').close()
            Swal.fire({
                title: "Registration Successfully",
                text: "please login your account",
                icon: "success"
            });
            localStorage.removeItem('otp-token')
            document.getElementById('sign-in-modal').showModal()
        } catch (error) {
            setError(error?.response?.data?.message || 'Something went wrong')
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <dialog id="otp-modal" className="modal">
            <div className="modal-box bg-white  relative select-none ">
                <span
                    onClick={() => document.getElementById('otp-modal').close()}
                    className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                <p className="text-center text-xl md:text-3xl font-bold bg-gradient-to-r  from-red-600 to-orange-300 text-transparent bg-clip-text"><span className="me-2">&#x2022;</span> Enter Registration OTP <span className="ms-2">&#x2022;</span></p>
                <div className="mt-10">
                    {error && <p className="text-red-500 text-center pb-5">{error}</p>}
                    <OTPInput
                        placeholder="****"
                        inputClassName='border-b-2 border-gray-400 flex-grow outline-none text-center text-2xl bg-gray-200 w-12 h-20 '
                        className="text-center flex justify-center w-full "
                        value={OTP} onChange={setOTP}
                        autoFocus OTPLength={4}
                        otpType="number"
                        disabled={false}
                    />
                </div>

                <div className="text-center mt-9">
                    <button
                        onClick={onSubmit}
                        className="bg-red-500 rounded-md text-white font-medium p-3 w-[200px] md:w-[300px] flex justify-center mx-auto">
                        <ButtonLoader load={loading}>Submit OTP</ButtonLoader>
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default OtpModel;