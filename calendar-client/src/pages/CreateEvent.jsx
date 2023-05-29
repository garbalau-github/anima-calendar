import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createEvent } from '../store/actions';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useLocation } from 'react-router-dom';
import checkIfDatesAreValid from '../utils/checkIfDatesAreValid';

// Validation Schema
const schema = yup
    .object({
        title: yup.string().required('You require a title for the event'),
        start: yup.date().required('You require a start time'),
        end: yup.date().required('You require an end time'),
    })
    .required();

const AddEvents = ({ createEvent, error }) => {
    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [startDate, setStartDate] = useState(null);

    const { state } = useLocation();

    useEffect(() => {
        const setStartDateFromClick = () => {
            setStartDate(state.start);
        };
        if (state) {
            setStartDateFromClick();
        }
    }, [state]);

    useEffect(() => {
        if (error && !firstRender) {
            setError(error);
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate('/'));
        }
    }, [rerender]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const removeTemporaryDate = () => {
        setStartDate(null);
    };

    const onSubmit = async (values) => {
        const isValidated = checkIfDatesAreValid(values.start, values.end);
        if (isValidated) {
            setFirstRender(false);
            await createEvent(values).then(() => {
                setRerender(!rerender);
                navigate('/');
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='align-content-center m-5'
        >
            <div className='mb-4'>
                <label htmlFor='title' className='form-label'>
                    Title
                </label>
                <input
                    {...register('title')}
                    type='text'
                    placeholder='How would we call it?'
                    className='form-control'
                    id='title'
                    aria-describedby='title'
                />
                <p className='error text-danger position-absolute'>
                    {errors.title?.message}
                </p>
            </div>
            <div className='mb-4'>
                <label htmlFor='start' className='form-label'>
                    Start Date
                </label>
                <Controller
                    control={control}
                    name='start'
                    render={({ field }) => {
                        return (
                            <>
                                <DatePicker
                                    placeholderText='When does it start?'
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                    value={field.value}
                                    showTimeSelect
                                    timeFormat='HH:mm'
                                    dateFormat='MMMM d, yyyy h:mm aa'
                                    className='form-control'
                                    id='start'
                                />
                                <br />
                                {startDate && (
                                    <button
                                        onClick={() => {
                                            field.onChange(startDate);
                                            removeTemporaryDate();
                                        }}
                                        className='btn btn-secondary'
                                    >
                                        Add event for{' '}
                                        {
                                            startDate
                                                .toLocaleString()
                                                .split(',')[0]
                                        }
                                        ?
                                    </button>
                                )}
                            </>
                        );
                    }}
                />
                <p className='error text-danger position-absolute'>
                    {errors.start?.message}
                </p>
                <p className='error text-danger position-absolute'>
                    {dbError.start}
                </p>
            </div>
            <div className='mb-4'>
                <label htmlFor='end' className='form-label'>
                    End Date
                </label>
                <Controller
                    control={control}
                    name='end'
                    render={({ field }) => {
                        return (
                            <DatePicker
                                placeholderText='When does it end?'
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                value={field.value}
                                showTimeSelect
                                timeFormat='HH:mm'
                                dateFormat='MMMM d, yyyy h:mm aa'
                                className='form-control'
                                id='end'
                            />
                        );
                    }}
                />
                <p className='error text-danger position-absolute'>
                    {errors.end?.message}
                </p>
                <p className='error text-danger position-absolute'>
                    {dbError.end}
                </p>
            </div>
            <div className='mb-4'>
                <label htmlFor='describe' className='form-label'>
                    Description{' '}
                    <span className='text-warning small'>
                        (This is optional)
                    </span>
                </label>
                <input
                    {...register('describe')}
                    type='text'
                    placeholder='Do you want to add more details on that event?'
                    className='form-control'
                    id='describe'
                    aria-describedby='describe'
                />
            </div>
            <button type='submit' className='btn btn-primary'>
                Create Event
            </button>
        </form>
    );
};

// We export the component as the default export of the module and connect
// it to the Redux store. The connect function is a higher-order function provided
// by React Redux library. It connects a React component to the Redux store, allowing
// the component to access the state and dispatch actions.
function mapStateToProps({ error }) {
    return {
        error,
    };
}

export default connect(mapStateToProps, { createEvent })(AddEvents);
