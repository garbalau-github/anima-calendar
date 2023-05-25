import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MyCalendar from './pages/Calendar';
import AddEvents from './pages/CreateEvent';
import UpdateEvent from './pages/UpdateEvent';
import NotFound from './pages/NotFound';
import Header from './components/Header';

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' exact element={<MyCalendar />} />
                <Route path='/events/add' element={<AddEvents />} />
                <Route path='/event/:id/update' element={<UpdateEvent />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
