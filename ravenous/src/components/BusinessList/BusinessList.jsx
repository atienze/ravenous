import './BusinessList.css'
import Business from '../Business/Business'
import React from 'react'

function BusinessList(props) {
    return (
        <div className='BusinessList'>
            {props.businesses.map((business)=> {
                return (
                    <Business
                        key={business.id}
                        business={business}
                    />
                );
            })}
        </div>
    )
}

export default BusinessList
