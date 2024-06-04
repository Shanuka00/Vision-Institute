import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../api/api';
import '../../styles/system/calender.css';

function CalenderTe() {

    const [events, setEvents] = useState([]);
    // eslint-disable-next-line
    const [visionId, setVisionId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;
    
            const storedVisionId = localStorage.getItem('visionId');
            if (storedVisionId) {
                setVisionId(storedVisionId);
                fetchClassSchedules(storedVisionId);
            }
        }
    }, []);

    const fetchClassSchedules = async (visionId) => {
        try {
            const response = await api.get(`/TeacherSchedules/${visionId}`);
            const scheduleEvents = [];

            response.data.forEach(schedule => {
                if (schedule.date !== '0000-00-00') {
                    const eventDate = new Date(schedule.date);
                    eventDate.setDate(eventDate.getDate() + 1);
                    scheduleEvents.push({
                        title: `${schedule.courseid} - ${schedule.name}`,
                        start: eventDate.toISOString().split('T')[0],
                        extendedProps: {
                            courseid: schedule.courseid,
                            starttime: schedule.starttime,
                            endtime: schedule.endtime,
                            roomid: schedule.roomid,
                            day: schedule.day,
                            date: eventDate.toISOString().split('T')[0],
                        }
                    });
                } else {
                    // Repeat events based on the day for the next three months
                    const currentDate = new Date();
                    for (let i = 0; i < 90; i++) {
                        const tempDate = new Date(currentDate);
                        tempDate.setDate(currentDate.getDate() + i);
                        if (tempDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === schedule.day.toLowerCase()) {
                            scheduleEvents.push({
                                title: `${schedule.courseid} - ${schedule.name}`,
                                start: (new Date(new Date(tempDate).setDate(new Date(tempDate).getDate() + 1))).toISOString().split('T')[0],
                                extendedProps: {
                                    courseid: schedule.courseid,
                                    starttime: schedule.starttime,
                                    endtime: schedule.endtime,
                                    roomid: schedule.roomid,
                                    day: schedule.day,
                                    date: (new Date(new Date(tempDate).setDate(new Date(tempDate).getDate() + 1))).toISOString().split('T')[0],
                                }
                            });
                        }
                    }
                }
            });

            setEvents(scheduleEvents);
        } catch (error) {
            console.error('Error fetching class schedules', error);
        }
    };

    const handleEventClick = (clickInfo) => {
        setModalData(clickInfo.event.extendedProps);
        setShowModal(true);
    };

    return (

        <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                events={events}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                height={850}
                headerToolbar={{
                    start: 'prev,next',
                    center: 'title',
                    end: 'today'
                }}
                dayHeaderContent={renderDayHeader}
                firstDay={1} // Start the week on Monday
            />

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Class Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Course ID:</strong> {modalData.courseid}</p>
                    <p><strong>Start Time:</strong> {modalData.starttime}</p>
                    <p><strong>End Time:</strong> {modalData.endtime}</p>
                    <p><strong>Room ID:</strong> {modalData.roomid}</p>
                    <p><strong>Day:</strong> {modalData.day}</p>
                    <p><strong>Date:</strong> {modalData.date}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function renderDayHeader(arg) {
    return (
        <div className="fc-daygrid-day-number">
            {arg.text}
        </div>
    );
}

// A custom render function
function renderEventContent(eventInfo) {
    return (
        <>
            <i className="calendar-event-text">{eventInfo.event.title}</i>
        </>
    );
}

export default CalenderTe;



// ================================================================
//                   Old code with quiz access
// ================================================================



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import Datetime from 'react-datetime';
// import '../../styles/system/calender.css';

// const events = [
//     { title: 'Quiz', start: '2024-04-24', clickable: true }
// ];


// function CalenderTe() {


//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const navigate = useNavigate();

//     const handleEventClick = (clickInfo) => {
//         if (clickInfo.event.extendedProps.clickable) {
//             navigate('/st_profile');
//         }
//     };

//     return (
//         <div className='rounded-s-3xl bg-white md:ml-72 md:px-10 py-10 w-full'>

//             <FullCalendar
//             plugins={[dayGridPlugin]}
//             initialView='dayGridMonth'
//             events={events}
//             eventContent={renderEventContent}
//             eventClick={handleEventClick}
//             height={850}
//             headerToolbar={{
//                     start: 'prev,next',
//                     center: 'title',
//                     end: 'addQuizButton'
//                 }}
//                 customButtons={{
//                     addQuizButton: {
//                         text: 'Create new quiz',
//                         click: () => { handleShow() }
//                 }}
//                 }
//             dayHeaderContent={renderDayHeader}
//             firstDay={1} // Start the week on Monday
//             />

//             <>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Create new quiz</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>

//                     <Form.Group controlId="exampleForm.ControlSelect1">
//                         <Form.Label>Select course</Form.Label>
//                         <Form.Control as="select">
//                         <option>Select a course</option>
//                         <option>Course 1</option>
//                         <option>Course 2</option>
//                         <option>Course 3</option>
//                         </Form.Control>
//                     </Form.Group>

//                     <Form.Group controlId="exampleForm.ControlInput1">
//                         <Form.Label><br/>Quiz title</Form.Label>
//                         <Form.Control type="text" placeholder="Enter quiz title" />
//                     </Form.Group>

//                     <Form.Group controlId="exampleForm.ControlInput2">
//                     <Form.Label><br/>Due date and time</Form.Label>
//                     <Datetime
//                         timeFormat={true}
//                         className="readonly block w-full mt-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     />
//                     <div className="absolute inset-y-0 right-0 flex items-center mt-48 mr-5 px-2 pointer-events-none">
//                         <svg className="h-5 w-5 text-gray-400 mt-8" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                         </svg>
//                     </div>
//                     </Form.Group>

//                     </Form>

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                     Close
//                     </Button>
//                     <Button variant="primary" onClick={() => {
//                     handleClose();
//                     navigate('/te_calender/create_quiz');
//                     }}>
//                     Create quiz
//                     </Button>
//                 </Modal.Footer>
//                 </Modal>
//             </>

//         </div>
//   )
// }

// function renderDayHeader(arg) {
//     return (
//         <div className="fc-daygrid-day-number">
//             {arg.text}
//         </div>
//     );
// }

// // a custom render function
// function renderEventContent(eventInfo) {
//     return (
//       <>
//         <b>{eventInfo.timeText}</b>
//         <i className="calendar-event-text">{eventInfo.event.title}</i>
//       </>
//     )
//   }

// export default CalenderTe