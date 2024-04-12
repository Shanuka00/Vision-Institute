import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);  // State to manage the open/close of the sidebar menu

    return (
        <div className="w-0 tracking-normal relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen sm:w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="flex justify-between items-center mb-2 p-4 sm:justify-start">
                <h5 className="hidden sm:block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Material Tailwind</h5>
                <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <nav className={`${isOpen ? 'flex' : 'hidden'} flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 sm:flex sm:flex-col sm:gap-1 sm:min-w-[240px] sm:p-2 sm:font-sans sm:text-base sm:font-normal sm:text-gray-700`}>
                <NavLink to="/blocks" activeClassName="bg-blue-50 text-blue-900" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 outline-none">
                    <div className="grid place-items-center mr-4">
                        {/* SVG path for Blocks */}
                    </div>
                    Blocks
                </NavLink>
                <NavLink to="/books" activeClassName="bg-blue-50 text-blue-900" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 outline-none">
                    <div className="grid place-items-center mr-4">
                        {/* SVG content for Books */}
                    </div>
                    Books
                </NavLink>
                <NavLink to="/example-pages" activeClassName="bg-blue-50 text-blue-900" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 outline-none">
                    <div className="grid place-items-center mr-4">
                        {/* SVG content for Example Pages */}
                    </div>
                    Example Pages
                    <div className="ml-auto">
                        <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
                            <span>14</span>
                        </div>
                    </div>
                </NavLink>
                <NavLink to="/profile" activeClassName="bg-blue-50 text-blue-900" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 outline-none">
                    <div className="grid place-items-center mr-4">
                        {/* SVG content for Profile */}
                    </div>
                    Profile
                </NavLink>
                <NavLink to="/settings" activeClassName="bg-blue-50 text-blue-900" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 focus:bg-blue-50 active:bg-gray-50 outline-none">
                    <div className="grid place-items-center mr-4">
                        {/* SVG content for Settings */}
                    </div>
                    Settings
                </NavLink>
            </nav>
        </div>
    );
}

export default Sidebar;

