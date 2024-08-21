import { RiLoader2Line } from "react-icons/ri";

const Loader = () => {
    return (
        <div className="py-3 flex justify-center">
            <RiLoader2Line
                className="animate-spin text-blue-500"
                size={40}
            />
        </div>
    );
};

export default Loader;