import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Datetime from 'react-datetime';
import '../../styles/system/calender.css';

const events = [
    { title: 'Quiz', start: '2024-05-24', clickable: true }
];


function CalenderSt() {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const handleEventClick = (clickInfo) => {
        if (clickInfo.event.extendedProps.clickable) {
            navigate('/st_profile');
        }
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
                customButtons={{
                    addQuizButton: {
                        text: 'Create new quiz',
                        click: () => { handleShow() }
                }}
                }
            dayHeaderContent={renderDayHeader}
            firstDay={1} // Start the week on Monday
            />

            <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Course</Form.Label>
                        <Form.Control as="select">
                        <option>Select a course</option>
                        <option>Course 1</option>
                        <option>Course 2</option>
                        <option>Course 3</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label><br/>Quiz Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter quiz title" />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label><br/>Due Date</Form.Label>
                    <Datetime
                        timeFormat={true}
                        className="readonly block w-full mt-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                    handleClose();
                    navigate('/te_calender/create_quiz');
                    }}>
                    Create quiz
                    </Button>
                </Modal.Footer>
                </Modal>
            </>

        </div>
  )
}

function renderDayHeader(arg) {
    return (
        <div className="fc-daygrid-day-number">
            {arg.text}
        </div>
    );
}

// a custom render function
function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i className="calendar-event-text">{eventInfo.event.title}</i>
      </>
    )
  }

export default CalenderSt