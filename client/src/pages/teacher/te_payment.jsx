import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/api';

function PaymentTe() {

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [visionId, setVisionId] = useState(null);
  const [profileData, setProfileData] = useState({});

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

    const fetchCourses = async () => {
      try {
        const response = await api.get(`/loadTeCourses?visionid=${profileData.visionid}`);
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          console.error('Unexpected response structure:', response.data);
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching courses', error);
        setCourses([]);
      }
    };

    fetchCourses();

  }, [profileData, visionId]);

  const fetchProfileData = async (visionId) => {
    try {
      const response = await api.post('/profileByVisionId', { visionId });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  const handleViewPayment = () => {
    if (selectedCourse && selectedMonth) {
      const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      const monthName = monthNames[selectedMonth];
  
      const requestBody = {
        course: selectedCourse,
        month: monthName
      };
  
      api.post('/paymentFromTe', requestBody)
        .then(response => {
          setPaymentDetails(response.data);
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    }
  };
  

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h1 className='text-3xl font-bold'>Teacher payment</h1>
      <div className='mt-6'>
        <div className='form-group'>
          <label htmlFor='course'>Select course :</label>
          <select
            id='course'
            className='form-control'
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value=''>Select course</option>
            {courses.map(course => (
              <option key={course.courseid} value={course.courseid}>{course.courseid} - {course.name}</option>
            ))}
          </select>
        </div>
        <div className='form-group mt-4'>
          <label htmlFor='month'>Select month :</label>
          <select
            id='month'
            className='form-control'
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value=''>Select month</option>
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleViewPayment}
          className='btn-primary bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded mt-8'
          disabled={!selectedCourse || !selectedMonth}
        >
          View payment
        </button>
      </div>
      {!paymentDetails && (
        <div className='mt-20 text-center text-lg opacity-50'>
          <svg width="60" height="60" viewBox="0 0 24 24" className='ml-auto mr-auto mb-2 mt-8' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 20.2476L20.2374 16M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H11.5M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H11.5M9 13H13M9 9H10M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No data!<br />Select a course and month</p>
        </div>
      )}
      {paymentDetails && (
        <div className='ml-24 mt-8'>
          <div className='mt-3 ml-auto mr-auto w-6/12 font-semibold text-3xl'>
            <p className='pb-1.5'>Total collection:<font color='#1111dd'> Rs.{paymentDetails.collection}</font></p>
            <p className='pb-1.5'>Payment scheme:<font color='#1111dd'> {paymentDetails.payscheme}%</font></p>
            <p className='pb-1.5'>Total expenses:<font color='#1111dd'> Rs.{paymentDetails.expenses}</font></p>
            <p className='pb-1.5'>Already paid:<font color='#1111dd'> Rs.{paymentDetails.already}</font></p>
            <p className='pb-1.5'>Remaining total:<font color='#1111dd'> Rs.{paymentDetails.total}</font></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentTe;
