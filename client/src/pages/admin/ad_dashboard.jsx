import React, { useState, useEffect } from 'react';
import api from '../../api/api';

function DashboardAd() {

  const [messages, setMessages] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [fees, setFees] = useState('');
  const [profileData, setProfileData] = useState({});

  const fetchProfileData = async (visionId) => {
    try {
      const response = await api.post('/profileByVisionId', { visionId });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const storedVisionId = localStorage.getItem('visionId');
      if (storedVisionId) {
        fetchProfileData(storedVisionId);
      }
    }

    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/registrations');
        setRegistrations(response.data.registrations);
      } catch (error) {
        console.error('Error fetching registrations', error);
      }
    };

    const fetchFees = async () => {
      try {
        const response = await api.get('/fees');
        setFees(response.data.fees);
      } catch (error) {
        console.error('Error fetching fees', error);
      }
    };

    fetchMessages();
    fetchRegistrations();
    fetchFees();
  }, []);

  const handleFeesUpdate = async (event) => {
    event.preventDefault();
    try {
      await api.post('/update-fees', { fees });
      alert('Fees updated successfully');
    } catch (error) {
      console.error('Error updating fees', error);
    }
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h2 className="text-3xl font-bold mb-4">Welcome back, {profileData.firstname} 💫</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="col-span-2 bg-gray-200 md:row-span-2 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">New messages from outside</h3>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
                <p><strong>Name:</strong> {message.name}</p>
                <p><strong>Email:</strong> {message.email}</p>
                <p><strong>Phone Number:</strong> {message.phonenum}</p>
                <p><strong>Message:</strong> {message.message}</p>
                <button className="self-end bg-green-500 text-white px-2 py-1 mt-2 rounded">Seen</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Update registration fees</h3>
          <form onSubmit={handleFeesUpdate}>
            <label htmlFor="fees" className="block mb-2 text-sm font-medium text-gray-900">Update Fees:</label>
            <input 
              type="text" 
              id="fees" 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-4" 
              placeholder="New Fees Amount" 
              required 
              value={fees} 
              onChange={(e) => setFees(e.target.value)} 
            />
            <button type="submit" className="bg-indigo-900 text-white px-4 py-2 rounded-lg">Update</button>
          </form>
        </div>

        <div className="col-span-2 md:col-span-1 bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">New online registrations</h3>
          <div className="space-y-4">
            {registrations.map((registration, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p>Vision ID: {registration.visionId}</p>
                  <p>Firstname: {registration.firstname}</p>
                  <p>Lastname: {registration.lastname}</p>
                  <p>Mobilenumber: {registration.mobilenumber}</p>
                </div>
                <button className="bg-indigo-900 text-white px-4 py-2 rounded-lg">View</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardAd;
