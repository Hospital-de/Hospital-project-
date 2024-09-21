import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice";
import profileReducer from "./slices/profileSlice";

 



export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    
  },
});

export default store;