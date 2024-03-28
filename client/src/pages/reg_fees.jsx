import React from 'react';
import { useLocation } from 'react-router-dom';
import peoplesLogo from '../images/peopleslogo.png';
import hnbLogo from '../images/hnblogo.png';

function RegFees() {
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
    grade,
    aboutVision,
    formAgreement,
  } = location.state || {};

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="pt-24 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card bankLogo={peoplesLogo} bankName="People's Bank" accountName="W.T.S.R.K. Ranasinghe" accountNumber="335 1001 3001 0990" branch="Gampola" />
        <Card bankLogo={hnbLogo} bankName="HNB" accountName="W.T.S.R.K. Ranasinghe" accountNumber="0510 1002 1851" branch="Gampola" />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Registration Fees:</p>
        <div className="flex items-center border border-gray-300 rounded px-3 py-2">
          <span className="mr-2">Rs.</span>
          <input className="w-full focus:outline-none" type="text" value="300.00" readOnly />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">Bank Slip Upload:</p>
        <label htmlFor="fileUpload" className="cursor-pointer text-blue-500">
          Upload
        </label>
        <input id="fileUpload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
        {selectedFile && <p className="text-green-500">File selected: {selectedFile.name}</p>}
      </div>
      <div className="text-center">
        <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow-sm">
          Register
        </button>
      </div>

      <div className='pt-24'>
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
          <p>Grade: {grade}</p>
          <p>About Vision: {aboutVision}</p>
          <p>Form Agreement: {formAgreement ? 'Agreed' : 'Not Agreed'}</p>
      </div>

    </div> 

  );
}

function Card({ bankLogo, bankName, accountName, accountNumber, branch }) {
  return (
    <div className="flex flex-col justify-between rounded shadow-md bg-white p-4 md:p-6">
      <img className="w-20 h-20 mb-4 self-center" src={bankLogo} alt={bankName + " Logo"} />
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