import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/registration_styles.css';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';



function StdRegistration() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    initial: '',
    birthday: '',
    gender: '',
    emailAddress: '',
    mobilePhone: '',
    whatsappNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    school: '',
    parentName: '',
    occupation: '',
    contactNo: '',
    aboutVision: '',
    agreedToTerms: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBirthdayChange = (selectedDate) => {
    setFormData({
      ...formData,
      birthday: selectedDate.format('YYYY-MM-DD')
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reg_fees', {
      state: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        initial: formData.initial,
        birthday: formData.birthday,
        gender: formData.gender,
        emailAddress: formData.emailAddress,
        mobilePhone: formData.mobilePhone,
        whatsappNumber: formData.whatsappNumber,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        school: formData.school,
        parentName: formData.parentName,
        occupation: formData.occupation,
        contactNo: formData.contactNo,
        aboutVision: formData.aboutVision,
        formAgreement: formData.agreedToTerms
      }
    });
  };

  return (

    <div>

    <div className='defheader'>

    </div>

    <div className='regform'>

    <form className="form-container" onSubmit={handleSubmit}>

      <div className="mx-auto w-100 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

        <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:grid-cols-full text-center">Admission Form</h2>

          <p className="mt-1 text-xs pt-8 leading-2 text-red-600 border-b border-gray-900/10 pb-8">
            * Please be kind to Insert the correct details, and you have to pay Rs.300 before register in the system.
          </p>

          <h2 className="text-base font-semibold leading-1 text-gray-900">Personal Information | පුද්ගලික තොරතුරු</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First Name | මුල් නම
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="first-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name | අවසාන නම
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="last-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="initial" className="block text-sm font-medium leading-6 text-gray-900">
              Initial | මුලකුරු සමග නම
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="initial"
                  id="initial"
                  value={formData.initial}
                  onChange={handleChange}
                  autoComplete="initial"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                Birthday | උපන් දිනය
                <span className="text-red-500"> *</span>
              </label>
              <div className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                <Datetime
                  timeFormat={false}
                  className="readonly block w-full mt-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleBirthdayChange}
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
              Gender | ස්ත්‍රී/පුරුෂ භාවය
              <span className="text-red-500"> *</span>
              </label>

              <div className="flex mt-3 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    type="radio"
                    value="male"
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Male
                  </label>

                  <input
                    id="gender"
                    name="gender"
                    type="radio"
                    value="female"
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 ml-8"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Female
                  </label>
                </div>
              </div>



            </div>

            <div className="sm:col-span-3">
              <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
              Email Address | විද්‍යුත් තැපැල් ලිපිනය
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="emailAddress"
                  id="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  autoComplete="emailAddress"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="mobilePhone" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Phone | දුරකථන අංකය 
                <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="mobilePhone"
                  id="mobilePhone"
                  value={formData.mobilePhone}
                  onChange={handleChange}
                  autoComplete="mobilePhone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="whatsappNumber" className="block text-sm font-medium leading-6 text-gray-900">
              Whatsapp Number | Whatsapp අංකය
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  autoComplete="whatsappNumber"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          
          </div>

          <div className="mt-10">
              <label htmlFor="addressLine1" className="block text-sm font-medium leading-6 text-gray-900">
              Address line 01 | ලිපිනය - පළමු පේළිය
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  autoComplete="addressLine1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>

          <div className="mt-10">
              <label htmlFor="addressLine2" className="block text-sm font-medium leading-6 text-gray-900">
              Address line 02 | ලිපිනය - දෙවන පේළිය
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  autoComplete="addressLine2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>
          

          <div className="mt-10 sm:col-span-3">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City | නගරය
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="city"
                  className="block w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>

          <div className="mt-10">
              <label htmlFor="school" className="block text-sm font-medium leading-6 text-gray-900">
              School | පාසල
              <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="school"
                  id="school"
                  value={formData.school}
                  onChange={handleChange}
                  autoComplete="school"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>

        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Parents Information | දෙමාපිය තොරතුරු</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-full">
              <label htmlFor="parentName" className="block text-sm font-medium leading-6 text-gray-900">
                Mother/Father/Guardian's Name | මව/පියා/භාරකරුගේ නම
              </label>
              <div className="mt-2">
                <input
                  id="parentName"
                  name="parentName"
                  type="text"
                  value={formData.parentName}
                  onChange={handleChange}
                  autoComplete="parentName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div className="sm:col-span-3">
              <label htmlFor="occupation" className="block text-sm font-medium leading-6 text-gray-900">
              Ocupation | රැකියාව
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="occupation"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  autoComplete="occupation"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="contactNo" className="block text-sm font-medium leading-6 text-gray-900">
              Contact No | දුරකථන අංකය
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  autoComplete="contactNo"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
        </div>


        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
                <label htmlFor="aboutVision" className="block text-sm font-medium leading-6 text-gray-900">
                How do you know about Vision | ඔබ විෂන් ආයතනය පිළිබඳව දැනගත්තේ කෙසේද?
                <span className="text-red-500"> *</span>
                </label>
                <div className="mt-2">
                    <textarea
                      id="aboutVision"
                      name="aboutVision"
                      rows={3}
                      value={formData.aboutVision}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>


            <div className="flex sm:col-span-full ml-auto mr-auto">

            <label className="inline-flex items-center cursor-pointer">

              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={(e) => {
                  const { checked } = e.target;
                  setFormData({
                    ...formData,
                    agreedToTerms: checked
                  });
                }}
               />
              <div className="relative w-11 h-6 rounded-full peer peer-focus:ring-4 dark:bg-indigo-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-950"></div>
              </label>

              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 ml-3">
              I agree to Terms and Conditions & Privacy Policy
              </label>
            </div>


            <div className="mt-4 sm:col-span-full ml-auto mr-auto">
            <Link to="/reg_fees">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 rounded-md shadow-sm font-medium text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                👉 Continue to payment 👈<br/>ලියාපදිංචි ගාස්තු ගෙවීම සඳහා
              </button>
            </Link>
            
            </div>

          </div>

        </div>

      </div>

    </form>

    </div>

    </div>
  );
}

export default StdRegistration;
