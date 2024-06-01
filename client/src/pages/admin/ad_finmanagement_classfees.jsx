import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Modal from 'react-bootstrap/Modal';
import backB from '../../images/backb.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function FinManagementFeesAd() {
  const [imageUrl, setImageUrl] = useState(null);
  const [feespayments, setFeesPayments] = useState([]);
  const [selectedFeesPayment, setSelectedFeesPayment] = useState(null);
  // eslint-disable-next-line
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [grades, setGrades] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [setAmount, setFeeAmount] = useState('');
  const [classFee, setClassFee] = useState('Rs. 0000');

  const loadSlip = async (Url) => {

    try {
      const url = {Url};
      setImageUrl(url.Url);
    } catch (error) {
      console.error('Error getting download URL:', error);
    }
  };

  useEffect(() => {
    const fetchFeesPayments = async () => {
      try {
        const response = await api.get('/newOnFeesPayments');
        if (response.data && Array.isArray(response.data.feespayments)) {
          setFeesPayments(response.data.feespayments);
        } else {
          console.error('Unexpected response structure:', response.data);
          setFeesPayments([]);
        }
      } catch (error) {
        console.error('Error fetching class fees payments', error);
        setFeesPayments([]);
      }
    };

    fetchFeesPayments();

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
    if (selectedCourse) {
      fetchStudents(selectedCourse);
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

  const fetchStudents = async (selectedCourse) => {
    try {
        const response = await api.get(`/studentsForFees?course=${selectedCourse}`);
        setStudents(response.data);
    } catch (error) {
        console.error(error);
    }
    try {
      const response = await api.get(`/classFeeFetch?course=${selectedCourse}`);
      setClassFee(`Rs. ${response.data[0].monamount}`);
      setFeeAmount(response.data[0].monamount);
    } catch (error) {
        console.error(error);
    }
  };

  const handleApprove = async () => {
    try {
      await api.post('/approveFeesPayment', { classfeeId: selectedFeesPayment.classfeeid });
      setSelectedFeesPayment(null);
      window.location.reload();
    } catch (error) {
      console.error('Error approving fees payment', error);
    }
  };

  const handleReject = async () => {
    try {
      await api.post('/rejectFeesPayment', { classfeeId: selectedFeesPayment.classfeeid });
      setSelectedFeesPayment(null);
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting fees payment', error);
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
    setSelectedStudent('');
    setClassFee('Rs. 0000');

    try {
      const response = await api.get(`/studentsForFees?course=${course}`);
      if (response.data && Array.isArray(response.data.students)) {
        setStudents(response.data.students);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students and classfee', error);
      setStudents([]);
    }
  };

  const handleStudentChange = async (e) => {
    const student = e.target.value;
    setSelectedStudent(student);
  };

  const handleMonthChange = async (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
  };

  const handlePay = async () => {
      try {
          const data = { month: selectedMonth, amount: setAmount, state: 'approved', date: new Date() , visionid: selectedStudent, courseid: selectedCourse };
          const response = await api.post('/payClzFees', data);
          Swal.fire({
              title: "Classfees Paid Successfully!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
          });
          setSelectedStudent('');

      } catch (error) {
          Swal.fire({
              title: "Classfees Payment Failed!",
              text: error.response.data.message,
              icon: "error",
              confirmButtonText: "OK",
          });
      }
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
                  <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
              <select id="course" value={selectedCourse} onChange={handleCourseChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" disabled={!selectedGrade}>
                <option value="" disabled>Select a course</option>
                {courses.map((course) => (
                  <option key={course.courseid} value={course.courseid}>{course.name}</option>
                ))}
              </select>
            </div>

            <div className='flex'>
            <div className="mb-4">
              <label htmlFor="classFee" className="block text-sm font-medium text-gray-700">Class Fees</label>
              <input type="text" id="classFee" value={classFee} readOnly className="border mt-1 block w-6/12 pl-3 pr-10 py-2 text-base bg-gray-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
            </div>
            <div className="w-4/12 ml-1">
            <label htmlFor="course" className="inline-block text-sm text-gray-700 font-medium">
                  Select month
              </label>
              <select
                  id="month"
                  className="w-full text-sm px-3 py-2 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={handleMonthChange}
              >
                  <option value="">Select month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
              </select>
            </div>
            </div>

            <div className="mb-4">
              <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student</label>
              <select id="student" value={selectedStudent} onChange={handleStudentChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" disabled={!selectedCourse}>
                <option value="" disabled>Select a student</option>
                {students.map((student) => (
                  <option key={student.visionid} value={student.visionid}>{student.visionid} - {student.firstname} {student.lastname}</option>
                ))}
              </select>
            </div>
            
            <button onClick={handlePay} type="button" className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 mt-2 rounded-lg">Class fees paid</button>
          </form>
        </div>
        <div>
          <div className="col-span-2 md:col-span-1 bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Online payments</h3>
            <div className="space-y-4">
              {feespayments.map((feespayment, index) => (
                <div key={index} className="bg-white p-4 pb-2 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p> {feespayment.visionid}</p>
                    <p> {feespayment.firstname} {feespayment.lastname}</p>
                    <p> {feespayment.mobilenumber}</p>
                  </div>
                  <button onClick={() => { loadSlip(feespayment.state); setSelectedFeesPayment(feespayment); setShowModal(true); }} className="bg-indigo-900 hover:bg-indigo-950 text-white px-4 py-2 rounded-lg">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedFeesPayment && (
        <Modal
          show={!!selectedFeesPayment}
          onHide={() => setSelectedFeesPayment(null)}
          contentlabel="ClassFees Details"
        >
          <Modal.Header closeButton>
            <Modal.Title>ClassFees Details</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p><b>ClassFee ID:</b> {selectedFeesPayment.classfeeid}</p>
              <p><b>Month:</b> {selectedFeesPayment.month}</p>
              <p><b>Paid amount:</b> {selectedFeesPayment.paidamount}</p>
              <p><b>Paid date:</b> {selectedFeesPayment.date.substring(0, 10)}</p>
              <p><b>Vision ID:</b> {selectedFeesPayment.visionid}</p>
              <p><b>Course ID:</b> {selectedFeesPayment.courseid}</p>
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
            <button onClick={() => setSelectedFeesPayment(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default FinManagementFeesAd;
