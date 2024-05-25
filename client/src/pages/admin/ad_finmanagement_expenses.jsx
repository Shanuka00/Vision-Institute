import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FinManagementExpAd() {
    const [teacher, setTeacher] = useState('');
    const [course, setCourse] = useState('');
    const [expense, setExpense] = useState('');
    const [note, setNote] = useState('');

    const handleTeacherChange = (e) => {
        setTeacher(e.target.value);
        setCourse('');
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

    return (
        <div className='rounded-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            <div className="mb-4">
                <label>Teacher: </label>
                <select 
                    value={teacher} 
                    onChange={handleTeacherChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300"
                >
                    <option value="">Select Teacher</option>
                    <option value="teacher1">Teacher 1</option>
                    <option value="teacher2">Teacher 2</option>
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
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
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
                onClick={() => {}} 
                disabled={!course || !expense}
                className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
                Add Expense
            </button>
        </div>
    );
}

export default FinManagementExpAd;
