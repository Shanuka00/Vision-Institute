import React from "react";
import { Link } from 'react-router-dom';
import cabinImage2 from "../../images/assets/cabin2.jpg";

export const VHome = () => {
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
          <h2 className="text-2xl pt-16 text-gray-300 italic font-semibold text-medium uppercase text-center font-sans">
            ප්‍රදේශයේ වැඩිම සිසුන් පිරිසකට ඉහල සාමාර්ථ ලබා දෙන<br/>දක්ෂ පළපුරුදු ගුරු මඩුල්ලක් සමගින්..{" "}
          </h2>
          <h3 className="text-7xl font-bold mt-16 text-center">
            Vision Educational Institute
          </h3>
          <h6 className="text-4xl font-bold py-1 text-center">
            - Atabage -
          </h6>
          <p className="text-center pt-12 text-2xl text-gray-300 font-semibold italic mb-0">
            දීප්තිමත් අනාගතයක් උදෙසා ඔබත් අදම සම්බන්ධ වන්න..
          </p>

          <div class="flex justify-center py-0 my-16">
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
