import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function DashboardTe() {

  const [userData] = useState({ firstname: 'Kasun' });
  const [courses] = useState([
    { id: '1011', subject: 'Science', grade: 'Grade 9', teacher: 'Kasun sir' },
    { id: '1012', subject: 'Science', grade: 'Grade 10', teacher: 'Kasun sir' },
    { id: '1013', subject: 'Science', grade: 'Grade 11', teacher: 'Kasun sir' }
  ]);
  const [notifications] = useState([
    { id: '1', message: 'Grade 10 Science class can be held in A03 classroom on 18.12.2023' },
    { id: '2', message: 'Grade 11 Science class papers due on 16.12.2023 have been printed. Get it from Admin. (expense: Rs.560.00)' }
  ]);

  const navigate = useNavigate();

  const handleSeen = () => {
    Swal.fire({
      title: 'Marked as Seen',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleCourseClick = (id) => {
    navigate(`/te_dashboard/course`, { state: { courseId: id } });
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h1 className='text-3xl font-bold'>Welcome back, {userData.firstname} ✨</h1>
      <div className='mt-6'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2 bg-gray-200 rounded p-8'>
            <h2 className='text-lg font-semibold'>Courses</h2>
            {courses.map(course => (
              <div 
                key={course.id} 
                className='bg-white p-4 my-2 rounded cursor-pointer'
                onClick={() => handleCourseClick(course.id)}
              >
                <p><strong>Course ID:</strong> {course.id}</p>
                <p><strong>Subject:</strong> {course.subject}</p>
                <p><strong>Grade:</strong> {course.grade}</p>
                <p><strong>Teacher:</strong> {course.teacher}</p>
              </div>
            ))}
          </div>

          <div className='md:w-1/2 md:ml-4 md:mt-0 bg-gray-200 rounded p-8'>
            <h2 className='text-lg font-semibold'>Notifications</h2>
            {notifications.map(notification => (
              <div key={notification.id} className='bg-white p-4 my-2 rounded flex justify-between items-center'>
                <p>{notification.message}</p>
                <button onClick={() => handleSeen(notification.id)} className='bg-green-500 text-white px-2 py-1 rounded text-sm'>Seen</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTe;
