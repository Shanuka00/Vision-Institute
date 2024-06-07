import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import api from '../../api/api';
import backB from '../../images/backb.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function FinManagementExpAd() {

    const navigate = useNavigate();
    const [teacher, setTeacher] = useState('');
    const [course, setCourse] = useState('');
    const [expense, setExpense] = useState('');
    const [note, setNote] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await api.get('/getteachersEx');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        }
        fetchTeachers();
    }, []);

    const handleTeacherChange = async (e) => {
        const selectedTeacher = e.target.value;
        setTeacher(selectedTeacher);
        setCourse('');
        try {
            const response = await api.get(`/getcoursesEx/${selectedTeacher}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
    };

    const handleExpenseChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setExpense(value);
        }
    };

    const handleBackButton = async () => {
        try {
          navigate('/ad_finmanagement');
        } catch (error) {
          console.error(error);
        }
      };

    const handleAddExpense = async () => {
        try {
            const data = {
                courseid: course,
                amount: expense,
                reason: note,
            };
            // eslint-disable-next-line
            const response = await api.post('/addexpenseEx', data);
            swal.fire({
                title: 'Expense Added Successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setTeacher('');
            setCourse('');
            setExpense('');
            setNote('');
        } catch (error) {
            console.error('Error adding expense:', error);
            swal.fire({
                title: 'Error',
                text: 'There was an error adding the expense.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className='rounded-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
        <div className="flex mb-3">
            <h2 className="text-3xl font-bold mb-4">Add new expenses 💸</h2>
            <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-10 mb-4 -mt-1' src={backB} alt="Down arrow" />
        </div>
            <div className="mb-4">
                <label>Teacher: </label>
                <select 
                    value={teacher} 
                    onChange={handleTeacherChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                >
                    <option value="">Select Teacher</option>
                    {teachers.map(t => (
                        <option key={t.visionid} value={t.visionid}>
                            {`${t.visionid} - ${t.firstname} ${t.lastname}`}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label>Course: </label>
                <select 
                    value={course} 
                    onChange={handleCourseChange}
                    disabled={!teacher}
                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                >
                    <option value="">Select Course</option>
                    {courses.map(c => (
                        <option key={c.courseid} value={c.courseid}>
                            {`${c.courseid} - ${c.subject} - ${c.grade} (${c.name})`}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label>Expense: </label>
                <input 
                    type="text" 
                    value={expense} 
                    onChange={handleExpenseChange} 
                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                />
            </div>
            <div className="mb-4">
                <label>Note: </label>
                <textarea 
                    value={note} 
                    onChange={(e) => setNote(e.target.value)} 
                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                ></textarea>
            </div>
            <button 
                onClick={handleAddExpense} 
                disabled={!course || !expense || !note}
                className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 mt-2 rounded disabled:opacity-50"
            >
                Add Expense
            </button>
        </div>
    );
}

export default FinManagementExpAd;
