import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Signup from '../src/signup';
import Login from '../src/login';
import Home from '../src/home';
import CombinedDentalAppointment from './doctordeatils';
import DoctorsList from './ourdoctors';


import DoctorDashboardMain from './pages/doctordashboard/DoctorDashboardMain';
import DoctorDashboardMain from './pages/doctordashboard/DoctorDashboardMain';

import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';
import UserProfile from './pages/UserProfile';


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
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/doctor/:id" element={<CombinedDentalAppointment />} />
          <Route path="/ourdoctors" element={<DoctorsList />} />
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
              <DoctorDashboardMain />
              </PrivateRoute>
            }
          />

               <Route path="/DoctorDashboardMain" element={<DoctorDashboardMain />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;