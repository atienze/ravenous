import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import BusinessList from '../BusinessList/BusinessList';
import Subscription from '../Subscription/Subscription';
import Footer from "../Footer/Footer";
import Yelp  from '../../util/Yelp'; // Adjust the path as necessary
import { Toaster } from 'react-hot-toast'

const business = {
    imageSrc: 'https://csciprojects.us/pizza.jpg',
    name: 'MarginOtto Pizzeria',
    address: '1010 Paddington Way',
    city: 'Flavortown',
    state: 'NY',
    zipCode: '10101',
    category: 'Italian',
    rating: 4.5,
    reviewCount: 90
}

const HomePage = () => {
    const [businesses, setBusinesses] = useState([])

    const searchYelp = (term, location, sortBy) => {
        Yelp.search(term, location, sortBy).then((businesses) => {
            setBusinesses(businesses);
        }).catch((error) => {
            console.error('Error fetching data from Yelp:', error);
        });
    };

    return ( 
        <>
            <SearchBar searchYelp={searchYelp}/>
            <BusinessList businesses={businesses} />
            {/*idk if the toaster is supposed to be passed like this but it works for now */}
            <Subscription toast={Toaster} /> 
            <Footer/>
        </>
     );
}
 
export default HomePage;