import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import Swal from 'sweetalert2';
import api from '../../api/api';
import backB from '../../images/backb.png';

function StdManagementEnrAd() {

    const [grade, setGrade] = useState('');
    const [grades, setGrades] = useState([]);
    const [course, setCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [qrData, setQrData] = useState('');
    const [showQrScanner, setShowQrScanner] = useState(false);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (qrData) {
            fetchGrades();
        }
        if (grade) {
            fetchCourses(grade);
        }
    }, [grade, qrData]);

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
        setCourse('');
    };

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
    };

    const scanStudent = () => {
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.length === 8) {
                setQrData(inputValue);
                setInputValue('');
            } else {
                Swal.fire({
                    title: "Error!",
                    text: `Please enter a valid Vision ID of 8 characters.`,
                    icon: "error",
                    confirmButtonText: "OK",
                }).then(() => {
                    document.getElementById('visionID').focus();
                });
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleBackButton = async () => {
        try {
            navigate('/ad_stdmanagement');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await api.get(`/grades`);
            setGrades(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCourses = async (selectedGrade) => {
        try {
            const response = await api.get(`/courses?grade=${selectedGrade}`);
            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEnroll = async () => {
        try {
            const data = { visionid: qrData, courseid: course, date: new Date() };
            const response = await api.post('/enroll', data);
            Swal.fire({
                title: "Enrollment Successful!",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "OK",
            });
            setGrade('');
            setCourse('');
            setQrData('');

        } catch (error) {
            Swal.fire({
                title: "Enrollment Failed!",
                text: error.response.data.message,
                icon: "error",
                confirmButtonText: "OK",
            });
            setGrade('');
            setCourse('');
            setQrData('');
        }
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-8 w-full'>
            <div className='flex items-center justify-between mb-2'>
                <h1 className="text-3xl font-bold">New enrollment</h1>
                <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-10 -mt-1 mb-4' src={backB} alt="Down arrow" />
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
                        <button onClick={scanStudent} className="bg-indigo-900 hover:bg-indigo-950 text-white py-2 px-6 rounded">Scan student</button>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="visionID"
                            placeholder="Enter Vision ID and press enter to select manually"
                            id="visionID"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="border rounded py-2 px-4 w-full mb-3"
                        />
                    </div>
                    <div style={{ width: '100%', height: '90%' }} className="border rounded text-3xl font-semibold p-4 flex items-center justify-center">
                        {qrData ? (
                            <>
                                <p>Selected Student: <font color='green'>{qrData}</font></p>
                            </>
                        ) : (
                            <p>Will display selected student here</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-4 mb-2">
                <label className="block mb-1 font-semibold">Select grade:</label>
                <select value={grade} onChange={handleGradeChange} className="border rounded py-2 px-4 w-full" disabled={!qrData}>
                    <option value="">Select grade</option>
                    {grades.map((gradeItem) => (
                        <option key={gradeItem.grade} value={gradeItem.grade}>{gradeItem.grade}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Select course:</label>
                <select value={course} onChange={handleCourseChange} className="border rounded py-2 px-4 w-full" disabled={!grade}>
                    <option value="">Select course</option>
                    {courses.map((course) => (
                        <option key={course.courseid} value={course.courseid}>{course.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-2">
                <button onClick={handleEnroll} className="bg-indigo-900 hover:bg-indigo-950 text-white py-2 px-6 rounded">Enroll</button>
            </div>
        </div>
    );
}

export default StdManagementEnrAd;
