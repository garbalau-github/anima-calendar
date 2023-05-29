import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getEventsInfo, updateEvent } from '../store/actions';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import checkIfDatesAreValid from '../utils/checkIfDatesAreValid';

// Validation Schema
const schema = yup
    .object({
        title: yup.string().required("Can't Be Empty"),
        start: yup.date().required('Please specify the time to start'),
        end: yup
            .date('must be a valid date')
            .required('on update you must specify an end date'),
    })
    .required();

const UpdateEvent = ({ updateEvent, event, error }) => {
    const navigate = useNavigate();
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false);

    // It is used in the useEffect hook to determine if an error occurred during the
    // update process and if it is the first render of the component.

    // Overall, the firstRender state helps in handling and distinguishing the behavior
    // between the first render of the component and subsequent renders, especially
    // when it comes to error handling and navigation after the update process.
    const [firstRender, setFirstRender] = useState(true);

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
        defaultValues: {
            title: event.title,
            start: event.start ? new Date(event.start) : '',
            end: event.end ? new Date(event.end) : '',
            describe: event.describe ? event.describe : null,
        },
    });

    const onSubmit = async (values) => {
        const isValidated = checkIfDatesAreValid(values.start, values.end);
        if (isValidated) {
            setFirstRender(false);
            await updateEvent(values, event.id).then(() => {
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
                            <DatePicker
                                onChange={(date) => field.onChange(date)}
                                selected={field.value}
                                value={field.value}
                                showTimeSelect
                                timeFormat='HH:mm'
                                dateFormat='MMMM d, yyyy h:mm aa'
                                className='form-control'
                                id='start'
                            />
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
                    placeholder='Do you want to update any details on that event?'
                    className='form-control'
                    id='describe'
                    aria-describedby='describe'
                />
            </div>
            <button type='submit' className='btn btn-primary'>
                Update Event
            </button>
        </form>
    );
};

// We export the component as the default export of the module and connect
// it to the Redux store. The connect function is a higher-order function provided
// by React Redux library. It connects a React component to the Redux store, allowing
// the component to access the state and dispatch actions.
function mapStateToProps({ event, error }) {
    return {
        event,
        error,
    };
}

export default connect(mapStateToProps, { updateEvent, getEventsInfo })(
    UpdateEvent
);
