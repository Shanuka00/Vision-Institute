import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function FinManagementPayAd() {
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

    const handleGenerate = () => {
        // Simulate fetching data from the server
        const data = {
            collection: '1000',
            expenses: '200',
            distribution: '300',
            payscheme: '500',
            total: '1500'
        };
        setCollection(data.collection);
        setExpenses(data.expenses);
        setDistribution(data.distribution);
        setPayscheme(data.payscheme);
        setTotal(data.total);
    };

    const handlePayNow = () => {
        setModalTotal(total);
        setIsModalOpen(true);
    };

    const handlePay = () => {
        // Handle the pay logic
        setIsModalOpen(false);
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>
            <div className="mb-4">
                <label>Teacher: </label>
                <select 
                    value={teacher} 
                    onChange={(e) => setTeacher(e.target.value)}
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
                    onChange={(e) => setCourse(e.target.value)}
                    disabled={!teacher}
                >
                    <option value="">Select Course</option>
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
                </select>
            </div>
            <div className="mb-4">
                <label>Month: </label>
                <select 
                    value={month} 
                    onChange={(e) => setMonth(e.target.value)}
                    disabled={!course}
                >
                    <option value="">Select Month</option>
                    <option value="january">January</option>
                    <option value="february">February</option>
                </select>
            </div>
            <button 
                onClick={handleGenerate} 
                disabled={!teacher || !course || !month}
                className="bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded"
            >
                Generate
            </button>
            <div className="mt-4">
                <div>Collection: <input type="text" value={collection} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Expenses: <input type="text" value={expenses} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Distribution: <input type="text" value={distribution} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Payscheme: <input type="text" value={payscheme} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
                <div>Total: <input type="text" value={total} readOnly className="w-full px-3 py-2 rounded-md border border-gray-300" /></div>
            </div>
            <button 
                onClick={handlePayNow} 
                disabled={!total} 
                className="mt-4 bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded"
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
