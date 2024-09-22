import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice";
import allPatientsSlice from "./slices/admainSlice/allPatientsSlice";
import allDoctorsSlice from "./slices/admainSlice/allDoctorsSlice";
import MedicalRecords from "./slices/admainSlice/MedicalRecords";
import appointmentsReducer from "../redux/slices/appointmentsSlice"
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: allPatientsSlice,
    doctors: allDoctorsSlice,
    appointments: appointmentsReducer,
    medicalRecords: MedicalRecords,
    profile: profileReducer,

  },
});

export default store; 