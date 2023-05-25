import moment from 'moment';
import { API_URL } from '../../axios/api';

// Action Creators
export const addError = (error) => {
    return {
        type: 'ADD_ERROR',
        payload: error,
    };
};

const removeError = () => {
    return {
        type: 'REMOVE_ERROR',
    };
};

const showEvent = (event) => {
    return {
        type: 'SHOW_EVENT',
        payload: event,
    };
};

const showEvents = (events) => {
    return {
        type: 'SHOW_EVENTS',
        payload: events,
    };
};

const deleteEvent = (id) => {
    return {
        type: 'DELETE_EVENT',
        payload: id,
    };
};

const addEvent = (newEvent) => {
    return {
        type: 'ADD_EVENT',
        payload: newEvent,
    };
};

// Actions
export const getEventInfo = (id) => async (dispatch) => {
    const result = await API_URL.get(`/${id}/show`);
    try {
        const { title, _id, start, end, describe } = await result.data;
        const convertedEvent = {
            title,
            describe,
            id: _id,
            start: moment(start).format('ddd DD MMM YY LT'),
            end: moment(end).format('ddd DD MMM YY LT'),
        };
        await dispatch(showEvent(convertedEvent));
    } catch (err) {
        const error = await err.data.message;
        return error;
    }
};

export const getEventsInfo = () => async (dispatch) => {
    const result = await API_URL.get('/');
    try {
        const convertedDates = await result.data.map((event) => {
            return {
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
                id: event._id,
                describe: event.describe,
            };
        });
        await dispatch(showEvents(convertedDates));
    } catch (err) {
        const error = await err.data.message;
        return error;
    }
};

export const removeEvent = (id) => async (dispatch) => {
    const result = await API_URL.delete(`/${id}/delete`);
    try {
        const deleted = await result.data;
        await dispatch(deleteEvent(id));
        return { deleted };
    } catch (err) {
        const message = await result.data.message;
        return { message };
    }
};

export const createEvent = (values) => async (dispatch) => {
    await API_URL.post('/', {
        title: values.title,
        start: values.start,
        end: values.end,
        describe: values.describe,
    })
        .then((res) => {
            if (res && res.data) {
                dispatch(addEvent(res.data));
                dispatch(removeError());
                return 'success';
            }
        })
        .catch((res) => {
            if (res.response.data) {
                dispatch(addError(res.response.data));
            }
        });
};

export const updateEvent = (values, id) => async (dispatch) => {
    try {
        await API_URL.put(`/${id}/update`, {
            title: values.title,
            start: values.start,
            end: values.end,
            describe: values.describe,
        });
        dispatch(removeError());
        return 'response was successful';
    } catch (err) {
        dispatch(addError(err.response.data));
    }
};
