import React from "react";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import cabinImage2 from "../../images/cabin2.jpg";

const Classes = () => {
  return (
    <div name = "teachers" className="w-full mt-24">
      <div className="w-full h-[700px] absolute ">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src={cabinImage2}
          alt="/"
        />
      </div>

      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-2 mt-4">
          <h2 className="text-3xl mt-4 pt-8 text-gray-600 uppercase text-center">
            Meet our qualified teachers{" "}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black " >

          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <h3 className="font-bold text-2xl my-6 ">Teacher 1</h3>
              <p className="text-gray-600 text-xl">
                Picture and about<br/>teacher 1 
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                Contact <PhoneIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <h3 className="font-bold text-2xl my-6 "> Teacher 2 </h3>
              <p className="text-gray-600 text-xl">
                Picture and about<br/>teacher 2
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                Contact <PhoneIcon className="w-5 ml-2" />
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <h3 className="font-bold text-2xl my-6 ">Teacher 3</h3>
              <p className="text-gray-600 text-xl">
                Picture and about<br/>teacher 3
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                Contact <PhoneIcon className="w-5 ml-2" />{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
