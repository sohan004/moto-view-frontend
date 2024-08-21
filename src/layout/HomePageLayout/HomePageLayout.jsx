import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

const HomePageLayout = () => {

    const location = useLocation();

    useEffect(() => {
        const rootDiv = document.getElementById('rootApp');
        rootDiv.scrollTop = 0;
    }, [location]);

    return (
        <div>
            <Nav />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default HomePageLayout;