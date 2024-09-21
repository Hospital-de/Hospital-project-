import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice";
import appointmentsReducer from "../redux/slices/appointmentsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,

  },
});

export default store;