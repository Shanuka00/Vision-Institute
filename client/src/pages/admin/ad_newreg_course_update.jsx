import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import backB from '../../images/backb.png';
import api from '../../api/api';
import Swal from 'sweetalert2';

function NewRegCouUpAd() {
    const navigate = useNavigate();
    const [grades, setGrades] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseDetails, setCourseDetails] = useState({});
    const [isCourseSelected, setIsCourseSelected] = useState(false);

    let errors = [];

    const [formData, setFormData] = useState({
        courseId: '',
        subject: '',
        grade: '',
        name: '',
        monamount: '',
        payscheme: '',
        teacher: '',
    });

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

    const fetchCourses = async (selectedGrade) => {
        try {
            const response = await api.get(`/courses?grade=${selectedGrade}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses', error);
            setCourses([]);
        }
    };

    const fetchCourseDetails = async (courseId) => {
        try {
            const response = await api.get(`/course/${courseId}`);
            setCourseDetails(response.data);
            setFormData({
                ...formData,
                subject: response.data.subject,
                grade: response.data.grade,
                name: response.data.name,
                monamount: response.data.monamount,
                payscheme: response.data.payscheme,
                teacher: response.data.teacher,
            });
            setIsCourseSelected(true);
        } catch (error) {
            console.error('Error fetching course details', error);
            setCourseDetails({});
            setIsCourseSelected(false);
        }
    };

    const handleGradeChange = (e) => {
        const grade = e.target.value;
        setSelectedGrade(grade);
        setSelectedCourse('');
        setCourseDetails({});
        setIsCourseSelected(false);
    };

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        setSelectedCourse(courseId);
        fetchCourseDetails(courseId);
    };

    const handleBackButton = async () => {
        try {
            navigate('/ad_newreg/course');
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
            const response = await api.put(`/course/${selectedCourse}`, {
                name: formData.name,
                monamount: formData.monamount,
                payscheme: formData.payscheme,
            });

            if (response.data.message) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            <div className='rounded-3xl bg-gray-100 px-10 py-10 w-full h-full'>
                <div className='flex w-full border-b border-gray-900/10 pb-2 mb-4'>
                    <h2 className="text-2xl mb-6">New Course Registration</h2>
                    <img onClick={handleBackButton} style={{ textDecoration: 'none', cursor: 'pointer' }} className='ml-auto w-12 mb-3 -mt-2' src={backB} alt="Down arrow" />
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 mb-2'>
                    <div>
                        <label className='block mb-2 text-medium font-medium text-gray-700'>Select grade:</label>
                        <select id="grade" value={selectedGrade} onChange={handleGradeChange} className="border rounded py-2 px-4 w-full" disabled={isCourseSelected}>
                            <option value="" disabled>Select a grade</option>
                            {grades.map((grade) => (
                                <option key={grade.grade} value={grade.grade}>{grade.grade}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className='block mb-2 text-medium font-medium text-gray-700'>Select course:</label>
                        <select id="course" value={selectedCourse} onChange={handleCourseChange} className="border rounded py-2 px-4 w-full" disabled={!selectedGrade || isCourseSelected}>
                            <option value="" disabled>Select a course</option>
                            {courses.map((course) => (
                                <option key={course.courseid} value={course.courseid}>{course.courseid} - {course.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group py-2">
                        <label htmlFor="subject" className="text-medium">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subject"
                            name="subject"
                            placeholder={courseDetails.subject || ''}
                            value={formData.subject}
                            readOnly
                        />
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="grade" className="text-medium">Grade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="grade"
                            name="grade"
                            placeholder={courseDetails.grade || ''}
                            value={formData.grade}
                            readOnly
                        />
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="name" className="text-medium">Course Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder={courseDetails.name || ''}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                            placeholder={courseDetails.monamount || ''}
                            value={formData.monamount}
                            onChange={(e) => setFormData({ ...formData, monamount: e.target.value })}
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
                            placeholder={courseDetails.payscheme || ''}
                            value={formData.payscheme}
                            onChange={(e) => setFormData({ ...formData, payscheme: e.target.value })}
                            required
                        />
                        {errors.payscheme && <span className="text-red-500">{errors.payscheme}</span>}
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="teacher" className="text-medium">Teacher</label>
                        <input
                            type="text"
                            className="form-control"
                            id="teacher"
                            name="teacher"
                            placeholder={courseDetails.visionid || ''}
                            value={courseDetails.visionid}
                            readOnly
                        />
                    </div>
                    <div className="justify-between mt-6">
                        <button type="submit" className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-6 rounded">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRegCouUpAd;
