// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../src/redux/slices/authslice';
// import { useNavigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';

// const Home = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };
// /* هاي بس للتجربة  */
//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <Header/>
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <h2 className="text-3xl font-extrabold text-gray-900">
//                   Welcome, {user.name}!
//                 </h2>
//                 <p>You are logged in as a {user.role}.</p>
//                 <button
//                   onClick={handleLogout}
//                   className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Home;
// src/pages/HomePage.js
import React from "react";
import { FaTooth, FaSmile, FaTeeth } from "react-icons/fa";
import img from "./assets/tow.jpg"; // Import image
import img2 from "./assets/ms.jpg"; // Import image
import img3 from "./assets/newhero.jpg"; // Import image
import Footer from "./components/Footer";
import Header from "./components/Header";

// List of dentists
const dentists = [
  { name: "Dr. Ahmed Khaled", specialty: "Orthodontics" },
  { name: "Dr. Sarah Mohammed", specialty: "Oral and Maxillofacial Surgery" },
  { name: "Dr. Mahmoud Ali", specialty: "Root Canal Treatment" },
  { name: "Dr. Fatima Hassan", specialty: "Pediatric Dentistry" },
];

// List of testimonials
const testimonials = [
  { name: "Mohammed S.", text: "Excellent service and a very friendly staff!" },
  {
    name: "Layla A.",
    text: "The doctors are highly knowledgeable and caring.",
  },
  { name: "Ahmed R.", text: "I always feel well cared for here." },
];

// List of news
const news = [
  { title: "New Techniques in Dental Implants", date: "May 15, 2024" },
  { title: "The Importance of Regular Dental Check-ups", date: "May 10, 2024" },
  { title: "Tips for Maintaining Oral Health", date: "May 5, 2024" },
];

// List of past appointments
const pastAppointments = [
  {
    date: "2024-05-01",
    dentist: "Dr. Ahmed Khaled",
    treatment: "Routine Check-up",
  },
  {
    date: "2024-04-15",
    dentist: "Dr. Sarah Mohammed",
    treatment: "Dental Filling",
  },
  {
    date: "2024-03-22",
    dentist: "Dr. Mahmoud Ali",
    treatment: "Teeth Cleaning",
  },
];

// Main component
const Home = () => {
  return (
    <div className="font-sans">
      <Header />
      {/* Hero Section */}
      <section className="bg-blue-200 text-white py-20">
        
        <div className="container mx-auto flex items-center">
          <div className="w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              Bright Smile Dental Clinic
            </h1>
            <p className="mb-6">
              Get the best care for your teeth with our specialized team of
              dentists.
            </p>
            <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-blue-100">
              Book Your Appointment Now
            </button>
          </div>
          <div className="w-1/2">
            <img src={img3} alt="Dentist" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <div className="flex justify-around">
            {[
              { name: "General Dentistry", icon: FaTooth },
              { name: "Cosmetic Dentistry", icon: FaSmile },
              { name: "Orthodontics", icon: FaTeeth },
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
                  <service.icon size={40} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto flex items-center">
          <div className="w-1/2">
            <img src={img2} alt="Dental Team" className="rounded-lg shadow-lg" />
          </div>
          <div className="w-1/2 pr-12">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="mb-6">
              We are a team of specialized dentists committed to providing the
              highest level of care for our patients' oral health.
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Dentists Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Medical Team
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {dentists.map((dentist, index) => (
              <div key={index} className="text-center">
                <img
                  src={img3}
                  alt={dentist.name}
                  className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                />
                <h3 className="text-xl font-semibold">{dentist.name}</h3>
                <p className="text-gray-600">{dentist.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-blue-600 p-6 rounded-lg">
                <p className="mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Latest News</h2>
          <div className="grid grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Appointments Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Past Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-right">Date</th>
                  <th className="py-3 px-4 text-right">Dentist</th>
                  <th className="py-3 px-4 text-right">Treatment</th>
                </tr>
              </thead>
              <tbody>
                {pastAppointments.map((appointment, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-4">{appointment.date}</td>
                    <td className="py-3 px-4">{appointment.dentist}</td>
                    <td className="py-3 px-4">{appointment.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

