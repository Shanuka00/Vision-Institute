import React from "react";
import { Link } from 'react-router-dom';
import cabinImage2 from "../../images/cabin2.jpg";
import Typewriter from 'typewriter-effect';
import { useState, useEffect } from 'react';
import '../../styles/web_home.css';

export const VHome = () => {

  const [fadeIn, setFadeIn] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {

    // Trigger fade-in effect when component mounts
    setFadeIn(true);

    // Trigger zoom-in effect when component mounts
    setZoomIn(true);

  }, []);

  return (
    <div name = "home" className="w-full mt-0 mb-0">
      <div className="w-full h-[700px] bg-gray-800/80 absolute ">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src={cabinImage2}
          alt="/"
        />
      </div>

      <div className="max-w-[1240px] mx-auto text-white relative pt-10 mb-0">
        <div className="px-4 pt-12">

          <h2 className={`text-2xl pt-16 text-gray-300 italic font-semibold text-medium uppercase text-center font-sans ${fadeIn ? 'fade-in' : ''}`}>
            ප්‍රදේශයේ වැඩිම සිසුන් පිරිසකට ඉහල සාමාර්ථ ලබා දෙන<br/>දක්ෂ පළපුරුදු ගුරු මඩුල්ලක් සමගින්..{" "}
          </h2>

          <h3 className={`text-7xl font-bold mt-16 text-center ${zoomIn ? 'zoom-in' : ''}`}>
            Vision Educational Institute
          </h3>
          <h6 className={`text-4xl font-bold py-1 text-center ${zoomIn ? 'zoom-in' : ''}`}>
            - Atabage -
          </h6>

          <div className="text-center pt-12 text-2xl text-gray-300 font-semibold italic mb-0">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 60,
                pauseFor: 30000,
                strings: ["දීප්තිමත් අනාගතයක් උදෙසා ඔබත් අදම සම්බන්ධ වන්න.."],
              }}
            />
          </div>

          <div className="flex justify-center py-0 my-16">
            <Link
              to="/std_registration"
              className="inline-flex items-center px-10 py-3 rounded-xl shadow-medium text-white font-medium bg-indigo-950 hover:text-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-underline"
              style={{ boxShadow: "0 0 2px 2px #fafafa" }}>
              👉 Register Now 👈
            </Link>
          </div>

          <div className="mt-3 py-24 text-black">
          </div>

        </div>   

      </div>
    </div>
  );
};
