import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaCalendar, FaComment, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4025/api/contact-us/creatcontact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-200 py-16">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-blue-800">Contact Us</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          {status === 'success' && (
            <div className="mb-6 flex items-center justify-center text-green-600 bg-green-100 p-4 rounded-lg">
              <FaCheckCircle className="mr-2" />
              <span>Your message has been sent successfully!</span>
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 flex items-center justify-center text-red-600 bg-red-100 p-4 rounded-lg">
              <FaExclamationCircle className="mr-2" />
              <span>An error occurred. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Name</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <FaUser className="mr-2 text-blue-500" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-none focus:ring-0 bg-transparent"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <FaEnvelope className="mr-2 text-blue-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-none focus:ring-0 bg-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-semibold text-gray-700">Subject</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                <FaCalendar className="mr-2 text-blue-500" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-none focus:ring-0 bg-transparent"
                  placeholder="What's this about?"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">Message</label>
              <div className="flex items-start border border-gray-300 rounded-lg px-4 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                <FaComment className="mr-2 text-blue-500 mt-1" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border-none focus:ring-0 bg-transparent"
                  rows="4"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;