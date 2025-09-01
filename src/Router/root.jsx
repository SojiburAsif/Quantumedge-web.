import React from 'react';
import Header from '../Page/Header/Header';
import { Outlet } from 'react-router';
import Footer from '../Page/Fooder/Footer';

const Root = () => {
    return (
        <div className='bg-gradient-to-br from-[#14301a] via-[#030a05] to-[#031407] '>
            <div className="">
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;