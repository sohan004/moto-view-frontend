import React from 'react';
import CurrencyFormat from 'react-currency-format';


const PriceFormet = ({children}) => {
    return (
        <>
            <CurrencyFormat value={+children} displayType={'text'} thousandSeparator={true} />
        </>
    );
};

export default PriceFormet;