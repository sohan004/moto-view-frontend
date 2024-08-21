import { FaArrowRight } from "react-icons/fa";
import img1 from '../../assets/wants/Apache-RTR-160-4V-FI.png'
import img2 from '../../assets/wants/Untitled-design-17-1-1-180x200.png'

const Compare = () => {
    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4 mt-8 md:mt-16  shadow-md  bg-gray-100">
            <h1 className="font-extrabold text-red-600 sh text-2xl md:text-4xl text-center">Comparison</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                {new Array(6).fill(1).map((_, i) => (
                    <div key={i} className='border bg-white group p-2 md:p-3 rounded cursor-pointer' >
                        <div className="flex justify-between relative">
                            <img src={img1} className="w-[40%] h-[150px]" alt="" />
                            <img src={img2} className="w-[40%] h-[150px] scale-x-[-1]" alt="" />
                            <p className="absolute top-2/4  left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold   w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">VS</p>
                        </div>
                        <div className="mt-3 flex justify-between gap-7 font-medium">
                            <p>Bajaj Pulsar 150 Single Disc ABS</p>
                            <p>Suzuki Gixxer SF FI Disc</p>
                        </div>
                        <div className="flex justify-center mt-4 pb-3">
                            <button className="btn border-2 border-red-400 text-red-400 btn-sm bg-transparent hover:bg-red-400 hover:text-white">View Compare</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-end mt-4'>
                <p className='font-medium cursor-pointer text-red-500 flex items-center gap-2'>Show More
                    <FaArrowRight />
                </p>
            </div>
        </div>
    );
};

export default Compare;