import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import sideImage from '../../images/side_logo.png';

const SidebarTe = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [focusedNavLink, setFocusedNavLink] = useState('/te_dashboard');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavLinkClick = (to) => {
        setFocusedNavLink(to);
    };

    return (
        <div className={`w-0 relative sm:fixed top-0 left-0 bg-clip-border bg-gray-200 text-gray-700 h-screen sm:w-full max-w-[18rem] p-2 pb-2 shadow-xl shadow-gray-900/5 overflow-y-auto ${isFixed ? 'sm:top-0' : ''}`}>
            <div className="flex justify-between items-center mb-2 p-4 sm:justify-start bg-gray-200">

                <div className="w-full pr-auto-0 -ml-6 mt-1">
                <Nav.Link as={Link} to="/">
                    <img src={sideImage} className='w-full' alt="Vision Institute" />
                </Nav.Link>
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 sm:flex sm:flex-col sm:gap-1 sm:min-w-[240px] sm:p-2 sm:font-sans sm:text-base sm:font-normal sm:text-gray-700`}>


                <NavLink
                    to="/te_dashboard"
                    onClick={() => handleNavLinkClick('/te_dashboard')}
                    className={`mb-3 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/te_dashboard' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/te_calender"
                    onClick={() => handleNavLinkClick('/te_calender')}
                    className={`mb-3 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/te_calender' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Calender
                </NavLink>

                <NavLink
                    to="/te_bankdepo"
                    onClick={() => handleNavLinkClick('/te_bankdepo')}
                    className={`mb-3 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/te_bankdepo' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Bank deposit
                </NavLink>

                <NavLink
                    to="/te_profile"
                    onClick={() => handleNavLinkClick('/te_profile')}
                    className={`mb-3 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/te_profile' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Profile
                </NavLink>

                <NavLink
                    to="/te_logout"
                    onClick={() => handleNavLinkClick('/te_logout')}
                    className={`mb-3 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/te_logout' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Logout
                </NavLink>

            </nav>

        </div>
    );
}

export default SidebarTe;
