import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Swal from 'sweetalert2';

function ClassalloAlocAd() {

    const [course, setCourse] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [inputType, setInputType] = useState('');
    const [courses, setCourses] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const {
        selectedRoom,
        selectedDate,
        selectedDay,
        selectedStartTime,
        selectedEndTime
    } = location.state || {};

    if (selectedRoom) {
        document.title = `Selected room: ${selectedRoom.roomId}`;
    }

    useEffect(() => {
        // Fetch courses when component mounts
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get('/getAllCoursesWithDetails');
            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Update state only when necessary
    React.useEffect(() => {
        if (selectedDate) {
            setDate(selectedDate.date);
            setInputType('date');
            if (!selectedDay) {
                setInputType('');
            }
        }

        if (selectedDay) {
            setDay(selectedDay.day);
            setInputType('day');
            if (!selectedDate) {
                setInputType('');
            }
        }

        if (selectedStartTime) {
            setStartTime(selectedStartTime.startTime);
        }

        if (selectedEndTime) {
            setEndTime(selectedEndTime.endTime);
        }
    }, [selectedDate, selectedDay, selectedStartTime, selectedEndTime]);

    const handleAllocateCourse = async () => {
        try {
            // Prepare data to be sent to the server
            const data = {
                roomid: selectedRoom.roomId,
                courseid: course,
                day,
                date,
                starttime: startTime,
                endtime: endTime
            };
            // Send POST request to allocate the classroom to the course
            await api.post('/allocateClassroomToCourse', data);
            // Show success message using SweetAlert
            Swal.fire({
                title: "Classroom allocated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate('/ad_classallo');
            });
            
        } catch (error) {
            console.error(error);
        }
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            <h3 className='ml-10 mb-10 font-bold text-center'>Selected classroom : {selectedRoom ? selectedRoom.roomId : ''}</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 mx-56 gap-8">
                <div className="flex flex-col justify-between rounded shadow-md bg-gray-100 p-4 md:p-6">
                    <h2 className="text-xl font-bold mb-4">Allocate a course</h2>
                    <div className="grid grid-cols-1 gap-1">
                        <div>
                            <label htmlFor="course" className="block text-sm font-medium mb-1">
                                Select a course:
                            </label>
                            <select
                                id="course"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            >
                                <option value="">Select a course</option>
                                {/* Map over courses and create option elements */}
                                {courses.map(course => (
                                    <option key={course.courseid} value={course.courseid}>
                                        {course.courseid} - {course.subject} (Grade {course.grade} - {course.name} )
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                        <div className="grid grid-cols-1 gap-2">
                            <label htmlFor="date" className="block text-sm font-medium mb-1">
                                Select a day or a date:
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                <input
                                    type="date"
                                    id="date"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={date}
                                    onChange={() => {}}
                                    disabled={inputType === 'day'}
                                    readOnly
                                />
                                <select
                                    id="day"
                                    className={`w-full px-3 py-2 rounded-md border ${inputType === 'date' ? 'bg-transparent' : 'bg-white'} border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    value={day}
                                    onChange={() => {}}
                                    disabled={inputType === 'date'}
                                    readOnly
                                >
                                    <option value="">Select a day</option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                                Start time:
                            </label>
                            <input
                                type="time"
                                id="startTime"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={startTime}
                                onChange={handleStartTimeChange}
                                readOnly
                            />
                            <label htmlFor="endTime" className="block text-sm font-medium mb-1 mt-1">
                                End time:
                            </label>
                            <input
                                type="time"
                                id="endTime"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={endTime}
                                onChange={handleEndTimeChange}
                                readOnly
                            />
                            <button onClick={handleAllocateCourse} className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4">
                                Allocate for the course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClassalloAlocAd;

