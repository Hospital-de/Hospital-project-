import React from 'react';
import { FaHospital, FaUserMd, FaAward, FaHandHoldingMedical } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="font-sans">
      <Header/>
      
      {/* Hero Section */}
      <section className="bg-blue-200 text-blue-800 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Bright Smile Dental Clinic</h1>
          <p className="text-xl mb-8">Revolutionizing dental care with advanced technology and compassionate service</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Mission</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img src="/api/placeholder/600/400" alt="Dental Team" className="rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <p className="text-lg mb-6">
                At Bright Smile Dental Clinic, our mission is to provide exceptional dental care that enhances the overall health and well-being of our patients. We are committed to utilizing cutting-edge technology, fostering a warm and welcoming environment, and delivering personalized treatment plans that cater to each individual's unique needs.
              </p>
              <p className="text-lg">
                We strive to educate our patients about oral health, empower them to make informed decisions about their dental care, and create lasting relationships built on trust and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaHospital, title: "Excellence", description: "We are committed to delivering the highest standard of dental care." },
              { icon: FaUserMd, title: "Compassion", description: "We treat each patient with empathy, kindness, and respect." },
              { icon: FaAward, title: "Innovation", description: "We embrace advanced technologies to improve patient outcomes." },
              { icon: FaHandHoldingMedical, title: "Integrity", description: "We uphold the highest ethical standards in all our practices." }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <value.icon size={40} className="text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our History</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <p className="text-lg mb-6">
                Established in 1995, Bright Smile Dental Clinic began as a small practice with a big vision: to transform dental care in our community. Dr. Ahmed Khaled, our founder, saw the need for a dental clinic that combined advanced technology with a patient-first approach.
              </p>
              <p className="text-lg mb-6">
                Over the years, we've grown from a single-chair clinic to a state-of-the-art facility with multiple specialties. We've introduced cutting-edge treatments, expanded our team of experts, and touched the lives of thousands of patients.
              </p>
              <p className="text-lg">
                Today, we stand as a leader in dental care, continuing our commitment to innovation, excellence, and compassionate service.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src="/api/placeholder/600/400" alt="Clinic History" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-blue-200 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Dr. Ahmed Khaled", role: "Founder & Chief Dentist", specialty: "Orthodontics" },
              { name: "Dr. Sarah Mohammed", role: "Senior Dentist", specialty: "Oral and Maxillofacial Surgery" },
              { name: "Dr. Mahmoud Ali", role: "Dentist", specialty: "Root Canal Treatment" },
              { name: "Dr. Fatima Hassan", role: "Pediatric Dentist", specialty: "Pediatric Dentistry" }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src="/api/placeholder/150/150" alt="member.name" className="rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-500 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mohammed S.", text: "Excellent service and a very friendly staff! I've never felt more comfortable at a dental clinic." },
              { name: "Layla A.", text: "The doctors are highly knowledgeable and caring. They explained everything in detail and made sure I was comfortable throughout my treatment." },
              { name: "Ahmed R.", text: "I always feel well cared for here. The clinic is modern, clean, and the staff is professional. Highly recommend!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-blue-500">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Care?</h2>
          <p className="text-xl mb-8">Schedule your appointment today and start your journey to a brighter smile!</p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-bold hover:bg-blue-100 transition duration-300">
            Book Your Appointment
          </button>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutUs;