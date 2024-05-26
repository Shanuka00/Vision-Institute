import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DashboardCouTe() {
  const location = useLocation();
  const { courseId } = location.state;
  
  const [learningMaterials, setLearningMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({ title: '', file: null });

  const handleFileChange = (e) => {
    setNewMaterial({ ...newMaterial, file: e.target.files[0] });
  };

  const handleTitleChange = (e) => {
    setNewMaterial({ ...newMaterial, title: e.target.value });
  };

  const handleAddMaterial = () => {
    if (newMaterial.title && newMaterial.file) {
      setLearningMaterials([...learningMaterials, newMaterial]);
      setNewMaterial({ title: '', file: null });
    }
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h2 className='text-xl font-bold'>Course ID: {courseId}</h2>
      <h3 className='text-lg'>Upload Learning Materials</h3>
      <div className='mt-6'>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            className='form-control'
            value={newMaterial.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className='form-group mt-4'>
          <label htmlFor='file'>File:</label>
          <input
            id='file'
            type='file'
            className='form-control'
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handleAddMaterial}
          className='btn btn-primary mt-4'
          disabled={!newMaterial.title || !newMaterial.file}
        >
          Add Material
        </button>
      </div>
      <div className='mt-6'>
        <h3 className='text-lg font-semibold'>Learning Materials</h3>
        {learningMaterials.map((material, index) => (
          <div key={index} className='bg-gray-100 p-4 my-2 rounded'>
            <p><strong>Title:</strong> {material.title}</p>
            <p><strong>File:</strong> {material.file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCouTe;
