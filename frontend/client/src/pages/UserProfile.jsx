import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUser, FaCalendar, FaChartBar } from "react-icons/fa";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "Kevin Milgreen",
    email: "kevin@updb.co.uk",
    password: "",
  });

  const [appointments, setAppointments] = useState([
    { id: 1, date: "12/12/2023", service: "Teeth Whitening" },
    { id: 2, date: "14/12/2023", service: "Dental Checkup" },
  ]);

  const [report, setReport] = useState({
    score: 33,
    details: "Good oral health, next checkup in 6 months.",
  });

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Simulate fetching user data from an API
    setTimeout(() => {
      setUserData((prevData) => ({
        ...prevData,
        name: "Kevin Milgreen (Updated)",
      }));
    }, 2000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for updating user data goes here
    console.log("Updated User Data: ", userData);
    alert("Profile updated successfully!");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Save Changes
            </button>
          </form>
        );
      case "appointments":
        return (
          <ul className="space-y-2">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                <div>
                  <p className="text-gray-700 font-semibold">
                    {appointment.service}
                  </p>
                  <p className="text-sm text-gray-500">{appointment.date}</p>
                </div>
                <button className="text-blue-500 hover:text-blue-700 transition duration-300">
                  Reschedule
                </button>
              </li>
            ))}
          </ul>
        );
      case "report":
        return (
          <div>
            
            <p className="text-2xl font-bold mb-4">
              Score: <span className="text-blue-500">{report.score}</span>{" "}
              points
            </p>
            <p className="text-gray-600">{report.details}</p>
            <div
              className="mt-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded"
              role="alert"
            >
              <p className="font-bold">Tip</p>
              <p>
                Regular dental check-ups can improve your oral health score!
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/4 bg-gray-200 p-4">
              <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
              <nav>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center w-full text-left py-2 px-4 rounded ${
                    activeTab === "profile"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <FaUser className="mr-2" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`flex items-center w-full text-left py-2 px-4 rounded mt-2 ${
                    activeTab === "appointments"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <FaCalendar className="mr-2" /> Appointments
                </button>
                <button
                  onClick={() => setActiveTab("report")}
                  className={`flex items-center w-full text-left py-2 px-4 rounded mt-2 ${
                    activeTab === "report"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-300"
                  }`}
                >
                  <FaChartBar className="mr-2" /> Health Report
                </button>
              </nav>
            </div>
            <div className="md:w-3/4 p-6">
              <h3 className="text-2xl font-bold mb-4">
                {activeTab === "profile" && "Profile Information"}
                {activeTab === "appointments" && "Your Appointments"}
                {activeTab === "report" && "Your Health Report"}
              </h3>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;