import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authslice";
import allPatientsSlice from "./slices/admainSlice/allPatientsSlice";
import allDoctorsSlice from "./slices/admainSlice/allDoctorsSlice";
import appointments from "./slices/admainSlice/appointments";
import MedicalRecords from "./slices/admainSlice/MedicalRecords";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: allPatientsSlice,
    doctors: allDoctorsSlice,
    appointments: appointments,
    medicalRecords: MedicalRecords,
  },
});

export default store;
