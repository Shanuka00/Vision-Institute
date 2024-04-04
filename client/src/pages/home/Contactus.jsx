import React from "react";

const Contactus = () => {
  return (
    <div name = "contactus" className="w-full text-white my-12">
      <div className="w-full h-[800px] absolute mix-blend-overlay"></div>
      <div className="max-w-[1240px] mx-auto py-12">
        <div className="text-center py-2 text-gray-600">

          <h2 className="text-3xl uppercase py-2">Contact us</h2>
        </div>


        <div className="grid md:grid-cols-2">
        
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative" >
            <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">Form</span>
            <p className="text-2xl py-2 text-gray-600">Contact us form</p>
            <div className="text-2xl relative">
                <div className="flex py-2 "><p className="mr-4">👉</p>Your name</div>
                <div className="flex py-2 "><p className="mr-4">👉</p>Your email</div>
                <div className="flex py-2 "><p className="mr-4">👉</p>Phone number</div>
                <div className="flex py-2 "><p className="mr-4">👉</p>Message</div>
            </div>
          </div>


          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative" >
            <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">Details</span>
            <p className="text-2xl py-2 text-slate-500">Contact details</p>
            <div className="text-2xl relative">
                <div className="flex py-2  "><p className="mr-4">✅</p>Address</div>
                <div className="flex py-2  "><p className="mr-4">✅</p>Email</div>
                <div className="flex py-2  "><p className="mr-4">✅</p>Phone number</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contactus;
