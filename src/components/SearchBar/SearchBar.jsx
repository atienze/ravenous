import React from 'react'
import { useState } from 'react';
import './SearchBar.css'

const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
};

function SearchBar(props) {
    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [sortBy, setSortBy] = useState('best match');

    const renderSortByOptions = () => Object.keys(sortByOptions).map((sortByOption) => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return (
            <li className={getSortByClass               (sortByOptionValue)} key={sortByOptionValue} onClick={() => handleSortByChange(sortByOptionValue)}>{sortByOption}</li>
        )
    })

    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    const handleSortByChange = (sortByOption) => {
        setSortBy(sortByOption)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        props.searchYelp(term, location, sortBy)
    }

    const getSortByClass = (sortByOption) => 
        sortBy === sortByOption ? 'active' : '';
    
    return (
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search Businesses" onChange={handleTermChange}/>
                <input placeholder="Where?" onChange={handleLocationChange}/>
            </div>
            <div className="SearchBar-submit">
                <a href='www.#.com' onClick={handleSearch}>Let's Go</a>
            </div>
        </div>
    );
}

export default SearchBar;