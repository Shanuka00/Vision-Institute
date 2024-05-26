import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PaymentTe() {
  const [courses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Fetch courses data from server
    // axios.get('/api/courses').then(response => {
    //   setCourses(response.data);
    // });
  }, []);

  const handleViewPayment = () => {
    if (selectedCourse && selectedMonth) {
      axios.get(`/api/payment?course=${selectedCourse}&month=${selectedMonth}`)
        .then(response => {
          setPaymentDetails(response.data);
        });
    }
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h1 className='text-xl font-bold'>Teacher payment</h1>
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
              <option key={course.id} value={course.id}>{course.name}</option>
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
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleViewPayment}
          className='btn btn-primary mt-4'
          disabled={!selectedCourse || !selectedMonth}
        >
          View payment
        </button>
      </div>
      {!paymentDetails && (
        <div className='mt-6 text-center opacity-50'>
          <svg width="50" height="50" viewBox="0 0 24 24" className='ml-auto mr-auto mb-2 mt-8' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 20.2476L20.2374 16M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H11.5M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11M9 17H11.5M9 13H13M9 9H10M21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No data!<br />Select a course and month</p>
        </div>
      )}
      {paymentDetails && (
        <div className='mt-6'>
          <p><strong>Total collection:</strong> {paymentDetails.totalCollection}</p>
          <p><strong>Total expenses:</strong> {paymentDetails.totalExpenses}</p>
          <p><strong>Payment scheme:</strong> {paymentDetails.paymentScheme}%</p>
          <p><strong>Total payment:</strong> {paymentDetails.totalPayment}</p>
        </div>
      )}
    </div>
  );
}

export default PaymentTe;
