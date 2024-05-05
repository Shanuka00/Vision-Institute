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
            <NavItem to="home" onClick={handleToggleNav}><p style={{ textDecoration: 'none', cursor: 'pointer' }} className="text-indigo-900 ms-1 font-semibold hover:font-bold no-underline">Home</p></NavItem>
            <NavItem to="about" onClick={handleToggleNav}><p style={{ textDecoration: 'none', cursor: 'pointer' }} className="text-indigo-900 ms-1 font-semibold hover:font-bold no-underline">About</p></NavItem>
            <NavItem to="teachers" onClick={handleToggleNav}><p style={{ textDecoration: 'none', cursor: 'pointer' }} className="text-indigo-900 ms-1 font-semibold hover:font-bold no-underline">Teachers</p></NavItem>
            <NavItem to="news" onClick={handleToggleNav}><p style={{ textDecoration: 'none', cursor: 'pointer' }} className="text-indigo-900 ms-1 font-semibold hover:font-bold no-underline">News</p></NavItem>
            <NavItem to="contactus" onClick={handleToggleNav}><p style={{ textDecoration: 'none', cursor: 'pointer' }} className="text-indigo-900 ms-1 font-semibold hover:font-bold no-underline">Contact us</p></NavItem>
            </div>
            
            <Nav.Link as={RouterLink} to="/login" className="bg-blue-800" onClick={handleToggleNav}>
              <button type="button" className="inline-flex ms-2 -mr-24 items-center px-4 py-2 mt-2 rounded shadow-sm font-normal text-base font-semibold text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
