import React from "react";

import teacherThilak from '../../images/teachers/thilaksir.png';
import teacherIndika from '../../images/teachers/indikasir.png';
import teacherAsela from '../../images/teachers/aselasir.png';
import teacherSujith from '../../images/teachers/sujithsir.png';
import teacherVikum from '../../images/teachers/vikumsir.png';
import teacherChathurangi from '../../images/teachers/chathurangimiss.png';
import teacherPathum from '../../images/teachers/pathumsir.png';
import teacherRavi from '../../images/teachers/ravisir.png';

const Classes = () => {
  return (
    <div className="w-full mt-24">
      <div className="w-full h-[700px] absolute ">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          alt="/"
        />
      </div>

      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-2">
          <h2 name = "teachers" className="text-3xl mt-4 pt-8 text-gray-600 uppercase text-center">
            Meet our qualified teachers{" "}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 relative gap-x-8 gap-y-10 px-4 pt-2 sm:pt-20 text-black" >

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherThilak}
              className="w-full rounded-lg"
              alt="Thilak sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Thilak Ganekumbura
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Mathematics
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherSujith}
              className="w-full rounded-lg"
              alt="Sujith sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Sujith Maithree
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Mathematics
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherAsela}
              className="w-full rounded-lg"
              alt="Asela sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Asela Rathnayaka
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Science
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherIndika}
              className="w-full rounded-lg"
              alt="Indika sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Indika Dharmawardana
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                English
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherVikum}
              className="w-full rounded-lg"
              alt="Vikum sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Vikum S. Dissanayake
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Sinhala
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherRavi}
              className="w-full rounded-lg"
              alt="Ravi sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Kumar Ravichandran
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Tamil
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherChathurangi}
              className="w-full rounded-lg"
              alt="Chathurangi miss" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Chathurangi Perera
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Scholarship
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl -pb-2">
            <div className="p-3">
              <img
              src={teacherPathum}
              className="w-full rounded-lg"
              alt="Pathum sir" />
            </div>
            <div className="bg-slate-100 text-center rounded-b-xl -mb-4">
              <p className="text-lg font-semibold text-indigo-800 w-full pt-2 mb-1">
                Pathum Jayananda
              </p>
              <p className="text-indigo-500 mt-0 pb-2">
                Scholarship
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Classes;
