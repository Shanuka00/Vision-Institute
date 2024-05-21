import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import peoplesLogo from '../../images/peopleslogo.png';
import hnbLogo from '../../images/hnblogo.png';

import 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import api from '../../api/api';

const firebaseConfig = {
  apiKey: "AIzaSyDuXPxQCBAW0h3KF7iNloanMDhFgONVRfU",
  authDomain: "vision-institute-80d7f.firebaseapp.com",
  projectId: "vision-institute-80d7f",
  storageBucket: "vision-institute-80d7f.appspot.com",
  messagingSenderId: "438460841851",
  appId: "1:438460841851:web:b607f9eac852d2e02d07de",
  measurementId: "G-D1W84V5B4V"
};

initializeApp(firebaseConfig);
const storage = getStorage();

function BankdepoSt() {
  const [visionId, setVisionId] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const storedVisionId = localStorage.getItem('visionId');
      if (storedVisionId) {
        setVisionId(storedVisionId);
      }
    }
  }, []);

  const handleUpload = async () => {
    const file = document.getElementById("formFile").files[0];
    const extension = file.name.split('.').pop();
    const storageRef = ref(storage, `regslips/${visionId}.${extension}`);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= MAX_FILE_SIZE) {
      setFileSelected(true);
    } else {
      setFileSelected(false);
      alert("File size must be less than or equal to 2MB");
    }
  };

  const handlePaid = () => {
    navigate('/id_create');
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-7 w-full'>
      <div className="flex flex-col gap-1">
        <div className="w-full mx-3 py-1">
          <p className="text-medium font-semibold text-red-900 mx-8">🟤 When paying class fees, please use one of the following bank accounts and upload a picture or screenshot of the payment slip.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-10 gap-8">
          <Card bankLogo={peoplesLogo} bankName="People's Bank" accountName="W.T.S.R.K. Ranasinghe" accountNumber="018 2001 2005 2260" branch="Gampola" />
          <Card bankLogo={hnbLogo} bankName="HNB" accountName="W.T.S.R.K. Ranasinghe" accountNumber="0510 1002 1851" branch="Gampola" />
        </div>

        <div className='mt-7 pb-4 ml-10 mr-10 rounded shadow-md bg-gray-100'>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div className="mt-3 w-96 ml-auto mr-auto">
            <label htmlFor="course" className="mb-2 inline-block text-neutral-700 font-bold">
                  Select course
              </label>
              <select
                  id="course"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  //value={course}
                  //onChange={(e) => setCourse(e.target.value)}
              >
                  <option value="">Select course</option>
                  {/* {courses.map(course => (
                      <option key={course.courseid} value={course.courseid}>
                          {course.courseid} - {course.subject} (Grade {course.grade} - {course.name} )
                       </option>
                  ))} */}
              </select>
            </div>

            <div className="mt-3 w-96 ml-auto mr-auto">
            <label htmlFor="course" className="mb-2 inline-block text-neutral-700 font-bold">
                  Select month
              </label>
              <select
                  id="day"
                  className="w-full px-3 py-2 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  //value={day}
                  //onChange={() => {}}
                  //disabled={inputType === 'date'}
                  //readOnly
              >
                  <option value="">Select month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
              </select>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>

            <div className="mb-2.5 w-96 mt-3 ml-auto mr-auto">
            <label className="inline-block text-neutral-700 font-bold">
                Class fees
            </label>
            <div className="flex items-center mt-1 border border-gray-300 bg-transparent rounded px-3 py-2 mr-auto mb-3">
              <span className="mr-2">Rs.</span>
              <input className="w-full bg-transparent focus:outline-none focus:bg-transparent" type="text" value="0000.00" readOnly />
            </div>
            </div>

            <div className="mb-2.5 mt-3 w-96 ml-auto mr-auto">
            <label className="inline-block text-neutral-700 font-bold">
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

        </div>


        <div className='grid grid-cols-1 md:grid-cols-1'>

            <div className="w-full ml-0 mb-0 py-0 pt-0 mt-0">
            <button
                id="continueBtn"
                disabled={!fileUploaded}
                className={`px-4 w-64 py-2 ${fileUploaded ? "bg-indigo-900 hover:bg-indigo-950" : "bg-gray-400 cursor-not-allowed"} ml-20 text-white font-semibold rounded shadow-sm`}
                onClick={handlePaid}
            >
                Complete payment
            </button>
            </div>
        </div>



        </div>

        </div>
    </div>
  )
}

function Card({ bankLogo, bankName, accountName, accountNumber, branch }) {
  return (
    <div className="flex flex-col justify-between rounded shadow-md bg-gray-100 p-4 pb-2 md:p-6">
      <img className="w-3/5 h-24 mb-4 self-start" src={bankLogo} alt={`${bankName} Logo`} />
      <p className="text-xl font-bold mb-2">{bankName}</p>
      <ul className="list-disc space-y-1 text-gray-600">
        <li>Account Name: {accountName}</li>
        <li>Account No: {accountNumber}</li>
        <li>Branch: {branch}</li>
      </ul>
    </div>
  );
}

export default BankdepoSt;
