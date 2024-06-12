import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../api/api';
import Swal from 'sweetalert2';
import backB from '../../images/backb.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

function FinManagementPayAd() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [teacher, setTeacher] = useState('');
    const [course, setCourse] = useState('');
    const [month, setMonth] = useState('');
    const [collection, setCollection] = useState('');
    const [expenses, setExpenses] = useState('');
    const [distribution, setDistribution] = useState('');
    const [payscheme, setPayscheme] = useState('');
    const [total, setTotal] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTotal, setModalTotal] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await api.get('/getteachersEx');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            if (teacher) {
                try {
                    const response = await api.get(`/getcoursesEx/${teacher}`);
                    setCourses(response.data);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            } else {
                setCourses([]);
            }
        };

        fetchCourses();
    }, [teacher]);

    const handleGenerate = async () => {
        try {
            const response = await api.post('/paymentFromTe', { course, month });
            const data = response.data;
            setCollection(data.collection);
            setExpenses(data.expenses);
            setDistribution(data.already);
            setPayscheme(data.payscheme);
            setTotal(data.total);
        } catch (error) {
            console.error('Error generating payment details:', error);
        }
    };

    const handlePayNow = () => {
        setModalTotal(total);
        setIsModalOpen(true);
    };

    const handlePay = async () => {
        if (isNaN(modalTotal) || Number(modalTotal) > Number(total)) {
            Swal.fire({
                title: "Invalid Amount",
                text: "Please enter a valid amount less than or equal to the remaining total.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        const paymentNote = note.trim() === '' ? 'Monthly payment' : note;

        try {
            const paymentData = {
                month,
                date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
                amountpaid: modalTotal,
                note: paymentNote,
                courseid: course,
            };

            const response = await api.post('/newMonPayment', paymentData);

            if (response.status === 201) {
                Swal.fire({
                    title: "Payment Successful",
                    text: "The payment has been recorded successfully.",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Download Report",
                    cancelButtonText: "Not Now",
                }).then((result) => {
                    if (result.isConfirmed) {
                        downloadReport();
                    }
                    handleGenerate();
                    setIsModalOpen(false);
                    setModalTotal('');
                    setNote('');
                });
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            Swal.fire({
                title: "Payment Failed",
                text: "There was an issue processing the payment. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const downloadReport = () => {
        const doc = new jsPDF();
    
        // Set font styles
        doc.setFont("helvetica", "normal");
    
        // Set colors
        const primaryColor = "#1976D2"; // Blue
        const secondaryColor = "#757575"; // Gray
        const textColor = "#000000"; // Black
    
        // Title
        doc.setFontSize(22);
        doc.setTextColor(primaryColor);
        doc.text('Vision Payment Report', 105, 20, { align: 'center' });
    
        // Divider line
        doc.setLineWidth(0.5);
        doc.setDrawColor(primaryColor);
        doc.line(20, 25, 190, 25);
    
        // Teacher and Course details
        const selectedTeacher = teachers.find(t => t.visionid === teacher);
        const courseDetails = course ? `Course ID: ${course}` : "Course details not available";
        doc.setTextColor(textColor);
        doc.setFontSize(14);
        doc.text(`Teacher: ${selectedTeacher ? `${selectedTeacher.firstname} ${selectedTeacher.lastname}` : "Teacher details not available"}`, 20, 40);
        doc.text(courseDetails, 20, 50);
    
        // Content section
        doc.setFontSize(12);
        doc.setTextColor(secondaryColor);
        doc.text(`Month: ${month}`, 20, 70);
        doc.text(`Collection: Rs.${collection}`, 20, 80);
        doc.text(`Pay Scheme: ${payscheme}%`, 20, 90);
        doc.text(`Expenses: Rs.${expenses}`, 20, 100);
        doc.text(`Already Paid: Rs.${distribution}`, 20, 110);
        doc.text(`Remained Total: Rs.${total}`, 20, 120);
        doc.text(`Amount Paid: Rs.${modalTotal}`, 20, 130);
        doc.text(`Note: ${note || 'Monthly payment'}`, 20, 140);
    
        // Current time and date
        const currentDate = new Date().toLocaleString();
        doc.setTextColor(secondaryColor);
        doc.setFontSize(10);
        doc.text(`Generated on: ${currentDate}`, 105, 270, { align: 'center' });
    
        // Footer
        doc.setLineWidth(0.5);
        doc.setDrawColor(primaryColor);
        doc.line(20, 275, 190, 275);

        const fileName = `Payment_report_${selectedTeacher ? selectedTeacher.firstname.toLowerCase() + '_' + selectedTeacher.lastname.toLowerCase() : 'Unknown'}_${course}_${month}.pdf`;
        doc.save(fileName);
    };    
    

    const handleBackButton = async () => {
        try {
            navigate('/ad_finmanagement');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='rounded-3xl bg-white md:ml-72 md:px-10 py-8 w-full'>
            <div className="flex mb-1">
                <h2 className="text-3xl font-bold mb-4">Payment portal 💸</h2>
                <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-10 mb-4 -mt-1' src={backB} alt="Down arrow" />
            </div>
            <div className='flex w-full'>
                <div className="mb-4 w-4/12">
                    <label>Teacher </label>
                    <select
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300"
                    >
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher.visionid} value={teacher.visionid}>
                                {`${teacher.visionid} - ${teacher.firstname} ${teacher.lastname}`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 w-4/12 ml-auto mr-auto">
                    <label>Course </label>
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        disabled={!teacher}
                        className="w-full px-3 py-2 rounded-md border border-gray-300"
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.courseid} value={course.courseid}>
                                {`${course.courseid} - ${course.subject} - ${course.grade} (${course.name})`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 w-3/12">
                    <label>Month </label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        disabled={!course}
                        className="w-full px-3 py-2 rounded-md border border-gray-300"
                    >
                        <option value="">Select Month</option>
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
            <button
                onClick={handleGenerate}
                disabled={!teacher || !course || !month}
                className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
                Generate
            </button>
            <div className="mt-4 py-2">
                <div>Collection <input type="text" value={collection} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Payscheme <input type="text" value={payscheme} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Expenses <input type="text" value={expenses} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Already paid <input type="text" value={distribution} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Remaining total <input type="text" value={total} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
            </div>
            <button
                onClick={handlePayNow}
                disabled={!total}
                className="mt-4 bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
                Pay Now
            </button>
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Pay Now</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={modalTotal}
                        onChange={(e) => setModalTotal(e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-gray-300"
                    />
                    <input
                        type="text"
                        placeholder="Enter a note if necessary"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full px-3 py-2 mt-3 rounded-md border border-gray-300"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handlePay}>Pay</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default FinManagementPayAd;