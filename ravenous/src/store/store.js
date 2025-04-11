// 1. Import `configureStore` from Redux Toolkit:
import { configureStore } from "@reduxjs/toolkit";
// This utility function simplifies the creation and configuration of your Redux store. It automatically sets up the Redux DevTools extension and middleware needed for a smooth development experience.

// 2. Import your `authReducer`:
import authReducer from "./slices/authSlice";
// This reducer will handle all authentication-related state changes in your application. Ensure you have created an authSlice using createSlice from Redux Toolkit, and you are now importing the resulting reducer.

// Setup Redux store with slices
const store = configureStore({
    reducer: {
      // Assigning authReducer to handle auth state
      auth: authReducer,
    },
  });

export default store;