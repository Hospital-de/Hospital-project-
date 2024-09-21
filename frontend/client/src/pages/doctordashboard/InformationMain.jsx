import React from 'react';
import { Calendar, MessageSquare, Users, Activity, Plus, Bell } from 'lucide-react';


const InformationMain = () => {

  return (
    <div className="rounded-xl  min-h-screen mt-12">
      <div className="rounded-xl shadow-md bg-gray-100  p-10">
        <header className="flex justify-between items-center  mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Good Morning,</h1>
            <h2 className="text-2xl font-semibold text-blue-600">Dr. Arkali Moorthi</h2>
            <p className="text-gray-600">Have a nice day at work</p>
          </div>
          <div className="flex space-x-4 items-center">
            <button className="text-gray-600 hover:text-gray-800">
              <Bell size={24} />
            </button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
              + Add Patient
            </button>
          </div>
        </header>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Weekly Reports</h3>
          <div className="grid grid-cols-4 gap-4">
            <ReportCard icon={<Calendar className="text-teal-500" />} title="Total Patients" value="268" color="bg-teal-100" />
            <ReportCard icon={<MessageSquare className="text-yellow-500" />} title="News Calls" value="260" color="bg-yellow-100" />
            <ReportCard icon={<Users className="text-red-500" />} title="Appointments" value="128" color="bg-red-100" />
            <ReportCard icon={<Activity className="text-blue-500" />} title="Annual Plan" value="321" color="bg-blue-100" />
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <Plus className="text-gray-400" size={24} />
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Today's Appointment</h3>
            <button className="text-blue-500 hover:text-blue-600">See all</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Name</th>
                <th className="pb-2">Gender</th>
                <th className="pb-2">Date</th>
                <th className="pb-2">Time</th>
                <th className="pb-2">Status</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              <AppointmentRow
                name="Natalie Tompson"
                gender="Female"
                date="20 Jun 2023"
                time="09:30 AM"
                status="Checked"
              />
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

const ReportCard = ({ icon, title, value, color }) => (
  <div className={`${color} p-4 rounded-lg flex items-center space-x-4`}>
    <div className="p-3 bg-white rounded-full">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AppointmentRow = ({ name, gender, date, time, status }) => (
  <tr className="border-b border-gray-200">
    <td className="py-4 flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <span>{name}</span>
    </td>
    <td>{gender}</td>
    <td>{date}</td>
    <td>{time}</td>
    <td>
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
        {status}
      </span>
    </td>
    <td>
      <button className="text-gray-400 hover:text-gray-600">...</button>
    </td>
  </tr>
);


export default InformationMain;

