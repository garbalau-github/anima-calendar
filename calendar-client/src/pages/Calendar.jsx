import React, { useEffect, useState } from 'react';
import { closeEvent, getEventInfo, getEventsInfo } from '../store/actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UpdateModal from '../components/UpdateModal';

// Calendar imports
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Calendar = ({ events, getEventInfo, closeEvent, getEventsInfo }) => {
    const [open, setOpen] = useState(false);
    const [refreshEvents, setRefreshEvents] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getEventsInfo();
        setRefreshEvents(false);
    }, [refreshEvents]);

    const formattedEvents = events.map((event) => {
        return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
        };
    });

    const openEventClick = (event) => {
        if (event.id) {
            setOpen(true);
            getEventInfo(event.id);
        }
    };

    const createEventFromCell = (slotInfo) => {
        navigate('/events/add', { state: slotInfo });
    };

    const closeEventClick = () => {
        setOpen(false);
        setTimeout(() => closeEvent(), 300);
    };

    const formats = {
        eventTimeRangeFormat: () => {
            return '';
        },
    };

    return (
        <main>
            <BigCalendar
                localizer={localizer}
                onSelectSlot={(slotInfo) => createEventFromCell(slotInfo)}
                selectable={true}
                events={formattedEvents}
                formats={formats}
                views={['day', 'week', 'month']}
                onSelectEvent={openEventClick}
                enableAutoScroll={true}
                defaultView='day'
                dayLayoutAlgorithm={'no-overlap'}
                startAccessor='start'
                endAccessor='end'
                style={{
                    height: 600,
                    margin: 50,
                }}
            />
            <UpdateModal
                open={open}
                handleOpen={openEventClick}
                handleClose={closeEventClick}
                setRefreshEvents={setRefreshEvents}
            />
        </main>
    );
};

// We export the component as the default export of the module and connect
// it to the Redux store. The connect function is a higher-order function provided
// by React Redux library. It connects a React component to the Redux store, allowing
// the component to access the state and dispatch actions.
function mapStateToProps({ events }) {
    return {
        events,
    };
}

export default connect(mapStateToProps, {
    getEventInfo,
    closeEvent,
    getEventsInfo,
})(Calendar);
