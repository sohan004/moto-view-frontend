
const CardSkleton = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {new Array(8).fill(0).map((_, index) => <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg bg-white animate-pulse border">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="px-6 py-4">
                    <div className="bg-gray-300 h-6 w-3/4 mb-2"></div>
                    <div className="bg-gray-300 h-4 w-full mb-2"></div>
                </div>
            </div>)}
        </div>
    );
};

export default CardSkleton;