import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from '../src/signup';
import Login from '../src/login';
import Home from '../src/home';
import DoctorDashboard from '../src/doctordashboard';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import DoctorDashboardMain from './pages/doctordashboard/DoctorDashboardMain';

import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import ContactUs from './pages/contactUs';

import AboutUs from './pages/aboutUs';
import PayPalPayment from './components/PayPalPayment';



const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (

    <Router>


      <div className="App">

      <PayPalScriptProvider options={{ "client-id": "AZZnJo9B4ulFid8Kdc6--QozivoXGg7263KyHe5KFomW-t-qQQ4cWR7l2lFScv10s0N_iq-DQpewLwDJ" }}>
      <PayPalPayment amount="10.00" userId="123" appointmentId="456" />
        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          
         
    
     
         
        
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <PrivateRoute allowedRoles={["Doctor"]}>
                <DoctorDashboard />
              </PrivateRoute>
            }
          />

               <Route path="/DoctorDashboardMain" element={<DoctorDashboardMain />} />

        </Routes>
        </PayPalScriptProvider>
      </div>
   
    </Router>
  );
}

export default App;