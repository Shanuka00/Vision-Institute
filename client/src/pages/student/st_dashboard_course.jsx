import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DashboardCouSt() {
  const location = useLocation();
  const { courseId, subject } = location.state; // Extract courseId and subject from location state

  const [learningMaterials, setLearningMaterials] = useState([
    { id: 1, title: 'Sample Material 1', fileUrl: 'https://firebasestorage.googleapis.com/v0/b/vision-institute-80d7f.appspot.com/o/classfees%2F10%2FVS100001_2024_february?alt=media&token=aeee0e65-24f6-4ff8-b8b3-4d6ad256e605' },
    { id: 2, title: 'Sample Material 2', fileUrl: 'https://example.com/sample_material_2.pdf' }
  ]);

  // Assume you fetch learning materials from backend here, I'll simulate with useEffect
  useEffect(() => {
    // Fetch learning materials for the selected course from backend
    // Replace this with your actual backend call
    // This is just a mock data
    const fetchLearningMaterials = async () => {
      // Example fetch call
      const response = await fetch(`/api/learningMaterials?courseId=${courseId}`);
      const data = await response.json();
      setLearningMaterials(data);
    };

    fetchLearningMaterials();
  }, [courseId]); // Run effect when courseId changes

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h2>Selected Course: {subject} (ID: {courseId})</h2>
      <h3 className='text-lg'>Learning Materials</h3>
      <div className='mt-6'>
        {learningMaterials.map((material, index) => (
          <div key={index} className='bg-gray-100 p-4 my-2 rounded'>
            <p><strong>Title:</strong> {material.title}</p>
            <button 
              className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 w-3/12 mt-2 rounded"
              onClick={() => {
                // Create a temporary anchor element
                const link = document.createElement('a');
                link.href = material.fileUrl;
                link.download = true; // Setting download attribute triggers a download when clicked
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); // Cleanup
              }}
            >
              Download File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardCouSt;
