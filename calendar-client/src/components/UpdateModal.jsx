import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeEvent } from '../store/actions';

const UpdateModal = ({
    open,
    handleClose,
    event,
    removeEvent,
    setRefreshEvents,
}) => {
    const { id, describe, title, start, end } = event;

    const handleDelete = async () => {
        await removeEvent(event.id);
        handleClose();
        setRefreshEvents(true);
    };

    return (
        <Modal show={open} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-capitalize'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {describe && <p className='lead'>{describe}</p>}
                <div className='row justify-content-between'>
                    <p className='col small pb-0 mb-0'>FROM: {start}</p>
                    <p className='col small pb-0 mb-0'>TO: {end}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/event/${id}/update`}>
                    <button className='btn btn-warning'>Edit Event</button>
                </Link>
                <button onClick={handleDelete} className='btn btn-danger'>
                    Remove Event
                </button>
            </Modal.Footer>
        </Modal>
    );
};

// We export the component as the default export of the module and connect
// it to the Redux store. The connect function is a higher-order function provided
// by React Redux library. It connects a React component to the Redux store, allowing
// the component to access the state and dispatch actions.
function mapStateToProps({ event }) {
    return {
        event,
    };
}

export default connect(mapStateToProps, { removeEvent })(UpdateModal);
