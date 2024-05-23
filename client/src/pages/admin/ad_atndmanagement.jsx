import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import Swal from 'sweetalert2';

function AtndManagementAd() {
    const [grade, setGrade] = useState('');
    const [course, setCourse] = useState('');
    const [qrData, setQrData] = useState('');
    const [showQrScanner, setShowQrScanner] = useState(false);
    const navigate = useNavigate();

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
        setCourse(''); // Reset by shan
    };

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };

    const handleViewRecords = () => {
        navigate('/attnd_records');
    };

    const handleGetAttendance = () => {
        setShowQrScanner(true);
    };

    const handleScan = (data) => {
        if (data) {
            setQrData(data.text);
            setShowQrScanner(false);
            Swal.fire({
                title: "QR Code Scanned!",
                text: `Details: ${data.text}`,
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-8 w-full'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className="text-3xl font-bold">Get new attendance</h1>
                <button onClick={handleViewRecords} className="bg-indigo-900 hover:bg-indigo-950 text-white py-2 px-6 rounded">View records</button>
            </div>
            <div className="mb-3">
                <label className="block mb-2 font-semibold">Select grade:</label>
                <select value={grade} onChange={handleGradeChange} className="border rounded py-2 px-4 w-full">
                    <option value="">Select grade</option>
                    <option value="grade1">Grade 1</option>
                    <option value="grade2">Grade 2</option>
                    <option value="grade3">Grade 3</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Select course:</label>
                <select value={course} onChange={handleCourseChange} className="border rounded py-2 px-4 w-full" disabled={!grade}>
                    <option value="">Select course</option>
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
                    <option value="course3">Course 3</option>
                </select>
            </div>
            <div className="mb-4">
                {course ? (
                    <label className="block mb-2 font-semibold text-green-700">Selected course: {course}</label>
                ) : (
                    <label className="block mb-2 font-semibold text-red-700">No course selected..</label>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black rounded w-full h-80 flex items-center justify-center relative">
                    {showQrScanner ? (
                        <QrScanner
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <p className="text-white">Camera view</p>
                    )}
                </div>
                <div className="flex flex-col justify-between">
                    <div className="mb-3">
                        <button onClick={handleGetAttendance} className="bg-indigo-900 hover:bg-indigo-950 text-white py-2 px-6 rounded" disabled={!grade || !course}>Get next attendance</button>
                    </div>
                    <div style={{ width: '100%', height: '90%' }} className="border rounded text-3xl font-semibold p-4 flex items-center justify-center">
                        {qrData ? (
                            <p>Last scanned Vision ID: <font color='green'>{qrData}</font></p>
                        ) : (
                            <p>Will display attendance details here</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AtndManagementAd;
