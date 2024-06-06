import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import Swal from 'sweetalert2';

function AtndManagementAd() {

    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [qrData, setQrData] = useState('');
    const [showQrScanner, setShowQrScanner] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
    
        const fetchGrades = async () => {
          try {
            const response = await api.get('/grades');
            if (response.data && Array.isArray(response.data)) {
              setGrades(response.data);
            } else {
              console.error('Unexpected response structure:', response.data);
              setGrades([]);
            }
          } catch (error) {
            console.error('Error fetching grades', error);
            setGrades([]);
          }
        };
    
        if (selectedGrade) {
          fetchCourses(selectedGrade);
        }
    
        fetchGrades();
    }, [selectedGrade, selectedCourse]);

    const fetchCourses = async (selectedGrade) => {
        try {
            const response = await api.get(`/courses?grade=${selectedGrade}`);
            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (inputValue.length === 8) {
                let data = { text: inputValue };
                handleScan(data);
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

    const handleGradeChange = async (e) => {
        const grade = e.target.value;
        setSelectedGrade(grade);
        setSelectedCourse('');
        try {
          const response = await api.get(`/courses?grade=${grade}`);
          if (response.data && Array.isArray(response.data.courses)) {
            setCourses(response.data.courses);
          } else {
            setCourses([]);
          }
        } catch (error) {
          console.error('Error fetching courses', error);
          setCourses([]);
        }
      };

      const handleCourseChange = async (e) => {
        const course = e.target.value;
        setSelectedCourse(course);
      };

    const handleViewRecords = () => {
        navigate('/ad_atndmanagement/records');
    };

    const handleGetAttendance = () => {
        setShowQrScanner(true);
    };

    const handleScan = async (data) => {
        if (data) {
            if (data.text.length === 8) {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
    
                const monthN = currentDate.getMonth(); // 0-11
                const monthNames = ["January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"];
                const monthName = monthNames[monthN];
    
                setQrData(data.text);
                setShowQrScanner(false);
                const dataat = { visionid: data.text, courseid: selectedCourse, date: formattedDate, monthName };
                api.post('/markAttendance', dataat)
                    .then(response => {
                        const { message, feesStatus } = response.data;
    
                        let swalMessage = '';
                        let swalTitle = '';
                        let swalIcon = '';
    
                        switch (message) {
                            case 'not enrolled':
                                swalTitle = "Student Not Enrolled!";
                                swalMessage = "The student is not enrolled in this course.";
                                swalIcon = "error";
                                break;
                            case 'Attendance marked successfully':
                                swalTitle = "Attendance Marked!";
                                swalMessage = `StudentID: ${data.text} | CourseID: ${selectedCourse} | Date: ${formattedDate}`;
                                if (feesStatus === 'no classfees') {
                                    swalMessage += "\nNote: Class fees not paid for the month.";
                                } else if (feesStatus === 'paid') {
                                    swalMessage += "\nNote: Class fees paid.";
                                } else if (feesStatus === 'free') {
                                    swalMessage += "\nNote: Free card student.";
                                }
                                swalIcon = "success";
                                break;
                            default:
                                swalTitle = "Error!";
                                swalMessage = "An unexpected error occurred.";
                                swalIcon = "error";
                                break;
                        }
    
                        Swal.fire({
                            title: swalTitle,
                            text: swalMessage,
                            icon: swalIcon,
                            confirmButtonText: "OK",
                        });
                    })
                    .catch(error => {
                        let errorMessage = "An unexpected error occurred.";
                        let errorTitle = "Error!";
                        let errorIcon = "error";
    
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            const { message } = error.response.data;
                            if (message === `ER_DUP_ENTRY: Duplicate entry '${data.text}-${selectedCourse}-${formattedDate}' for key 'PRIMARY'`) {
                                errorTitle = "Duplicate Entry!";
                                errorMessage = "This student already marked for today!";
                            } else {
                                errorMessage = message;
                            }
                        } else if (error.request) {
                            // The request was made but no response was received
                            errorTitle = "Server Error!";
                            errorMessage = "No response from server.";
                        }
    
                        Swal.fire({
                            title: errorTitle,
                            text: errorMessage,
                            icon: errorIcon,
                            confirmButtonText: "OK",
                        });
                    });
            } else {
                setQrData('');
                setShowQrScanner(false);
                Swal.fire({
                    title: "Invalid QR Code!",
                    text: "Please scan a valid QR Code",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
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
                <select id="grade" value={selectedGrade} onChange={handleGradeChange} className="border rounded py-2 px-4 w-full">
                    <option value="" disabled>Select a grade</option>
                    {grades.map((grade) => (
                    <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-semibold">Select course:</label>
                <select id="course" value={selectedCourse} onChange={handleCourseChange} className="border rounded py-2 px-4 w-full" disabled={!selectedGrade}>
                    <option value="" disabled>Select a course</option>
                    {courses.map((course) => (
                    <option key={course.courseid} value={course.courseid}>{course.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                {selectedCourse ? (
                    <label className="block mb-2 font-semibold text-green-700">Selected course: {selectedCourse}</label>
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
                        <button onClick={handleGetAttendance} className="bg-indigo-900 hover:bg-indigo-950 text-white py-2 px-6 rounded" disabled={!selectedGrade || !selectedCourse}>Get next attendance</button>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="visionID"
                            placeholder="Enter Vision ID and press enter to get attendance"
                            id="visionID"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="border rounded py-2 px-4 w-full mb-3"
                            disabled={!selectedGrade || !selectedCourse}
                        />
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
