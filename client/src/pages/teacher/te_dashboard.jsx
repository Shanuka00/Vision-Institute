// src/pages/DashboardTe.js

import React from 'react';
//import { useContext } from 'react';
//import { AuthContext } from '../../services/AuthContext';

function DashboardTe() {

  //const { loginResponse } = useContext(AuthContext);

  return (
    <div className='rounded-s-3xl bg-white w-full'>
      <h2 className='font-lg text-center mt-8'>This is teacher dashboard</h2>
      {/* <h2 className='font-lg text-center mt-8'>{loginResponse && loginResponse.userId} This is teacher dashboard</h2> */}
    </div>
  );
}

export default DashboardTe;