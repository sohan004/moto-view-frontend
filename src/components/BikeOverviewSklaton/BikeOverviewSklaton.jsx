
const BikeOverviewSklaton = () => {
    return (
        <div className="max-w-[1280px] mx-auto">
        <div className="bg-white border border-gray-200 shadow rounded-lg md:py-5 animate-pulse">
          <div className="flex flex-col md:flex-row p-3 md:p-6 gap-3 md:gap-8">
            <div className="md:w-[40%] w-full">
              <div className="bg-gray-300 h-48 w-full rounded-lg"></div>
            </div>
            <div className="md:w-[60%] w-full">
              <div className="bg-gray-300 h-8 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-300 h-6 w-1/2 rounded mb-2"></div>
              <div className="grid grid-cols-3 gap-5 md:gap-7 mt-5 md:mt-7">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="flex justify-start">
                    <div className="flex flex-col items-center text-gray-500">
                      <div className="bg-gray-300 h-8 w-8 rounded-full mb-1"></div>
                      <div className="bg-gray-300 h-4 w-10 rounded mb-1"></div>
                      <div className="bg-gray-300 h-4 w-12 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="px-3 md:px-6 py-5 md:py-7">
            {Array(1).fill(0).map((_, i) => (
              <div key={i} className="grid gap-7 mb-5">
                <div className="bg-gray-300 h-6 w-32 rounded mb-2"></div>
                <div className="grid grid-cols-1 gap-5 md:gap-7">
                  {Array(3).fill(0).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="bg-gray-300 h-4 w-1/4 rounded"></div>
                      <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default BikeOverviewSklaton;