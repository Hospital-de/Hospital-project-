import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';
import AppointmentFormPopup from './AppointmentFormPopup'; // Import the popup component
import 'react-calendar/dist/Calendar.css';

const AppointmentForDoctor = () => {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointmentsForDate, setAppointmentsForDate] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('http://localhost:4025/api/availability/1');
        setAvailability(response.data);
      } catch (error) {
        console.error('Error fetching availability:', error);
      }
    };

    fetchAvailability();
  }, []);

  const formatDate = (date) => {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0];
  };

  const fetchAvailabilityForDate = (date) => {
    const formattedDate = formatDate(date);
    const filteredAppointments = availability.filter((appointment) => {
      const appointmentDate = formatDate(new Date(appointment.date));
      return appointmentDate === formattedDate;
    });

    setAppointmentsForDate(filteredAppointments);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchAvailabilityForDate(date);
  };

  const getTileClassName = ({ date }) => {
    const dateString = formatDate(date);
    const availabilityForDate = availability.find((a) => formatDate(new Date(a.date)) === dateString);

    if (availabilityForDate) {
      return availabilityForDate.is_booked
        ? 'bg-red-500 text-white rounded-full'
        : 'bg-green-500 text-white rounded-full';
    }
    return '';
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Your Schedule</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="px-4 py-2 bg-[#34a5b1] text-white rounded flex items-center"
        >
          <CalendarIcon className="mr-2 h-5 w-5" /> Add Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Calendar</h2>
          </div>
          <div className="p-4">
            <Calendar
              onChange={handleDateChange}
              tileClassName={getTileClassName}
              className="react-calendar rounded-lg shadow-md border border-gray-200"
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Appointments for {formatDate(selectedDate)}</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {appointmentsForDate.length > 0 ? (
                appointmentsForDate.map((appointment) => (
                  <li key={appointment.id} className="flex items-start p-2 border-b border-gray-200">
                    <div className="flex-shrink-0 w-4 h-4 rounded-full mr-3 bg-[#34a5b1]"></div>
                    <div>
                      <p className="font-medium">Time Slot: {appointment.time_slot}</p>
                      <p className="text-sm text-gray-500">{appointment.is_available ? 'Available' : 'Booked'}</p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No appointments available for this date.</li>
              )}
            </ul>
          </div>
          <div>
            {appointmentsForDate.length > 0 && (
              appointmentsForDate.map((appointment) => (
                <li key={appointment.id} className="flex items-start p-2 border-b border-gray-200">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full mr-3 bg-[#34a5b1]"></div>
                  <div>
                    <p className="font-medium">Appointment Date: {appointment.date}</p>
                  </div>
                </li>
              ))
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <AppointmentFormPopup
          onClose={() => setShowPopup(false)}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default AppointmentForDoctor;
