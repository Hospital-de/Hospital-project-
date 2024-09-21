import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  deleteAppointment,
  updateAppointment,
} from "../redux/slices/admainSlice/appointments";
import DashboardLayout from "./admin";

const AppointmentsDashboard = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments.appointments);
  const loading = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id));
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateAppointment({ id, status: newStatus }));
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Appointments Dashboard</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Patient</th>
                <th className="py-3 px-6 text-left">Doctor</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Time Slot</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{appointment.patient_name}</td>
                  <td className="py-3 px-6">{appointment.doctor_name}</td>
                  <td className="py-3 px-6">{appointment.date}</td>
                  <td className="py-3 px-6">{appointment.time_slot}</td>
                  <td className="py-3 px-6">{appointment.status}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <button
                      className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600"
                      onClick={() =>
                        handleStatusChange(appointment.id, "confirmed")
                      }
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-yellow-500 text-white font-bold py-1 px-3 rounded hover:bg-yellow-600"
                      onClick={() =>
                        handleStatusChange(appointment.id, "cancelled")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsDashboard;
