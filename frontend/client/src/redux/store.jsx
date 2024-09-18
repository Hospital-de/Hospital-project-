import { configureStore } from "@reduxjs/toolkit";

// Create an empty slice (reducer) since we don't have any initial state or actions
const rootReducer = (state = {}, action) => {
  return state; // Return the current state, as there are no actions to handle
};

// Create the Redux store
const store = configureStore({
  reducer: rootReducer, // Pass the root reducer
});

export default store;
