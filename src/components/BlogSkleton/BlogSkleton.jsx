import React from 'react';

const BlogSkleton = () => {
    return (
        <div>
            <div className='max-w-[1280px] mx-auto p-3 md:p-4 flex flex-col md:flex-row gap-5'>
                <div className='w-full md:w-[70%]'>
                    <div className='w-full h-64 bg-gray-300 animate-pulse'></div>
                    <div className='h-8 bg-gray-300 animate-pulse mt-4'></div>
                    <div className='h-6 bg-gray-300 animate-pulse mt-2'></div>
                    <div className='h-40 bg-gray-300 animate-pulse mt-5'></div>
                </div>
                <div className='w-full md:w-[30%]'>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className='border bg-white p-2 md:p-3 rounded'
                            >
                                <div className='w-full h-32 md:h-[220px] bg-gray-300 animate-pulse rounded-md'></div>
                                <div className='h-6 bg-gray-300 animate-pulse mt-2'></div>
                                <div className='h-4 bg-gray-300 animate-pulse mt-2'></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSkleton;