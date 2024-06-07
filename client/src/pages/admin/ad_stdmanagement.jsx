import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Swal from 'sweetalert2';

function StdManagementAd() {
    
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isFreeCardEnabled, setIsFreeCardEnabled] = useState(false);
    const [isStudentFree, setIsStudentFree] = useState(false);
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

        fetchGrades();
    }, []);

    useEffect(() => {
        if (selectedGrade) {
            fetchCourses(selectedGrade);
        }
    }, [selectedGrade]);

    useEffect(() => {
        if (selectedCourse) {
            fetchStudentsByCourse(selectedCourse);
        }
    }, [selectedCourse]);

    const fetchCourses = async (selectedGrade) => {
        try {
            const response = await api.get(`/courses?grade=${selectedGrade}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses', error);
            setCourses([]);
        }
    };

    const fetchStudentsByCourse = async (courseId) => {
        try {
            const response = await api.get(`/studentsInCourse?courseId=${courseId}`);
            if (response.data && Array.isArray(response.data.students)) {
                setStudents(response.data.students);
            } else {
                setStudents([]);
            }
        } catch (error) {
            console.error('Error fetching students', error);
            setStudents([]);
        }
    };

    const handleGradeChange = (e) => {
        const grade = e.target.value;
        setSelectedGrade(grade);
        setSelectedCourse('');
    };

    const handleCourseChange = (e) => {
        const course = e.target.value;
        setSelectedCourse(course);
    };

    const handleSelectStudent = async (event) => {
        const visionid = event.target.value;
        const student = students.find(s => s.visionid === visionid);
        setSelectedStudent(student);

        try {
            const response = await api.get(`/checkStudentState?visionid=${visionid}`);
            if (response.data.state === 'free') {
                setIsStudentFree(true);
                setIsFreeCardEnabled(false);
            } else {
                setIsStudentFree(false);
                setIsFreeCardEnabled(true);
            }
        } catch (error) {
            console.error('Error checking student state', error);
        }
    };

    const handleMarkAsFreeCard = async () => {
        if (selectedStudent) {
            try {
                await api.post('/markAsFreeCard', { visionid: selectedStudent.visionid });
                Swal.fire({
                    title: 'Success!',
                    text: 'Student marked as free card successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setSelectedStudent('');
            } catch (error) {
                console.error('Error marking student as free card', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to mark student as free card.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setSelectedStudent('');
            }
        }
    };

    const handleRemoveFreeCard = async () => {
        if (selectedStudent) {
            try {
                await api.post('/removeFreeCard', { visionid: selectedStudent.visionid });
                Swal.fire({
                    title: 'Success!',
                    text: 'Student free card removed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setSelectedStudent('');
                });
            } catch (error) {
                console.error('Error removing free card from student', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to remove free card from student.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setSelectedStudent('');
                });
            }
        }
    };

    const handleResetStPassword = async () => {
        if (selectedStudent) {
            try {
                await api.post('/resetPassword', { visionid: selectedStudent.visionid });
                Swal.fire({
                    title: 'Success!',
                    text: 'Student password reset successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                setSelectedStudent('');
            } catch (error) {
                console.error('Error resetting password', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to reset student password.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setSelectedStudent('');
            }
        }
    };

    const newEnroll = () => {
        navigate('/ad_stdmanagement/enroll');
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            <div className='rounded-3xl bg-gray-100 px-10 py-10 w-full h-full'>
                <div className='w-full text-right -mt-2'>
                    <button onClick={newEnroll} className='bg-indigo-900 hover:bg-indigo-950 ml-auto text-white font-semibold py-2 px-4 rounded'>
                        New enroll
                    </button>
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div>
                        <label className='block mb-2 text-medium font-medium text-gray-700'>Select grade:</label>
                        <select id="grade" value={selectedGrade} onChange={handleGradeChange} className="border rounded py-2 px-4 w-full">
                            <option value="" disabled>Select a grade</option>
                            {grades.map((grade) => (
                                <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='block mb-2 text-medium font-medium text-gray-700'>Select course:</label>
                        <select id="course" value={selectedCourse} onChange={handleCourseChange} className="border rounded py-2 px-4 w-full" disabled={!selectedGrade}>
                            <option value="" disabled>Select a course</option>
                            {courses.map((course) => (
                                <option key={course.courseid} value={course.courseid}>{course.courseid} - {course.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200 mt-6 rounded-lg overflow-hidden shadow-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VisionID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.visionid}>
                                <td className="px-6 py-4 whitespace-nowrap">{student.visionid}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.firstname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.lastname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 bg-white p-6 rounded-md shadow-md">
                    <label className='block mb-2 text-sm font-medium text-gray-700'>Student VisionID:</label>
                    <select 
                        className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500' 
                        onChange={handleSelectStudent}
                    >
                        <option value="">Select a student</option>
                        {students.map((student) => (
                            <option key={student.visionid} value={student.visionid}>{student.visionid} - {student.firstname} {student.lastname}</option>
                        ))}
                    </select>
                    <div className="mt-4 text-sm text-gray-600">
                        {selectedStudent ? (
                            <div>
                                {selectedStudent.firstname} {selectedStudent.lastname} ({selectedStudent.visionid})
                            </div>
                        ) : (
                            <div>Not selected a student</div>
                        )}
                    </div>
                    <button
                        className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded mt-4 disabled:opacity-50"
                        disabled={!isFreeCardEnabled}
                        onClick={handleMarkAsFreeCard}
                    >
                        Mark as a free card student
                    </button>
                    <button
                        className="ml-6 bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded mt-4 disabled:opacity-50"
                        disabled={!isStudentFree}
                        onClick={handleRemoveFreeCard}
                    >
                        Remove student free card
                    </button>
                    <button
                        className="ml-6 bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4 disabled:opacity-50"
                        disabled={!selectedStudent}
                        onClick={handleResetStPassword}
                    >
                        Reset account password
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StdManagementAd;
