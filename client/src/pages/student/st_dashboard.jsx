import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/api';

function DashboardSt() {

  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profileData, setProfileData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      const storedVisionId = localStorage.getItem('visionId');
      if (storedVisionId) {
        fetchProfileData(storedVisionId);
      }
    }

    // Fetch courses and notifications from the server
    const fetchData = async () => {
      try {
        const coursesResponse = await api.get('/loadStCourses', { params: { visionid: profileData.visionid } });
        setCourses(coursesResponse.data.courses);

        const notificationsResponse = await api.get('/loadStNotifications', { params: { visionid: profileData.visionid } });
        setNotifications(notificationsResponse.data.notifications);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [profileData.visionid]);

  const fetchProfileData = async (visionId) => {
    try {
      const response = await api.post('/profileByVisionId', { visionId });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  const handleSeen = async (visionId, courseId, date) => {
    try {
      await api.post('/markAsSeenSt', { visionId, courseId, date });
      window.location.reload();
    } catch (error) {
      console.error('Error marking message as seen', error);
    }
  };

  const handleCourseClick = (id) => {
    navigate(`/st_dashboard/course`, { state: { courseId: id } });
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <h1 className='text-3xl font-bold'>Welcome back, {profileData.firstname} ✨</h1>
      <div className='mt-6'>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/2 bg-gray-200 rounded p-8'>
            <h2 className='text-lg font-bold'>Courses</h2>
            {courses.map(course => (
              <div 
                key={course.courseid} 
                className='flex bg-white p-4 pb-2 mb-3 my-2 rounded cursor-pointer'
                onClick={() => handleCourseClick(course.courseid)}
              >
                <div className='pr-16'>
                  <p><strong>Course ID:</strong> {course.courseid}</p>
                  <p><strong>Subject:</strong> {course.subject}</p>
                  <p><strong>Grade:</strong> {course.grade}</p>
                  <p><strong>Teacher:</strong> {course.teacher}</p>
                </div>
                <div>
                  <svg width="145" height="145" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-4 text-slate-400 opacity-40" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V10M7 3V5M17 3V5M3 9H21M13.5 13.0001L7 13M10 17.0001L7 17M14 21L16.025 20.595C16.2015 20.5597 16.2898 20.542 16.3721 20.5097C16.4452 20.4811 16.5147 20.4439 16.579 20.399C16.6516 20.3484 16.7152 20.2848 16.8426 20.1574L21 16C21.5523 15.4477 21.5523 14.5523 21 14C20.4477 13.4477 19.5523 13.4477 19 14L14.8426 18.1574C14.7152 18.2848 14.6516 18.3484 14.601 18.421C14.5561 18.4853 14.5189 18.5548 14.4903 18.6279C14.458 18.7102 14.4403 18.7985 14.405 18.975L14 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className='md:w-1/2 md:ml-4 md:mt-0 bg-gray-200 rounded p-8'>
            <h2 className='text-lg font-bold'>Notifications</h2>
            {notifications.map(notification => {
              const dateObject = new Date(notification.date);
              const year = dateObject.getFullYear();
              const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
              const day = dateObject.getDate().toString().padStart(2, '0');
              const date = `${year}-${month}-${day}`;

              return (
                <div key={notification.courseid} className='bg-white p-4 pb-2 mb-3 my-2 rounded flex justify-between items-center'>
                  <p>Your attendance for the {notification.courseid} class on {date} has been marked</p>
                  <button onClick={() => handleSeen(profileData.visionid, notification.courseid, date)} className='bg-indigo-900 hover:bg-indigo-950 text-white px-2 py-1 rounded text-sm'>Seen</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSt;
