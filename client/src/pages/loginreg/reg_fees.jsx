//client/src/pages/reg_fees.jsxmaxVisionId

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import peoplesLogo from '../../images/peopleslogo.png';
import hnbLogo from '../../images/hnblogo.png';

import { useEffect, useState } from 'react';
import axios from 'axios';

function RegFees() {

  const [maxVisionId, setMaxVisionId] = useState('');

  useEffect(() => {
    fetchMaxVisionId();
    window.scrollTo(0, 0);
  }, []);

  const fetchMaxVisionId = async () => {
      try {
          const response = await axios.get('/api/vision/maxVisionId');
          setMaxVisionId(response.data.visionId);
      } catch (error) {
          console.error('Error fetching max vision ID:', error);
      }
  };

  const location = useLocation();

  const {
    firstName,
    lastName,
    initial,
    birthday,
    gender,
    emailAddress,
    mobilePhone,
    whatsappNumber,
    addressLine1,
    addressLine2,
    city,
    school,
    parentName,
    occupation,
    contactNo,
    aboutVision,
    //formAgreement,
  } = location.state || {};

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      
      const response = await axios.post('/api/vision/addUser', {
        maxVisionId,
        firstName,
        lastName,
        initial,
        birthday,
        password: 'e4c4bcf6f1addc82e879fe8dbe1eddb3',
        gender,
        emailAddress,
        mobilePhone,
        whatsappNumber,
        addressLine1,
        addressLine2,
        city,
        school,
        parentName,
        occupation,
        contactNo,
        aboutVision,
        role: 'student',
        state: 'noregpass',
      });
      console.log('User added successfully:', response.data);
      // Navigate to the next page after successfully adding the user
      navigate('/id_create',{
        state: {
          nextVid: {maxVisionId},
        }
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  

  return (
    <div className="pt-28 flex flex-col gap-1">

      <div className="w-full mx-3 py-1">
        <p className="text-lg font-semibold text-red-900 mx-8">🟤 To complete the registration, pay Rs.300 to one of the following bank accounts and upload the slip.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mx-10 gap-8">
        <Card bankLogo={peoplesLogo} bankName="People's Bank" accountName="W.T.S.R.K. Ranasinghe" accountNumber="018 2001 2005 2260" branch="Gampola" />
        <Card bankLogo={hnbLogo} bankName="HNB" accountName="W.T.S.R.K. Ranasinghe" accountNumber="0510 1002 1851" branch="Gampola" />
      </div>

      <div className="flex justify-between items-center mx-8 pt-7 pb-0">
        <p className="text-lg font-bold ml-auto mx-8">Registration Fees:</p>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2 mr-auto mb-3">
          <span className="mr-2">Rs.</span>
          <input className="w-full focus:outline-none" type="text" value="300.00" readOnly />
        </div>
      </div>

      <div className="flex justify-between items-center mx-8">
        <p className="text-lg font-bold ml-auto mx-6">Bank Slip Upload:</p>
        <label htmlFor="fileUpload" className="cursor-pointer text-indigo-700 font-semibold mr-auto mb-3">
          👉 Click here to upload payment slip 👈
        </label>
        <input id="fileUpload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      <div className="-pt-6 -mt-2"><p></p>{selectedFile && <p className="text-green-600 pt-0 mt-0"><br/><center>File selected: {selectedFile.name}</center></p>}</div>

      <div className="text-center mb-0 py-0 pt-0 mt-0">
        <button className="px-4 w-64 py-2 bg-indigo-900 hover:bg-indigo-950 text-white font-semibold rounded shadow-sm">
          Continue registration
        </button>
      </div>
      <div className="text-center mt-2">
        <button className="px-4 w-64 py-2 bg-indigo-900 hover:bg-indigo-950 text-white font-semibold rounded shadow-sm" onClick={handleClick}>
          Continue without payment
        </button>
      </div>

      {/* <div className='pt-24'>
          <h1>Registration Fees</h1>
          <p>First Name: {firstName}</p>
          <p>Last name: {lastName}</p>
          <p>Initial: {initial}</p>
          <p>Birthday: {birthday}</p>
          <p>Gender: {gender}</p>
          <p>Email Address: {emailAddress}</p>
          <p>Mobile Phone: {mobilePhone}</p>
          <p>Whatsapp Number: {whatsappNumber}</p>
          <p>AddressLine1: {addressLine1}</p>
          <p>AddressLine2: {addressLine2}</p>
          <p>City: {city}</p>
          <p>School: {school}</p>
          <p>ParentName: {parentName}</p>
          <p>Occupation: {occupation}</p>
          <p>Contact Number: {contactNo}</p>
          <p>About Vision: {aboutVision}</p>
          <p>Form Agreement: {formAgreement ? 'Agreed' : 'Not Agreed'}</p>
      </div>

      <div className="pt-28 flex flex-col gap-1">
          <p>Maximum Vision ID: {maxVisionId}</p>
      </div> */}

    </div> 

  );
}

function Card({ bankLogo, bankName, accountName, accountNumber, branch }) {
  return (
    <div className="flex flex-col justify-between rounded shadow-md bg-gray-100 p-4 md:p-6">
      <img className="w-3/5 h-28 mb-4 self-start" src={bankLogo} alt={bankName + " Logo"} />
      <p className="text-xl font-bold mb-2">{bankName}</p>
      <ul className="list-disc space-y-1 text-gray-600">
        <li>Account Name: {accountName}</li>
        <li>Account No: {accountNumber}</li>
        <li>Branch: {branch}</li>
      </ul>
    </div>
  );
}

export default RegFees;