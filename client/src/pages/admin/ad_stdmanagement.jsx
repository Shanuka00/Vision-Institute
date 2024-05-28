import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StdManagementAd() {
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isFreeCardEnabled, setIsFreeCardEnabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch grades from the server
        // Simulate fetch
        setGrades(['Grade 1', 'Grade 2', 'Grade 3']);
    }, []);

    useEffect(() => {
        if (selectedGrade) {
            // Fetch courses based on selected grade from the server
            // Simulate fetch
            setCourses(['Course A', 'Course B', 'Course C']);
        }
    }, [selectedGrade]);

    useEffect(() => {
        if (selectedGrade && selectedCourse) {
            // Fetch students based on selected grade and course from the server
            // Simulate fetch
            setStudents([
                { VisionID: 'VS010112', firstName: 'Uvinda', lastName: 'Sandaruwan', gender: 'Male', city: 'Pussellawa' },
                { VisionID: 'VS110253', firstName: 'Sansala', lastName: 'Diwangi', gender: 'Female', city: 'Kothmale' },
                { VisionID: 'VS012014', firstName: 'Shanuka', lastName: 'Dilshan', gender: 'Male', city: 'Gampola' },
                { VisionID: 'VS110642', firstName: 'Dilini', lastName: 'Tharaka', gender: 'Female', city: 'Pussellawa' },
                { VisionID: 'VS118156', firstName: 'Nimesha', lastName: 'Perera', gender: 'Female', city: 'Gampola' }
            ]);
        }
    }, [selectedGrade, selectedCourse]);

    const handleSelectGrade = (event) => {
        setSelectedGrade(event.target.value);
        setSelectedCourse(''); // Reset course selection when grade changes
    };

    const handleSelectCourse = (event) => {
        setSelectedCourse(event.target.value);
    };

    const handleSelectStudent = (event) => {
        const visionID = event.target.value;
        const student = students.find(s => s.VisionID === visionID);
        setSelectedStudent(student);
        setIsFreeCardEnabled(!!student);
    };

    const handleMarkAsFreeCard = () => {
        if (selectedStudent) {
            // Mark the student as a free card student
            console.log(`${selectedStudent.firstName} ${selectedStudent.lastName} marked as a free card student.`);
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
                    <select 
                        className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500' 
                        value={selectedGrade} 
                        onChange={handleSelectGrade}
                    >
                        <option value="">Select a grade</option>
                        {grades.map((grade, index) => (
                            <option key={index} value={grade}>{grade}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block mb-2 text-medium font-medium text-gray-700'>Select course:</label>
                    <select 
                        className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500' 
                        value={selectedCourse} 
                        onChange={handleSelectCourse} 
                        disabled={!selectedGrade}
                    >
                        <option value="">Select a course</option>
                        {courses.map((course, index) => (
                            <option key={index} value={course}>{course}</option>
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
                        <tr key={student.VisionID}>
                            <td className="px-6 py-4 whitespace-nowrap">{student.VisionID}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.firstName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.lastName}</td>
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
                        <option key={student.VisionID} value={student.VisionID}>{student.VisionID}</option>
                    ))}
                </select>
                <div className="mt-4 text-sm text-gray-600">
                    {selectedStudent ? (
                        <div>
                            {selectedStudent.firstName} {selectedStudent.lastName} ({selectedStudent.VisionID})
                        </div>
                    ) : (
                        <div>Not selected a student</div>
                    )}
                </div>
                <button
                    className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded mt-4"
                    disabled={!isFreeCardEnabled}
                    onClick={handleMarkAsFreeCard}
                >
                    Mark as a Free card student
                </button>
            </div>
            </div>
        </div>
    );
}

export default StdManagementAd;
