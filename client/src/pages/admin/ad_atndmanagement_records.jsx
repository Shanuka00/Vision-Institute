import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backB from '../../images/backb.png';

function AtndManagementRecAd() {

  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [students, setStudents] = useState([]);
  const [isLoadEnabled, setIsLoadEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch grades from the server
    // Simulate fetch
    setGrades(['10', '11', '12']);
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      // Fetch courses based on selected grade from the server
      // Simulate fetch
      setCourses(['Grade 10 Science - Kasun sir', 'Grade 10 Math - Ruwan sir']);
    }
  }, [selectedGrade]);

  useEffect(() => {
    setIsLoadEnabled(selectedGrade && selectedCourse && selectedDate);
  }, [selectedGrade, selectedCourse, selectedDate]);

  const handleSelectGrade = (event) => {
    setSelectedGrade(event.target.value);
    setSelectedCourse('');
    setSelectedDate('');
  };

  const handleSelectCourse = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedDate('');
  };

  const handleSelectDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleBackButton = async () => {
    try {
        navigate('/ad_atndmanagement');
    } catch (error) {
      console.error(error);
    }
};

  const handleLoadData = () => {
    // Fetch students based on selected grade, course, and date from the server
    // Simulate fetch
    setStudents([
      { VisionID: 'VS010112', firstName: 'Uvinda', lastName: 'Sandaruwan', gender: 'Male', city: 'Pussellawa', mobile: '0712345678' },
      { VisionID: 'VS110253', firstName: 'Sansala', lastName: 'Diwangi', gender: 'Female', city: 'Kothmale', mobile: '0718765432' },
      { VisionID: 'VS012014', firstName: 'Shanuka', lastName: 'Dilshan', gender: 'Male', city: 'Gampola', mobile: '0776543210' },
      { VisionID: 'VS110642', firstName: 'Dilini', lastName: 'Tharaka', gender: 'Female', city: 'Pussellawa', mobile: '0754321098' },
      { VisionID: 'VS118156', firstName: 'Oshadhi', lastName: 'Anuradha', gender: 'Female', city: 'Gampola', mobile: '0781234567' },
      { VisionID: 'VS110926', firstName: 'Nimesha', lastName: 'Perera', gender: 'Female', city: 'Pussellawa', mobile: '0709876543' },
      { VisionID: 'VS117356', firstName: 'Pathum', lastName: 'Lakshan', gender: 'Male', city: 'Gampola', mobile: '0710987654' },
    ]);
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>

    <div className='rounded-3xl bg-gray-100 px-6 py-6 w-full h-full'>

    <div>
      <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-10 -mt-1' src={backB} alt="Down arrow" />
    </div>
      
      <div className='grid grid-cols-1 -mt-3 gap-6 md:grid-cols-3'>
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
        <div>
          <label className='block mb-2 text-medium font-medium text-gray-700'>Select date:</label>
          <input 
            type='date' 
            className='block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500' 
            value={selectedDate} 
            onChange={handleSelectDate} 
            disabled={!selectedCourse}
          />
        </div>
      </div>
      <div className='mt-6'>
        <button
          className='bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-2 px-6 rounded'
          onClick={handleLoadData}
          disabled={!isLoadEnabled}
        >
          Load
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-6 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VisionID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile number</th>
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
              <td className="px-6 py-4 whitespace-nowrap">{student.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AtndManagementRecAd;
