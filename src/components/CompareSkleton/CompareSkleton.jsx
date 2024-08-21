import React from 'react';

const CompareSkleton = () => {
    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4">
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="md:w-1/2 w-full">
              
                <div className="w-full bg-gray-200 h-64"></div> 
                <h3 className="text-lg font-bold text-red-600 mt-2">Price: BDT</h3>
                <p className="font-medium text-gray-500">Brand: <span className="text-black capitalize">Brand Name</span></p>
            </div>
            <div className="md:w-1/2 w-full">
              
                <div className="w-full bg-gray-200 h-64"></div> 
                <h3 className="text-lg font-bold text-red-600 mt-2">Price: BDT</h3>
                <p className="font-medium text-gray-500">Brand: <span className="text-black capitalize">Brand Name</span></p>
            </div>
        </div>
    
        <div className="overflow-x-auto mt-5">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b"></th>
                        <th className="py-2 px-4 border-b">Bike 1 Name</th>
                        <th className="py-2 px-4 border-b">Bike 2 Name</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td colSpan="3" className="bg-gray-200 font-semibold py-2 px-4">Specification Category</td>
                    </tr>
                    <tr className="text-xs md:text-sm">
                        <td className="py-2 px-4 border-b font-semibold">Specification Name</td>
                        <td className="py-2 px-4 border-b">Bike 1 Spec Value</td>
                        <td className="py-2 px-4 border-b">Bike 2 Spec Value</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
    
    );
};

export default CompareSkleton;