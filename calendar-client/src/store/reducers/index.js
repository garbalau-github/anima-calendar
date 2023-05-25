import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import eventsReducer from './eventsReducer';
import errorReducer from './errorReducer';
import modalReducer from './modelReducer';

const rootReducer = combineReducers({
    event: eventReducer,
    events: eventsReducer,
    error: errorReducer,
    modalStatus: modalReducer,
});

export default rootReducer;
