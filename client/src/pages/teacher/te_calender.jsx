import React from 'react'
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import '../../styles/system/calender.css';

const events = [
    { title: 'Quiz', start: '2024-04-24', clickable: true }
];

function CalenderTe() {

    const navigate = useNavigate();

    const handleEventClick = (clickInfo) => {
        if (clickInfo.event.extendedProps.clickable) {
            navigate('/st_profile');
        }
    };

    const handleAddQuizClick = () => {
        // Handle the click event for the "Add Quiz" button
        // For example, navigate to the add quiz page
    };

    return (
        <div className='rounded-s-3xl bg-white md:ml-72 px-10 py-10 w-full'>

            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={events}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            height={850}
            headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'addQuizButton' // Add custom button to the end of the toolbar
                }}
                customButtons={{
                    addQuizButton: {
                        text: 'Add new quiz',
                        click: handleAddQuizClick // Define the click event handler for the custom button
                    }
                }}
            dayHeaderContent={renderDayHeader}
            firstDay={1} // Start the week on Monday
            />

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

export default CalenderTe