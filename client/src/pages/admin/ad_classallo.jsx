// client/src/pages/admin/ad_classallo.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import downIco from '../../images/downico.gif';
import api from '../../api/api';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'react-datetime/css/react-datetime.css';
import '../../styles/system/roomallocation.css';

function ClassalloAd() {

    const [capacity, setCapacity] = useState('')
    const [date, setDate] = useState('')
    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [inputType, setInputType] = useState('');
    const [newClassId, setNewClassId] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [withAC, setWithAC] = useState(false);
    const [classrooms, setClassrooms] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);

    const navigate = useNavigate();

    // Fetch classrooms from the server
    const fetchClassrooms = async () => {
        try {
            const response = await api.get('/classrooms');
            setClassrooms(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const handleSetIdClick = async () => {
        try {
          const response = await api.get('/nextroomid');
          setNewClassId(response.data.roomId);
        } catch (error) {
          console.error(error);
        }
    };

    // Handler to create a new classroom
    const handleCreateClassroom = async () => {
        try {
            // Prepare data to send to the server
            const data = {
                maxcapacity: maxCapacity,
                withac: withAC ? 1 : 0,
                roomid: newClassId
            };
            // Send a POST request to create a new classroom
            const response = await api.post('/createclassroom', data);
            // Handle the response
            console.log(response.data); // Log the response data (if needed)
            // Reset the form fields
            setMaxCapacity('');
            setWithAC(false);
            setNewClassId(response.data.roomId);

            // Show SweetAlert after successful creation
            Swal.fire({
                title: "New classroom created successfully!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                scrollToClassroomDetails2();
            });

            fetchClassrooms();

        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchAllocate = async () => {
        try {
            const data = { capacity, date, day, startTime, endTime };
            let route;
            if (day !== '') {
                route = '/searchforallocateday'; // Change route if day is not empty
            } else {
                route = '/searchforallocatedate'; // Use this route if day is empty
            }
            const response = await api.post(route, data);
            console.log(response.data);
            setModalData(response.data);
            setShowModal(true); // Show modal after data fetching
        } catch (error) {
            console.error(error);
        }
    };

    const handleCapacityChange = (event) => {
        setCapacity(event.target.value)
    }

    const handleMaxCapacityChange = (event) => {
        setMaxCapacity(event.target.value)
    }

    const handleDateChange = (event) => {
        setDate(event.target.value);
        setInputType('date');
        if (event.target.value === '') {
            setInputType(''); // enable the day input if date select input is empty
        }
    };
    
    const handleDayChange = (event) => {
        setDay(event.target.value);
        setInputType('day');
        if (event.target.value === '') {
          setInputType(''); // enable the date input if day select input is empty
        }
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value)
    }

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value)
    }

    const handleIsACChange = (event) => {
        setWithAC(event.target.checked);
    };

    const scrollToClassroomDetails = () => {
        const classroomDetailsSection = document.getElementById('classroom-details');
        if (classroomDetailsSection) {
            classroomDetailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToClassroomDetails2 = () => {
        const classroomDetailsSection = document.getElementById('classroom-body');
        if (classroomDetailsSection) {
            classroomDetailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleRoomButtonClick = (roomId, capacity, date, day, startTime, endTime) => {
        navigate('/ad_classallo/allocate',{
            state: {
              selectedRoom: {roomId},
              selectedDate: {date},
              selectedDay: {day},
              selectedStartTime: {startTime},
              selectedEndTime: {endTime}
            }
          });
    };

    const handleCurrentAllocations = async () => {
        try {
            navigate('/ad_classallo/current');
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>

            <div className='flex w-full'>
            <h3 className='ml-10 mb-8 font-bold'>Classroom allocation</h3>
            <button onClick={handleCurrentAllocations} className="bg-indigo-900 hover:bg-indigo-950 ml-auto mr-10 text-white font-semibold mb-4 px-3 rounded">
                Current allocations
            </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mx-10 gap-8">
                
                <div className="flex flex-col justify-between rounded shadow-md bg-gray-100 p-4 md:p-6">
                    <h2 className="text-xl font-bold mb-4">Allocate a classroom</h2>
                    <div className="grid grid-cols-1 gap-1">
                        <div>
                            <label htmlFor="capacity" className="block text-sm font-medium mb-1">
                                Capacity you need:
                            </label>
                            <input
                                type="number"
                                id="capacity"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={capacity}
                                onChange={handleCapacityChange}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                        <div className="grid grid-cols-1 gap-1">
                            <label htmlFor="date" className="block text-sm font-medium mb-1">
                                Select a day or a date:
                            </label>
                            <div className="grid grid-cols-1 gap-2">
                                <input
                                    type="date"
                                    id="date"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={date}
                                    onChange={handleDateChange}
                                    disabled={inputType === 'day'}
                                />
                                
                                <select
                                    id="day"
                                    className={`w-full px-3 py-2 rounded-md border ${inputType === 'date' ? 'bg-transparent' : 'bg-white'} border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    value={day}
                                    onChange={handleDayChange}
                                    disabled={inputType === 'date'}
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
                            />
                            <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                                End time:
                            </label>
                            <input
                                type="time"
                                id="endTime"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={endTime}
                                onChange={handleEndTimeChange}
                            />
                            <button onClick={handleSearchAllocate} className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4">
                                Search for allocate
                            </button>

                            {/* Modal to display fetched data */}
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Available Classrooms</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="room-buttons">
                                        {/* Iterate over modalData and display room details */}
                                        {modalData.map((room, index) => (
                                            <button 
                                                key={index}
                                                className={`room-button ${room.withac ? 'ac-room' : 'non-ac-room'}`}
                                                onClick={() => handleRoomButtonClick(room.roomid, capacity, date, day, startTime, endTime)}
                                            >
                                                <span>{room.roomid}</span>
                                                <span>{room.withac ? ' (with AC)   ' : ' (Non-AC)   '}</span>
                                                <span>Max-capacity: {room.maxcapacity}</span>
                                                
                                            </button>
                                        ))}
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                </div>




                <div className="flex flex-col justify-between rounded shadow-md bg-gray-100 p-4 md:p-6">

                    <h2 className="text-xl font-bold mb-4">Create new classroom</h2>

                    <div className="grid grid-cols-4 gap-2">
                        <div className='col-span-3'>
                            <label htmlFor="capacity" className="block text-sm font-medium mb-1">
                                Classroom ID:
                            </label>
                            <input
                                type="text"
                                readOnly
                                id="newclassid"
                                value={newClassId || ''}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <button onClick={handleSetIdClick} className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4 w-full">
                                Set ID
                            </button>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label htmlFor="maxcapacity" className="block text-sm font-medium mb-1">
                                Max capacity:
                            </label>
                            <input
                                type="number"
                                id="maxcapacity"
                                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={maxCapacity}
                                onChange={handleMaxCapacityChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center mt-2">
                            <label htmlFor="isAcRoom" className="mr-2 text-sm font-medium">
                                AC room:
                            </label>
                            <input
                                    type="checkbox"
                                    id="isAcRoom"
                                    className="w-4 h-4 text-blue-600 focus:ring-1 focus:ring-blue-500"
                                    checked={withAC}
                                    onChange={handleIsACChange} 
                            />
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                    
                        <div>
                            
                            <button onClick={handleCreateClassroom} className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4">
                                Create classroom
                            </button>
                        </div>
                    </div>
                </div>


            </div>

            <div className="mb-3 w-full mr-0" onClick={scrollToClassroomDetails}>
                <img className='ml-auto mr-10 w-14 mt-2 opacity-60' src={downIco} alt="Down arrow" />
            </div>

            {/* Classroom Table */}
            <div id="classroom-details" className="rounded shadow-md bg-gray-100 p-4 mx-10">
                    <h2 id="classroom-body" className="text-xl font-bold mb-4">Classroom details</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Room ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Max Capacity
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    AC Room
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {classrooms.map((classroom) => (
                                <tr key={classroom.roomid}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{classroom.roomid}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{classroom.maxcapacity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{classroom.withac ? 'Yes' : 'No'}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            
        </div>
    )
}

export default ClassalloAd