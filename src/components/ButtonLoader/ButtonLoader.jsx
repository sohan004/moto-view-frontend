import React from 'react';
import { RiLoader2Line } from 'react-icons/ri';

const ButtonLoader = ({ load, children }) => {
    return (
        <>
            {load ? <span className="animate-spin">
                <RiLoader2Line
                     size={20}
                    />
            </span> : children}
        </>
    );
};

export default ButtonLoader;