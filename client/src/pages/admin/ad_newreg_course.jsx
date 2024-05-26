import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import backB from '../../images/backb.png';

function NewRegCouAd() {
    const navigate = useNavigate();

    let errors = [];

    const [formData, setFormData] = useState({
        courseId: '',
        subject: '',
        grade: '',
        name: '',
        monamount: '',
        payscheme: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            // You can display the errors to the user here if needed
        }
    };

    const validateForm = () => {
        const errors = {};
        // Validate courseId (integer, length 4)
        if (!/^\d{4}$/.test(formData.courseId)) {
            errors.courseId = 'Course ID must be a 4-digit number';
        }
        // Validate grade (integer, length 2)
        if (!/^\d{1,2}$/.test(formData.grade)) {
            errors.grade = 'Grade must be a number between 1 and 99';
        }
        // Validate monamount (decimal, length 5 including 2 decimal places)
        if (!/^\d{1,3}(\.\d{1,2})?$/.test(formData.monamount)) {
            errors.monamount = 'Monthly class fees amount must be a number with up to 3 digits before the decimal point and up to 2 digits after';
        }
        // Validate payscheme (integer, length 2)
        if (!/^\d{1,2}$/.test(formData.payscheme)) {
            errors.payscheme = 'Payment scheme must be a number between 1 and 99';
        }
        return errors;
    };

    const submitForm = () => {
        // Submit form data
        fetch('/api/newCourseRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('New course registration successful:', data);
            // Redirect to a success page or perform any other action
            // For example:
            navigate('/success');
        })
        .catch(error => {
            console.error('Error registering new course:', error);
            // Handle error appropriately
        });
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
                    <label htmlFor="courseId" className="text-lg">Course ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="courseId"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        required
                    />
                    {errors.courseId && <span className="text-red-500">{errors.courseId}</span>}
                </div>
                <div className="form-group py-2">
                    <label htmlFor="subject" className="text-lg">Subject</label>
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
                    <label htmlFor="grade" className="text-lg">Grade</label>
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
                    <label htmlFor="name" className="text-lg">Course Name</label>
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
                    <label htmlFor="monamount" className="text-lg">Monthly Class Fees Amount</label>
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
                    <label htmlFor="payscheme" className="text-lg">Payment Scheme (Percentage)</label>
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
                <div className="justify-between mt-6">
                    <button type="submit" className="btn btn-primary w-32">Submit</button>
                </div>
            </form>
            </div>
        </div>
    );
}

export default NewRegCouAd;
