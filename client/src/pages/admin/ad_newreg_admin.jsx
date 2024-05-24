import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/registration_styles.css';
import Datetime from 'react-datetime';
import { Link } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import '../../styles/system/st_profile.css';
import backB from '../../images/backb.png';

function NewRegAdAd() {
    
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
  
  
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
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    };

    const handleBackButton = async () => {
        try {
            navigate('/ad_newreg');
        } catch (error) {
        console.error(error);
        }
    };
  
    const handleBirthdayChange = (selectedDate) => {
      setFormData({
        ...formData,
        birthday: selectedDate.format('YYYY-MM-DD')
      });
    };
  
    const validate = () => {
      let errors = {};
      if (!formData.firstName) errors.firstName = 'First name is required';
      if (!formData.lastName) errors.lastName = 'Last name is required';
      if (!formData.initial) errors.initial = 'Initial is required';
      if (!formData.birthday) errors.birthday = 'Birthday is required';
      if (!formData.gender) errors.gender = 'Gender is required';
      if (!formData.emailAddress) errors.emailAddress = 'Email address is required';
      if (!formData.mobilePhone) errors.mobilePhone = 'Mobile phone is required';
      if (!formData.addressLine1) errors.addressLine1 = 'Address line 1 is required';
      if (!formData.addressLine2) errors.addressLine2 = 'Address line 2 is required';
      if (!formData.city) errors.city = 'City is required';
      return errors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const errors = validate();
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
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
        }
      });
    }
  };
  
    return (
  
      <div className="profile-container rounded-s-3xl bg-white md:ml-72 md:px-10 py-4 w-full">
  
      <div className='regform2'>
  
      <form className="form-container2" onSubmit={handleSubmit}>
  
      <div className="mx-auto w-100 space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
  
            <div className="flex w-full border-b border-gray-900/10 pb-3">
                <h2 className="text-base font-semibold mt-2.5 leading-1 text-gray-900">Personal Information | පුද්ගලික තොරතුරු</h2>
                <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-12 mb-2.5 -mt-1' src={backB} alt="Down arrow" />
            </div>
  
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
                  {formErrors.firstName && <span className="text-red-500 text-sm">{formErrors.firstName}</span>}
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
                  {formErrors.lastName && <span className="text-red-500 text-sm">{formErrors.lastName}</span>}
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
                  {formErrors.initial && <span className="text-red-500 text-sm">{formErrors.initial}</span>}
                </div>
              </div>
  
              <div className="sm:col-span-3 relative">
                <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                  Birthday | උපන් දිනය
                  <span className="text-red-500"> *</span>
                </label>
                <div className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                  <Datetime
                    timeFormat={false}
                    readOnly
                    className="readonly block w-full mt-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleBirthdayChange}
                    onKeyDown={(event) => event.preventDefault()}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 mt-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {formErrors.birthday && <span className="text-red-500 text-sm">{formErrors.birthday}</span>}
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
                    {formErrors.gender && <span className="text-red-500 text-sm">{formErrors.gender}</span>}
                  </div>
                </div>
  
  
  
              </div>
  
              <div className="sm:col-span-3">
                <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address | විද්‍යුත් තැපැල් ලිපිනය
                <span className="text-red-500"> *</span>
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
                  {formErrors.emailAddress && <span className="text-red-500 text-sm">{formErrors.emailAddress}</span>}
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
                  {formErrors.mobilePhone && <span className="text-red-500 text-sm">{formErrors.mobilePhone}</span>}
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
                  {formErrors.addressLine1 && <span className="text-red-500 text-sm">{formErrors.addressLine1}</span>}
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
                  {formErrors.addressLine2 && <span className="text-red-500 text-sm">{formErrors.addressLine2}</span>}
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
                  {formErrors.city && <span className="text-red-500 text-sm">{formErrors.city}</span>}
                </div>
            </div>
  
          </div>
  
  
          <div className="border-b border-gray-900/10 pb-8">
  
              <div className="mt-2 text-center sm:col-span-full ml-auto mr-auto">
              <Link to="/reg_fees">
                <button
                  onClick={handleSubmit}
                  className="inline-flex -mt-6 px-6 py-3 rounded-md shadow-sm font-medium text-white bg-indigo-900 hover:bg-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update your profile
                </button>
              </Link>
              
              </div>
  
          </div>
  
        </div>
  
      </form>
  
      </div>
  
      </div>
    );
  }

export default NewRegAdAd