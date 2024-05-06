import React from 'react'
import '../../styles/registration_styles.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "react-datetime/css/react-datetime.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import axios from 'axios';
import Swal from 'sweetalert2';

function IdCreate() {

  const location = useLocation();

  const nextVid = location.state?.nextVid["maxVisionId"];

  const {
    currentState,
  } = location.state || {};

  const { width, height } = useWindowSize()
  const [opacity, setOpacity] = useState(1);
  const [active, setActive] = useState(true);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let newState;
  if (currentState === true) {
    newState = "YesRegYesPass";
  } else if (currentState === false) {
    newState = "NoRegYesPass";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const duration = 6000; // Duration in milliseconds
    const interval = 10; // Update interval in milliseconds
    const startTime = Date.now();

    const fadeOut = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = duration - elapsedTime;
      const fadePercentage = remainingTime / duration;

      // Update opacity gradually
      setOpacity(fadePercentage);

      if (elapsedTime >= duration) {
        clearInterval(fadeOut);
        setActive(false);
      }
    }, interval);

    return () => {
      clearInterval(fadeOut);
    };
  }, []);

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
      title: "Completed Registration Successfully!",
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

  return (
    
    <div>

    <div className='pt-28'>

    <div>
        {active && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={280}
            opacity={opacity}
          />
        )}
    </div>

    <form className="form-container pt-2">

      <div className="mx-auto w-100 space-y-6">
        <div className="border-b pb-0">

          <p className="mt-7 text-lg font-semibold text-indigo-900 pb-1">
            You have successfully created your vision profile 🎉
          </p>

          <div className="flex mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">

            <div className="flex sm:col-span-full">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 pt-1">
              Your Vision ID | ඔබේ අංකය : 
              </label>
              <div className="pl-2 sm:col-span-full mb-2 pt-0">
                <input
                  type="text"
                  name="nextVid"
                  id="next-vid"
                  autoComplete="off"
                  value={nextVid}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  className="block w-2/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                onClick={(e) => handleSubmit(e)}
              >
                👉 Complete registration 👈<br/>ලියාපදිංචිය අවසන් කරන්න
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

export default IdCreate