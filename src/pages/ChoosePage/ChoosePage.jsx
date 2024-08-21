import { useParams } from "react-router-dom";
import img1 from '../../assets/wants/image-removebg-preview (2).png';
import img2 from '../../assets/wants/image-removebg-preview (1).png';

const ChoosePage = () => {


    const { name } = useParams();

    return (
        <div className='max-w-[1280px] mx-auto p-3 md:p-4'>
            <div className='bg-white border border-gray-100 mt-3 md:mt-4'>
                <div className='px-3 md:px-4 py-7 md:py-10'>

                    <div className="grid grid-cols-2 gap-5">
                        <div className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                            <img
                                className='w-32  block mx-auto'
                                src={img1}
                            />
                            <p className='text-xl md:text-2xl text-center font-bold mt-3  gap-2'>Bike {name}
                            </p>
                        </div>
                        <div className='border hover:border-red-400 p-3 cursor-pointer shadow'>
                            <img
                                className='w-32  block mx-auto'
                                src={img2}
                            />
                            <p className='text-xl md:text-2xl text-center font-bold mt-3  gap-2'>Car {name}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChoosePage;