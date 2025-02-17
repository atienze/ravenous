import React from 'react'
import './App.css'
import Navigation from '../Navigation/Navigation'
import Toaster from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function Business(props) {
    return (
        <div className="Business">
            <div className="image-container">
                <img src={props.business.imageSrc} alt={props.business.name} />
            </div>
            <h2>{props.business.name}</h2>
            <div className="Business-information">
                <div className="Business-address">
                    <p>{props.business.address}</p>
                    <p>{props.business.city}</p>
                    <p>{props.business.state} {props.business.zipCode}</p>
                </div>
                <div className="Business-reviews">
                    <h3>{props.business.category}</h3>
                    <h3 className="rating">{props.business.rating} stars</h3>
                    <p>{props.business.reviewCount} reviews</p>
                </div>
            </div>
        </div>
    )
}

function App() {

    return (
        <div className="App">
            <Link to="/"><h1>ravenous</h1></Link>
            <Navigation/>
            <Outlet/>
            <Toaster/>
        </div>
    )
}

export default App;


