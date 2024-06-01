import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/registration_styles.css';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import '../../styles/system/st_profile.css';

import sampleMale from '../../images/student/sampleMale.png';
import sampleFemale from '../../images/student/sampleFemale.png';

function ProfileTe() {
    
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [visionId, setVisionId] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const storedVisionId = localStorage.getItem('visionId');
      if (storedVisionId) {
        setVisionId(storedVisionId);
        fetchProfileData(storedVisionId);
      }
    }
  }, []);

  const fetchProfileData = async (visionId) => {
    try {
      const response = await api.post('/profileByVisionId', { visionId });
      setProfileData(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

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

  const handleBirthdayChange = (selectedDate) => {
    setFormData({
      ...formData,
      birthday: selectedDate.format('YYYY-MM-DD')
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        visionId,
        firstname: formData.firstName || profileData.firstname,
        lastname: formData.lastName || profileData.lastname,
        initial: formData.initial || profileData.initial,
        birthday: formData.birthday || profileData.dateofbirth,
        gender: formData.gender || profileData.gender,
        email: formData.emailAddress || profileData.email,
        mobilenumber: formData.mobilePhone || profileData.mobilenumber,
        whatsappnumber: formData.whatsappNumber || profileData.whatsappnumber,
        addressline1: formData.addressLine1 || profileData.addressline1,
        addressline2: formData.addressLine2 || profileData.addressline2,
        city: formData.city || profileData.city,
        school: formData.school || profileData.school,
        parentname: formData.parentName || profileData.parentname,
        parentoccupation: formData.occupation || profileData.parentoccupation,
        parentcontact: formData.contactNo || profileData.parentcontact,
        howyouknow: formData.aboutVision || profileData.howyouknow
      };
      try {
        await api.post('/updateStudentProfile', data);
        navigate('/st_profile/edit', {
          state: { ...formData }
        });
      } catch (error) {
        console.error('Error updating profile data', error);
      }
  };


  let birthday = new Date(profileData.dateofbirth);

  return (

    <div className="profile-container rounded-s-3xl bg-white md:ml-72 md:px-10 py-4 w-full">

    <div className='regform2'>

    <form className="form-container2" onSubmit={handleSubmit}>

      <div className="mx-auto w-100 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

            <div className="profile-header flex items-center w-full border-b border-gray-900/10 pb-4">
                <div className="profile-image bg-gray-800 rounded-full w-16 h-16 flex">
                <img 
                    src={profileData.gender === 'male' ? sampleMale : sampleFemale} 
                    alt="Profile" 
                    className="rounded-full opacity-90" 
                />
                </div>
                <div className="profile-info ml-4">
                <h2 className="text-2xl font-bold mb-1 text-indigo-800">{visionId}</h2>
                <h3 className="text-lg font-bold">{profileData.firstname} {profileData.lastname}</h3>
                </div>
            </div>

            <h2 className="text-base font-semibold mt-1 leading-1 text-gray-900">Personal Information | පුද්ගලික තොරතුරු</h2>

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
                    placeholder={profileData.firstname}
                    onChange={handleChange}
                    autoComplete="first-name"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.lastname}
                    onChange={handleChange}
                    autoComplete="last-name"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.initial}
                    onChange={handleChange}
                    autoComplete="initial"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


              <div className="sm:col-span-3 relative">
                    <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                      Birthday | උපන් දිනය
                      <span className="text-red-500"> *</span>
                    </label>
                    <div className='block px-2 bg-white mt-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300'>
                      <Datetime
                        id="birthday"
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        inputProps={{ className: 'border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full' }}
                        value={birthday}
                        onChange={handleBirthdayChange}
                        closeOnSelect={true}
                      />
                    </div>
              </div>


              <div className="sm:col-span-3">
                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                      Gender | ස්ත්‍රී පුරුෂ භාවය
                      <span className="text-red-500"> *</span>
                    </label>
                    <div className="mt-2">
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        autoComplete="gender"
                        className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
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
                    placeholder={profileData.email}
                    onChange={handleChange}
                    autoComplete="emailAddress"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.mobilenumber}
                    onChange={handleChange}
                    autoComplete="mobilePhone"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.whatsappnumber}
                    onChange={handleChange}
                    autoComplete="whatsappNumber"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.addressline1}
                    onChange={handleChange}
                    autoComplete="addressLine1"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.addressline2}
                    onChange={handleChange}
                    autoComplete="addressLine2"
                    className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    placeholder={profileData.city}
                    onChange={handleChange}
                    autoComplete="city"
                    className="block pl-2 w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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

export default ProfileTe