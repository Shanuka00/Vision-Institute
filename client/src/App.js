// client/src/App.js

import HNavbar from "./pages/home/HNavbar";
import NavbarReg from "./pages/home/NavbarReg";
import { VHome } from "./pages/home/VHome";
import About from "./pages/home/About";
import Teachers from "./pages/home/Teachers";
import News from "./pages/home/News";
import Contactus from "./pages/home/Contactus";
import Footer from "./pages/home/Footer";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/loginreg/login';
import StudentRegistration from './pages/loginreg/std_registration';
import RegistrationFees from './pages/loginreg/reg_fees';
import IdCreation from './pages/loginreg/id_create';
import RegWaiting from './pages/loginreg/reg_waiting';
import NavbarWait from "./pages/loginreg/navbar_waiting";
import { Helmet, HelmetProvider } from 'react-helmet-async';

//import { AuthProvider } from './services/AuthContext';

import SidebarAd from "./pages/admin/ad_sidebar";
import BankdepoAd from "./pages/admin/ad_bankdepo";
import CalenderAd from "./pages/admin/ad_calender";
import DashboardAd from "./pages/admin/ad_dashboard";
import LogoutAd from "./pages/admin/ad_logout";
import ProfileAd from "./pages/admin/ad_profile";

import SidebarSt from "./pages/student/st_sidebar";
import BankdepoSt from "./pages/student/st_bankdepo";
import CalenderSt from "./pages/student/st_calender";
import DashboardSt from "./pages/student/st_dashboard";
import LogoutSt from "./pages/student/st_logout";
import ProfileSt from "./pages/student/st_profile";

import SidebarTe from "./pages/teacher/te_sidebar";
import BankdepoTe from "./pages/teacher/te_bankdepo";
import CalenderTe from "./pages/teacher/te_calender";
import CreateQuiz from "./pages/teacher/te_create_quiz";
import DashboardTe from "./pages/teacher/te_dashboard";
import LogoutTe from "./pages/teacher/te_logout";
import ProfileTe from "./pages/teacher/te_profile";

function App() {
  return (

    <HelmetProvider>
    <Router>
      <Routes>


        {/* website routes */}
        <Route path="/" element={<>
          <HNavbar />
          <VHome />
          <About />
          <Teachers />
          <News />
          <Contactus />
          <Footer />
        </>} />  

        {/* login/registration routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/std_registration" element={<><NavbarReg /><StudentRegistration /><Footer /></>} />
        <Route path="/reg_fees" element={<><NavbarReg /><RegistrationFees /><Footer /></>} />
        <Route path="/id_create" element={<><NavbarReg /><IdCreation /><Footer /></>} />
        <Route path="/reg_waiting" element={<><NavbarWait /><RegWaiting /><Footer /></>} />


        {/* <Route element={<AuthProvider />}> */}


        {/* admin routes */}
        <Route path="/ad_dashboard" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <DashboardAd />
            </div>
          } />
        <Route path="/ad_calender" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <CalenderAd />
            </div>
          } />
          <Route path="/ad_bankdepo" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <BankdepoAd />
            </div>
          } />
        <Route path="/ad_profile" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <ProfileAd />
            </div>
          } />
        <Route path="/ad_logout" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <LogoutAd />
            </div>
          } />


        {/* student routes */}
        <Route path="/st_dashboard" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarSt />
              <DashboardSt />
            </div>
          } />
        <Route path="/st_calender" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarSt />
              <CalenderSt />
            </div>
          } />
          <Route path="/st_bankdepo" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarSt />
              <BankdepoSt />
            </div>
          } />
        <Route path="/st_profile" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarSt />
              <ProfileSt />
            </div>
          } />
        <Route path="/st_logout" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarSt />
              <LogoutSt />
            </div>
          } />

          
        {/* teacher routes */}
        <Route path="/te_dashboard" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <DashboardTe />
            </div>
          } />

        <Route path="/te_calender" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <CalenderTe />
            </div>
          } />
        <Route path="/te_calender/create_quiz" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <CreateQuiz />
            </div>
          } />

        <Route path="/te_bankdepo" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <BankdepoTe />
            </div>
          } />

        <Route path="/te_profile" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <ProfileTe />
            </div>
          } />

        <Route path="/te_logout" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <LogoutTe />
            </div>
          } />

        {/* </Route> */}


      </Routes>
      <Helmet>
          <title>Vision Institute - Atabage</title>
      </Helmet>
    </Router>
    </HelmetProvider>
  );
}

export default App;