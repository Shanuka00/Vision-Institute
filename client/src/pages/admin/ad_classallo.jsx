import React, { useState } from 'react';
import downIco from '../../images/downico.gif';
import api from '../../api/api';

function ClassalloAd() {
    const [capacity, setCapacity] = useState('')
    const [date, setDate] = useState('')
    const [day, setDay] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [isAcRoom, setIsAcRoom] = useState(false)
    const [inputType, setInputType] = useState('');
    const [newClassId, setNewClassId] = useState('');

    const handleSetIdClick = async () => {
        try {
          const response = await api.get('/nextroomid');
          setNewClassId(response.data.roomId);
        } catch (error) {
          console.error(error);
        }
    };

    const handleCapacityChange = (event) => {
        setCapacity(event.target.value)
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

    const handleIsAcRoomChange = (event) => {
        setIsAcRoom(event.target.checked)
    }

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>

            <h3 className='ml-10 mb-8 font-bold'>Classroom allocation</h3>

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
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            <button className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4">
                                Search for allocate
                            </button>
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

                    <div className="flex items-center mt-2">
                            <label htmlFor="isAcRoom" className="mr-2 text-sm font-medium">
                                AC room:
                            </label>
                            <input
                                    type="checkbox"
                                    id="isAcRoom"
                                    className="w-4 h-4 text-blue-600 focus:ring-1 focus:ring-blue-500"
                                    checked={isAcRoom}
                                    onChange={handleIsAcRoomChange}
                            />
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4">
                    
                        <div>
                            
                            <button className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4">
                                Create classroom
                            </button>
                        </div>
                    </div>
                </div>


            </div>

            <div className="mb-3 w-full mr-0">
                <img className='ml-auto mr-10 w-14 mt-2 opacity-60' src={downIco} alt="Down arrow" />
            </div>
            
        </div>
    )
}

export default ClassalloAd