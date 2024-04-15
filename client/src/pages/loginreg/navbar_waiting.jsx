import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,} from "react-scroll";
import { Link as RLink } from 'react-router-dom';
import visionLogo from '../../images/vision_logo.png';

import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleClose = () => {
    setNav(!nav);
  }
  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg">

      <div className="px-2 flex justify-between items-center w-full h-full">

        <div className="flex">
        <Nav.Link as={RLink} to="/" className="ml-0 pl-0">
          <img
            src={visionLogo}
            width="80"
            height="80"
            className="d-inline-block align-top"
            alt="Vision Logo"
          />
        </Nav.Link>
        <div className="pt-6">
          <h2 className="text-sm text-gray-500 font-semibold no-underline sm:text-lg">Waiting for admin approval</h2>
        </div>
        </div>

        <div className="-pt-1">
          <Nav>
            <Nav.Link as={RLink} to="/" className="bg-blue-800">
              <button type="button" className="inline-flex items-center px-4 py-2 rounded shadow-sm font-medium text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Logout
              </button>
            </Nav.Link>
          </Nav>
        </div>


      </div>
      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
      <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose}  to="home" smooth={true} offset={100} duration={200}>Home</Link></li>
          <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="about" smooth={true} offset={-200} duration={200}>About</Link></li>
          <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="support" smooth={true} offset={-50} duration={200}>Support</Link></li>
          <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="platforms" smooth={true} offset={-120} duration={200}>Platforms</Link></li>
          <li className="border-b-2 border-zinc-300 w-full"><Link onClick={handleClose} to="pricing" smooth={true} offset={-50} duration={200}>Pricing</Link></li>

      </ul>
    </div>
  );
};

export default Navbar;

