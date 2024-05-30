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
import AlreadyReg from './pages/loginreg/already_reg';
import RegWaiting from './pages/loginreg/reg_waiting';
import NavbarWait from "./pages/loginreg/navbar_waiting";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import SidebarAd from "./pages/admin/ad_sidebar";
import StdManagementAd from "./pages/admin/ad_stdmanagement";
import StdManagementEnrAd from "./pages/admin/ad_stdmanagement_enroll";
import AtndManagementAd from "./pages/admin/ad_atndmanagement";
import AtndManagementRecAd from "./pages/admin/ad_atndmanagement_records";
import FinManagementAd from "./pages/admin/ad_finmanagement";
import FinManagementFeesAd from "./pages/admin/ad_finmanagement_classfees";
import FinManagementPayAd from "./pages/admin/ad_finmanagement_payment";
import FinManagementExpAd from "./pages/admin/ad_finmanagement_expenses";
import NewRegAd from "./pages/admin/ad_newreg";
import NewRegStdAd from "./pages/admin/ad_newreg_student";
import NewRegTeAd from "./pages/admin/ad_newreg_teacher";
import NewRegCouAd from "./pages/admin/ad_newreg_course";
import NewRegAdAd from "./pages/admin/ad_newreg_admin";
import DashboardAd from "./pages/admin/ad_dashboard";
import ProfileAd from "./pages/admin/ad_profile";
import LogoutAd from "./pages/admin/ad_logout";
import ClassalloAd from "./pages/admin/ad_classallo";
import ClassalloAlocAd from "./pages/admin/ad_classallo_allocate";
import ClassalloCurrentAd from "./pages/admin/ad_classallo_current";

import SidebarSt from "./pages/student/st_sidebar";
import BankdepoSt from "./pages/student/st_bankdepo";
import CalenderSt from "./pages/student/st_calender";
import DashboardSt from "./pages/student/st_dashboard";
import DashboardCouSt from "./pages/student/st_dashboard_course";
import LogoutSt from "./pages/student/st_logout";
import ProfileSt from "./pages/student/st_profile";
import ProfileStEdit from "./pages/student/st_profile_edit";

import SidebarTe from "./pages/teacher/te_sidebar";
import PaymentTe from "./pages/teacher/te_payment";
import CalenderTe from "./pages/teacher/te_calender";
import CreateQuiz from "./pages/teacher/te_create_quiz";
import DashboardTe from "./pages/teacher/te_dashboard";
import DashboardCouTe from "./pages/teacher/te_dashboard_course";
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
        <Route path="/already_reg" element={<><NavbarReg /><AlreadyReg /><Footer /></>} />
        <Route path="/reg_waiting" element={<><NavbarWait /><RegWaiting /><Footer /></>} />


        {/* <Route element={<AuthProvider />}> */}


        {/* admin routes */}
        <Route path="/ad_dashboard" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <DashboardAd />
            </div>
          } />
        <Route path="/ad_newreg" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <NewRegAd />
            </div>
          } />
        <Route path="/ad_newreg/student" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <NewRegStdAd />
            </div>
          } />
        <Route path="/ad_newreg/teacher" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <NewRegTeAd />
            </div>
          } />
        <Route path="/ad_newreg/course" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <NewRegCouAd />
            </div>
          } />
        <Route path="/ad_newreg/admin" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <NewRegAdAd />
            </div>
          } />
        <Route path="/ad_stdmanagement" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <StdManagementAd />
            </div>
          } />
        <Route path="/ad_stdmanagement/enroll" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <StdManagementEnrAd />
            </div>
          } />
        <Route path="/ad_atndmanagement" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <AtndManagementAd />
            </div>
          } />
        <Route path="/ad_atndmanagement/records" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <AtndManagementRecAd />
            </div>
          } />
        <Route path="/ad_finmanagement" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <FinManagementAd />
            </div>
          } />
        <Route path="/ad_finmanagement/classfees" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <FinManagementFeesAd />
            </div>
          } />
        <Route path="/ad_finmanagement/payment" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <FinManagementPayAd />
            </div>
          } />
        <Route path="/ad_finmanagement/expenses" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <FinManagementExpAd />
            </div>
          } />
        <Route path="/ad_classallo" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <ClassalloAd />
            </div>
          } />
        <Route path="/ad_classallo/allocate" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <ClassalloAlocAd />
            </div>
          } />
        <Route path="/ad_classallo/current" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarAd />
              <ClassalloCurrentAd />
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
        <Route path="/st_dashboard/course" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <DashboardCouSt />
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
        <Route path="/st_profile/edit" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarSt />
              <ProfileStEdit />
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
        <Route path="/te_dashboard/course" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <DashboardCouTe />
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

        <Route path="/te_payment" element={
            <div className="flex min-h-screen bg-gray-200">
              <SidebarTe />
              <PaymentTe />
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