import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Book, Clipboard, Star, Clock, Smile, Mail, CreditCard, MapPin } from 'lucide-react';
import axios from 'axios';

const CombinedDentalAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Book Appointment');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4025/api/doctors/${id}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch doctor details');
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const tabs = [
    { name: 'Book Appointment', icon: Book },
    { name: 'Services', icon: Clipboard },
    { name: 'Reviews', icon: Star },
  ];

  const workingHours = [
    { day: 'Mon-Fri', hours: '9:00 AM - 5:00 PM' },
    { day: 'Sat-Sun', hours: 'Closed' },
  ];

  const timeSlots = [
    '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am',
    '1:00 pm', '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', '3:30 pm'
  ];

  const addAvailableTime = (time) => {
    if (!availableTimes.includes(time)) {
      setAvailableTimes([...availableTimes, time]);
    }
  };

  const renderCalendar = () => {
    // ... (keep the calendar rendering logic from the previous component)
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto shadow-lg overflow-hidden font-sans bg-gray-50">
      <div className="bg-gradient-to-r from-sky-500 to-sky-700 p-6 text-white">
        <Link to="/doctors" className="text-white flex items-center mb-4">
          <ChevronLeft className="mr-2" />
          Back to Doctors List
        </Link>
        <h1 className="text-4xl font-bold">Doctor Appointment Calendar</h1>
        <p className="mt-2 text-lg">Schedule your next visit with ease</p>
      </div>
      
      <div className="flex p-4 bg-white border-b">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors mr-2 text-lg font-semibold ${
              activeTab === tab.name ? 'bg-sky-100 text-sky-800' : 'hover:bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <tab.icon className="mr-2" size={20} />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Doctor Profile Section */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <p className="text-teal-600 font-semibold mb-2 uppercase tracking-wide">Certified Specialist</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{doctor.name}</h2>
            <p className="text-xl text-gray-700 mb-4">{doctor.hospital_name}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <Mail className="text-teal-500 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <p className="text-gray-600 text-sm">{doctor.email}</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <CreditCard className="text-teal-500 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600 text-sm">{doctor.phone_number}</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <MapPin className="text-teal-500 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Address</p>
                  <p className="text-gray-600 text-sm">{doctor.address}</p>
                </div>
              </div>
              <div className="flex items-start bg-white p-4 rounded-lg shadow-md">
                <Clock className="text-teal-500 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Working Hours</p>
                  <p className="text-gray-600 text-sm">Mon-Fri, 9AM-5PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl mb-6">
              <img src={doctor.image || '/api/placeholder/400/400'} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Appointment Booking Section */}
        <div className="bg-sky-50 p-5 rounded-xl mb-6 border border-sky-100">
          <h2 className="font-semibold text-2xl flex items-center text-sky-700">
            <Smile className="mr-2 text-sky-500" size={24} />
            Appointment with {doctor.name}
          </h2>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-gray-600 flex items-center">
              <Clock className="mr-2" size={18} />
              Working Hours:
            </p>
            {workingHours.map((schedule, index) => (
              <span key={index} className="text-sm text-gray-600">
                {schedule.day}: {schedule.hours}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            {renderCalendar()}
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="font-semibold text-xl mb-4 flex items-center text-gray-800">
              <Clock className="mr-2 text-sky-500" size={24} />
              Available Times
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`text-center p-3 bg-gray-50 hover:bg-sky-100 rounded-lg transition-colors text-gray-700 hover:text-sky-800 font-semibold ${
                    availableTimes.includes(time) ? 'bg-sky-600 text-white' : ''
                  }`}
                  onClick={() => addAvailableTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedDentalAppointment;