import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Swal from 'sweetalert2';
import backB from '../../images/backb.png';
import { AiFillDelete } from 'react-icons/ai';

function ClassalloCurrentAd() {

    const [roomAllocations, setRoomAllocations] = useState([]);

    const navigate = useNavigate();

    // Fetch room allocations when component mounts
    useEffect(() => {
        fetchRoomAllocations();
    }, []);

    // Function to fetch room allocations from the server
    const fetchRoomAllocations = async () => {
        try {
            const response = await api.get('/getAllRoomAllocations');
            setRoomAllocations(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteRoomAllocation = async (roomId, courseId, day, date, startTime, endTime) => {
        // Display a confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this room allocation.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/deleteRoomAllocation/${roomId}/${courseId}/${day}/${date}/${startTime}/${endTime}`);
                    // After deletion, fetch room allocations again to update the UI
                    fetchRoomAllocations();
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) {
            return 'no';
        } else {
            return dateObj.toLocaleDateString();
        }
    };

    const handleBackButton = async () => {
        try {
            navigate('/ad_classallo');
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            {/* RoomAllocation Table */}
            <div id="roomallocatio-details" className="rounded shadow-md bg-gray-100 p-4 mx-10">
                <div className="flex">
                <h2 id="roomallocation-body" className="text-xl font-bold mb-3 mt-1">Allocated classroom details</h2>
                <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-10 mb-4 -mt-1' src={backB} alt="Down arrow" />
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {roomAllocations.map((roomAllocation) => (
                            <tr key={`${roomAllocation.roomid}-${roomAllocation.courseid}-${roomAllocation.date}-${roomAllocation.starttime}`}>
                                <td className="px-6 py-4 whitespace-nowrap">{roomAllocation.roomid}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{roomAllocation.courseid}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{roomAllocation.day}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(roomAllocation.date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{roomAllocation.starttime}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{roomAllocation.endtime}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button onClick={() => handleDeleteRoomAllocation(roomAllocation.roomid, roomAllocation.courseid, roomAllocation.day, roomAllocation.date, roomAllocation.starttime, roomAllocation.endtime)}>
                                        <AiFillDelete style={{ color: 'red' }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClassalloCurrentAd;
