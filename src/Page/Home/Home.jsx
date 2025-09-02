import React from 'react';
import Search from '../Cpmponents/Search';
import Card from '../Cpmponents/Card/Card';
import PublicServices from '../Cpmponents/Services/PublicServices';


const Home = () => {
    return (
        <div>
        <Search></Search>
        <PublicServices></PublicServices>
        <Card></Card>
        </div>
    );
};

export default Home;