//client/src/pages/reg_fees.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import peoplesLogo from '../../images/peopleslogo.png';
import hnbLogo from '../../images/hnblogo.png';

import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';

import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../../api/api';

function RegFees() {

  const firebaseConfig = {
    apiKey: "AIzaSyDuXPxQCBAW0h3KF7iNloanMDhFgONVRfU",
    authDomain: "vision-institute-80d7f.firebaseapp.com",
    projectId: "vision-institute-80d7f",
    storageBucket: "vision-institute-80d7f.appspot.com",
    messagingSenderId: "438460841851",
    appId: "1:438460841851:web:b607f9eac852d2e02d07de",
    measurementId: "G-D1W84V5B4V"
  };

  const app = initializeApp(firebaseConfig);

  const [maxVisionId, setMaxVisionId] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fees, setFees] = useState('');

  const storage = getStorage(app);

  useEffect(() => {
    fetchMaxVisionId();
    fetchFeesAndSaveToLocal();
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
  } = location.state || {};

  const navigate = useNavigate();

  const handleUpload = async () => {
    const file = document.getElementById("formFile").files[0];
    const storageRef = ref(storage, `regslips/${maxVisionId}_regfees`);
  
    // Show the SweetAlert2 loading dialog with a timer
    let timerInterval;
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });
    toast.fire({
      title: "Uploading your slip!",
      html: "Wait until uploading finished",
      icon: "info"
    });
  
    try {
      await uploadBytes(storageRef, file);
      console.log("File uploaded successfully");
      setFileUploaded(true);
  
      // Close the SweetAlert2 loading dialog and show a success message
      Swal.close();
      Swal.fire({
        title: "Success!",
        text: "Your payment slip has been uploaded successfully, Continue registration!",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error uploading file:", error);
  
      // Close the SweetAlert2 loading dialog and show an error message
      Swal.close();
      Swal.fire({
        title: "Error!",
        text: "There was an error uploading your payment slip. Please try again.",
        icon: "error",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
  };

  const fetchFeesAndSaveToLocal = async () => {
    try {
      const response = await api.get('/currentFeesLoad');
      const fetchedFees = response.data.value;
      localStorage.setItem('fees', fetchedFees); // Save to local storage
      setFees(fetchedFees); // Update state
    } catch (error) {
      console.error('Error fetching and saving current fees', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
      alert("File size must be less than or equal to 2MB");
    }
  };

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
        state: 'NoRegNoPass',
      });
      console.log('User added successfully:', response.data);

      // Navigate to the next page after successfully adding the user
      navigate('/id_create',{
        state: {
          nextVid: {maxVisionId},
          currentState: false,
        }
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePaid = async () => {

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
        state: 'YesRegNoPass',
      });

      console.log('User added successfully:', response.data);
      // Navigate to the next page after successfully adding the user
      navigate('/id_create',{
        state: {
          nextVid: {maxVisionId},
          currentState: true,
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

      <div className="mt-3 w-96 ml-auto mr-auto">
          <label
            className="mb-2 inline-block text-neutral-700 font-bold"
          >
          Registration fees
          </label>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 mr-auto mb-3">
          <span className="mr-2">Rs.</span>
          <input className="w-full focus:outline-none" type="text" value={fees} readOnly />
          </div>
      </div>

      <div className="mb-7 w-96 ml-auto mr-auto">
          <label
            className="inline-block text-neutral-700 font-bold"
          >
          Upload payment slip
          </label>

          <div className="flex items-center rounded py-2 mr-auto">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              type="file"
              onChange={handleFileChange}
              id="formFile"
            />
            <button
              id="uploadBtn"
              disabled={!fileSelected}
              onClick={handleUpload}
              className={`ml-2 px-4 w-24 py-1.5 ${fileSelected ? "ml-2 bg-indigo-900 hover:bg-indigo-950" : "bg-gray-400 cursor-not-allowed"} text-white font-semibold rounded shadow-sm`}
            >
              Upload
            </button>
          </div>
      </div>

      <div className="text-center mb-0 py-0 pt-0 mt-0">
      <button
        id="continueBtn"
        disabled={!fileUploaded}
        className={`px-4 w-64 py-2 ${fileUploaded ? "bg-indigo-900 hover:bg-indigo-950" : "bg-gray-400 cursor-not-allowed"} text-white font-semibold rounded shadow-sm`}
        onClick={handlePaid}
      >
        Continue registration
      </button>

      </div>
      <div className="text-center mt-2">
        <button 
          className="text-blue-600 mt-2 font-semibold hover:underline hover:pointer hover:font-bold"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          onClick={handleClick}
        >
          Continue without payment..
        </button>
      </div>

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