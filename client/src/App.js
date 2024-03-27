// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import StudentRegistration from './pages/std_registration';
import RegistrationFees from './pages/reg_fees';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Navbar from "./pages/home/Navbar";
import NavbarReg from "./pages/home/NavbarReg";
import { VHome } from "./pages/home/VHome";
import About from "./pages/home/About";
import Teachers from "./pages/home/Teachers";
import News from "./pages/home/News";
import Contactus from "./pages/home/Contactus";
import Footer from "./pages/home/Footer";

function App() {
  return (
    <HelmetProvider>
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <VHome />
          <About />
          <Teachers />
          <News />
          <Contactus />
          <Footer />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/std_registration" element={<><NavbarReg /><StudentRegistration /></>} />
        <Route path="/reg_fees" element={<><NavbarReg /><RegistrationFees /></>} />
      </Routes>
      <Helmet>
          <title>Vision Institute - Atabage</title>
      </Helmet>
    </Router>
    </HelmetProvider>
  );
}

export default App;