import React from 'react'
import '../../styles/registration_styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import api from '../../api/api';

function AlreadyReg() {

  const location = useLocation();

  const {
    currentState,
  } = location.state || {};

  const [password, setPassword] = useState('');
  const [student, setStudent] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let newState;
  if (currentState === true) {
    newState = "YesRegYesPass";
  } else if (currentState === false) {
    newState = "NoRegYesPass";
  }

  //update password and state
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        showAlertNotMatch();
        return;
    }

    const visionId = location.state?.nextVid?.maxVisionId;

    try {
        await axios.post('/api/vision/updatePasswordAndState', { visionId, password, confirmPassword, newState });
        console.log('Password updated successfully!');
        showAlertSuccess();

    } catch (error) {
        console.log(password, confirmPassword, visionId, newState);
        console.error('Error updating password:', error);
        console.log('Error updating password. Please try again later.');
    }
  };

  const navigate = useNavigate();

  function showAlertSuccess() {
    
    Swal.fire({
      title: "Password updated successfully!",
      text: "Use your Vision ID and Password to login to your dashboard",
      icon: "success",
      confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); // Navigate when the "Login" button is clicked
        }
      });
  }

  function showAlertNotMatch() {
    Swal.fire({
      title: "Passwords doesn't match!",
      text: "Try again with same passwords",
      icon: "error",
      confirmButtonText: "Try Again"
    });
  }

  const fetchStudent = async (inputValue) => {
    try {
        const response = await api.get(`/fetchAlreadyStudent?visionId=${inputValue}`);
        setStudent(response.data[0].visionid);
        setFname(response.data[0].firstname);
        setLname(response.data[0].lastname);
    } catch (error) {
        Swal.fire({
            title: "You can't access to this Vision ID!",
            text: "Try again with your Vision ID",
            icon: "error",
            confirmButtonText: "Try Again"
          });
          setStudent('');
          setFname('');
          setLname('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (inputValue.length === 8) {
            fetchStudent(inputValue);
        } else {
            Swal.fire({
                title: "Error!",
                text: `Please enter a valid Vision ID of 8 characters.`,
                icon: "error",
                confirmButtonText: "OK",
            });
            setStudent('');
            setFname('');
            setLname('');
        }
    }
};

  return (
    
    <div>

    <div className='pt-28'>

    <form className="form-container pt-2">

      <div className="mx-auto w-100 space-y-6">
        <div className="border-b pb-0">

          <p className="mt-8 text-lg font-semibold text-indigo-800 pb-1">
            Type your Vision ID and press Enter <span className='text-sm text-slate-500'> (If you don't know your Vision ID, please contact the Vision Administration)</span>
          </p>

          <div className="flex mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <div className="flex sm:col-span-full">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 pt-1">
              Your Vision ID | ඔබේ අංකය : 
              </label>
              <div className="flex pl-2 sm:col-span-full mb-2 pt-0 w-6/12">
                <input
                  type="text"
                  name="nextVid"
                  id="next-vid"
                  autoComplete="off"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                />
                <span className='w-full ml-3 mt-1 text-green-700'>{student} - {fname} {lname}</span>
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Create a password | මුරපදයක් සාදන්න
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block pl-2 w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={!student}
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Re-enter password | මුරපදය නැවත යොදන්න
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block pl-2 w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  disabled={!student}
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
                onClick={(e) => handleSubmit(e)}
              >
                Complete registration<br/>ලියාපදිංචි වන්න
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

export default AlreadyReg