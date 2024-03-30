import React from 'react'
import '../styles/registration_styles.css';
import { Link } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";

function id_create() {

  return (
    
    <div>

    <div className='pt-28'>

    <form className="form-container pt-2">

      <div className="mx-auto w-100 space-y-6">
        <div className="border-b pb-0">

          <p className="mt-7 text-lg font-semibold text-indigo-900 pb-1">
            You have successfully provided the required details 🎉
          </p>

          <div className="flex mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <div className="flex sm:col-span-full">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 pt-1">
              Your Vision ID | ඔබේ අංකය : 
              </label>
              <div className="pl-2 sm:col-span-full mb-2 pt-0">
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  autoComplete="last-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
              Create a password | මුරපදයක් සාදන්න
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  autoComplete="emailAddress"
                  className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="contactNo" className="block text-sm font-medium leading-6 text-gray-900">
              Re-enter password | මුරපදය නැවත යොදන්න
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  autoComplete="contactNo"
                  className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <p className="mt-2 sm:col-span-full text-normal font-semibold text-red-600">
            * Remember the above Vision ID and Password to stay connected with the online learning process
            </p>

            <div className="sm:col-span-full">
            <Link to="/reg_fees">
              <button
                className="inline-flex items-center px-4 py-2 rounded-md shadow-sm font-medium text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                👉 Create your vision profile 👈<br/>ඔබේ විෂන් ගිණුම සාදන්න
              </button>
            </Link>
            </div>

          </div>
        </div>

      </div>

    </form>

    </div>

    </div>

  )
}

export default id_create