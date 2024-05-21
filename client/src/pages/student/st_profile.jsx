import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

import sampleMale from '../../images/student/sampleMale.png';
import sampleFemale from '../../images/student/sampleFemale.png';
import sampleVisionID from '../../images/student/sampleVisionID.png';

import '../../styles/system/st_profile.css';

function ProfileSt() {
  const [profileData, setProfileData] = useState({});
  const [visionId, setVisionId] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const storedVisionId = localStorage.getItem('visionId');
      if (storedVisionId) {
        setVisionId(storedVisionId);
        fetchProfileData(storedVisionId);
        fetchQRCode(storedVisionId);
      }
    }
  }, []);

  const fetchProfileData = async (visionId) => {
    try {
      const response = await api.post('/profileByVisionId', { visionId });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  const fetchQRCode = async (visionId) => {
    try {
      const response = await api.get('/qrcodeFetch', { params: { visionId } });
      setQrCodeUrl(response.data.qrCodeUrl);
    } catch (error) {
      console.error('Error fetching QR code', error);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${visionId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString();
  };

  const handleEditProfile = () => {
    navigate('/st_profile/edit');
  };

  return (
    <div className="profile-container rounded-s-3xl bg-white md:ml-72 md:px-10 py-4 w-full">
      {visionId && (
        <div className="profile-content flex flex-col items-center">
          <div className="profile-header flex items-center mb-3 w-full ml-32">
            <div className="profile-image bg-gray-200 rounded-full w-16 h-16 flex">
              <img 
                src={profileData.gender === 'male' ? sampleMale : sampleFemale} 
                alt="Profile" 
                className="rounded-full opacity-90" 
              />
            </div>
            <div className="profile-info ml-4">
              <h2 className="text-2xl font-bold mb-1 text-indigo-800">{visionId}</h2>
              <h3 className="text-lg font-bold">{profileData.firstname} {profileData.lastname}</h3>
            </div>
          </div>
          <div className="profile-details grid grid-cols-2 gap-6 w-full max-w-4xl p-4 rounded shadow-md bg-gray-100">
            <div className="profile-left">
              <div className="profile-item mb-3">
                <span className="font-medium">Initials :</span>
                <span className="text-indigo-600"> {profileData.initial}</span>
              </div>
              <div className="profile-item mb-3">
                <span className="font-medium">Gender :</span>
                <span className="text-indigo-600"> {profileData.gender}</span>
              </div>
              <div className="profile-item mb-0">
                <span className="font-medium">Address :</span>
                <span className="text-indigo-600"> {profileData.addressline1}, {profileData.addressline2}</span>
              </div>
            </div>
            <div className="profile-right">
              <div className="profile-item mb-3">
                <span className="font-medium">Birthday :</span>
                <span className="text-indigo-600"> {formatDate(profileData.dateofbirth)}</span>
              </div>
              <div className="profile-item mb-3">
                <span className="font-medium">Email Address :</span>
                <span className="text-indigo-600"> {profileData.email}</span>
              </div>
              <div className="profile-item mb-0">
                <span className="font-medium">Mobile Number :</span>
                <span className="text-indigo-600"> {profileData.mobilenumber}</span>
              </div>
            </div>
            <div className="profile-item col-span-2 -mt-3">
              <span className="font-medium text-indigo-800">◾ Visit edit profile to view more details and update them..</span>
            </div>
            <button
              onClick={handleEditProfile}
              className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 -mt-6 w-5/12 rounded"
            >
              Edit profile
            </button>
          </div>
        </div>
      )}


      <div className="grid grid-cols-1 md:grid-cols-4 mx-16 mt-6 gap-8">
        <div className="flex flex-col justify-between rounded shadow-md bg-gray-100 p-4 md:p-6">
          <h2 className="text-xl text-center font-bold mb-3">Your QR code</h2>
          <div className="w-full">
            {qrCodeUrl ? (
              <img className='bg-indigo-800 p-1 rounded ml-auto mr-auto w-3/4' src={qrCodeUrl} alt="QR Code" />
            ) : (
              <p className='text-center'>Loading...</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button 
              className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={handleDownloadQR}
            >
              Download QR
            </button>
          </div>
        </div>


        <div className="flex flex-col justify-between rounded shadow-md col-span-3 bg-gray-100 p-4 md:p-6">
          <h2 className="text-xl font-bold mb-2">Create your vision ID card</h2>
          <div className="grid grid-cols-2 w-full ">
            <div className="profile-left">
              <div className="w-full">
                <img className='bg-sky-900 p-1 rounded ml-8 mb-2 w-10/12' src={sampleVisionID} alt="Sample Vision ID" />
              </div>
            </div>
            <div className="profile-right">

            <div className="profile-item mb-1">
              <button 
                onClick={() => window.open('https://youtu.be/DpNzQoczrIU', '_blank')} 
                className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 w-11/12 ml-3.5 mt-8 rounded"
              >
                How to create your Vision ID card?
              </button>
            </div>

              <div className="profile-item mb-1">
              <button 
                onClick={() => window.open('https://www.canva.com/design/DAGFk0LI8gQ/HypTPDylqKa_q1cSK7R9Dg/edit?utm_content=DAGFk0LI8gQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', '_blank')} 
                className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 w-11/12 ml-3.5 mt-8 rounded"
              >
                Link to create your Vision ID card
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSt;
