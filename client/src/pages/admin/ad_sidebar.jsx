import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import sideImage from '../../images/side_logo.png';
import LogoutAd from './ad_logout';

const SidebarAd = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [focusedNavLink, setFocusedNavLink] = useState('/ad_dashboard');
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

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
                <Nav.Link onClick={() => setShowLogoutConfirmation(true)}>
                <img src={sideImage} className="w-full" alt="Vision Institute" />
                {showLogoutConfirmation && <LogoutAd setShouldRefreshSidebar={setIsFixed} />}
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
                    to="/ad_dashboard"
                    onClick={() => handleNavLinkClick('/ad_dashboard')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_dashboard' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/ad_newreg"
                    onClick={() => handleNavLinkClick('/ad_newreg')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_newreg' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                    <svg fill="none" className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                    New registrations
                </NavLink>

                <NavLink
                    to="/ad_stdmanagement"
                    onClick={() => handleNavLinkClick('/ad_stdmanagement')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_stdmanagement' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 8.5C11 9.88071 9.88071 11 8.5 11C7.11929 11 6 9.88071 6 8.5C6 7.11929 7.11929 6 8.5 6C9.88071 6 11 7.11929 11 8.5Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M18 5.5C18 6.88071 16.8807 8 15.5 8C14.1193 8 13 6.88071 13 5.5C13 4.11929 14.1193 3 15.5 3C16.8807 3 18 4.11929 18 5.5Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M15.5 20C14.5 21 3.00002 20.5 2.00001 20C1 19.5 5.41016 15 9.00001 15C12.5899 15 16.076 19.424 15.5 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.3522 16.2905C16.0024 16.991 16.5501 17.7108 16.9695 18.3146C17.4791 18.3176 18.1122 18.3174 18.7714 18.3075C19.5445 18.296 20.365 18.2711 21.0682 18.2214C21.4193 18.1965 21.7527 18.1647 22.0422 18.1231C22.3138 18.0841 22.6125 18.028 22.8585 17.9335C23.0969 17.8419 23.3323 17.6857 23.5095 17.4429C23.6862 17.2007 23.7604 16.9334 23.7757 16.6907C23.8039 16.2435 23.6381 15.8272 23.4749 15.5192C23.1328 14.8736 22.5127 14.1722 21.7887 13.5408C20.3574 12.2925 18.1471 11 16 11C14.8369 11 13.97 11.1477 13.192 11.5887C12.4902 11.9866 11.9357 12.5909 11.3341 13.2466L11.2634 13.3236L11.1127 13.4877C11.8057 13.6622 12.4547 13.9653 13.0499 14.337C13.5471 13.8034 13.845 13.5176 14.1784 13.3285C14.5278 13.1305 14.998 13 16 13C17.4427 13 19.196 13.9334 20.4741 15.048C20.9492 15.4624 21.3053 15.8565 21.5299 16.1724C21.3524 16.1926 21.15 16.2106 20.927 16.2263C20.2775 16.2723 19.4991 16.2964 18.7416 16.3077C17.9864 16.319 17.2635 16.3174 16.7285 16.3129C16.4612 16.3106 16.2416 16.3077 16.089 16.3053C16.0127 16.3041 15.9533 16.303 15.9131 16.3023L15.8676 16.3014L15.8562 16.3012L15.8535 16.3011L15.8529 16.3011L15.8528 16.3011L15.8528 16.3011L15.3522 16.2905Z" fill="currentColor"/>
                    </svg>
                    </div>
                    Student management
                </NavLink>

                <NavLink
                    to="/ad_atndmanagement"
                    onClick={() => handleNavLinkClick('/ad_atndmanagement')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_atndmanagement' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M16 11H14M16 16H14M8 11L9 12L11 10M8 16L9 17L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                    Attendance management
                </NavLink>

                <NavLink
                    to="/ad_finmanagement"
                    onClick={() => handleNavLinkClick('/ad_finmanagement')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_finmanagement' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                        <path fill="var(--ci-primary-color, currentColor)" d="M432,64H16V384H432ZM400,352H48V96H400Z" stroke="currentColor" strokeWidth="2" className="ci-primary"/>
                        <polygon fill="var(--ci-primary-color, currentColor)" points="464 144 464 416 96 416 96 448 496 448 496 144 464 144" className="ci-primary"/>
                        <path fill="var(--ci-primary-color, currentColor)" d="M224,302.46c39.7,0,72-35.137,72-78.326s-32.3-78.326-72-78.326-72,35.136-72,78.326S184.3,302.46,224,302.46Zm0-124.652c22.056,0,40,20.782,40,46.326s-17.944,46.326-40,46.326-40-20.782-40-46.326S201.944,177.808,224,177.808Z" className="ci-primary"/>
                        <rect width="32" height="176" x="80" y="136" fill="var(--ci-primary-color, currentColor)" className="ci-primary"/>
                        <rect width="32" height="176" x="336" y="136" fill="var(--ci-primary-color, currentColor)" className="ci-primary"/>
                    </svg>
                    </div>
                    Financial management
                </NavLink>

                <NavLink
                    to="/ad_classallo"
                    onClick={() => handleNavLinkClick('/ad_classallo')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_classallo' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9497 17.9497L15 13H22C22 14.933 21.2165 16.683 19.9497 17.9497Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 10C20 6.13401 16.866 3 13 3V10H20Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12C2 16.4183 5.58172 20 10 20C12.2091 20 14.2091 19.1046 15.6569 17.6569L10 12V4C5.58172 4 2 7.58172 2 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                    Classroom allocation
                </NavLink>

                <NavLink
                    to="/ad_profile"
                    onClick={() => handleNavLinkClick('/ad_profile')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_profile' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd"></path>
                    </svg>
                    </div>
                    Profile
                </NavLink>

                <NavLink
                    to="/ad_logout"
                    onClick={() => handleNavLinkClick('/ad_logout')}
                    className={`mb-2.5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-white focus:bg-white active:bg-gray-50 outline-none text-indigo-900 font-semibold no-underline transition-none ${focusedNavLink === '/ad_logout' ? 'bg-white text-blue-900' : ''}`}
                >
                    <div className="grid place-items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" stroke="currentColor" strokeWidth="1" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    Logout
                </NavLink>

            </nav>

        </div>
    );
}

export default SidebarAd;
