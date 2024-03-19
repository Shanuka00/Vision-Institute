// client/src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// //import Home from './pages/home';
// import Login from './pages/login';
// import StudentRegistration from './pages/std_registration';

// import Navbar from "./pages/components/Navbar";
// import { Hero } from "./pages/components/Hero";
// import About from "./pages/components/About";
// import Support from "./pages/components/Support";
// import AllInOne from "./pages/components/AllInOne";
// import Pricing from "./pages/components/Pricing";
// import Footer from "./pages/components/Footer";

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {" "}
//         <Navbar />
//         <Hero />
//         <About />
//         <Support />
//         <AllInOne />
//         <Pricing />
//         <Footer />

//         <Route path="/login" element={<Login />} />
//         <Route path="/std_registration" element={<StudentRegistration />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import StudentRegistration from './pages/std_registration';

import Navbar from "./pages/home/Navbar";
import { Hero } from "./pages/home/Hero";
import About from "./pages/home/About";
import Support from "./pages/home/Support";
import AllInOne from "./pages/home/AllInOne";
import Pricing from "./pages/home/Pricing";
import Footer from "./pages/home/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <Hero />
          <About />
          <Support />
          <AllInOne />
          <Pricing />
          <Footer />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/std_registration" element={<><Navbar /><StudentRegistration /></>} />
      </Routes>
    </Router>
  );
}

export default App;