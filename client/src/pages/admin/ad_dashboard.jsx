import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DashboardAd() {

  const [messages, setMessages] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [fees, setFees] = useState('');
  const [newFees, setNewFees] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

    const fetchMessages = async () => {
      try {
        const response = await api.get('/outsideMessages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/newOnRegistrations');
        setRegistrations(response.data.registrations);
      } catch (error) {
        console.error('Error fetching registrations', error);
      }
    };

    fetchMessages();
    fetchRegistrations();
    fetchFeesAndSaveToLocal();
  }, []);

  const handleFeesUpdate = async (event) => {
    event.preventDefault();
    try {
      if (newFees >= 100 && newFees <= 1000) {
        await api.post('/updateFeesReg', { newFees });
        swal.fire({
          title: "Fees updated successfully",
          icon: "success",
        }).then(() => {
          //fetchFeesAndSaveToLocal();
        });
      } else {
        swal.fire({
          title: "Error",
          text: "Fees must be between 100 and 1000",
          icon: "error",
        });
      }
    } catch (error) {
      console.error('Error updating fees', error);
      swal.fire({
        title: "Error",
        text: "Failed to update fees",
        icon: "error",
      });
    }
  };
  

  const markAsSeen = async (messageId) => {
    try {
      await api.post('/markAsSeenOM', { messageId });
      window.location.reload();
    } catch (error) {
      console.error('Error marking message as seen', error);
    }
  };

  const handleApprove = async () => {
    try {
      await api.post('/approveRegistration', { visionId: selectedRegistration.visionid });
      setSelectedRegistration(null);
      window.location.reload();
    } catch (error) {
      console.error('Error approving registration', error);
    }
  };

  const handleReject = async () => {
    try {
      await api.post('/rejectRegistration', { visionId: selectedRegistration.visionid });
      setSelectedRegistration(null);
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting registration', error);
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
                <p><strong>Phone Number:</strong> {message.mobile}</p>
                <p><strong>Message:</strong> {message.message}</p>
                <button onClick={() => markAsSeen(message.msgid)} className="self-end bg-indigo-900 hover:bg-indigo-950 text-white px-2 py-1 rounded">Seen</button>
              </div>
            ))}
          </div>
        </div>

        <div>

        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Update registration fees</h3>
          <form onSubmit={handleFeesUpdate}>
            <label htmlFor="newFees" className="block mb-2 text-sm font-medium text-gray-900">New Fees:</label>
            <input 
              type="number" 
              id="newFees" 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-4" 
              placeholder={fees}
              min="100"
              max="1000"
              required 
              value={newFees} 
              onChange={(e) => setNewFees(e.target.value)}  
            />
            <button type="submit" className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg">Update</button>
          </form>
        </div>

        <div className="mt-4 col-span-2 md:col-span-1 bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">New online registrations</h3>
          <div className="space-y-4">
            {registrations.map((registration, index) => (
              <div key={index} className="bg-white p-4 pb-2 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p> {registration.visionid}</p>
                  <p> {registration.firstname} {registration.lastname}</p>
                  <p> {registration.mobilenumber}</p>
                </div>
                <button onClick={() => { setSelectedRegistration(registration); setShowModal(true); }} className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg">View</button>
              </div>
            ))}
          </div>
        </div>

        </div>

      </div>

      {selectedRegistration && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Vision ID: {selectedRegistration.visionid}</p>
            <p>Name: {selectedRegistration.firstname} {selectedRegistration.lastname}</p>
            <p>Mobilenumber: {selectedRegistration.mobilenumber}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="success" onClick={handleApprove}>
              Approve
            </Button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
}

export default DashboardAd;
