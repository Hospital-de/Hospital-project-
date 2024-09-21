import React, { useEffect } from "react";
import {
  FaTooth,
  FaSmile,
  FaTeeth,
  FaCalendar,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import Footer from "./components/Footer";
import Header from "./components/Header";
import img from "./assets/tow.jpg";
import img2 from "./assets/ms.jpg";
import img3 from "./assets/newhero.jpg";

// List of dentists (existing data)
const dentists = [
  { name: "Dr. Ahmed Khaled", specialty: "Orthodontics" },
  { name: "Dr. Sarah Mohammed", specialty: "Oral and Maxillofacial Surgery" },
  { name: "Dr. Mahmoud Ali", specialty: "Root Canal Treatment" },
  { name: "Dr. Fatima Hassan", specialty: "Pediatric Dentistry" },
];

const Home = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Trigger animation after 1 second
    const timer = setTimeout(() => {
      controls.start("visible");
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 1 } },
      }}
      className="font-sans"
    >
      {/* Updated Header with dual neutral colors and transparency */}
      <Header />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-gray-200 to-gray-400 text-white py-20 bg-opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
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
            <motion.img
              src={img3}
              alt="Dentist"
              className="rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <div className="flex justify-around">
            {[
              { name: "General Dentistry", icon: FaTooth },
              { name: "Cosmetic Dentistry", icon: FaSmile },
              { name: "Orthodontics", icon: FaTeeth },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
                  <service.icon size={40} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">{service.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: FaCalendar,
                title: "Easy Scheduling",
                description: "Book your appointments online with ease.",
              },
              {
                icon: FaClock,
                title: "Extended Hours",
                description:
                  "We offer flexible hours to fit your busy schedule.",
              },
              {
                icon: FaPhoneAlt,
                title: "24/7 Support",
                description:
                  "Our team is always available to answer your questions.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                whileHover={{ scale: 1.05 }}
              >
                <item.icon size={40} className="text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="bg-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="container mx-auto flex items-center">
          <div className="w-1/2">
            <img
              src={img2}
              alt="Dental Team"
              className="rounded-lg shadow-lg"
            />
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
      </motion.section>

      {/* Dentists Section */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Our Medical Team
          </h2>
          <div className="grid grid-cols-4 gap-8">
            {dentists.map((dentist, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={img3}
                  alt={dentist.name}
                  className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                />
                <h3 className="text-xl font-semibold">{dentist.name}</h3>
                <p className="text-gray-600">{dentist.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
     

      <Footer />
    </motion.div>
  );
};

export default Home;
