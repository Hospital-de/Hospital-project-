import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import axios from 'axios';
import AppointmentFormPopup from './AppointmentFormPopup';
import 'react-calendar/dist/Calendar.css';
import './customCalendarStyles.css'; 
import WelcomingAppointment from './WelcomingAppointment';

const AppointmentForDoctor = () => {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointmentsForDate, setAppointmentsForDate] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextAppointment, setNextAppointment] = useState(null);
  const [latestPreviousAppointment, setLatestPreviousAppointment] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('http://localhost:4025/api/availability/1');
        setAvailability(response.data);
        setNextAppointment(findNextAppointment(response.data));
        setLatestPreviousAppointment(findLatestPreviousAppointment(response.data));
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

  const findNextAppointment = (appointments) => {
    const now = new Date();
    return appointments.find(app => new Date(app.date) > now);
  };

  const findLatestPreviousAppointment = (appointments) => {
    const now = new Date();
    const pastAppointments = appointments.filter(app => new Date(app.date) < now);
    return pastAppointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  };

  const changeMonth = (increment) => {
    setCurrentDate(prevDate => increment ? addMonths(prevDate, 1) : subMonths(prevDate, 1));
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const getDayClass = (day) => {
    let classes = "w-8 h-8 rounded-full flex items-center justify-center";
    if (!isSameMonth(day, currentDate)) classes += " text-gray-300";
    if (isSameDay(day, selectedDate)) classes += " bg-blue-500 text-white";
    if (isToday(day)) classes += " border-2 border-blue-500";
    if (availability.some(app => isSameDay(new Date(app.date), day))) {
      classes += " bg-yellow-300";
    }
    return classes;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <WelcomingAppointment />
      
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-8">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Your Schedule</h1>
            <button
              onClick={() => setShowPopup(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center hover:bg-blue-600 transition duration-300"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Appointment
            </button>
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
              {nextAppointment && (
                <div className="mt-6 bg-blue-50 p-4 rounded-lg relative">
                  <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-2">
                    <CalendarIcon size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-800">Next Appointment</h3>
                  <p className="text-sm text-gray-600">{format(new Date(nextAppointment.date), 'MMMM d, yyyy')}</p>
                  <p className="text-sm font-medium text-gray-700">Dr. {nextAppointment.doctorName || 'Smith'}</p>
                  <p className="text-sm text-gray-600">{nextAppointment.time_slot}</p>
                </div>
              )}
              {latestPreviousAppointment && (
                <div className="mt-6 bg-green-50 p-4 rounded-lg relative">
                  <div className="absolute top-2 right-2 bg-green-400 rounded-full p-2">
                    <CalendarIcon size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-gray-800">Latest Previous Appointment</h3>
                  <p className="text-sm text-gray-600">{format(new Date(latestPreviousAppointment.date), 'MMMM d, yyyy')}</p>
                  <p className="text-sm font-medium text-gray-700">Dr. {latestPreviousAppointment.doctorName || 'Smith'}</p>
                  <p className="text-sm text-gray-600">{latestPreviousAppointment.time_slot}</p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Appointments for {format(selectedDate, 'MMMM d, yyyy')}</h2>
              <ul className="space-y-4">
                {appointmentsForDate.length > 0 ? (
                  appointmentsForDate.map((appointment) => (
                    <li key={appointment.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Clock className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{appointment.time_slot}</p>
                        <p className="text-sm text-gray-500">{appointment.is_available ? 'Available' : 'Booked'}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No appointments available for this date.</li>
                )}
              </ul>
            </div>
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