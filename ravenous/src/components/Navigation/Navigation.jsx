import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//Import logout from authSlice
import { logout } from '../../store/slices/authSlice'
import { useNavigate } from "react-router-dom";

function Navigation() {
  // user from redux store
  const { user } = useSelector(state => state.auth);
  //22. Import useDispatch and useSelector from react-redux to interact with the Redux store, and the logout action from your auth slice.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout function
 //22. Implement a logoutHandler function that dispatches the logout action and removes the user's details from localStorage, effectively logging the user out.
 const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
};

return (
    <div>
        <nav className="flex justify-end">
            <ul className="flex list-none m-0 p-0 absolute top-5 right-10">
                {user ? (
                    <>
                        <li className="ml-4">
                            <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                                <Link to="/account">Account</Link>
                            </button>
                        </li>
                        <li className="ml-4">
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="ml-4">
                            <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                                <Link to="/login">Log In</Link>
                            </button>
                        </li>
                        <li className="ml-4">
                            <button className="bg-transparent border-none cursor-pointer w-fit min-w-20 px-2 py-2 rounded-md shadow-[0_0_20px_-20px] bg-white transition-all duration-200 ease-in-out outline-none font-bold hover:bg-gray-200 hover:shadow-[0_0_20px_-18px] active:scale-95">
                                <Link to="/signup">Sign Up</Link>
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    </div>
);
}

export default Navigation;