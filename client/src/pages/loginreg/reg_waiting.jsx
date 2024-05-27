import React, { useState, useEffect } from 'react';
import WaitImage from '../../images/waitchick.gif';
import api from '../../api/api';

function RegWaiting() {

  const [profileData, setProfileData] = useState({});
  // eslint-disable-next-line
  const [visionId, setVisionId] = useState(null);

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
  }, []);

  const fetchProfileData = async (visionId) => {
    try {
      const response = await api.post('/profileByVisionId', { visionId });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  return (
    <div>

    <div className='pt-32 pb-0'>

    <form className="form-container pt-2">

      <div className="mx-auto w-100 space-y-6 h-full">
        <div className="border-b pb-0">

          <p className="mt-8 text-3xl font-semibold text-indigo-900 pb-3">
            Hi {profileData.firstname}, Welcome to Vision Online System 🤗
          </p>

          <div>
            <p className="mt-2 text-xl font-semibold text-gray-600">
              Your registration request has been successfully submitted!
              <br />
              Please wait for the approval from the admin to access the system 🥲
            </p>
          </div>

          <div>
            <img className='w-32' src={WaitImage} alt="Waiting GIF" />
          </div>

          <div className="flex mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <p className="mt-2 sm:col-span-full text-lg font-semibold text-red-600">
            * Please remember your Vision ID and Password to stay connected with the online learning process
            </p>
          </div>

        </div>

      </div>

    </form>

    </div>

    </div>
  )
}

export default RegWaiting