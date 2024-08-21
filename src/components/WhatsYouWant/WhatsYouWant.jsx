
import img1 from '../../assets/wants/image-removebg-preview (2).png'
import img2 from '../../assets/wants/image-removebg-preview (1).png'
import img3 from '../../assets/wants/image-removebg-preview (3).png'
import img4 from '../../assets/wants/image-removebg-preview (7).png'
import { useNavigate } from 'react-router-dom';

const WhatsYouWant = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4 mt-8 md:mt-16  bg-white shadow-md border border-gray-100">
            <h1 className="font-extrabold text-red-600 sh text-2xl md:text-4xl text-center">What Do You Want ?</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-4 md:mt-6">
                <div
                    onClick={() => navigate('/filter/bike')}
                    className='bg-purple-500 p-4 text-white text-center rounded-xl cursor-pointer'>
                    <p className='text-xl md:text-3xl font-bold'>Bikes</p>
                    <img src={img1} alt='bike' className='w-[70%]  mx-auto mt-3 rounded-lg ' />
                </div>
                <div
                    onClick={() => navigate('/filter/car')}
                    className='bg-green-500 p-4 text-white text-center rounded-xl cursor-pointer'>
                    <p className='text-xl md:text-3xl font-bold'>Cars</p>
                    <img src={img2} alt='bike' className='w-[70%] mx-auto mt-3 rounded-lg ' />
                </div>
                <div
                    onClick={() => document.getElementById('accessories-modal').showModal()}
                    className='bg-blue-500  p-4 text-white text-center rounded-xl cursor-pointer'>
                    <p className='text-xl md:text-3xl font-bold'>Accessories</p>
                    <img src={img3} alt='bike' className='w-[70%] mx-auto mt-3 rounded-lg ' />
                </div>
                <div
                    onClick={() => document.getElementById('parts-modal').showModal()}
                className='bg-pink-500  p-4 text-white text-center rounded-xl cursor-pointer'>
                    <p className='text-xl md:text-3xl font-bold'>Parts</p>
                    <img src={img4} alt='bike' className='w-[70%] mx-auto mt-3 rounded-lg ' />
                </div>
            </div>


            <dialog id="accessories-modal" className="modal">
                <div className="modal-box bg-white rounded-none  relative select-none ">
                    <span
                        onClick={() => document.getElementById('accessories-modal').close()}
                        className="absolute top-2 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    <div className="grid grid-cols-2 gap-5 py-5">
                        <div
                            onClick={() => navigate('/category/bike/accessories')}
                            className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                            <img
                                className='w-16 md:w-20  block mx-auto'
                                src={img1}
                            />
                            <p className='text-xs md:text-lg text-center font-bold mt-3  gap-2'>Bike  Accessories
                            </p>
                        </div>
                        <div
                            onClick={() => navigate('/category/car/accessories')}
                            className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                            <img
                                className='w-16 md:w-20  block mx-auto'
                                src={img2}
                            />
                            <p className='text-xs md:text-xl text-center font-bold mt-3  gap-2'>Car  Accessories
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>

             
            <dialog id="parts-modal" className="modal">
                <div className="modal-box bg-white rounded-none  relative select-none ">
                    <span
                        onClick={() => document.getElementById('parts-modal').close()}
                        className="absolute top-2 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                    <div className="grid grid-cols-2 gap-5 py-5">
                        <div
                            onClick={() => navigate('/category/bike/parts')}
                            className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                            <img
                                className='w-16 md:w-20  block mx-auto'
                                src={img1}
                            />
                            <p className='text-xs md:text-xl text-center font-bold mt-3  gap-2'>Bike  Parts
                            </p>
                        </div>
                        <div
                            onClick={() => navigate('/category/car/parts')}
                            className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                            <img
                                className='w-16 md:w-20  block mx-auto'
                                src={img2}
                            />
                            <p className='text-xs md:text-xl text-center font-bold mt-3  gap-2'>Car  Parts
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>

             
        </div>
    );
};

export default WhatsYouWant;