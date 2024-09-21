import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice";
import appointmentsReducer from "../redux/slices/appointmentsSlice"
import profileReducer from "./slices/profileSlice";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,
    profile: profileReducer,
  },
});

export default store;