import React, { useState, useEffect, useCallback } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Appointmentforusertestfile = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilitiesForDate, setAvailabilitiesForDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [patientId, setPatientId] = useState(1); // Replace with actual patient ID

  // Fetch availabilities from the backend
  const fetchAvailabilities = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4025/api/Allavailability');
      const availabilitiesArray = Array.isArray(response.data) ? response.data : [];
      setAvailabilities(availabilitiesArray);
      console.log(availabilitiesArray); // Log all fetched availabilities
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      setAvailabilities([]);
    }
  }, []);

  useEffect(() => {
    fetchAvailabilities();
  }, [fetchAvailabilities]);

  const formatDate = (date) => {
    // Add one day to the date to correct the offset
    const correctedDate = new Date(date);
    correctedDate.setDate(correctedDate.getDate() + 1);
    return correctedDate.toISOString().split('T')[0];
  };

  // Fetch availabilities for the selected date
  const fetchAvailabilitiesForDate = (date) => {
    const formattedDate = formatDate(date);
    console.log("Selected Date (from calendar):", formattedDate); // Print the selected date
    const filteredAvailabilities = availabilities.filter((availability) => {
      const availabilityDate = new Date(availability.date);
      availabilityDate.setDate(availabilityDate.getDate() + 1); // Add one day to correct the offset
      const correctedAvailabilityDate = availabilityDate.toISOString().split('T')[0];
      console.log("Availability Date (from API):", correctedAvailabilityDate); // Print each availability date
      return correctedAvailabilityDate === formattedDate;
    });
    setAvailabilitiesForDate(filteredAvailabilities);
  };

  // Handle date change from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date (onClick):", format(date, 'yyyy-MM-dd')); // Print the date selected from the calendar
    fetchAvailabilitiesForDate(date);
  };

  // Change the current month
  const changeMonth = (increment) => {
    setCurrentDate(prevDate => increment ? addMonths(prevDate, 1) : subMonths(prevDate, 1));
  };

  // Get all days in the current month for the calendar
  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  // Determine the CSS classes for each day in the calendar
  const getDayClass = (day) => {
    let classes = "w-8 h-8 rounded-full flex items-center justify-center";
    if (!isSameMonth(day, currentDate)) classes += " text-gray-300";
    if (isSameDay(day, selectedDate)) classes += " bg-blue-500 text-white";
    if (isToday(day)) classes += " border-2 border-blue-500";
    
    const dayAvailabilities = availabilities.filter(avail => {
      const availDate = new Date(avail.date);
      availDate.setDate(availDate.getDate() + 1); // Add one day to correct the offset
      return isSameDay(availDate, day);
    });
    
    if (dayAvailabilities.length > 0) {
      const hasAvailable = dayAvailabilities.some(avail => avail.is_available && !avail.is_booked);
      const allBooked = dayAvailabilities.every(avail => avail.is_booked);
      
      if (allBooked) {
        classes += " bg-red-300"; // All appointments are booked
      } else if (hasAvailable) {
        classes += " bg-yellow-300"; // There are available appointments
      }
    }
    
    return classes;
  };

  // Book an appointment
  const bookAppointment = async (availability) => {
    try {
      const response = await axios.post('http://localhost:4025/api/appointments/book', {
        patient_id: 11,
        doctor_id: availability.doctor_id,
        availability_id: availability.id,
        notes: "Booked via web interface"
      });
      if (response.status === 201) {
        // Update the local state to reflect the booking
        const updatedAvailabilities = availabilities.map(avail =>
          avail.id === availability.id ? { ...avail, is_booked: true } : avail
        );
        setAvailabilities(updatedAvailabilities);
        fetchAvailabilitiesForDate(selectedDate);
        alert('Appointment booked successfully!');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (error.response) {
        alert(`Failed to book appointment: ${error.response.data.message}`);
      } else if (error.request) {
        alert('No response received from server. Please try again later.');
      } else {
        alert('An error occurred while booking the appointment. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-8">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Available Appointments</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Calendar</h2>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-600">{format(currentDate, 'MMMM yyyy')}</h3>
                <div className="flex space-x-2">
                  <button onClick={() => changeMonth(false)} className="p-1 rounded-full hover:bg-gray-200 transition duration-300">
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>
                  <button onClick={() => changeMonth(true)} className="p-1 rounded-full hover:bg-gray-200 transition duration-300">
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-400">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map(day => (
                  <button
                    key={day.toString()}
                    className={getDayClass(day)}
                    onClick={() => handleDateChange(day)}
                  >
                    {format(day, 'd')}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Appointments for {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <ul className="space-y-4">
                {availabilitiesForDate.length > 0 ? (
                  availabilitiesForDate.map((availability) => (
                    <li key={availability.id} className={`border p-4 rounded-lg shadow-sm ${availability.is_booked ? 'bg-red-100' : 'bg-green-100'}`}>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {format(new Date(availability.date), 'MMMM d, yyyy')} at {availability.time_slot}
                        </h3>
                        <p className="text-sm text-gray-600">Doctor: Dr. {availability.doctor_name}</p>
                        {!availability.is_booked && (
                          <button 
                            onClick={() => bookAppointment(availability)}
                            className="mt-2 bg-teal-900 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                          >
                            Book Appointment
                          </button>
                        )}
                        {availability.is_booked && (
                          <p className="mt-2 text-red-600 font-semibold">Booked</p>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No appointments available for this day.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointmentforusertestfile;