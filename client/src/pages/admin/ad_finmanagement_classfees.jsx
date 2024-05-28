import React, { useState, useEffect } from 'react';
import api from '../../api/api';
//import swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import backB from '../../images/backb.png';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';


function FinManagementFeesAd() {

  const [imageUrl, setImageUrl] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  // eslint-disable-next-line
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  
  // New state for the form
  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [classFee, setClassFee] = useState('Rs. 0000');

  const loadSlip = async (visionId) => {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDuXPxQCBAW0h3KF7iNloanMDhFgONVRfU",
      authDomain: "vision-institute-80d7f.firebaseapp.com",
      projectId: "vision-institute-80d7f",
      storageBucket: "vision-institute-80d7f.appspot.com",
      messagingSenderId: "438460841851",
      appId: "1:438460841851:web:b607f9eac852d2e02d07de",
      measurementId: "G-D1W84V5B4V"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    // Construct the path to the image within your Firebase Storage bucket
    const imagePath = `regslips/${visionId}_regfees`;

    // Get a reference to the image
    const imageRef = ref(storage, imagePath);

    try {
      // Get the download URL of the image
      const url = await getDownloadURL(imageRef);
      // Set the image URL in state
      setImageUrl(url);
    } catch (error) {
      // Handle any errors
      console.error('Error getting download URL:', error);
    }
  };
  
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/newOnRegistrations');
        setRegistrations(response.data.registrations);
      } catch (error) {
        console.error('Error fetching registrations', error);
      }
    };

    fetchRegistrations();

    // Fetch grades data
    const fetchGrades = async () => {
      try {
        const response = await api.get('/grades');
        setGrades(response.data.grades);
      } catch (error) {
        console.error('Error fetching grades', error);
      }
    };

    fetchGrades();
  }, []);

  const handleApprove = async () => {
    try {
      await api.post('/approveRegistration', { visionId: selectedRegistration.visionid });
      setSelectedRegistration(null);
      window.location.reload();
    } catch (error) {
      console.error('Error approving registration', error);
    }
  };

  const handleReject = async () => {
    try {
      await api.post('/rejectRegistration', { visionId: selectedRegistration.visionid });
      setSelectedRegistration(null);
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting registration', error);
    }
  };

  const handleBackButton = async () => {
    try {
        navigate('/ad_finmanagement');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGradeChange = async (e) => {
    const grade = e.target.value;
    setSelectedGrade(grade);
    setSelectedCourse('');
    setSelectedStudent('');
    setClassFee('Rs. 0000');

    // Fetch courses data based on the selected grade
    try {
      const response = await api.get(`/courses?grade=${grade}`);
      setCourses(response.data.courses);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const handleCourseChange = async (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    setSelectedStudent('');
    setClassFee('Rs. 0000');

    // Fetch students data based on the selected course
    try {
      const response = await api.get(`/students?course=${course}`);
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const handleStudentChange = async (e) => {
    const student = e.target.value;
    setSelectedStudent(student);

    // Fetch class fee based on the selected student
    try {
      const response = await api.get(`/classFee?student=${student}`);
      setClassFee(`Rs. ${response.data.fee}`);
    } catch (error) {
      console.error('Error fetching class fee', error);
    }
  };

  const handlePay = () => {
    // Handle the payment logic here
    console.log('Payment submitted');
  };

  return (
    <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
      <div className="flex">
        <h2 className="text-3xl font-bold mb-4">Class fees payment 💸</h2>
        <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-10 mb-4 -mt-1' src={backB} alt="Down arrow" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="col-span-2 bg-gray-200 md:row-span-2 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Pay class fees</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
              <select id="grade" value={selectedGrade} onChange={handleGradeChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="" disabled>Select a grade</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
              <select id="course" value={selectedCourse} onChange={handleCourseChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" disabled={!selectedGrade}>
                <option value="" disabled>Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
              <select id="student" value={selectedStudent} onChange={handleStudentChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" disabled={!selectedCourse}>
                <option value="" disabled>Select a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="classFee" className="block text-sm font-medium text-gray-700">Class Fees</label>
              <input type="text" id="classFee" value={classFee} readOnly className="border mt-1 block w-2/12 pl-3 pr-10 py-2 text-base bg-gray-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-200" />
            </div>
            <button type="button" onClick={handlePay} className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg">Pay</button>
          </form>
        </div>

        <div>
          <div className="col-span-2 md:col-span-1 bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Online payments</h3>
            <div className="space-y-4">
              {registrations.map((registration, index) => (
                <div key={index} className="bg-white p-4 pb-2 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p> {registration.visionid}</p>
                    <p> {registration.firstname} {registration.lastname}</p>
                    <p> {registration.mobilenumber}</p>
                  </div>
                  <button onClick={() => { loadSlip(registration.visionid); setSelectedRegistration(registration); setShowModal(true); }} className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {selectedRegistration && (
        <Modal
          show={!!selectedRegistration}
          onHide={() => setSelectedRegistration(null)}
          contentlabel="Registration Details"
        >
          <Modal.Header closeButton>
            <Modal.Title>Registration Details</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p><b>Vision ID:</b> {selectedRegistration.visionid}</p>
              <p><b>Name:</b> {selectedRegistration.firstname} {selectedRegistration.lastname}</p>
              <p><b>Initial:</b> {selectedRegistration.initial}</p>
              <p><b>Birthday:</b> {selectedRegistration.dateofbirth.substring(0, 10)}</p>
              <p><b>Gender:</b> {selectedRegistration.gender}</p>
              <p><b>Email:</b> {selectedRegistration.email}</p>
              <p><b>Mobilenumber:</b> {selectedRegistration.mobilenumber}</p>
              <p><b>City:</b> {selectedRegistration.city}</p>
            </div>
            {imageUrl && (
              <div style={{ flex: 1 }}>
                <p><b>Uploaded Slip:</b></p>
                <img src={imageUrl} alt="Uploaded Slip" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded-lg">Approve</button>
            <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-lg">Reject</button>
            <button onClick={() => setSelectedRegistration(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
          </Modal.Footer>
        </Modal>
      )}

    </div>
  );
}

export default FinManagementFeesAd;
