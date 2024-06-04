import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import api from '../../api/api';
import '../../styles/system/calender.css';

function CalenderSt() {

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
            const response = await api.get(`/studentSchedules/${visionId}`);
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

export default CalenderSt;
