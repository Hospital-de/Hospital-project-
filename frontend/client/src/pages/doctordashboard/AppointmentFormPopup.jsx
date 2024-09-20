import React, { useState } from 'react';
import axios from 'axios';

const AppointmentFormPopup = ({ onClose, selectedDate }) => {
  const [timeSlot, setTimeSlot] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const doctorId = 1; // Replace with dynamic doctor_id if needed
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

      await axios.post('http://localhost:4025/api/availability', {
        doctor_id: doctorId,
        date: formattedDate,
        time_slot: timeSlot,
        is_available: isAvailable
      });

      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Add Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Time Slot:</label>
            <input
              type="text"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Available:</label>
            <select
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value === 'true')}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#34a5b1] text-white rounded"
            >
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormPopup;
