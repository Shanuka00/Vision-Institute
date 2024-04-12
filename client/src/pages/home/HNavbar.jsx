// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Link,} from "react-scroll";
// import { Link as RLink } from 'react-router-dom';
// import visionLogo from '../../images/vision_logo.png';

// import Nav from 'react-bootstrap/Nav';

// const HNavbar = () => {
//   const [nav, setNav] = useState(false);

//   const handleClose = () => {
//     setNav(!nav);
//   }
//   return (
//     <div className="w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg">

//       <div className="px-2 flex justify-between items-center w-full h-full">

//         <div>
//           <Nav.Link as={RLink} to="/">
//           <img
//             src={visionLogo}
//             width="80"
//             height="80"
//             className="d-inline-block align-top"
//             alt="Vision Logo"
//           />
//           </Nav.Link>
//         </div>

//         <div className="flex justify-center">
//           <ul className="hidden md:flex justify-center space-x-12 pt-3">
//             <li className="cursor-pointer">
//               <Link to="home" smooth={true} offset={0} duration={50} className="text-lg text-indigo-900 font-semibold hover:font-bold no-underline">Home</Link>
//             </li>
//             <li className="cursor-pointer">
//               <Link to="about" smooth={true} offset={-200} duration={50} className="text-lg text-indigo-900 font-semibold hover:font-bold no-underline">About</Link>
//             </li>
//             <li className="cursor-pointer">
//               <Link to="teachers" smooth={true} offset={-50} duration={50} className="text-lg text-indigo-900 font-semibold hover:font-bold no-underline">Teachers</Link>
//             </li>
//             <li className="cursor-pointer">
//               <Link to="news" smooth={true} offset={-120} duration={50} className="text-lg text-indigo-900 font-semibold hover:font-bold no-underline">News</Link>
//             </li>
//             <li className="cursor-pointer mr-6/12">
//               <Link to="contactus" smooth={true} offset={-50} duration={50} className="text-lg text-indigo-900 font-semibold hover:font-bold no-underline">Contact us</Link>
//             </li>
//           </ul>
//         </div>

//         <div className="-pt-1">
//           <Nav>
//             <Nav.Link as={RLink} to="/login" className="bg-blue-800">
//               <button type="button" className="inline-flex items-center px-4 py-2 rounded shadow-sm font-medium text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                 Login
//               </button>
//             </Nav.Link>
//           </Nav>
//         </div>


//       </div>
//       <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
//           <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose}  to="home" smooth={true} offset={100} duration={200}>Home</Link></li>
//           <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="about" smooth={true} offset={-200} duration={200}>About</Link></li>
//           <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="teachers" smooth={true} offset={-50} duration={200}>Teachers</Link></li>
//           <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="news" smooth={true} offset={-120} duration={200}>News</Link></li>
//           <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="contactus" smooth={true} offset={-50} duration={200}>Contact us</Link></li>

//       </ul>
//     </div>
//   );
// };

// export default HNavbar;


import React, { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from 'react-router-dom';
import visionLogo from '../../images/vision_logo.png';

const HNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleToggleNav = () => {
    setNavOpen(!navOpen);
  }

  return (
    <Navbar expand="lg" bg="zinc-200" variant="light" fixed="top" className="w-screen drop-shadow-lg h-[80px] pl-0 sm:pt-auto pt-auto ">
      <Container className="justify-between w-screen h-full w-screen -ml-20 md:ml-4 sm:pl-5 sm:w-6/12">
        <Navbar.Brand as={RouterLink} to="/" className="lg:-ml-28 sm:ml-0 duration-100">
        <img
          src={visionLogo}
          width="80"
          height="80"
          className="d-inline-block align-top xl:-ml-28 w-full"
          alt="Vision Logo"
          style={{
            width: '80px',
            height: '80px',
            '@media (maxWidth: 640px)': {
              width: '40px',
              height: '40px',
            }
          }}
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav mr-10" onClick={handleToggleNav} />
        <Navbar.Collapse id="basic-navbar-nav mr-10" className={`${navOpen ? 'show' : ''}`}>
          <Nav className="text-lg text-indigo-900 font-semibold hover:font-bold no-underline w-full bg-zinc-200">
            
            <div className="md:flex px-2 pr-4 justify-center pt-3 ml-auto mr-auto text-lg text-indigo-900 font-semibold hover:font-bold no-underline w-full">
            <NavItem to="home" onClick={handleToggleNav}><p className="text-indigo-900 font-semibold hover:font-bold no-underline">Home</p></NavItem>
            <NavItem to="about" onClick={handleToggleNav}><p className="text-indigo-900 font-semibold hover:font-bold no-underline">About</p></NavItem>
            <NavItem to="teachers" onClick={handleToggleNav}><p className="text-indigo-900 font-semibold hover:font-bold no-underline">Teachers</p></NavItem>
            <NavItem to="news" onClick={handleToggleNav}><p className="text-indigo-900 font-semibold hover:font-bold no-underline">News</p></NavItem>
            <NavItem to="contactus" onClick={handleToggleNav}><p className="text-indigo-900 font-semibold hover:font-bold no-underline">Contact us</p></NavItem>
            </div>
            
            <Nav.Link as={RouterLink} to="/login" className="bg-blue-800" onClick={handleToggleNav}>
              <button type="button" className="inline-flex -mr-24 items-center px-4 py-2 mt-2 rounded shadow-sm font-medium text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Login
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const NavItem = ({ to, children, onClick }) => (
  <Nav.Item>
    <ScrollLink
      to={to}
      smooth={true}
      offset={-70}
      duration={100}
      onClick={onClick}
      className="nav-link"
    >
      {children}
    </ScrollLink>
  </Nav.Item>
);

export default HNavbar;
