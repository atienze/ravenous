import React from 'react'
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <nav className="flex justify-end">
                <ul className="flex list-none m-0 p-0 absolute top-5 right-10">
                    <li className='ml-4'>
                        <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                    <li className="ml-4">
                        <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                            <Link to="/signup">Signup</Link>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;
