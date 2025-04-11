// src/components/App/App.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast'
import Navigation from "../Navigation/Navigation";
import "./App.css";

// Step 7: 
// - Import useSelector and useDispatch from "react-redux".
// - Import the login and loader actions from the authSlice.
// - Import AppLoader to display while loading.
import { useSelector, useDispatch } from 'react-redux';
import { login, loader } from '../../store/slices/authSlice';
import AppLoader from "../../util/loaders/AppLoader";

function App() {
  // Step 7:
  // - Initialize the dispatch function using useDispatch.
  // - Retrieve the "loaded" state from the auth slice using useSelector.
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.auth.loaded)


  // Step 8: 
  // - Use useEffect to simulate loading user data.
  //   - Check if the "loaded" state is false.
  //   - If false, use setTimeout to simulate fetching data after 2 seconds.
  //   - Dispatch the login action to simulate a user login.
  //   - Dispatch the loader action to update the "loaded" state to true.
  //   - Include dispatch and loaded as dependencies in the useEffect hook.
  useEffect(() => {
    if(!loaded){
        setTimeout(()=>{
            console.log("simulating fetching data")
            dispatch(login());
            dispatch(loader(true));
        }, 2000)
    }
  }),[dispatch, loaded]

  // Step 9:
  // - Before rendering the main UI, check if the "loaded" state is false.
  //   - If false, return the AppLoader component to show a loading indicator.
  //   - If true, render the application's main UI.
  if(!loaded){ // THIS MAY NEED TO BE CHANGED
    return (
        <>
        <main>
            <AppLoader/>
        </main>
        </>
    );
  } 
  else {
    return (
        <div className="App">
          <header>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <h1>Ravenous</h1>
            </Link>
            <Navigation />
          </header>
          <main>
            <Outlet />
          </main>
          <Toaster/>
        </div>
      );
  }
}

export default App;


