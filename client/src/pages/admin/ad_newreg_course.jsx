import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import backB from '../../images/backb.png';
import api from '../../api/api';
import Swal from 'sweetalert2';

function NewRegCouAd() {
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState('');
    const [teachers, setTeachers] = useState([]);
    // eslint-disable-next-line
    const [nextCourseId, setNextCourseId] = useState('');

    let errors = [];

    const [formData, setFormData] = useState({
        courseId: '',
        subject: '',
        grade: '',
        name: '',
        monamount: '',
        payscheme: '',
    });

    useEffect(() => {
        // Fetch next course ID and teacher list when component mounts
        const fetchInitialData = async () => {
            try {
                const courseIdResponse = await api.get('/nextcourseid');
                const nextCourseId = courseIdResponse.data.nextcourseid;

                const teachersResponse = await api.get('/teachers');
                setTeachers(teachersResponse.data.teachers);

                setFormData((prevData) => ({
                    ...prevData,
                    courseId: nextCourseId
                }));
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
        if (name === 'teacher') {
          setTeacher(value);
        }
    };

    const handleBackButton = async () => {
        try {
            navigate('/ad_newreg');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Form data is valid, proceed with submission
            submitForm();
        } else {
            // Form data is invalid, display errors
            console.error('Form validation errors:', errors);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!/^\d{4}$/.test(formData.courseId)) {
            errors.courseId = 'Course ID must be a 4-digit number';
        }
        if (formData.grade !== 'no' && (isNaN(formData.grade) || parseInt(formData.grade) < 1 || parseInt(formData.grade) > 13)) {
            errors.grade = 'Grade must be a number between 0 and 14 or "no"';
        }          
        if (!/^\d{3,4}(\.\d{1,2})?$/.test(formData.monamount)) {
            errors.monamount = 'Monthly class fees amount must be a number with more than 2 digits and less than 5 digits';
        }
        if (!/^\d{1,2}$/.test(formData.payscheme)) {
            errors.payscheme = 'Payment scheme must be a number between 1 and 99';
        }
        return errors;
    };

    const submitForm = async () => {
        try {
            await api.post('/newCourseRegistration', {
                ...formData,
                teacher: teacher
            });
            // Show SweetAlert after successful creation
            Swal.fire({
                title: "Course registered successfully!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error registering new course:', error);
        }
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            <div className='rounded-3xl bg-gray-100 px-10 py-10 w-full h-full'>
                <div className='flex w-full border-b border-gray-900/10 pb-2 mb-4'>
                    <h2 className="text-2xl mb-6">New Course Registration</h2>
                    <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-12 mb-3 -mt-2' src={backB} alt="Down arrow" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group py-2">
                        <label htmlFor="courseId" className="text-medium">Course ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="courseId"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                        {errors.courseId && <span className="text-red-500">{errors.courseId}</span>}
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="subject" className="text-medium">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="grade" className="text-medium">Grade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                        />
                        {errors.grade && <span className="text-red-500">{errors.grade}</span>}
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="name" className="text-medium">Course Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="monamount" className="text-medium">Monthly Class Fees Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="monamount"
                            name="monamount"
                            value={formData.monamount}
                            onChange={handleChange}
                            required
                        />
                        {errors.monamount && <span className="text-red-500">{errors.monamount}</span>}
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="payscheme" className="text-medium">Payment Scheme (Percentage)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="payscheme"
                            name="payscheme"
                            value={formData.payscheme}
                            onChange={handleChange}
                            required
                        />
                        {errors.payscheme && <span className="text-red-500">{errors.payscheme}</span>}
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="teacher" className="text-medium">Teacher</label>
                        <select
                            value={teacher}
                            onChange={handleChange}
                            name="teacher"
                            className='form-control'
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map(teacher => (
                                <option key={teacher.visionid} value={teacher.visionid}>
                                    {teacher.visionid} - {teacher.firstname} {teacher.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="justify-between mt-6">
                        <button type="submit" className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-6 rounded">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRegCouAd;
